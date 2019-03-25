CREATE DATABASE IF NOT EXISTS hrr;

USE hrr;

DROP TABLE IF EXISTS `tracks`;
DROP TABLE IF EXISTS `playlist`;
DROP TABLE IF EXISTS `current_playlist`;

CREATE TABLE `tracks` (
  `_id` INTEGER NOT NULL AUTO_INCREMENT,
  `track_id` VARCHAR(255) NOT NULL UNIQUE,
  `title` VARCHAR(255) NOT NULL,
  `artist` VARCHAR(255),
  `album` VARCHAR(255),
  PRIMARY KEY (_id)
);

CREATE TABLE `playlist` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `track_id` INTEGER NOT NULL,
  `track_title` VARCHAR(256),
  `artist_name` VARCHAR(256),
  `album_title` VARCHAR(256),
  `track_duration` INTEGER,
  `favorite` TINYINT(1) DEFAULT 0,
  `album_image_file` VARCHAR(256),
  `track_file_url` VARCHAR(256),
  PRIMARY KEY (`id`)
);

CREATE TABLE `current_playlist` (
  `_id` INT NOT NULL AUTO_INCREMENT, 
  `owner` VARCHAR(54), 
  `name` VARCHAR(54), 
  `image_url` TEXT, 
  `songs` json, 
  CHECK (JSON_VALID(songs)), 
  PRIMARY KEY (_id)
);



