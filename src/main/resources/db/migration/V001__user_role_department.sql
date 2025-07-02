BEGIN;

--APP USER--
DROP SEQUENCE IF EXISTS public.app_user_id_seq;
CREATE SEQUENCE IF NOT EXISTS public.app_user_id_seq
    INCREMENT BY 10
    START WITH 1
    CACHE 1
    NO CYCLE;

DROP TABLE IF EXISTS public.app_user;

CREATE TABLE IF NOT EXISTS public.app_user
(
    id BIGINT NOT NULL DEFAULT nextval('public.app_user_id_seq'),
    email character varying(36) NOT NULL,
    enabled boolean NOT NULL,
    account_non_expired boolean DEFAULT true NOT NULL,
    account_non_locked boolean DEFAULT true NOT NULL,
    credentials_non_expired boolean DEFAULT true NOT NULL,
    deleted boolean DEFAULT false NOT NULL,
    encrypted_password character varying(128) NOT NULL,
    first_name character varying(36) NOT NULL,
    last_login timestamp(6) without time zone,
    last_name character varying(36) NOT NULL,
    version bigint,
    created_at timestamp(6) without time zone,
    updated_at timestamp(6) without time zone,

    CONSTRAINT app_user_pkey PRIMARY KEY (id),
    CONSTRAINT app_user_uc UNIQUE (email)
);
ALTER TABLE IF EXISTS public.app_user OWNER to postgres;
ALTER SEQUENCE public.app_user_id_seq OWNED BY public.app_user.id;

-- APP ROLE --
DROP SEQUENCE IF EXISTS public.app_role_id_seq;
CREATE SEQUENCE IF NOT EXISTS public.app_role_id_seq
    INCREMENT BY 10
    START WITH 1
    CACHE 1
    NO CYCLE;

DROP TABLE IF EXISTS public.app_role;
CREATE TABLE IF NOT EXISTS public.app_role
(
    id bigint DEFAULT nextval('public.app_role_id_seq'),
    role_name character varying(36) NOT NULL,
    version bigint,
    created_at timestamp(6) without time zone,
    updated_at timestamp(6) without time zone,

    CONSTRAINT app_role_pkey PRIMARY KEY (id),
    CONSTRAINT app_role_uc UNIQUE (role_name)
);

ALTER TABLE IF EXISTS public.app_role OWNER to postgres;
ALTER SEQUENCE public.app_role_id_seq OWNED BY public.app_role.id;

--ROLE USER--
DROP TABLE IF EXISTS public.role_user;

CREATE TABLE IF NOT EXISTS public.role_user
(
    role_id bigint NOT NULL,
    user_id bigint NOT NULL,
    added_on timestamp(6) without time zone NOT NULL,
    CONSTRAINT role_user_pkey PRIMARY KEY (role_id, user_id),
    CONSTRAINT fk9nnjn9hwoll35lo3bap1075t3 FOREIGN KEY (role_id) REFERENCES public.app_role (id),
    CONSTRAINT fkfhbmfntjddrc0h05a0feowune FOREIGN KEY (user_id) REFERENCES public.app_user (id)
);

ALTER TABLE IF EXISTS public.role_user OWNER to postgres;

INSERT INTO public.app_role(created_at, role_name, version)
VALUES (current_timestamp, 'ROLE_ADMIN', 0);
INSERT INTO public.app_role(id,created_at, role_name, version)
VALUES (2,current_timestamp, 'ROLE_OPERATOR', 0);
INSERT INTO public.app_role(id,created_at, role_name, version)
VALUES (3,current_timestamp, 'ROLE_USER', 0);

INSERT INTO public.app_user(email, enabled, account_non_expired, account_non_locked, credentials_non_expired, deleted,
                            encrypted_password, first_name, last_login, last_name, version, created_at, updated_at)
VALUES ('admin', true, true, true, true, false,
        '$2a$10$9cOpux3oEKqEywXFXIdg9.P5SfhITfQMl1fphppJUuXwnfks3KWbq', 'admin', current_timestamp, 'admin', 1,
        current_timestamp, current_timestamp);
INSERT INTO public.role_user(role_id, user_id, added_on)
VALUES (1, 1, current_timestamp);

--REFRESH TOKEN--
DROP SEQUENCE IF EXISTS public.app_refresh_token_id_seq;
CREATE SEQUENCE IF NOT EXISTS public.app_refresh_token_id_seq
    INCREMENT BY 10
    START WITH 1
    CACHE 1
    NO CYCLE;

DROP TABLE IF EXISTS public.app_refresh_token;
CREATE TABLE IF NOT EXISTS public.app_refresh_token
(
    id bigint DEFAULT nextval('public.app_refresh_token_id_seq'),
    browser_fingerprint character varying(255),
    ip_address character varying(255) NOT NULL,
    refresh_token character varying(255) NOT NULL,
    version bigint,
    created_at timestamp(6) without time zone,
    updated_at timestamp(6) without time zone,
    user_id bigint,
    CONSTRAINT app_refresh_token_pkey PRIMARY KEY (id),
    CONSTRAINT app_refresh_token_uc UNIQUE (user_id),
    CONSTRAINT app_refresh_token_fk_user_id FOREIGN KEY (user_id) REFERENCES public.app_user (id)
);

ALTER TABLE IF EXISTS public.app_refresh_token OWNER to postgres;
ALTER SEQUENCE public.app_refresh_token_id_seq OWNED BY public.app_refresh_token.id;

DROP INDEX IF EXISTS public.app_refresh_token_refresh_token_idx;
CREATE INDEX IF NOT EXISTS app_refresh_token_refresh_token_idx ON public.app_refresh_token USING btree (refresh_token ASC NULLS LAST);

--DEPARTAMENT--
DROP SEQUENCE IF EXISTS public.department_id_seq;
CREATE SEQUENCE IF NOT EXISTS public.department_id_seq
    INCREMENT BY 10
    START WITH 1
    CACHE 1
    NO CYCLE;

DROP TABLE IF EXISTS public.department;

CREATE TABLE IF NOT EXISTS public.department
(
    id bigint DEFAULT nextval('public.department_id_seq'),
    deleted boolean NOT NULL,
    official boolean NOT NULL,
    parent_id bigint,
    name character varying(255),
    position character varying(255),
    user_id bigint,
    version bigint,
    created_at timestamp(6) without time zone,
    updated_at timestamp(6) without time zone,
    CONSTRAINT department_pkey PRIMARY KEY (id),
    CONSTRAINT department_fk_parent_id FOREIGN KEY (parent_id) REFERENCES public.department (id),
    CONSTRAINT department_fk_user_id FOREIGN KEY (user_id) REFERENCES public.app_user (id)
);

ALTER TABLE IF EXISTS public.department OWNER to postgres;
ALTER SEQUENCE public.department_id_seq OWNED BY public.department.id;

COMMIT ;
