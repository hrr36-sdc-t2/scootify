CREATE DATABASE IF NOT EXISTS hrr;

USE hrr;

DROP TABLE IF EXISTS `tracks`;
DROP TABLE IF EXISTS `playlist`;
DROP TABLE IF EXISTS `current_playlist`;

CREATE TABLE `playlist` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `track_id` INTEGER NOT NULL,
  `track_title` VARCHAR(254),
  `artist_name` VARCHAR(254),
  `album_title` VARCHAR(254),
  `track_duration` INTEGER,
  `favorite` TINYINT(1) DEFAULT 0,
  `album_image_file` VARCHAR(254),
  `track_file_url` VARCHAR(254),
  PRIMARY KEY (`id`)
);

CREATE TABLE `current_playlist` (
  `_id` INT NOT NULL AUTO_INCREMENT, 
  `owner` VARCHAR(54), 
  `name` VARCHAR(54), 
  `image_url` TEXT, 
  `songs` VARCHAR(1024), 
  CHECK (JSON_VALID(`songs`)), 
  PRIMARY KEY (`_id`)
);

CREATE TABLE `tracks` (
  `_id` INTEGER NOT NULL AUTO_INCREMENT,
  `track_id` VARCHAR(254) NOT NULL,
  `title` VARCHAR(254) NOT NULL,
  `artist` VARCHAR(254),
  `album` VARCHAR(254),
  PRIMARY KEY (`_id`)
);


