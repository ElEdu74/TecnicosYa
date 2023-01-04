-- ----------------------------------------------------------------------------
-- MySQL Workbench Migration
-- Migrated Schemata: tecnicos_ya
-- Source Schemata: tecnicos_ya
-- Created: Sun Jan  1 21:29:28 2023
-- Workbench Version: 8.0.29
-- ----------------------------------------------------------------------------

SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------------------------------------------------------
-- Schema tecnicos_ya
-- ----------------------------------------------------------------------------
DROP SCHEMA IF EXISTS `tecnicos_ya` ;
CREATE SCHEMA IF NOT EXISTS `tecnicos_ya` ;

-- ----------------------------------------------------------------------------
-- Table tecnicos_ya.address
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `tecnicos_ya`.`address` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `address` VARCHAR(255) NOT NULL,
  `neighborhood` VARCHAR(180) NOT NULL,
  `lat` DOUBLE NOT NULL,
  `lng` DOUBLE NOT NULL,
  `created_at` TIMESTAMP NOT NULL,
  `updated_at` TIMESTAMP NOT NULL,
  `id_user` BIGINT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `id_user` (`id_user` ASC) VISIBLE,
  CONSTRAINT `address_ibfk_1`
    FOREIGN KEY (`id_user`)
    REFERENCES `tecnicos_ya`.`users` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 6
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

-- ----------------------------------------------------------------------------
-- Table tecnicos_ya.categories
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `tecnicos_ya`.`categories` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(180) NOT NULL,
  `description` TEXT NOT NULL,
  `created_at` TIMESTAMP NOT NULL,
  `updated_at` TIMESTAMP NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 6
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

-- ----------------------------------------------------------------------------
-- Table tecnicos_ya.order_has_products
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `tecnicos_ya`.`order_has_products` (
  `id_order` BIGINT NOT NULL,
  `id_product` BIGINT NOT NULL,
  `quantity` BIGINT NOT NULL,
  `created_at` TIMESTAMP NOT NULL,
  `updated_at` TIMESTAMP NOT NULL,
  PRIMARY KEY (`id_order`, `id_product`),
  INDEX `id_product` (`id_product` ASC) VISIBLE,
  CONSTRAINT `order_has_products_ibfk_1`
    FOREIGN KEY (`id_order`)
    REFERENCES `tecnicos_ya`.`orders` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `order_has_products_ibfk_2`
    FOREIGN KEY (`id_product`)
    REFERENCES `tecnicos_ya`.`products` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

-- ----------------------------------------------------------------------------
-- Table tecnicos_ya.orders
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `tecnicos_ya`.`orders` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `id_client` BIGINT NOT NULL,
  `id_technical` BIGINT NULL DEFAULT NULL,
  `id_address` BIGINT NOT NULL,
  `lat` DOUBLE NULL DEFAULT NULL,
  `lng` DOUBLE NULL DEFAULT NULL,
  `status` VARCHAR(90) NOT NULL,
  `timestamp` BIGINT NOT NULL,
  `created_at` TIMESTAMP NOT NULL,
  `updated_at` TIMESTAMP NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `id_client` (`id_client` ASC) VISIBLE,
  INDEX `id_technical` (`id_technical` ASC) VISIBLE,
  INDEX `id_address` (`id_address` ASC) VISIBLE,
  CONSTRAINT `orders_ibfk_1`
    FOREIGN KEY (`id_client`)
    REFERENCES `tecnicos_ya`.`users` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `orders_ibfk_2`
    FOREIGN KEY (`id_technical`)
    REFERENCES `tecnicos_ya`.`users` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `orders_ibfk_3`
    FOREIGN KEY (`id_address`)
    REFERENCES `tecnicos_ya`.`address` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 5
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

-- ----------------------------------------------------------------------------
-- Table tecnicos_ya.products
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `tecnicos_ya`.`products` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(180) NOT NULL,
  `description` TEXT NOT NULL,
  `price` DOUBLE NULL DEFAULT NULL,
  `image1` VARCHAR(255) NULL DEFAULT NULL,
  `image2` VARCHAR(255) NULL DEFAULT NULL,
  `image3` VARCHAR(255) NULL DEFAULT NULL,
  `id_category` BIGINT NOT NULL,
  `created_at` TIMESTAMP NOT NULL,
  `updated_at` TIMESTAMP NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `id_category` (`id_category` ASC) VISIBLE,
  CONSTRAINT `products_ibfk_1`
    FOREIGN KEY (`id_category`)
    REFERENCES `tecnicos_ya`.`categories` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 6
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

-- ----------------------------------------------------------------------------
-- Table tecnicos_ya.roles
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `tecnicos_ya`.`roles` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(90) NOT NULL,
  `image` VARCHAR(255) NULL DEFAULT NULL,
  `route` VARCHAR(180) NOT NULL,
  `created_at` TIMESTAMP NOT NULL,
  `updated_at` TIMESTAMP NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `name` (`name` ASC) VISIBLE)
ENGINE = InnoDB
AUTO_INCREMENT = 4
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

-- ----------------------------------------------------------------------------
-- Table tecnicos_ya.user_has_roles
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `tecnicos_ya`.`user_has_roles` (
  `id_user` BIGINT NOT NULL,
  `id_rol` BIGINT NOT NULL,
  `created_at` TIMESTAMP NOT NULL,
  `updated_at` TIMESTAMP NOT NULL,
  PRIMARY KEY (`id_user`, `id_rol`),
  INDEX `id_rol` (`id_rol` ASC) VISIBLE,
  CONSTRAINT `user_has_roles_ibfk_1`
    FOREIGN KEY (`id_user`)
    REFERENCES `tecnicos_ya`.`users` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `user_has_roles_ibfk_2`
    FOREIGN KEY (`id_rol`)
    REFERENCES `tecnicos_ya`.`roles` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

-- ----------------------------------------------------------------------------
-- Table tecnicos_ya.users
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `tecnicos_ya`.`users` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(180) NOT NULL,
  `name` VARCHAR(90) NOT NULL,
  `lastname` VARCHAR(90) NOT NULL,
  `phone` VARCHAR(90) NOT NULL,
  `image` VARCHAR(255) NULL DEFAULT NULL,
  `password` VARCHAR(90) NOT NULL,
  `created_at` TIMESTAMP NOT NULL,
  `updated_at` TIMESTAMP NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `email` (`email` ASC) VISIBLE)
ENGINE = InnoDB
AUTO_INCREMENT = 18
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;
SET FOREIGN_KEY_CHECKS = 1;
