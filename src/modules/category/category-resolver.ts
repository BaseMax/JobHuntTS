import { injectable } from "tsyringe";
import { Arg, Args, Authorized, Mutation, Query, Resolver } from "type-graphql";
import { CreateCategoryInput } from "./dto/create-category-input";
import { Category } from "./entity/category-entity";
import { CategoryService } from "./category-service";
import { GraphQLError } from "graphql";
import { SearchCategoryInput } from "./dto/search-input";

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
}
