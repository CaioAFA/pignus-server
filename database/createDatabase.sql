-- MySQL Script generated by MySQL Workbench
-- qui 26 mar 2020 12:41:20 -03
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema security_system
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema security_system
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `security_system` ;
USE `security_system` ;

-- -----------------------------------------------------
-- Table `security_system`.`user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `security_system`.`user` ;

CREATE TABLE IF NOT EXISTS `security_system`.`user` (
  `iduser` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(30) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`iduser`),
  UNIQUE INDEX `login_UNIQUE` (`username` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `security_system`.`incident`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `security_system`.`incident` ;

CREATE TABLE IF NOT EXISTS `security_system`.`incident` (
  `idincident` INT NOT NULL AUTO_INCREMENT,
  `timestamp` DATETIME NOT NULL,
  `chance` FLOAT NOT NULL,
  `photo_path` VARCHAR(45) NOT NULL,
  `original_photo_path` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idincident`))
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
