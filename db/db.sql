USE tecnicos_ya;

CREATE TABLE users(  
    id BIGINT PRIMARY KEY AUTO_INCREMENT,     
    email VARCHAR(180) NOT NULL UNIQUE,     
    name VARCHAR(90) NOT NULL,     
    lastname VARCHAR(90) NOT NULL,     
    phone VARCHAR(90) NOT NULL,     
    image VARCHAR(255) NULL,     
    password VARCHAR(90) NOT NULL,     
    created_at TIMESTAMP(0) NOT NULL,     
    updated_at TIMESTAMP(0) NOT NULL
);

CREATE TABLE roles(
	id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(90) NOT NULL UNIQUE,
    image VARCHAR(255) NULL,
    route VARCHAR(180) NOT NULL,
    created_at TIMESTAMP(0) NOT NULL,
    updated_at TIMESTAMP(0) NOT NULL
);

INSERT INTO roles(
	name,
    route,
    created_at,
    updated_at
)
VALUES(
	'EMPRESA',
    '/company/orders/list',
    '2022-08-01',
    '2022-08-01'
);

INSERT INTO roles(
	name,
    route,
    created_at,
    updated_at
)
VALUES(
	'TECNICO',
    '/technical/orders/list',
    '2022-08-01',
    '2022-08-01'
);

INSERT INTO roles(
	name,
    route,
    created_at,
    updated_at
)
VALUES(
	'CLIENTE',
    '/client/products/list',
    '2022-08-01',
    '2022-08-01'
);

CREATE TABLE user_has_roles(
	id_user BIGINT NOT NULL,
	id_rol BIGINT NOT NULL,
    created_at TIMESTAMP(0) NOT NULL,
    updated_at TIMESTAMP(0) NOT NULL,
    FOREIGN KEY(id_user) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY(id_rol) REFERENCES roles(id) ON UPDATE CASCADE ON DELETE CASCADE,
    PRIMARY KEY (id_user, id_rol)
);

CREATE TABLE categories(
	id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(180) NOT NULL,
    description TEXT NOT NULL,
    created_at TIMESTAMP(0) NOT NULL,
    updated_at TIMESTAMP(0) NOT NULL
);

CREATE TABLE products(
	id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(180) NOT NULL,
    description TEXT NOT NULL,
    price DOUBLE PRECISION NOT NULL,
    image1 VARCHAR(255) NULL,
    image2 VARCHAR(255) NULL,
    image3 VARCHAR(255) NULL,
	id_category BIGINT NOT NULL,
    created_at TIMESTAMP(0) NOT NULL,
    updated_at TIMESTAMP(0) NOT NULL,
    FOREIGN KEY(id_category) REFERENCES categories(id) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE address(  
    id BIGINT PRIMARY KEY AUTO_INCREMENT,     
    address VARCHAR(255) NOT NULL,     
    cp VARCHAR(10) NOT NULL,     
    neighborhood VARCHAR(180) NOT NULL,     
    lat DOUBLE PRECISION NOT NULL,     
    lng DOUBLE PRECISION NOT NULL,     
    created_at TIMESTAMP(0) NOT NULL,     
    updated_at TIMESTAMP(0) NOT NULL,
    id_user BIGINT NOT NULL,
    FOREIGN KEY(id_user) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE orders(  
    id BIGINT PRIMARY KEY AUTO_INCREMENT,     
    id_client BIGINT NOT NULL,
    id_technical BIGINT NULL,
    id_address BIGINT NOT NULL,
    lat DOUBLE PRECISION,     
    lng DOUBLE PRECISION, 
    status VARCHAR(90) NOT NULL,
    timestamp BIGINT NOT NULL,
    rating INT,
    obs_rating VARCHAR(500),
    created_at TIMESTAMP(0) NOT NULL,     
    updated_at TIMESTAMP(0) NOT NULL,
    FOREIGN KEY(id_client) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY(id_technical) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY(id_address) REFERENCES address(id) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE order_has_products(  
    id_order BIGINT NOT NULL,     
    id_product BIGINT NOT NULL,
    quantity BIGINT NOT NULL,
    created_at TIMESTAMP(0) NOT NULL,     
    updated_at TIMESTAMP(0) NOT NULL,
    PRIMARY KEY(id_order, id_product),
    FOREIGN KEY(id_order) REFERENCES orders(id) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY(id_product) REFERENCES products(id) ON UPDATE CASCADE ON DELETE CASCADE
);

