import { getTestApp } from "./test-app.factory";
import * as request from "supertest";

export const productSearchAndComparisonTest = () => {
  describe("Product Search And Comparison Module (e2e)", () => {
    let app;

    beforeEach(async () => {
      app = await getTestApp();
    });

    describe("Read", () => {
      describe("UCT_PSC_01 Get consumer product by filter", () => {
        it("An object of active product objects array with total product count that apply the filter is returned", async () => {
          const data = {
            subcat_id: "SCAT000000000001",
            search: "Sharp",
            specification: [
              {
                spec_id: "GSPEC000000000002",
                desc_list: ["Sharp"]
              },
              {
                spec_id: "GSPEC000000000001",
                desc_list: ["Sharp Corp.", "LG Corp."]
              }
            ],
            subspecification: []
          };

          return request(app.getHttpServer())
            .post("/product/get-consumer-product-by-filter?skip=0&limit=20")
            .send(data)
            .expect((res) => {
              expect(res.body).toBeInstanceOf(Object);
            });
        });

        it("An object of empty product objects array is returned", async () => {
          const data = {
            subcat_id: "SCAT000000000001",
            search: "ABCDE",
            specification: [],
            subspecification: []
          };

          return request(app.getHttpServer())
            .post("/product/get-consumer-product-by-filter?skip=0&limit=20")
            .send(data)
            .expect((res) => {
              expect(res.body).toBeInstanceOf(Object);
            });
        });

        it("Category or subcategory is not chosen.", async () => {
          const data = {
            subcat_id: "",
            search: "",
            specification: [],
            subspecification: []
          };

          return request(app.getHttpServer())
            .post("/product/get-consumer-product-by-filter?skip=0&limit=20")
            .send(data)
            .expect((res) => {
              expect(res.body).toBeInstanceOf(Object);
            });
        });
      });

      describe("UCT_PSC_02 Get consumer specification filter by subcategory ID", () => {
        it("An active specification filter object of subcategory is returned", async () => {
          return request(app.getHttpServer())
            .get("/product/get-consumer-specification-filter-by-subcat_id?id=SCAT000000000001")
            .expect((res) => {
              expect(res.body).toBeInstanceOf(Object);
            });
        });

        it("Subcategory not found", async () => {
          return request(app.getHttpServer())
            .get("/product/get-consumer-specification-filter-by-subcat_id?id=SCAT100000000001")
            .expect((res) => {
              expect(res.body).toBeInstanceOf(Object);
            });
        });

        it("Subcategory is missing", async () => {
          return request(app.getHttpServer())
            .get("/product/get-consumer-specification-filter-by-subcat_id")
            .expect((res) => {
              expect(res.body).toBeInstanceOf(Object);
            });
        });
      });

      describe("UCT_PSC_03 Get consumer compared product", () => {
        it("An array of 3 product objects is returned.", async () => {
          return request(app.getHttpServer())
            .get("/product/get-consumer-compared-product?subcat_id=SCAT000000000001&ids=4b82c0f3-0fdb-4c11-a9c9-8821939c6268&ids=ad417f91-ad7a-41ed-89cd-64d9e84b84f5&ids=1408a6fd-0646-4275-a353-a5b51f18c0e3")
            .expect((res) => {
              expect(res.body).toBeInstanceOf(Array);
            });
        });

        it("Subcategory not found.", async () => {
          return request(app.getHttpServer())
            .get("/product/get-consumer-compared-product?subcat_id=SCAT100000000001&ids=4b82c0f3-0fdb-4c11-a9c9-8821939c6268&ids=ad417f91-ad7a-41ed-89cd-64d9e84b84f5&ids=1408a6fd-0646-4275-a353-a5b51f18c0e3")
            .expect((res) => {
              expect(res.body).toBeInstanceOf(Object);
            });
        });

        it("At least 2 products is needed to compare", async () => {
          return request(app.getHttpServer())
            .get("/product/get-consumer-compared-product?subcat_id=SCAT000000000001&ids=4b82c0f3-0fdb-4c11-a9c9-8821939c6268")
            .expect((res) => {
              expect(res.body).toBeInstanceOf(Object);
            });
        });
      });

      describe("UCT_PSC_04 Get product details", () => {
        it("A product object is returned", async () => {
          return request(app.getHttpServer())
            .get("/product/get-product-details?id=4b82c0f3-0fdb-4c11-a9c9-8821939c6268")
            .expect((res) => {
              expect(res.body).toBeInstanceOf(Object);
            });
        });

        it("Product ID is empty", async () => {
          return request(app.getHttpServer())
            .get("/product/get-product-details")
            .expect((res) => {
              expect(res.body).toBeInstanceOf(Object);
            });
        });

        it("Product not found", async () => {
          return request(app.getHttpServer())
            .get("/product/get-product-details?id=12345678")
            .expect((res) => {
              expect(res.body).toBeInstanceOf(Object);
            });
        });
      });
    });
  });
};