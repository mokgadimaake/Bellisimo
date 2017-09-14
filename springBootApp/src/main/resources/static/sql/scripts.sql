DROP TABLE IMAGES;

 CREATE TABLE IMAGES (
   ID  SERIAL PRIMARY KEY,
   imgname text, 
   img bytea
   
 );


DROP TABLE COMMODITY;

CREATE TABLE COMMODITY (
  ID  SERIAL PRIMARY KEY,
  name CHAR(50) not null UNIQUE,
  department CHAR(50) not null,
  type CHAR(50) not null,
  price decimal(7,2) not null,
  special_price decimal(7,2),
  special_start_period date,
  special_end_period date,
  imgname text,
  img bytea
  
);

insert into commodity (name, department, type, price) values ('Milk', 'Food', 'Clover', 300);
insert into commodity (name, department, type, price) values ('Coke', 'Food', 'Beverage', 350);
insert into commodity (name, department, type, price) values ('Trouser', 'Clothing', 'Diesel', 500);


DROP TABLE USER_PROFILE;

CREATE TABLE USER_PROFILE (
  ID  SERIAL PRIMARY KEY,
  name CHAR(30),
  surname CHAR(30),
  username CHAR(30) not null UNIQUE,
  password CHAR(30),
  role CHAR(30)
);


insert into user_profile (name, surname, username, password, role) values ('Lindiwe', 'Maake', 'lindi', 'lindi', 'ADMIN');
insert into user_profile (name, surname, username, password, role) values ('Peter', 'Miyambo', 'tester', 'tester', 'USER');
insert into user_profile (name, surname, username, password, role) values ('Sam', 'Smith', 'sam', 'sam', 'USER');