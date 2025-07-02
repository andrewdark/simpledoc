BEGIN;
--RECORD GROUP--
DROP TYPE IF EXISTS public.record_group_type;
CREATE TYPE public.record_group_type AS enum ('NODE', 'INCOMING', 'OUTGOING', 'CITIZEN','INNER');

DROP SEQUENCE IF EXISTS public.record_group_id_seq;
CREATE SEQUENCE IF NOT EXISTS public.record_group_id_seq
    INCREMENT BY 10
    START WITH 1
    CACHE 1
    NO CYCLE;

DROP TABLE IF EXISTS record_group;
CREATE TABLE IF NOT EXISTS record_group
(
    id                BIGINT                 NOT NULL DEFAULT nextval('record_group_id_seq'),
    name              character varying(255) NOT NULL,
    template_num      character varying(255),
    index_num         character varying(255),
    record_group_type record_group_type      NOT NULL,
    deleted           boolean,
    node              boolean,
    parent_id         bigint,
    version           bigint,
    created_at        timestamp(6) without time zone,
    updated_at        timestamp(6) without time zone,
    CONSTRAINT record_group_pkey PRIMARY KEY (id),
    CONSTRAINT record_group_fk_parent_id FOREIGN KEY (parent_id) REFERENCES record_group (id)
);

ALTER TABLE IF EXISTS public.record_group
    OWNER to postgres;
ALTER SEQUENCE public.record_group_id_seq OWNED BY record_group.id;

--Delivery--
DROP SEQUENCE IF EXISTS public.delivery_id_seq;
CREATE SEQUENCE IF NOT EXISTS public.delivery_id_seq
    INCREMENT BY 10
    START WITH 1
    CACHE 1
    NO CYCLE;

DROP TABLE IF EXISTS public.delivery;

CREATE TABLE IF NOT EXISTS public.delivery
(
    id         BIGINT NOT NULL DEFAULT nextval('public.delivery_id_seq'),
    name       character varying(255),
    deleted    boolean,
    version    bigint,
    created_at timestamp(6) without time zone,
    updated_at timestamp(6) without time zone,
    CONSTRAINT delivery_pkey PRIMARY KEY (id)
);
ALTER TABLE IF EXISTS public.delivery
    OWNER to postgres;
ALTER SEQUENCE public.delivery_id_seq OWNED BY delivery.id;

--rubric--
DROP SEQUENCE IF EXISTS public.rubric_id_seq;
CREATE SEQUENCE IF NOT EXISTS public.rubric_id_seq
    INCREMENT BY 10
    START WITH 1
    CACHE 1
    NO CYCLE;

DROP TABLE IF EXISTS public.rubric;

CREATE TABLE IF NOT EXISTS public.rubric
(
    id         BIGINT NOT NULL DEFAULT nextval('public.rubric_id_seq'),
    code       character varying(255),
    name       character varying(255),
    node       boolean,
    parent_id  bigint,
    deleted    boolean,
    version    bigint,
    created_at timestamp(6) without time zone,
    updated_at timestamp(6) without time zone,
    PRIMARY KEY (id),
    FOREIGN KEY (parent_id) REFERENCES rubric (id)
);
ALTER TABLE IF EXISTS public.rubric
    OWNER to postgres;
ALTER SEQUENCE public.rubric_id_seq OWNED BY rubric.id;

--##########################--
-----BEGIN RECORDS GROUP------

--record--
DROP SEQUENCE IF EXISTS public.record_id_seq;
CREATE SEQUENCE IF NOT EXISTS public.record_id_seq
    INCREMENT BY 10
    START WITH 1
    CACHE 1
    NO CYCLE;

DROP TABLE IF EXISTS public.record;
CREATE TABLE IF NOT EXISTS public.record
(
    id              BIGINT NOT NULL DEFAULT nextval('public.record_id_seq'),
    record_group_id bigint NOT NULL,
    reg_num         character varying(255),
    order_num       bigint,
    reg_date        date,
    consist         character varying(255),
    content         text,
    note            character varying(255),
    delivery_id     bigint,
    version         bigint,
    created_at      timestamp(6) without time zone,
    updated_at      timestamp(6) without time zone,
    PRIMARY KEY (id),
    FOREIGN KEY (record_group_id) REFERENCES public.record_group (id),
    FOREIGN KEY (delivery_id) REFERENCES public.delivery (id)
);
ALTER TABLE IF EXISTS public.record
    OWNER to postgres;
ALTER SEQUENCE public.record_id_seq OWNED BY record.id;

--citizens_record--
DROP TABLE IF EXISTS public.citizens_record;
CREATE TABLE IF NOT EXISTS public.citizens_record
(
    id         BIGINT NOT NULL,
    collective boolean,
    sign_count int,
    PRIMARY KEY (id),
    FOREIGN KEY (id) REFERENCES record (id)
);
ALTER TABLE IF EXISTS public.citizens_record
    OWNER to postgres;

--incoming_record--
DROP TABLE IF EXISTS public.incoming_record;
CREATE TABLE IF NOT EXISTS public.incoming_record
(
    id BIGINT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (id) REFERENCES record (id)
);
ALTER TABLE IF EXISTS public.incoming_record
    OWNER to postgres;

--inner_record--
DROP TABLE IF EXISTS public.inner_record;
CREATE TABLE IF NOT EXISTS public.inner_record
(
    id            BIGINT NOT NULL,
    department_id bigint,
    PRIMARY KEY (id),
    FOREIGN KEY (id) REFERENCES record (id),
    FOREIGN KEY (department_id) REFERENCES department (id)
);
ALTER TABLE IF EXISTS public.inner_record
    OWNER to postgres;

