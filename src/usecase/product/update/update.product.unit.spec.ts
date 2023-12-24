import ProductFactory from "../../../domain/product/factory/product.factory";
import UpdateProductUseCase from "./update.product.usecase";

const product = ProductFactory.create("a", "product", 20);

const MockRepository = () => {
  return {
    create: jest.fn(),
    find: jest.fn().mockResolvedValue(Promise.resolve(product)),
    findAll: jest.fn(),
    update: jest.fn(),
  }
}

describe("Unit Test create product", () => {
  it("should update a product", async () => {
    const productRepository = MockRepository();
    const usecase = new UpdateProductUseCase(productRepository);

    const input = {
      id: "1",
      name: "product",
      price: 20,
    }

    const output = await usecase.execute(input);

    expect(output).toEqual(input);
  });

  it("should not find a product", async () => {
    const productRepository = MockRepository();
    productRepository.find.mockImplementation(() => {
      throw new Error("Product not found");
    });

    const usecase = new UpdateProductUseCase(productRepository)

    const input = {
      id: "1",
      name: "product",
      price: 20,
    }

    expect(() => {
      return usecase.execute(input);
    }).rejects.toThrow("Product not found");
  });
});