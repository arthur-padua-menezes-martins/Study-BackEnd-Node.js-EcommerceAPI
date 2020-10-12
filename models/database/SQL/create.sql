DROP TABLE IF EXISTS variations;
DROP TABLE IF EXISTS comments;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS administrators;

CREATE TABLE products
(
    id int PRIMARY KEY AUTO_INCREMENT,
    reference varchar(8) NOT NULL,
    product varchar(30) NOT NULL,
    category varchar(30) NOT NULL,
    stars char(1),
    description text,
    techinical_information text,
    link text AS ( CONCAT("localhost:9999/",products.product,"/",products.category,"/",products.reference) ),
    createdAt datetime DEFAULT NOW(),
    updatedAt datetime DEFAULT NOW() ON UPDATE NOW(),
    UNIQUE(reference)
);


CREATE TABLE users 
( 
    id int PRIMARY KEY AUTO_INCREMENT,
    name varchar(60) NOT NULL, 
    email varchar(45) NOT NULL, 
    password varchar(1024) NOT NULL, 
    salt varchar(1024) NOT NULL, 
    recovery varchar(14),
    hierarchy int DEFAULT 0,
    createdAt datetime DEFAULT NOW(),
    updatedAt datetime DEFAULT NOW() ON UPDATE NOW(),
    UNIQUE(email)  
);


CREATE TABLE comments
(
    id int PRIMARY KEY AUTO_INCREMENT,
    stars int(1),
    comment text,
    userId int,
    productId int,
    createdAt datetime DEFAULT NOW(),
    updatedAt datetime DEFAULT NOW() ON UPDATE NOW(),
    FOREIGN KEY (userId) REFERENCES users(id),
    FOREIGN KEY (productId) REFERENCES products(id)
);


CREATE TABLE variations
(
    id int PRIMARY KEY AUTO_INCREMENT,
    identification int, 
    name varchar(100),
    specification varchar(20),
    value double(5,3),
    standardValue double(5,3) AS ( variations.value * 1.3 ),
    numberOfInstallments int(3),
    installmentsValue double(5,3),
    discountTicket varchar(100),
    images text,
    width double(5,3),
    height double(5,3),
    length double(5,3),
    weight double(5,3),
    amount int(4) DEFAULT 1,
    delivery text,
    productId int NOT NULL,
    createdAt datetime DEFAULT NOW(),
    updatedAt datetime DEFAULT NOW() ON UPDATE NOW(),
    UNIQUE(identification),
    FOREIGN KEY (productId) REFERENCES products(id)
);


CREATE TABLE administrators
(
    id int PRIMARY KEY AUTO_INCREMENT,
    name varchar(60) NOT NULL, 
    email varchar(45) NOT NULL, 
    password varchar(1024) NOT NULL, 
    salt varchar(1024) NOT NULL, 
    avatar varchar(512),
    hierarchy int DEFAULT 1,
    createdAt datetime DEFAULT NOW(),
    updatedAt datetime DEFAULT NOW() ON UPDATE NOW(),
    UNIQUE(email)
);