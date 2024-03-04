CREATE DATABASE CreativesZa;


CREATE TABLE shops(

);


-- Create the 'shops' table
CREATE TABLE shops (
    shop_id SERIAL PRIMARY KEY,
    shop_name VARCHAR(255),
    shop_description TEXT,
    owner_name VARCHAR(255),
    owner_email VARCHAR(255),
    shop_image VARCHAR(255);
);

-- Create the 'products' table
CREATE TABLE products (
    product_id SERIAL PRIMARY KEY,
    shop_id INT REFERENCES shops(shop_id),
    product_name VARCHAR(255),
    description TEXT,
    price DECIMAL(10, 2)
);

-- Create the 'users' table
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE,
    email VARCHAR(255) UNIQUE,
    userpassword TEXT
);

-- Create the 'carts' table
CREATE TABLE carts (
    cart_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id),
    -- Add other cart-related fields here
);

-- Create the 'cart_items' table
CREATE TABLE cart_items (
    cart_item_id SERIAL PRIMARY KEY,
    cart_id INT REFERENCES carts(cart_id),
    product_id INT REFERENCES products(product_id),
    quantity INT,
    -- Add other cart item-related fields here
);

-- Create any other tables you may need for your application
