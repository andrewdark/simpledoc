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
    id BIGINT NOT NULL DEFAULT nextval('public.resolution_id_seq'),

    version bigint,
    created_at timestamp(6) without time zone,
    updated_at timestamp(6) without time zone,

    PRIMARY KEY (id)
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
    id BIGINT NOT NULL DEFAULT nextval('public.resolution_category_id_seq'),

    version bigint,
    created_at timestamp(6) without time zone,
    updated_at timestamp(6) without time zone,

    PRIMARY KEY (id)
);
ALTER TABLE IF EXISTS public.resolution_category OWNER to postgres;
ALTER SEQUENCE public.resolution_category_id_seq OWNED BY public.resolution_category.id;

COMMIT ;
