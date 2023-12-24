import CreateProductUseCase from "./create.product.usecase";

const MockRepository = () => {
  return {
    create: jest.fn(),
    find: jest.fn(),
    findAll: jest.fn(),
    update: jest.fn(),
  }
}

describe("Unit Test create product", () => {
  it("should create a product", async () => {
    const productRepository = MockRepository();
    const usecase = new CreateProductUseCase(productRepository);

    const input = {
      type: "a",
      name: "product",
      price: 10,
    }

    const result = await usecase.execute(input);
    expect(result).toEqual({
      id: expect.any(String),
      name: input.name,
      price: input.price,
    });
  });
});