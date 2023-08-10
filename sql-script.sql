-- NOTE THAT YOU MAY NEED TO REMOVE THE FOREIGN KEY CONSTRAINT TO USE THESE CREATE STATEMENTS IN PLANETSCALE AS THE FREE 
-- VERSION DOES NOT SUPPORT FOREIGN KEYS
CREATE TABLE `posts` (
  `post_id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(50) NOT NULL,
  `body` text NOT NULL,
  `created_at` date NOT NULL,
  `uploader` varchar(15) NOT NULL,
  PRIMARY KEY (`post_id`),
  KEY `uploader` (`uploader`),
  CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`uploader`) REFERENCES `users` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `users` (
  `password` varchar(255) DEFAULT NULL,
  `username` varchar(255) NOT NULL,
  PRIMARY KEY (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;