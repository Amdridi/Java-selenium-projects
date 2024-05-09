
-- CREATE DATABASE db_stock_dridi;

CREATE TABLE  supplier ( 
    suppId INT   AUTO_INCREMENT , 
    SuppName VARCHAR(128) NOT NULL,
    PRIMARY KEY (suppId)
       
 ) ;


CREATE TABLE product(
    prId INT NOT NULL , 
    code INT NOT NULL , 
    typep  VARCHAR(128) NOT NULL , 
    brand VARCHAR(128) NOT NULL, 
    ref INT,
    PRIMARY KEY (prId) ,
    FOREIGN KEY (ref) REFERENCES supplier(suppId)
    ) ;
    

CREATE TABLE client(
    
    clId INT NOT NULL , 
    clName VARCHAR(128) NOT NULL , 
    clphone  VARCHAR(128) NOT NULL ,
    clsubscritpion  VARCHAR(128) NOT NULL  check (clsubscritpion in ('premium','vip','classique')), 
    interest VARCHAR(128) NOT NULL check ( interest  in ('sport','vip','classique' )) 

);

INSERT INTO supplier (SuppName)
VALUES
	('MG'),
    ('MONOPRIX'),
    ('CARREFOUR'),
    ('AZIZA'),
    ('GEANT');

INSERT INTO client (clName ,clphone  ,clsubscritpion,interest )
VALUES 
        ('ameni','9995696', 'premium', 'sport'),
        ('allem','9995697', 'premium', 'sport'),
        ('rim','9995698', 'premium', 'sport'),
        ('zied','9995698', 'premium', 'sport'),
        ('khaoula','99956228', 'vip', 'classique'),
        ('anis','9995698', 'vip', 'classique'),
        ('oussema','9995698', 'vip', 'sport'),
        ('mouna','9995698', 'premium', 'sport'),
        ('omaima','9993698', 'classique', 'sport'),
        ('imen','9995698', 'premium', 'sport');




INSERT INTO product  (prId,code ,typep  ,brand,ref)
VALUES 
        (111,122,'shoes', 'NIKE', 1),
        (114,123,'shoes', 'NIKE', 1),  
        (112,124,'basket', 'ADIDAS', 2),    
        (113,125,'skirt', 'ADIDAS', 2);     

SELECT *
FROM product,supplier;



SELECT *, supplier.SuppName 
FROM product
 INNER JOIN supplier ON supplier.suppId=product.ref 
 WHERE supplier.SuppName='MG';




-- ///////////////////////////////////////////////////--

----------------ACTIVITE 2----------------------------



INSERT INTO product  (prId,code ,typep  ,brand,ref)
VALUES 
        (112,122,'sneakers', 'GUESS', 3),
        (115,123,'boots', 'GUESS', 3),
         (117,123,'heels', 'MK', 3),
        (116,123,'sweater', 'MK', 4);
     
INSERT INTO client (clName ,clphone  ,clsubscritpion,interest )
VALUES 
        ('samia','9995696', 'premium', 'sport'),
        ('souha','9995697', 'vip', 'sport'),
        ('rim','9995698', 'premium', 'sport');


SELECT product.typep
FROM product

SELECT COUNT(product.prId) AS nbr_product ,product.typep
FROM product
GROUP BY product.typep;


SELECT *
FROM client
WHERE client.clName LIKE 'S%';


ALTER TABLE product
ADD price INT NOT NULL;


UPDATE product
SET price=200;


SELECT prId,product.price,product.typep, supplier.SuppName
FROM product
INNER JOIN supplier ON supplier.suppId=product.ref;


SELECT COUNT(prId) AS num_product, supplier.SuppName
FROM product
INNER JOIN supplier ON supplier.suppId=product.ref
GROUP BY supplier.SuppName;


-- ///////////////////////////////////////////////////--

----------------ACTIVITE 3----------------------------
