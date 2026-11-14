--
-- PostgreSQL database dump
--

\restrict YtmW5YfI43g2aPTT3uO3yNalN6XyVvRXGNSUryLQTB4Do61HFpjeygsAUyYFgWc

-- Dumped from database version 18.6 (Homebrew)
-- Dumped by pg_dump version 18.6 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: comments; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.comments (
    id bigint NOT NULL,
    user_id bigint NOT NULL,
    post_id bigint NOT NULL,
    text text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: comments_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.comments_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: comments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.comments_id_seq OWNED BY public.comments.id;


--
-- Name: posts; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.posts (
    id bigint NOT NULL,
    user_id bigint NOT NULL,
    title character varying(50) NOT NULL,
    text text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: posts_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.posts_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: posts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.posts_id_seq OWNED BY public.posts.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id bigint NOT NULL,
    first_name character varying(50) NOT NULL,
    last_name character varying(50) NOT NULL,
    age integer NOT NULL,
    email character varying(70) NOT NULL,
    password character varying(60) NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    CONSTRAINT users_age_check CHECK ((age > 0))
);


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: comments id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.comments ALTER COLUMN id SET DEFAULT nextval('public.comments_id_seq'::regclass);


--
-- Name: posts id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.posts ALTER COLUMN id SET DEFAULT nextval('public.posts_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: comments; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.comments (id, user_id, post_id, text, created_at) FROM stdin;
8	15	11	Nice recipe !!	2026-11-11 21:01:32.350341+01
\.


--
-- Data for Name: posts; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.posts (id, user_id, title, text, created_at) FROM stdin;
8	13	Alice	Alice's post	2026-11-08 22:54:10.109519+01
11	15	Pasta Recipe	Ingredients =>\n\n1. Flour\n2. Eggs\n3. Water\n\nProcess =>\n1. Step\n2. Step	2026-11-11 21:01:01.02317+01
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.users (id, first_name, last_name, age, email, password, created_at) FROM stdin;
7	Theodoros	Mitropoulos	33	theodor.mitropoulos@gmail.com	$2b$10$CUy9IFenB.H5CTcNR.WhX.mRVwHQanXDFlrAAWeVy/ZDBSynwke/i	2026-11-04 21:05:24.347872+01
9	Alice	Mitropoulou	33	alice.mitropoulou@gmail.com	$2b$10$S38EP.ENrqZiqJte1ghBze4ybxX0KxJTiM/lXhnX4wWlz/QS1qrpq	2026-11-05 22:23:54.289428+01
10	Maria	Mitropoulou	30	maria@gmail.com	$2b$10$gAwTIPelzuyzC9no2L1lGu6j/yaapJPG/TIk1ykkT1E6VS6r6k2lS	2026-11-06 20:50:15.416185+01
11	Maria	Mitropoulou	45	maria43@gmail.com	$2b$10$cJemNBu6YmKhFrnExdzGx.CrnYbmOkJQE746ouPXFofu4BpJP4.b2	2026-11-06 21:02:19.921879+01
12	Anna	Maria	20	anna@gmail.com	$2b$10$CzYSOUWf.vOAjCc8Rf9oZ.gRGYyUuQljhzVMxyyWa8qboiD8Ub3jW	2026-11-08 13:16:34.282134+01
13	Alice	Mitropoulou	28	alice@gmail.com	$2b$10$9gnzJp8giQ/Z1qeMz/J0N.Q0D4zeJpPfQtI5FBqy3FjhFOe3US8tW	2026-11-08 22:53:23.416375+01
14	Alex	Mitropoulos	30	alex@gmail.com	$2b$10$NdQclBzKHsmTCVsCWzrYw.VSi4kUKMf.dW5Xe.ahQ1g0InarOMjEm	2026-11-09 19:57:23.063678+01
15	Theodoros	Mitropoulos	20	theodor.mitropoulos@yahoo.com	$2b$10$sFEiM2IevxmIGDPa7IfVJuUF6LMAEftGzrZWO8XwB5cGK4dhB/Lqa	2026-11-11 20:59:06.520226+01
\.


--
-- Name: comments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.comments_id_seq', 8, true);


--
-- Name: posts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.posts_id_seq', 11, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_id_seq', 15, true);


--
-- Name: comments comments_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_pkey PRIMARY KEY (id);


--
-- Name: posts posts_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_pkey PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: comments_post_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX comments_post_id_idx ON public.comments USING btree (post_id);


--
-- Name: comments_user_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX comments_user_id_idx ON public.comments USING btree (user_id);


--
-- Name: posts_user_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX posts_user_id_idx ON public.posts USING btree (user_id);


--
-- Name: comments comments_post_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_post_id_fkey FOREIGN KEY (post_id) REFERENCES public.posts(id) ON DELETE CASCADE;


--
-- Name: comments comments_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: posts posts_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

\unrestrict YtmW5YfI43g2aPTT3uO3yNalN6XyVvRXGNSUryLQTB4Do61HFpjeygsAUyYFgWc

