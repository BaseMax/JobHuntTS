# JobHunt - Open Source Job Board Platform in TypeScript

JobHunt is an open-source job board platform that enables employers to post job listings and job seekers to search and apply for jobs. The platform is built using Express.js and GraphQL, making it efficient and flexible for managing job-related interactions. This repository contains the source code for JobHunt, and we welcome contributions from the community to enhance its features and capabilities.

## Features

- **Employer Dashboard:** Employers can easily create accounts, log in, and post job listings.
- **Job Seeker Profile:** Job seekers can create profiles, search for jobs, and apply using their profiles.
- **Job Listings:** Display job with detailed descriptions, requirements, and application instructions.
- **Application Tracking:** Employers can track and manage job applications through the dashboard.
- **GraphQL API:** Utilize a powerful GraphQL API for seamless job listing retrieval and user interactions.
- **Open Source:** JobHunt is open source, allowing you to customize and contribute to its development.
- **Refresh Token:** JobHunt is featured by refresh token to enhance user experience.

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
tsc

npm run dev
```

Open your browser and visit `http://localhost:4000` to access JobHunt.

## GraphQL

| Type         | Name                      | Description                                     | Example                                                                   |
| ------------ | ------------------------- | ----------------------------------------------- | ------------------------------------------------------------------------- |
| **Mutation** | `createJob`               | Create a new job .                              | ![create job](./screenshots/createJob.png)                                |
| **Query**    | `getJobs`                 | Get a list of all available jobs.               | ![get list of jobs ](./screenshots/getJobs.png)                           |
| **Query**    | `getJobById`              | Get details of a specific job by its ID.        | ![get job by id](./screenshots/getJobByID.png)                            |
| **Query**    | `getJobByTitle`           | Search for jobs by title.                       | ![get job by title ](./screenshots/getJobByTitle.png)                     |
| **Query**    | `getJobByCategory`        | Filter jobs by category.                        | ![get jobs by category](./screenshots/getJobsByCategory.png)              |
| **Query**    | `getFeaturedJobs`         | Get a list of featured job listings.            | ![get featured jobs](./screenshots/getFeaturedJobs.png)                   |
| **Query**    | `getUserApplications`     | Get user applications...                        | ![get user applications](./screenshots/getUserApplications.png)           |
| **Mutation** | `updateJob`               | Update details of an existing job .             | ![update job](./screenshots/updateJob.png)                                |
| **Mutation** | `deleteJob`               | delete an existing job .                        | ![delete job](./screenshots/deleteJob.png)                                |
| **Mutation** | `applyForJob`             | Apply for a job using user's profile.           | ![apply for job](./screenshots/applyToJob.png)                            |
| **Mutation** | `withdrawApplication`     | Withdraw a job application by its ID.           | ![withdraw application](./screenshots/withdrawApplication.png)            |
| **Mutation** | `acceptApplication`       | Accept a job application for a job              | ![update job status](./screenshots/acceptApplication.png)                 |
| **Mutation** | `rejectApplication`       | Reject a job application for a job.             | ![reject application](./screenshots/rejectApplication.png)                |
| **Mutation** | `signUp`                  | Create a new user profile.                      | ![sign up](./screenshots/signup.png)                                      |
| **Query**    | `getApplications`         | Get all job applications for a job listing.     | ![get applications](./screenshots/getApplications.png)                    |
| **Mutation** | `updateUserProfile`       | Update user profile                             | ![update user profile](./screenshots/updateUserProfile.png)               |
| **Mutation** | `deleteUserProfile`       | Delete a user profile by its ID.                | ![delete user profile](./screenshots/deleteUserProfile.png)               |
| **Query**    | `getUserProfiles`         | Get a list of all registered users.             | ![get user profiles](./screenshots/getUserProfiles.png)                   |
| **Query**    | `getCategories`           | Get a list of all available job categories.     | ![get categories](./screenshots/getCategories.png)                        |
| **Mutation** | `createCategory`          | Create a new job category.                      | ![create category](./screenshots/createCategory.png)                      |
| **Mutation** | `updateCategory`          | Update a job category's details.                | ![update category](./screenshots/updateCategory.png)                      |
| **Mutation** | `deleteCategory`          | Delete a job category by its ID.                | ![delete category ](./screenshots/deleteCategory.png)                     |
| **Query**    | `getSimilarJobs`          | Get a list of jobs similar to a given job.      | ![get similar jobs](./screenshots/getSimilarJobs.png)                     |
| **Query**    | `getRecentJobs`           | Get a list of recently posted job listings.     | ![get recent jobs](./screenshots/getRecentJobs.png)                       |
| **Query**    | `getJobCountByCategory`   | Get the number of jobs in a specific category.  | ![get job count by category](./screenshots/getJobCountByCategory.png)     |
| **Mutation** | `addBookmark`             | Add a job to a user's bookmarks.                | ![add book mark](./screenshots/addBookMark.png)                           |
| **Mutation** | `removeBookmark`          | Remove a job from a user's bookmarks.           | ![remove job from book marks](./screenshots/removeBookMark.png)           |
| **Query**    | `getBookmarkedJobs`       | Get a list of jobs bookmarked by a user.        | ![get booked mark jobs](./screenshots/getBookedMarkJobs.png)              |
| **Query**    | `getUserBookmarkCount`    | Get the number of bookmarks for a user.         | ![get booked mark jobs](./screenshots/getBookMarkCountOfJobs.png)         |
| **Mutation** | `createReview`            | Create a review for a specific a job.           | ![create review](./screenshots/createReview.png)                          |
| **Mutation** | `updateReview`            | Update a review's content or rating.            | ![update review](./screenshots/updateReview.png)                          |
| **Mutation** | `deleteReview`            | Delete a review by its ID.                      | ![delete review](./screenshots/deleteReview.png)                          |
| **Query**    | `getReviewsForJob`        | Get all reviews for a specific job .            | ![get reviews for job](./screenshots/getReviewsForJob.png)                |
| **Query**    | `getTopCategories`        | Get the most popular job categories.            | ![get top categories](./screenshots/getTopCategories.png)                 |
| **Query**    | `getJobsWithApplications` | Get a job and count of associated applications. | ![get count of applications](./screenshots/getJobAndApplicationCount.png) |
| **Query**    | `getOpenApplications`     | Get a list of open job applications.            | ![get open applications](./screenshots/getOpenApplications.png)           |

