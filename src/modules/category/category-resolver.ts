import { injectable } from "tsyringe";
import { Arg, Args, Authorized, Mutation, Query, Resolver } from "type-graphql";
import { CreateCategoryInput } from "./dto/create-category-input";
import { Category } from "./entity/category-entity";
import { CategoryService } from "./category-service";
import { GraphQLError } from "graphql";
import { SearchCategoryInput } from "./dto/search-input";
import { Mongo } from "../common/mongoId-input";
import { UpdateCategoryInput } from "./dto/update-category-input";
import { CategoryAndCount } from "./entity/category-couent-entity";
@injectable()
@Resolver()
export class CategoryResolver {
  constructor(private readonly categoryService: CategoryService) {}
  @Mutation(() => Category, { nullable: true })
  @Authorized()
  async createCategory(@Arg("input") createCategoryInput: CreateCategoryInput) {
    const category = await this.categoryService.findCategory(
      createCategoryInput.name
    );

    if (category) {
      throw new GraphQLError(
        "there is already a category  with this name,please use that."
      );
    }
    return this.categoryService.createCategory(createCategoryInput);
  }

  @Query(() => Category, { nullable: true })
  async getJobsByCategory(
    @Arg("input") searchCategoryInput: SearchCategoryInput
  ) {
    return this.categoryService.getJobsByCategory(searchCategoryInput.name);
  }

  @Query(() => [Category], { nullable: true })
  async getCategories() {
    return this.categoryService.getCategories();
  }

  @Mutation(() => Category, { nullable: true })
  @Authorized()
  async updateCategory(@Arg("input") updateCategoryInput: UpdateCategoryInput) {
    const category = await this.categoryService.findCategory(
      updateCategoryInput.name
    );

    if (category)
      throw new GraphQLError(
        "there is already a category with this name exists."
      );
    return this.categoryService.updateCategory(updateCategoryInput);
  }
  @Query(() => CategoryAndCount, { nullable: true })
  async getJobCountByCategory(
    @Arg("input") searchCategoryInput: SearchCategoryInput
  ) {
    const category = await this.categoryService.findCategory(
      searchCategoryInput.name
    );
    if (!category)
      throw new GraphQLError("category with this name doesn't exists.");

    const count = await this.categoryService.getJobCountByCategory(
      searchCategoryInput.name
    );
    return {
      name: category.name,
      id: category._id,
      countOfJobs: count,
      createdAt: category.createdAt,
    };
  }

  @Mutation(() => Category, { nullable: true })
  async deleteCategory(@Arg("input") mongo: Mongo) {
    const category = await this.categoryService.findByIdOrThrow(mongo.id);
    return this.categoryService.deleteCategory(mongo.id);
  }
}
