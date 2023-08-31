import { injectable } from "tsyringe";
import { CreateCategoryInput } from "./dto/create-category-input";
import { CategoryDocument } from "./entity/category-document";
import { CategoryModel } from "./entity/category-model";
import { GraphQLError } from "graphql";
import { JobDocument } from "../job/entity/job-document";

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
}
