CREATE DATABASE advancedauthentication;

USE advancedauthentication;

-- User Table Creation
CREATE TABLE IF NOT EXISTS users (
    userId VARCHAR(255) NOT NULL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL UNIQUE,
    isVerified BOOLEAN NOT NULL DEFAULT false,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    resetPasswordToken VARCHAR(255) DEFAULT NULL,
    resetPassExpiry TIMESTAMP,
    verificationToken VARCHAR(10) DEFAULT NULL,
    verificationTokenExpiry TIMESTAMP
);