CREATE DATABASE hiring_website;
USE hiring_website;

show tables;

CREATE TABLE Account (
    person_id VARCHAR(255),
    username VARCHAR(255),
    password VARCHAR(255),
    PRIMARY KEY (person_id)
);

CREATE TABLE Admin (
    admin_id VARCHAR(255),
    PRIMARY KEY (admin_id)
);

CREATE TABLE Profile (
    profile_id VARCHAR(255),
    exp TEXT,
    bio TEXT,
    skills VARCHAR(1000),
    street VARCHAR(255),
    city VARCHAR(255),
    pincode CHAR(6),
    DOB DATE,
    PRIMARY KEY (profile_id)
);

CREATE TABLE Person (
    person_id VARCHAR(255),
    firstname VARCHAR(255),
    lastname VARCHAR(255),
    profile_id VARCHAR(255),
    admin_id VARCHAR(255),
    PRIMARY KEY (person_id),
    FOREIGN KEY (profile_id) REFERENCES Profile(profile_id),
    FOREIGN KEY (admin_id) REFERENCES Admin(admin_id)
);

CREATE TABLE Jobseeker (
    jobseeker_id VARCHAR(255),
    person_id VARCHAR(255),
    results_id VARCHAR(255),
    PRIMARY KEY (jobseeker_id),
    FOREIGN KEY (person_id) REFERENCES Person(person_id)
    -- FOREIGN KEY (results_id) REFERENCES Results(results_id)
);

CREATE TABLE Employer (
    employer_id VARCHAR(255),
    company_name VARCHAR(255),
    PRIMARY KEY (employer_id)
);

CREATE TABLE Job (
    job_id VARCHAR(255),
    title VARCHAR(255),
    description TEXT,
    location VARCHAR(255),
    PRIMARY KEY (job_id)
);

CREATE TABLE jobseeker_search_job (
    job_id VARCHAR(255),
    jobseeker_id VARCHAR(255),
    PRIMARY KEY (job_id, jobseeker_id),
    FOREIGN KEY (job_id) REFERENCES Job(job_id),
    FOREIGN KEY (jobseeker_id) REFERENCES Jobseeker(jobseeker_id)
);

CREATE TABLE Resume (
    resume_id VARCHAR(255),
    jobseeker_id VARCHAR(255),
    filename BLOB,
    submission_date DATE,
    PRIMARY KEY (resume_id),
    FOREIGN KEY (jobseeker_id) REFERENCES Jobseeker(jobseeker_id)
);

CREATE TABLE employer_search_jobseeker (
    resume_id VARCHAR(255),
    employer_id VARCHAR(255),
    PRIMARY KEY (resume_id, employer_id),
    FOREIGN KEY (resume_id) REFERENCES Resume(resume_id),
    FOREIGN KEY (employer_id) REFERENCES Employer(employer_id)
);

CREATE TABLE Results (
    results_id VARCHAR(255),
    employer_id VARCHAR(255),
    jobseeker_id VARCHAR(255),
    PRIMARY KEY (results_id),
    FOREIGN KEY (employer_id) REFERENCES Employer(employer_id),
    FOREIGN KEY (jobseeker_id) REFERENCES Jobseeker(jobseeker_id)
);

CREATE TABLE Vacancies (
    vacancy_id VARCHAR(255),
    job_title VARCHAR(255),
    no_of_openings INT,
    admin_id VARCHAR(255),
    PRIMARY KEY (vacancy_id),
    FOREIGN KEY (admin_id) REFERENCES Admin(admin_id)
);

CREATE TABLE Phone (
    profile_id VARCHAR(255),
    ph_no INT,
    PRIMARY KEY (profile_id),
    FOREIGN KEY (profile_id) REFERENCES Profile(profile_id)
);