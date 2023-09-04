import { injectable } from "tsyringe";
import { CreateCategoryInput } from "./dto/create-category-input";
import { CategoryDocument } from "./entity/category-document";
import { CategoryModel } from "./entity/category-model";
import { GraphQLError } from "graphql";
import { JobDocument } from "../job/entity/job-document";
import { JobModel } from "../job/entity/job-model";
import { UpdateCategoryInput } from "./dto/update-category-input";
import { TopCategory } from "./entity/top-category-entity";

@injectable()
export class CategoryService {
  async createCategory(
    createCategoryInput: CreateCategoryInput
  ): Promise<CategoryDocument> {
    return CategoryModel.create({ ...createCategoryInput });
  }

  async findCategory(name: string): Promise<CategoryDocument | null> {
    return CategoryModel.findOne({
      name: name,
    });
  }

  async findByIdOrThrow(id: string): Promise<CategoryDocument | null> {
    const category = await CategoryModel.findById(id);
    if (!category) {
      throw new GraphQLError("category with provided id doesn't exist...");
    }

    return category;
  }

  async getCategories(): Promise<CategoryDocument[]> {
    return await CategoryModel.find();
  }

  async getJobsByCategory(
    categoryName: string
  ): Promise<CategoryDocument | null> {
    return CategoryModel.findOne({
      name: categoryName,
    });
  }
  async addJob(
    categoryId: string,
    job: JobDocument
  ): Promise<CategoryDocument | null> {
    return CategoryModel.findByIdAndUpdate(
      categoryId,
      {
        $push: { jobs: job },
      },
      {
        returnOriginal: false,
      }
    );
  }

  async getJobCountByCategory(name: string): Promise<number> {
    const result = await CategoryModel.aggregate([
      {
        $match: {
          name: name,
        },
      },
      {
        $project: {
          jobCounts: { $size: "$jobs" },
        },
      },
    ]);

    return result[0].jobCounts;
  }

  async updateCategory(
    updateCategoryInput: UpdateCategoryInput
  ): Promise<CategoryDocument | null> {
    return CategoryModel.findByIdAndUpdate(
      updateCategoryInput.categoryId,
      {
        $set: {
          name: updateCategoryInput.name,
        },
      },
      {
        returnOriginal: false,
      }
    );
  }

  async getTopCategories(limit: number): Promise<TopCategory[]> {
    const result = await JobModel.aggregate([
      {
        $group: {
          _id: "$categoryId",
          count: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: "categories",
          localField: "_id",
          foreignField: "_id",
          as: "categoryInfo",
        },
      },
      {
        $sort: { count: -1 },
      },
      {
        $limit: limit,
      },
      { $unwind: "$categoryInfo" },
      {
        $project: {
          name: "$categoryInfo.name",
          countOfJobs: "$count",
        },
      },
    ]);

    return result;
  }

  async deleteCategory(id: string): Promise<CategoryDocument | null> {
    const deletedJobs = await JobModel.deleteMany({
      categoryId: id,
    });

    return await CategoryModel.findByIdAndDelete(id);
  }
}