--outgoing_record--
DROP TABLE IF EXISTS public.outgoing_record;
CREATE TABLE IF NOT EXISTS public.outgoing_record
(
    id            BIGINT NOT NULL,
    department_id bigint,
    PRIMARY KEY (id),
    FOREIGN KEY (id) REFERENCES record (id),
    FOREIGN KEY (department_id) REFERENCES department (id)
);
ALTER TABLE IF EXISTS public.outgoing_record
    OWNER to postgres;

-----END RECORDS GROUP------
--##########################--

--organization--
DROP SEQUENCE IF EXISTS public.organization_id_seq;
CREATE SEQUENCE IF NOT EXISTS public.organization_id_seq
    INCREMENT BY 10
    START WITH 1
    CACHE 1
    NO CYCLE;

DROP TABLE IF EXISTS organization;
CREATE TABLE IF NOT EXISTS organization
(
    id         BIGINT                 NOT NULL DEFAULT nextval('organization_id_seq'),
    name       character varying(255) NOT NULL,
    code       character varying(10)  NOT NULL,
    deleted    boolean,
    version    bigint,
    created_at timestamp(6) without time zone,
    updated_at timestamp(6) without time zone,
    CONSTRAINT organization_pkey PRIMARY KEY (id),
    CONSTRAINT organization_uc UNIQUE (code)
);
ALTER TABLE IF EXISTS public.organization
    OWNER to postgres;
ALTER SEQUENCE public.organization_id_seq OWNED BY organization.id;

--citizen--
DROP SEQUENCE IF EXISTS public.citizen_id_seq;
CREATE SEQUENCE IF NOT EXISTS public.citizen_id_seq
    INCREMENT BY 10
    START WITH 1
    CACHE 1
    NO CYCLE;
DROP TABLE IF EXISTS citizen;
CREATE TABLE IF NOT EXISTS citizen
(
    id         BIGINT                 NOT NULL DEFAULT nextval('citizen_id_seq'),
    full_name  character varying(255) NOT NULL,
    address    character varying(255) NOT NULL,
    deleted    boolean,
    version    bigint,
    created_at timestamp(6) without time zone,
    updated_at timestamp(6) without time zone,
    CONSTRAINT citizen_pkey PRIMARY KEY (id)
);
ALTER TABLE IF EXISTS public.citizen OWNER to postgres;
ALTER SEQUENCE public.citizen_id_seq OWNED BY citizen.id;
--correspondent--

DROP TYPE IF EXISTS public.correspondent_type;
CREATE TYPE public.correspondent_type AS enum ('INCOMING_ORGANIZATION', 'INCOMING_CITIZEN', 'COVER_LETTER', 'OUTGOING_ORGANIZATION', 'OUTGOING_CITIZEN');

DROP SEQUENCE IF EXISTS public.correspondent_id_seq;
CREATE SEQUENCE IF NOT EXISTS public.correspondent_id_seq
    INCREMENT BY 10
    START WITH 1
    CACHE 1
    NO CYCLE;

DROP TABLE IF EXISTS correspondent;
CREATE TABLE IF NOT EXISTS correspondent
(
    id                 BIGINT NOT NULL DEFAULT nextval('correspondent_id_seq'),
    record_id          bigint,
    out_num            character varying(255),
    out_date           date,
    note               character varying(255),
    signatory          character varying(255),
    organization_id    bigint,
    citizen_id         bigint,
    correspondent_type correspondent_type,
    version            bigint,
    created_at         timestamp(6) without time zone,
    updated_at         timestamp(6) without time zone,
    PRIMARY KEY (id),
    FOREIGN KEY (record_id) REFERENCES record (id),
    FOREIGN KEY (organization_id) REFERENCES organization (id),
    FOREIGN KEY (citizen_id) REFERENCES citizen (id)
);
ALTER TABLE IF EXISTS public.correspondent OWNER to postgres;
ALTER SEQUENCE public.correspondent_id_seq OWNED BY correspondent.id;

--citizen_status--
DROP SEQUENCE IF EXISTS public.citizen_status_id_seq;
CREATE SEQUENCE IF NOT EXISTS public.citizen_status_id_seq
    INCREMENT BY 10
    START WITH 1
    CACHE 1
    NO CYCLE;

DROP TABLE IF EXISTS public.citizen_status;

CREATE TABLE IF NOT EXISTS public.citizen_status
(
    id BIGINT NOT NULL DEFAULT nextval('public.citizen_status_id_seq'),

    version bigint,
    created_at timestamp(6) without time zone,
    updated_at timestamp(6) without time zone,

    PRIMARY KEY (id)
);
ALTER TABLE IF EXISTS public.citizen_status OWNER to postgres;
ALTER SEQUENCE public.citizen_status_id_seq OWNED BY public.citizen_status.id;

--citizen_category--
DROP SEQUENCE IF EXISTS public.citizen_category_id_seq;
CREATE SEQUENCE IF NOT EXISTS public.citizen_category_id_seq
    INCREMENT BY 10
    START WITH 1
    CACHE 1
    NO CYCLE;

DROP TABLE IF EXISTS public.citizen_category;

CREATE TABLE IF NOT EXISTS public.citizen_category
(
    id BIGINT NOT NULL DEFAULT nextval('public.citizen_category_id_seq'),

    version bigint,
    created_at timestamp(6) without time zone,
    updated_at timestamp(6) without time zone,

    PRIMARY KEY (id)
);
ALTER TABLE IF EXISTS public.citizen_category OWNER to postgres;
ALTER SEQUENCE public.citizen_category_id_seq OWNED BY public.citizen_category.id;

COMMIT;
