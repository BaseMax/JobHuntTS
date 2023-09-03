import { GraphQLError } from "graphql";
import { BookMarkDocument } from "./entity/bookMark-document";
import { BookMarkModel } from "./entity/bookMark-model";
import mongoose from "mongoose";
import { JobDocument } from "../job/entity/job-document";
export class BookMarkService {
  async createBookMark(
    userId: string,
    jobId: string
  ): Promise<BookMarkDocument> {
    return BookMarkModel.create({
      userId: userId,
      jobsId: jobId,
    });
  }

  async addBookMark(
    userId: string,
    jobId: string
  ): Promise<BookMarkDocument | null> {
    return BookMarkModel.findOneAndUpdate(
      {
        userId: userId,
      },
      {
        $push: { jobsId: jobId },
      },
      {
        returnOriginal: false,
      }
    );
  }

  async removeBookMark(
    userId: string,
    jobId: string
  ): Promise<BookMarkDocument | null> {
    return BookMarkModel.findOneAndUpdate(
      {
        userId: userId,
      },
      {
        $pull: { jobsId: jobId },
      },
      {
        returnOriginal: false,
      }
    );
  }

  async hasBookMark(userId: string): Promise<boolean> {
    const bookMark = await BookMarkModel.findOne({ userId: userId });

    return bookMark ? true : false;
  }

  async hasBookedMarkJob(userId: string, jobId: string): Promise<boolean> {
    const bookMark = await BookMarkModel.findOne({
      userId: userId,
      jobsId: jobId,
    });

    return bookMark ? true : false;
  }
  async verifyBookedMarkJob(
    userId: string,
    jobId: string
  ): Promise<BookMarkDocument | null> {
    const bookMarkedJob = await BookMarkModel.findOne({
      userId: userId,
      jobsId: jobId,
    });

    if (bookMarkedJob) {
      throw new GraphQLError("you have already booked mark this job");
    }
    return bookMarkedJob;
  }

  async getBookedMarkJobs(userId: string): Promise<JobDocument[]> {
    const result = await BookMarkModel.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(userId),
        },
      },
      {
        $lookup: {
          from: "jobs",
          localField: "jobsId",
          foreignField: "_id",
          as: "bookmarkedJobs",
        },
      },
    ]);
    return result[0].bookmarkedJobs;
  }
}
