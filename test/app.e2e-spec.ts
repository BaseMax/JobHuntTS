import mongoose from "mongoose";
import { JobModel } from "../src/modules/job/entity/job-model";
import { UserModel } from "../src/modules/user/entity/user-model";
import { createServer } from "../src/server";
import { ApolloServer } from "@apollo/server";
import { ContextType } from "../src/context";
import * as argon2 from "argon2";
import request from "supertest";
import { CategoryModel } from "../src/modules/category/entity/category-model";
describe("App e2e test", () => {
  let apolloServer: any;
  let url: string;
  async function login() {
    const response = await request(url)
      .post("/graphql")
      .send({
        query: `mutation Login($input: LoginInput!) {
        login(input: $input) {
          name
          accessToken
          refreshToken
        }
      }    `,
        variables: {
          input: {
            email: "test@gamil.com",
            password: "test",
          },
        },
      });

    return response.body.data.login.accessToken;
  }

  async function getCategoryId(token: string) {
    const response = await request(url)
      .post("/graphql")
      .set("authorization", token)
      .send({
        query: `mutation CreateCategory($input: CreateCategoryInput!) {
        createCategory(input: $input) {
          id
          name
          createdAt
        }
      }`,
        variables: {
          input: {
            name: "Art",
          },
        },
      });

    return response.body.data.createCategory.id;
  }
  beforeAll(async () => {
    await apolloServer?.close();
    const server = await createServer();
    apolloServer = server;
    url = server.url;
    await UserModel.deleteMany({});
    await JobModel.deleteMany({});
    await CategoryModel.deleteMany({});
    await JobModel.deleteMany();
    await UserModel.create({
      email: "test@gamil.com",
      name: "jack",
      password: await argon2.hash("test"),
    });
  });

  describe("auth", () => {
    it("should sign up", async () => {
      const response = await request(url)
        .post("/graphql")
        .send({
          query: `mutation Signup($input: SignupInput!) {
            signup(input: $input) {
              accessToken
              refreshToken
              name
            }
          }`,
          variables: {
            input: {
              name: "john",
              email: "test1@gmail.com",
              password: "teat teat",
            },
          },
        });

      const data = response.body.data.signup;

      expect(data.name).toBe("john");
      expect(response.status).toBe(200);
    });

    it("should login ", async () => {
      const response = await request(url)
        .post("/graphql")
        .send({
          query: `mutation Login($input: LoginInput!) {
            login(input: $input) {
              name
              accessToken
              refreshToken
            }
          }    `,
          variables: {
            input: {
              email: "test@gamil.com",
              password: "test",
            },
          },
        });

      const data = response.body.data.login;

      expect(data.name).toBe("jack");
      expect(response.status).toBe(200);
    });
  });

  describe(" category", () => {
    it("should create category", async () => {
      const token = await login();
      const response = await request(url)
        .post("/graphql")
        .set("authorization", token)
        .send({
          query: `mutation CreateCategory($input: CreateCategoryInput!) {
            createCategory(input: $input) {
              id
              name
              createdAt
            }
          }`,
          variables: {
            input: {
              name: "IT",
            },
          },
        });

      const data = response.body.data.createCategory;

      expect(data.name).toBe("IT");
      expect(response.status).toBe(200);
    });
  });
  describe("job", () => {
    it("should create a job", async () => {
      const token = await login();
      const categoryId = await getCategoryId(token);
      const response = await request(url)
        .post("/graphql")
        .set("authorization", token)
        .send({
          query: `mutation CreateJob($input: CreateJobInput!) {
          createJob(input: $input) {
            id
            title
            company
            categoryId
            salary
            description
            requirements
            location
            featured
            createdAt
          }
        }`,
          variables: {
            input: {
              title: "Developer",
              salary: "1223",
              requirements: ["git"],
              featured: true,
              location: "tehran",
              categoryId: categoryId.toString(),
              company: "novin",
              description: "an expert developer",
            },
          },
        });

      console.log(response.body.errors);

      const data = response.body.data.createJob;

      console.log(response.body.date);

      expect(data.title).toBe("Developer");
      expect(response.status).toBe(200);
    });
  });

  afterAll(async () => {
    await apolloServer?.close();

    await mongoose.connection.close();
    // await process.exit();
  });
});
