-- CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE DATABASE money;

CREATE TABLE users (
    user_id BIGSERIAL NOT NULL PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE accounts (
    account_id BIGSERIAL NOT NULL PRIMARY KEY,
    nickname VARCHAR(255) NOT NULL,
    balance MONEY NOT NULL,
    user_id BIGINT NOT NULL REFERENCES users(user_id)
);

CREATE TABLE plans (
    plan_id BIGSERIAL NOT NULL PRIMARY KEY,
    nickname VARCHAR(255) NOT NULL,
    goal_amount MONEY NOT NULL,
    goal_date DATE NOT NULL,
    user_id BIGINT NOT NULL REFERENCES users(user_id)
);

CREATE TABLE bills (
    bill_id BIGSERIAL NOT NULL PRIMARY KEY,
    nickname VARCHAR(255) NOT NULL,
    amount_due MONEY NOT NULL,
    due_date DATE NOT NULL,
    user_id BIGINT NOT NULL REFERENCES users(user_id)
);

insert into users (first_name, email, password) values ('henry','h@gmail.com','password123');
insert into users (first_name, email, password) values ('jon','j@gmail.com','password123');


insert into accounts (nickname, balance, user_id) values ('checking', 5000.12, 2);
insert into accounts (nickname, balance, user_id) values ('savings', 58.46, 2);
insert into accounts (nickname, balance, user_id) values ('mastercard', -326.44, 2);

insert into bills (nickname, amount_due, due_date, user_id) values ('netflix', 14.00, '2020-12-25', 2);
insert into bills (nickname, amount_due, due_date, user_id) values ('spotify', 5.00, '2020-12-13', 2);
insert into bills (nickname, amount_due, due_date, user_id) values ('mortgage', 2401.00, '2020-12-01', 2);

insert into plans (nickname, goal_amount, goal_date, user_id) values ('save 10k', 10000, '2021-06-30', 2);
insert into plans (nickname, goal_amount, goal_date, user_id) values ('retirement', 400000, '2030-01-01', 2);
insert into plans (nickname, goal_amount, goal_date, user_id) values ('pay off car', -6800, '2022-05-15', 2);




select nickname, balance from accounts where user_id = 1;

select nickname, amount_due, due_date from bills where user_id = 1;

select nickname, goal_amount, goal_date from plans where user_id = 1;
