CREATE TABLE articles
(
  authorusername character varying,
  title character varying,
  rating integer,
  "idArticle" bigserial NOT NULL,
  content character varying,
  date timestamp with time zone,
  CONSTRAINT "idArticle" PRIMARY KEY ("idArticle")
)
WITH (
  OIDS=FALSE
);
ALTER TABLE articles
  OWNER TO postgres;

  CREATE TABLE comments
(
  username character varying,
  text character varying,
  link character varying,
  date timestamp without time zone,
  "idArticle" bigserial NOT NULL,
  "idComment" bigserial NOT NULL,
  CONSTRAINT "idComments" FOREIGN KEY ("idArticle")
      REFERENCES articles ("idArticle") MATCH SIMPLE
      ON UPDATE CASCADE ON DELETE CASCADE
)
WITH (
  OIDS=FALSE
);
ALTER TABLE comments
  OWNER TO postgres;

CREATE INDEX "fki_idArticle"
  ON comments
  USING btree
  ("idArticle");
  
CREATE TABLE users
(
  username character varying,
  password character varying,
  email character varying,
  "registrationDate" timestamp without time zone,
  "commentCount" integer,
  "articleCount" integer
)
WITH (
  OIDS=FALSE
);
ALTER TABLE users
  OWNER TO postgres;

CREATE TABLE "usersRating"
(
  username character varying,
  id bigserial NOT NULL,
  CONSTRAINT "idUsersRating1" FOREIGN KEY (id)
      REFERENCES articles ("idArticle") MATCH SIMPLE
      ON UPDATE CASCADE ON DELETE CASCADE
)
WITH (
  OIDS=FALSE
);
ALTER TABLE "usersRating"
  OWNER TO postgres;

CREATE INDEX "fki_idUsersRating1"
  ON "usersRating"
  USING btree
  (id);