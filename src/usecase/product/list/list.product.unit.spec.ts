import Product from "../../../domain/product/entity/product";
import ProductFactory from "../../../domain/product/factory/product.factory";
import ListProductUseCase from "./list.product.usecase";

const product1 = ProductFactory.create("a", "product 1", 10)
const product2 = ProductFactory.create("a", "product 2", 20)

const MockRepository = () => {
  return {
    create: jest.fn(),
    find: jest.fn(),
    findAll: jest.fn().mockResolvedValue(Promise.resolve([product1, product2])),
    update: jest.fn(),
  };
};

describe("Unit Test list product", () => {
  it("should list all products", async () => {
    const productRepository = MockRepository();
    const usecase = new ListProductUseCase(productRepository);

    const input = {};

    const result = await usecase.execute(input);

    expect(result.products.length).toBe(2);
    expect(result.products[0].id).toBe(product1.id);
    expect(result.products[0].name).toBe(product1.name);
    expect(result.products[0].price).toBe(product1.price);
    expect(result.products[1].id).toBe(product2.id);
    expect(result.products[1].name).toBe(product2.name);
    expect(result.products[1].price).toBe(product2.price);
  });
});