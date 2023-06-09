CREATE TABLE products(
	product_id int PRIMARY KEY,
	gender text,
	masterCategory text,
	subCategory text,
	articleType text,
	baseColour text,
	season text,
	year int,
	usage text,
	productDisplayName text
);

CREATE TABLE product_images(
	product_id int PRIMARY KEY,
 	product_img text
);

COPY products
FROM '{your absolute path}\products.csv'
DELIMITER ','
CSV HEADER;

COPY product_images
FROM '{your absolute path}\product_images.csv'
DELIMITER ','
CSV HEADER;