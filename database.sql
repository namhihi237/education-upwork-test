CREATE TABLE IF NOT EXISTS `Quizzes` (
  `id` INTEGER auto_increment,
  `title` TEXT,
  `description` TEXT,
  `isCompleted` TINYINT(1) DEFAULT false,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `Questions` (
  `id` INTEGER auto_increment,
  `content` TEXT,
  `isMandatory` TINYINT(1) DEFAULT false,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  `QuizId` INTEGER,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`QuizId`) REFERENCES `Quizzes` (`id`) ON DELETE
  SET
    NULL ON UPDATE CASCADE
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `Answers` (
  `id` INTEGER auto_increment,
  `content` TEXT,
  `isRight` TINYINT(1) DEFAULT false,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  `QuestionId` INTEGER,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`QuestionId`) REFERENCES `Questions` (`id`) ON DELETE
  SET
    NULL ON UPDATE CASCADE
) ENGINE = InnoDB;