## GraphQL Schema

```graphql
type Job {
  id: ID!
  title: String!
  company: String!
  category: String!
  salary: Float
  description: String!
  requirements: [String]
  location: String
  featured: Boolean
  applications: [Application]
  reviews: [Review]
}

type User {
  id: ID!
  username: String!
  email: String!
  bio: String
  applications: [Application]
  bookmarks: [Job]
  reviews: [Review]
}

type Application {
  id: ID!
  user: User!
  job: Job!
  status: String!
  createdDate: String!
}

type Review {
  id: ID!
  user: User!
  job: Job!
  rating: Int!
  content: String!
}

type Category {
  id: ID!
  name: String!
  jobs: [Job]
}

type Bookmark {
  id: ID!
  user: User!
  job: Job!
}

type JobCountByCategory {
  category: String!
  count: Int!
}

type CategoryWithJobCount {
  id: ID!
  name: String!
  jobCount: Int!
}

type ApplicationWithStatus {
  id: ID!
  user: User!
  job: Job!
  status: String!
}

type JobWithApplications {
  id: ID!
  title: String!
  applicationCount: Int!
}

type ApplicationStatus {
  status: String!
  count: Int!
}

type ReviewWithAuthor {
  id: ID!
  rating: Int!
  content: String!
  helpfulCount: Int!
  unhelpfulCount: Int!
  user: User!
}

type UserWithBookmarks {
  id: ID!
  username: String!
  bookmarkCount: Int!
}

type Query {
  getJobs: [Job]
  getJobById(id: ID!): Job
  getJobByTitle(title: String!): [Job]
  getJobByCategory(category: String!): [Job]
  getFeaturedJobs: [Job]
  getUserProfile(username: String!): User
  getUserApplications(userID: ID!): [Application]
  getCategories: [Category]
  getUsers: [User]
  getApplications(jobID: ID!): [Application]
  getSimilarJobs(jobID: ID!): [Job]
  getRecentJobs: [Job]
  getJobCountByCategory(category: String!): Int
  getBookmarkedJobs(userID: ID!): [Job]
  getReviewsForJob(jobID: ID!): [Review]
  getTopCategories(limit: Int!): [CategoryWithJobCount]
  getUserBookmarkCount(userID: ID!): Int
  getJobsWithApplications: [JobWithApplications]
  getOpenApplications: [ApplicationWithStatus]
  getReviewFeedbackByID(id: ID!): ReviewFeedback
  getReviewFeedbackForReview(reviewID: ID!): [ReviewFeedback]
  getReviewByID(id: ID!): Review
  getReviewByRating(rating: Int!): [Review]
  getReviewByAuthor(userID: ID!): [Review]
  getCategoryByID(id: ID!): Category
  getCategoryByName(name: String!): Category
  getCategoriesWithJobs: [CategoryWithJobCount]
  getJobsWithCategories: [JobWithCategories]
  getUsersWithReviews: [UserWithReviews]
  getReviewsWithFeedback: [ReviewWithAuthor]
  getUsersWithApplicationsAndBookmarks: [UserWithBookmarks]
  getApplicationsWithUserAndJob: [ApplicationWithStatus]
}

type Mutation {
  createJobListing(input: CreateJobInput!): Job
  updateJobListing(id: ID!, input: UpdateJobInput!): Job
  deleteJobListing(id: ID!): Job
  applyForJob(jobID: ID!, userID: ID!): Application
  withdrawApplication(applicationID: ID!): Application
  createUserProfile(input: CreateUserInput!): User
  updateUserProfile(userID: ID!, input: UpdateUserInput!): User
  deleteUserProfile(userID: ID!): User
  acceptApplication(applicationID: ID!): Application
  rejectApplication(applicationID: ID!): Application
  createCategory(name: String!): Category
  updateCategory(id: ID!, name: String!): Category
  deleteCategory(id: ID!): Category
  addBookmark(userID: ID!, jobID: ID!): Bookmark
  removeBookmark(userID: ID!, jobID: ID!): Bookmark
  createReview(jobID: ID!, userID: ID!, rating: Int!, content: String!): Review
  updateReview(reviewID: ID!, content: String!): Review
  deleteReview(reviewID: ID!): Review
  createApplication(userID: ID!, jobID: ID!): Application
  updateApplication(
    applicationID: ID!
    input: UpdateApplicationInput!
  ): Application
  deleteApplication(applicationID: ID!): Application
  updateApplicationStatus(applicationID: ID!, status: String!): Application
  createReviewFeedback(
    reviewID: ID!
    userID: ID!
    helpful: Boolean!
  ): ReviewFeedback
  updateReviewFeedback(id: ID!, helpful: Boolean!): ReviewFeedback
  deleteReviewFeedback(id: ID!): ReviewFeedback
  createBookmark(userID: ID!, jobID: ID!): Bookmark
  deleteBookmark(id: ID!): Bookmark
}

input CreateJobInput {
  title: String!
  company: String!
  category: String!
  salary: Float
  description: String!
  requirements: [String]
  location: String
  featured: Boolean
}

input UpdateJobInput {
  title: String
  company: String
  category: String
  salary: Float
  description: String
  requirements: [String]
  location: String
  featured: Boolean
}

input CreateUserInput {
  name: String!
  email: String!
}

input UpdateUserInput {
  name: String
  email: String
}

input UpdateApplicationInput {
  status: String
}
```

## Contributing

We encourage contributions from the open-source community to make JobHunt even better. Here's how you can contribute:

- Fork the repository.
- Create a new branch for your feature or bug fix:

```bash
git checkout -b <feature-name>
```

- Make your changes and commit them with descriptive commit messages.
- Push your changes to your forked repository.
- Create a pull request (PR) to the main branch of the JobHunt repository.

## Feedback and Support

If you encounter any issues or have suggestions for improvements, please open an issue. For general inquiries and discussions, join our community Discord server.

## License

JobHunt is open-source software released under the GPL-3.0 License.

Copyright 2023, Max Base
