BEGIN;

--resolution--
DROP SEQUENCE IF EXISTS public.resolution_id_seq;
CREATE SEQUENCE IF NOT EXISTS public.resolution_id_seq
    INCREMENT BY 10
    START WITH 1
    CACHE 1
    NO CYCLE;

DROP TABLE IF EXISTS public.resolution;

CREATE TABLE IF NOT EXISTS public.resolution
(
    id                     BIGINT NOT NULL DEFAULT nextval('public.resolution_id_seq'),
    record_id              BIGINT NOT NULL,
    content                TEXT,
    department_id          BIGINT,
    res_date                date,
    plan_date               date,
    fact_date               date,
    resume                 character varying(255),
    summary                character varying(255),
    resolution_category_id BIGINT,
    deleted                boolean         default false NOT NULL,
    version                bigint,
    created_at             timestamp(6) without time zone,
    updated_at             timestamp(6) without time zone,
    PRIMARY KEY (id),
    FOREIGN KEY (resolution_category_id) REFERENCES resolution (id),
    FOREIGN KEY (department_id) REFERENCES department (id)
);
ALTER TABLE IF EXISTS public.resolution OWNER to postgres;
ALTER SEQUENCE public.resolution_id_seq OWNED BY public.resolution.id;

--resolution_category--
DROP SEQUENCE IF EXISTS public.resolution_category_id_seq;
CREATE SEQUENCE IF NOT EXISTS public.resolution_category_id_seq
    INCREMENT BY 10
    START WITH 1
    CACHE 1
    NO CYCLE;

DROP TABLE IF EXISTS public.resolution_category;

CREATE TABLE IF NOT EXISTS public.resolution_category
(
    id         BIGINT NOT NULL DEFAULT nextval('public.resolution_category_id_seq'),
    name       character varying(255),
    deleted    boolean         default false NOT NULL,
    version    bigint,
    created_at timestamp(6) without time zone,
    updated_at timestamp(6) without time zone,

    PRIMARY KEY (id)
);
ALTER TABLE IF EXISTS public.resolution_category OWNER to postgres;
ALTER SEQUENCE public.resolution_category_id_seq OWNED BY public.resolution_category.id;

--reply--
DROP TYPE IF EXISTS public.reply_type;
CREATE TYPE public.reply_type AS enum ('FULL_REPLY', 'PARTIAL_REPLY');

DROP SEQUENCE IF EXISTS public.reply_id_seq;
CREATE SEQUENCE IF NOT EXISTS public.reply_id_seq
    INCREMENT BY 10
    START WITH 1
    CACHE 1
    NO CYCLE;

DROP TABLE IF EXISTS reply;
CREATE TABLE IF NOT EXISTS reply
(
    id            BIGINT NOT NULL DEFAULT nextval('reply_id_seq'),
    resolution_id BIGINT NOT NULL,
    reply_date    date,
    reply_type    reply_type,
    department_id BIGINT,
    content       text,
    version       bigint,
    created_at    timestamp(6) without time zone,
    updated_at    timestamp(6) without time zone,
    PRIMARY KEY (id),
    FOREIGN KEY (resolution_id) REFERENCES resolution (id),
    FOREIGN KEY (department_id) REFERENCES department (id)
);

ALTER TABLE IF EXISTS public.reply OWNER to postgres;
ALTER SEQUENCE public.reply_id_seq OWNED BY reply.id;

COMMIT;
