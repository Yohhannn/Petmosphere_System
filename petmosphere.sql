-- Insert Tables

CREATE TABLE USER (
    USERID          INTEGER             PRIMARY KEY,
    USERNAME        VARCHAR(50)         NOT NULL UNIQUE,
    USERPHONE       VARCHAR(10)         NOT NULL,
    USERLOCATION    VARCHAR(255)        NOT NULL,
    USERPROFPIC     VARCHAR(255)        NOT NULL,
    USEREMAIL       VARCHAR(255)        NOT NULL UNIQUE,
    USERPASSWORD    VARCHAR(50)         NOT NULL,
    USERCREATEDATE  TIMESTAMP           DEFAULT CURRENT_TIMESTAMP,
    USERTYPE        VARCHAR(20)         CHECK (USERTYPE IN ('Owner', 'Adopter'))
);

CREATE TABLE ADMIN (
    ADMINID         INTEGER             PRIMARY KEY,
    ADMINUSERNAME   VARCHAR(50)         NOT NULL UNIQUE,
    ADMINPASS       VARCHAR(50)         NOT NULL
);

CREATE TABLE TYPE (
    TYPEID          INTEGER             PRIMARY KEY,
    TYPENAME        VARCHAR(50)         NOT NULL UNIQUE
);

CREATE TABLE BREED (
    BREEDID         INTEGER             PRIMARY KEY,
    BREEDNAME       VARCHAR(50)         NOT NULL UNIQUE
    TYPEID          INTEGER             NOT NULL REFERENCES TYPE(TYPEID) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE TAG (
    TAGID           INTEGER             PRIMARY KEY,
    TAGNAME         VARCHAR(50)         NOT NULL UNIQUE
);

CREATE TABLE PET (
    PETID          INTEGER             PRIMARY KEY,
    PETNAME        VARCHAR(50)         NOT NULL,
    PETLOCATION    VARCHAR(255)        NOT NULL,
    PETAGE         INTEGER             NOT NULL,
    PETDESCRIPT    TEXT                NOT NULL,
    PETSTATUS      VARCHAR(50),
    BREEDID        INTEGER             NOT NULL REFERENCES breed(BREEDID) ON DELETE CASCADE ON UPDATE CASCADE,
    TYPEID         INTEGER             NOT NULL REFERENCES type(TYPEID) ON DELETE CASCADE ON UPDATE CASCADE,
    USERID         INTEGER             NOT NULL REFERENCES user(USERID) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE PET_TAG (
    PETID         INTEGER             NOT NULL,
    TAGID         INTEGER             NOT NULL,
    PRIMARY KEY (PETID, TAGID),
    FOREIGN KEY (PETID)               REFERENCES pet(PETID) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (TAGID)               REFERENCES tag(TAGID) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE POST (
    POSTID          INTEGER             PRIMARY KEY,
    POSTDATE        TIMESTAMP           NOT NULL DEFAULT CURRENT_TIMESTAMP,
    POSTIMAGE       VARCHAR(255)        NOT NULL,
    POSTDESCRIPT    TEXT,
    PETID           INTEGER             NOT NULL REFERENCES pet(PETID) ON DELETE CASCADE ON UPDATE CASCADE,
    USERID          INTEGER             NOT NULL REFERENCES user(USERID) ON DELETE CASCADE ON UPDATE CASCADE,
    TAGID           INTEGER             NOT NULL REFERENCES tag(TAGID) ON DELETE CASCADE ON UPDATE CASCADE,
    TYPEID          INTEGER             NOT NULL REFERENCES type(TYPEID) ON DELETE CASCADE ON UPDATE CASCADE,
    BREEDID         INTEGER             NOT NULL REFERENCES breed(BREEDID) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE ADOPTIONREQ (
    REQID           SERIAL PRIMARY KEY,
    REQSTATUS       VARCHAR(20)             CHECK (REQSTATUS IN ('Pending', 'Approved', 'Rejected', 'Completed')),
    REQDATE         TIMESTAMP               DEFAULT CURRENT_TIMESTAMP,
    PETID           INTEGER                 NOT NULL,
    USERID          INTEGER                 NOT NULL,
    FOREIGN KEY     (PETID)                 REFERENCES PET (PETID),
    FOREIGN KEY     (USERID)                REFERENCES USER (USERID)
);

CREATE TABLE REQHISTORY (
    HISTORYID       SERIAL PRIMARY KEY,
    STATUSOLD       VARCHAR(20),
    STATUSNEW       VARCHAR(20),
    CHANGEDAT       TIMESTAMP               DEFAULT CURRENT_TIMESTAMP,
    CHANGEDBY       INTEGER                 NOT NULL,
    REQID           INTEGER                 NOT NULL,
    FOREIGN KEY     (CHANGEDBY)             REFERENCES USER (USERID),
    FOREIGN KEY     (REQID)                 REFERENCES ADOPTIONREQ (REQID)
);

CREATE TABLE REVIEW (
    REVID           SERIAL PRIMARY KEY,
    REVRATING       INTEGER                 CHECK (REVRATING BETWEEN 1 AND 5),
    REVDESCRIPT     TEXT,
    REVDATE         TIMESTAMP               DEFAULT CURRENT_TIMESTAMP,
    REVRATEDBY      INTEGER                 NOT NULL,
    USERID          INTEGER                 NOT NULL,
    FOREIGN KEY     (REVRATEDBY)            REFERENCES USER (USERID),
    FOREIGN KEY     (USERID)                REFERENCES USER (USERID)
);

CREATE TABLE MESSAGE (
    MSGID           SERIAL PRIMARY KEY,
    MSGCONTENT      TEXT                    NOT NULL,
    MSGTIME         TIMESTAMP               DEFAULT CURRENT_TIMESTAMP,
    SENDERID        INTEGER                 NOT NULL,
    RECEIVERID      INTEGER                 NOT NULL,
    POSTID          INTEGER,
    FOREIGN KEY     (SENDERID)              REFERENCES USER (USERID),
    FOREIGN KEY     (RECEIVERID)            REFERENCES USER (USERID),
    FOREIGN KEY     (POSTID)                REFERENCES POST (POSTID)
);


----------------------------------------------------------------------------------------------------------


-- Insert Admin
INSERT INTO ADMIN (ADMINID, ADMINUSERNAME, ADMINPASS) VALUES
(1, 'admin1', 'pass123'),

-- Insert Users (Owners and Adopters)
INSERT INTO USER (USERID, USERNAME, USERPHONE, USERLOCATION, USERPROFPIC, USEREMAIL, USERPASSWORD, USERTYPE) VALUES
(1, 'owner1', '0912345678', 'City A', 'owner1.jpg', 'owner1@email.com', 'password1', 'Owner'),
(2, 'adopter1', '0987654321', 'City B', 'adopter1.jpg', 'adopter1@email.com', 'password2', 'Adopter'),
(3, 'adopter2', '0976543210', 'City C', 'adopter2.jpg', 'adopter2@email.com', 'password3', 'Adopter');

-- Insert Pet Types
INSERT INTO TYPE (TYPEID, TYPENAME) VALUES
(1, 'Dogs'),
(2, 'Cats'),
(3, 'Birds'),
(4, 'Snakes'),
(5, 'Ducks'),
(6, 'Chicken');

-- Insert Breeds
INSERT INTO BREED (BREEDID, BREEDNAME, TYPEID) VALUES
(1, 'Golden Retriever', 1), -- Golden Retriever
(2, 'Shih Tzu', 1), -- Shih Tzu
(3, 'Persian Cat', 2), -- Persian Cat
(4, 'Siberian Cat', 2), -- Siberian Cat
(5, 'Parrot', 3), -- Parrot
(6, 'Canary', 3), -- Canary
(7, 'Python', 4), -- Python Snake
(8, 'Cobra', 4), -- Cobra Snake
(9, 'Mallard', 5), -- Mallard Duck
(10, 'Muscovy', 5), -- Muscovy Duck
(11, 'Leghorn', 6), -- Leghorn Chicken
(12, 'Silkie', 6); -- Silkie Chicken

-- Insert Tags
INSERT INTO TAG (TAGID, TAGNAME) VALUES    --- murag naka radio button tas last  option is others (so mo type ra si user)
(1, 'Friendly'),
(2, 'Playful'),
(3, 'Trained'),
(4, 'Adopted'),
(5, 'Vaccinated');

-- Insert Pets
INSERT INTO PET (PETID, PETNAME, PETLOCATION, PETAGE, PETDESCRIPT, PETSTATUS, BREEDID, TYPEID, USERID) VALUES
(1, 'Buddy', 'City A', 3, 'A very friendly golden retriever.', 'Available', 0101, 1, 1), -- Golden Retriever
(2, 'Milo', 'City B', 2, 'Energetic and loves playing fetch.', 'Available', 0102, 1, 1), -- Shih Tzu
(3, 'Whiskers', 'City C', 4, 'Fluffy Persian cat, calm and loving.', 'Adopted', 0201, 2, 2), -- Persian Cat
(4, 'Shadow', 'City A', 1, 'Siberian cat, playful and curious.', 'Available', 0202, 2, 1); -- Siberian Cat

-- Insert Post
INSERT INTO POST (POSTID, POSTDATE, POSTIMAGE, POSTDESCRIPT, PETID, USERID, TAGID, TYPEID, BREEDID) VALUES
(1, CURRENT_TIMESTAMP, '0101-goldenRetriever.jpg', 'Looking for a loving home!', 1, 1, 1, 1, 0101), -- Golden Retriever
(2, CURRENT_TIMESTAMP, '0202-siberianCat.jpg', 'Adopt this cute Siberian cat!', 4, 1, 2, 2, 0202); -- Siberian Cat
