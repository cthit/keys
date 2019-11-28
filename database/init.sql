CREATE TABLE key_type (
  id        uuid            constraint key_type_pk primary key,
  name      varchar(100)    not null
);

CREATE TYPE key_status AS ENUM ('normal', 'broken', 'missing');
CREATE TABLE key (
  id            uuid            constraint key_pk primary key,
  name          varchar(100)    not null,
  status        key_status      not null,
  key_type_id   uuid            not null references key_type(id)
);

CREATE TABLE ownership (
  id                uuid        constraint ownership_pk primary key,
  owner_user_id     uuid        not null,
  start_date        timestamp   not null,
  return_date       timestamp   not null,
  key_id            uuid        not null references key,
  deposition        SMALLINT    not null,
  lost_key_penalty  SMALLINT    not null
);

CREATE TABLE key_type_to_key (
  constraint        key_type_to_key_pk      primary key (key_type_id, key_id),
  key_type_id       uuid        not null    references key_type,
  key_id            uuid        not null    references key
)