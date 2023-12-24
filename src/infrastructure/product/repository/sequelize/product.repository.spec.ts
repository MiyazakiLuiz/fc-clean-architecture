import { Sequelize } from "sequelize-typescript";
import Product from "../../../../domain/product/entity/product";
import ProductModel from "./product.model";
import ProductRepository from "./product.repository";
import ProductFactory from "../../../../domain/product/factory/product.factory";

describe("Product repository test", () => {
  let sequileze: Sequelize;

  beforeEach(async () => {
    sequileze = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });
    sequileze.addModels([ProductModel]);
    await sequileze.sync();
  });

  afterEach(async () => {
    await sequileze.close();
  });

  it("should create a product", async () => {
    const productRepository = new ProductRepository();
    const product = ProductFactory.create("a", "Product 1", 100);

    await productRepository.create(product);

    const productModel = await ProductModel.findOne({ where: { id: product.id } });

    expect(productModel.toJSON()).toStrictEqual({
      id: product.id,
      name: "Product 1",
      price: 100,
    });
  });

  it("should update a product", async () => {
    const productRepository = new ProductRepository();
    const product = ProductFactory.create("a", "Product 1", 100);

    await productRepository.create(product);

    const productModel = await ProductModel.findOne({ where: { id: product.id } });

    expect(productModel.toJSON()).toStrictEqual({
      id: product.id,
      name: "Product 1",
      price: 100,
    });

    await productRepository.update({
      id: product.id,
      name: "Product 2",
      price: 200,
    });

    const productModel2 = await ProductModel.findOne({ where: { id: product.id } });

    expect(productModel2.toJSON()).toStrictEqual({
      id: product.id,
      name: "Product 2",
      price: 200,
    });
  });

  it("should find a product", async () => {
    const productRepository = new ProductRepository();
    const product = ProductFactory.create("a", "Product 1", 100);

    await productRepository.create(product);

    const productModel = await ProductModel.findOne({ where: { id: product.id } });

    const foundProduct = await productRepository.find(product.id);

    expect(productModel.toJSON()).toStrictEqual({
      id: foundProduct.id,
      name: foundProduct.name,
      price: foundProduct.price,
    });
  });

  it("should find all products", async () => {
    const productRepository = new ProductRepository();
    const product = ProductFactory.create("a", "Product 1", 100);
    await productRepository.create(product);

    const product2 = ProductFactory.create("a", "Product 2", 200);
    await productRepository.create(product2);

    const foundProducts = await productRepository.findAll();
    const products = [product, product2];

    expect(foundProducts).toHaveLength(2);
    expect(foundProducts[0].id).toBe(product.id);
    expect(foundProducts[0].name).toBe(product.name);
    expect(foundProducts[0].price).toBe(product.price);
    expect(foundProducts[1].id).toBe(product2.id);
    expect(foundProducts[1].name).toBe(product2.name);
    expect(foundProducts[1].price).toBe(product2.price);
  });

});
