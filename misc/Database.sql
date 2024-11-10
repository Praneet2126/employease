
MODIFY password VARCHAR(255) NOT NULL;

-- Table for Jobseeker
CREATE TABLE Jobseeker (
    jobseeker_id VARCHAR(255),
    person_id VARCHAR(255),
    results_id VARCHAR(255),
    PRIMARY KEY (jobseeker_id),
    FOREIGN KEY (person_id) REFERENCES Person(person_id)
);

-- Table for Employer
CREATE TABLE Employer (
    employer_id VARCHAR(255),
    company_name VARCHAR(255),
    PRIMARY KEY (employer_id)
);

-- Table for Job
CREATE TABLE Job (
    job_id VARCHAR(255),
    title VARCHAR(255),
    description TEXT,
    location VARCHAR(255),
    PRIMARY KEY (job_id)
);

-- Table for Jobseeker searching Job
CREATE TABLE jobseeker_search_job (
    job_id VARCHAR(255),
    jobseeker_id VARCHAR(255),
    PRIMARY KEY (job_id, jobseeker_id),
    FOREIGN KEY (job_id) REFERENCES Job(job_id),
    FOREIGN KEY (jobseeker_id) REFERENCES Jobseeker(jobseeker_id)
);

-- Table for Resume
CREATE TABLE Resume (
    resume_id VARCHAR(255),
    jobseeker_id VARCHAR(255),
    filename BLOB,
    submission_date DATE,
    PRIMARY KEY (resume_id),
    FOREIGN KEY (jobseeker_id) REFERENCES Jobseeker(jobseeker_id)
);

-- Table for Employer searching Jobseeker Resume
CREATE TABLE employer_search_jobseeker (
    resume_id VARCHAR(255),
    employer_id VARCHAR(255),
    PRIMARY KEY (resume_id, employer_id),
    FOREIGN KEY (resume_id) REFERENCES Resume(resume_id),
    FOREIGN KEY (employer_id) REFERENCES Employer(employer_id)
);

-- Table for Results
CREATE TABLE Results (
    results_id VARCHAR(255),
    employer_id VARCHAR(255),
    jobseeker_id VARCHAR(255),
    PRIMARY KEY (results_id),
    FOREIGN KEY (employer_id) REFERENCES Employer(employer_id),
    FOREIGN KEY (jobseeker_id) REFERENCES Jobseeker(jobseeker_id)
);

-- Table for Vacancies
CREATE TABLE Vacancies (
    vacancy_id VARCHAR(255),
    job_title VARCHAR(255),
    no_of_openings INT,
    admin_id VARCHAR(255),
    PRIMARY KEY (vacancy_id),
    FOREIGN KEY (admin_id) REFERENCES Admin(admin_id)
);

-- Table for Additional Information
CREATE TABLE Phone (
    profile_id VARCHAR(255),
    ph_no INT,
    PRIMARY KEY (profile_id),
    FOREIGN KEY (profile_id) REFERENCES Profile(profile_id)
);

 ALTER TABLE Employer ADD Company VARCHAR(255);

-- Describing all tables:
desc Person;
desc Profile;