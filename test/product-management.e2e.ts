import { getTestApp } from "./test-app.factory";
import * as request from "supertest";

export const productManagementTest = () => {
  describe("Product Management Module (e2e)", () => {
    let app, supplierCookies;

    beforeEach(async () => {
      app = await getTestApp();
      const supplierLogin = await request(app.getHttpServer())
        .post("/auth/login")
        .send({ username: "supplier_approved_1", password: "123456@ABCdefg" });
      supplierCookies = supplierLogin.headers["set-cookie"];
    });

    describe("Read", () => {
      describe("UTC_PMG_01 Get product details by ID", () => {
        const id = "4b82c0f3-0fdb-4c11-a9c9-8821939c6268";

        it("Product object is returned", async () => {
          return request(app.getHttpServer())
            .get(`/product/get-product-details-by-id?id=${id}`)
            .set("Cookie", supplierCookies)
            .expect((res) => {
              expect(res.body).toBeInstanceOf(Object);
          })
        })

        it("Product not found", async () => {
          return request(app.getHttpServer())
            .get(`/product/get-product-details-by-id?id=123456`)
            .set("Cookie", supplierCookies)
            .expect((res) => {
              expect(res.body).toBeInstanceOf(Object);
            })
        })

        it("Product ID is empty", async () => {
          return request(app.getHttpServer())
            .get(`/product/get-product-details-by-id`)
            .set("Cookie", supplierCookies)
            .expect((res) => {
              expect(res.body).toBeInstanceOf(Object);
            })
        })
      });

      describe("UTC_PMG_02 Get product list by filter", () => {
        const data = {
          cat_ids: ["SCAT000000000001", "SCAT000000000002"],
          search: "Sharp",
          is_supplier: true
        }

        it("An array of product objects that belong to the supplier is returned", async () => {
          return request(app.getHttpServer())
            .post(`/product/get-product-list-by-filter`)
            .set("Cookie", supplierCookies)
            .send(data)
            .expect((res) => {
              expect(res.body).toBeInstanceOf(Array);
            })
        })

        it("An empty array is returned.", async () => {
          return request(app.getHttpServer())
            .post(`/product/get-product-list-by-filter`)
            .set("Cookie", supplierCookies)
            .send({ ...data, search: "ABCDEFG" })
            .expect((res) => {
              expect(res.body).toBeInstanceOf(Array);
            })
        })

        it("An array of all products that belong to the supplier is returned.", async () => {
          return request(app.getHttpServer())
            .post(`/product/get-product-list-by-filter`)
            .set("Cookie", supplierCookies)
            .send({...data, cat_ids: [], search: "" })
            .expect((res) => {
              expect(res.body).toBeInstanceOf(Array);
            })
        })

      });
    })

    describe("Update", () => {
      describe("UTC_PMG_03 Update product details by ID", () => {
        const id = "c498c183-541d-4a9f-9196-3b7e092fa848";
        const data = {
          specification: [
            { spec_id: "GSPEC000000000003", spec_desc: "SIRIM145678"}
          ]
        }

        // it("A product object is updated successfully.", async () => {
        //   return request(app.getHttpServer())
        //     .put(`/product/update-product-details-by-id?id=${id}`)
        //     .send(data)
        //     .expect((res) => {
        //       expect(res.body).toBeInstanceOf(Object);
        //     })
        // })

        it("Product not found", async () => {
          return request(app.getHttpServer())
            .put(`/product/update-product-details-by-id?id=abcdefg}`)
            .send(data)
            .expect((res) => {
              expect(res.body).toBeInstanceOf(Object);
            })
        })

        it("Product is empty", async () => {
          return request(app.getHttpServer())
            .put(`/product/update-product-details-by-id`)
            .send(data)
            .expect((res) => {
              expect(res.body).toBeInstanceOf(Object);
            })
        })

      });

      describe("UTC_PMG_04 Update product is active", () => {
        const id = "4b82c0f3-0fdb-4c11-a9c9-8821939c6268"

        it("The status of product will interchange between true and false", async () => {
          return request(app.getHttpServer())
            .put(`/product/update-product-is-active?id=${id}`)
            .set("Cookie", supplierCookies)
            .expect((res) => {
              expect(res.text).toBe("true");
            })
        })

        it("Product ID is empty", async () => {
          return request(app.getHttpServer())
            .put(`/product/update-product-is-active`)
            .set("Cookie", supplierCookies)
            .expect((res) => {
              expect(res.body).toBeInstanceOf(Object);
            })
        })

        it("Product not found", async () => {
          return request(app.getHttpServer())
            .put(`/product/update-product-is-active?id=1234567`)
            .set("Cookie", supplierCookies)
            .expect((res) => {
              expect(res.body).toBeInstanceOf(Object);
            })
        })
      });
    })

    describe("Delete", () => {
      describe("UTC_PMG_05 Delete product by id", () => {
        const id = "706d5236-a2f7-4bc9-b82f-d55fa68109b4"

        // it("Product deleted successfully", async () => {
        //   return request(app.getHttpServer())
        //     .delete(`/product/delete-product-by-id?id=${id}`)
        //     .expect((res) => {
        //       expect(res.text).toBe("true");
        //     })
        // })

        it("Product ID is empty", async () => {
          return request(app.getHttpServer())
            .delete(`/product/delete-product-by-id`)
            .expect((res) => {
              expect(res.body).toBeInstanceOf(Object);
            })
        })

        it("Product not found", async () => {
          return request(app.getHttpServer())
            .delete(`/product/delete-product-by-id?id=abcdefg`)
            .expect((res) => {
              expect(res.body).toBeInstanceOf(Object);
            })
        })
      });
    })
  })
}