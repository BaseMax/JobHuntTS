# JobHunt - Open Source Job Board Platform

JobHunt is an open-source job board platform that enables employers to post job listings and job seekers to search and apply for jobs. The platform is built using Express.js and GraphQL, making it efficient and flexible for managing job-related interactions. This repository contains the source code for JobHunt, and we welcome contributions from the community to enhance its features and capabilities.

## Features

- **Employer Dashboard:** Employers can easily create accounts, log in, and post job listings.
- **Job Seeker Profile:** Job seekers can create profiles, search for jobs, and apply using their profiles.
- **Job Listings:** Display job listings with detailed descriptions, requirements, and application instructions.
- **Application Tracking:** Employers can track and manage job applications through the dashboard.
- **GraphQL API:** Utilize a powerful GraphQL API for seamless job listing retrieval and user interactions.
- **Responsive Design:** A responsive and user-friendly interface accessible on various devices.
- **Open Source:** JobHunt is open source, allowing you to customize and contribute to its development.

## Installation

Follow these steps to set up and run JobHunt locally on your machine:

Clone the repository:

```bash
git clone https://github.com/BaseMax/JobHuntTS.git
```

Navigate to the project directory:

```bash
cd JobHuntTS
```

Install dependencies:

```bash
npm install
```

Configure environment variables:

Rename `.env.example` to `.env` and fill in your environment variables.

Run the development server:

```bash
npm run dev
```

Open your browser and visit `http://localhost:3000` to access JobHunt.

## GraphQL

| Type      | Name                   | Description                                  | Example                                      |
|-----------|------------------------|----------------------------------------------|----------------------------------------------|
| **Query** | `getJobs`              | Get a list of all available job listings.    | `getJobs { id, title, company }`             |
| **Query** | `getJobById`           | Get details of a specific job by its ID.     | `getJobById(id: "jobID") { title, salary }` |
| **Query** | `getJobByTitle`        | Search for jobs by title.                    | `getJobByTitle(title: "Software Engineer")` |
| **Query** | `getJobByCategory`     | Filter jobs by category.                     | `getJobByCategory(category: "Engineering")` |
| **Query** | `getFeaturedJobs`      | Get a list of featured job listings.         | `getFeaturedJobs { title, company }`        |
| **Query** | `getUserProfile`       | Get the profile of a specific user.          | `getUserProfile(username: "john_doe")`     |
| **Query** | `getUserApplications`  | Get applications...                         | `getUserApplications(userID: "userID")`     |
| **Mutation** | `createJobListing`  | Create a new job listing.                    | `createJobListing(input: { title, ... })`   |
| **Mutation** | `updateJobListing`  | Update details of an existing job listing.   | `updateJobListing(id: "jobID", input: { title, ... })` |
| **Mutation** | `deleteJobListing`  | Delete a job listing by its ID.              | `deleteJobListing(id: "jobID")`             |
| **Mutation** | `applyForJob`        | Apply for a job listing using user's profile.| `applyForJob(jobID: "jobID", userID: "userID")` |
| **Mutation** | `withdrawApplication`| Withdraw a job application by its ID.        | `withdrawApplication(applicationID: "appID")` |
| **Mutation** | `createUserProfile`  | Create a new user profile.                   | `createUserProfile(input: { username, ... })` |
| **Mutation** | `updateUserProfile`  | Update user profile details.                 | `updateUserProfile(userID: "userID", input: { bio, ... })` |
| **Mutation** | `deleteUserProfile`  | Delete a user profile by its ID.             | `deleteUserProfile(userID: "userID")`       |
| **Mutation** | `acceptApplication`  | Accept a job application for a listing.      | `acceptApplication(applicationID: "appID")` |
| **Mutation** | `rejectApplication`  | Reject a job application for a listing.      | `rejectApplication(applicationID: "appID")` |


## Contributing

We encourage contributions from the open-source community to make JobHunt even better. Here's how you can contribute:

- Fork the repository.
- Create a new branch for your feature or bug fix:

```bash
git checkout -b feature-name
```

- Make your changes and commit them with descriptive commit messages.
- Push your changes to your forked repository.
- Create a pull request (PR) to the main branch of the JobHunt repository.

## Feedback and Support

If you encounter any issues or have suggestions for improvements, please open an issue. For general inquiries and discussions, join our community Discord server.

## License

JobHunt is open-source software released under the GPL-3.0 License.

Copyright 2023, Max Base
