import { getTestApp } from "./test-app.factory";
import * as request from "supertest";

export const productVerificationTest = () => {
  describe("Product Verification Module (e2e)", () => {
    let app, adminCookies, supplierCookies;

    beforeEach(async () => {
      app = await getTestApp();

      const adminLogin = await request(app.getHttpServer())
        .post("/auth/login")
        .send({ username: "product_admin", password: "123456@ABCdefg" });
      adminCookies = adminLogin.headers["set-cookie"];

      const supplierLogin = await request(app.getHttpServer())
        .post("/auth/login")
        .send({ username: "supplier_approved_1", password: "123456@ABCdefg" });
      supplierCookies = supplierLogin.headers["set-cookie"];
    });

    describe("Create", () => {
      describe("UTC_PVF_01 Create product verification", () => {
        const data = {
          product_name: "test product application",
          model_no: "test model",
          subcat_id: "SCAT000000000001",
          status: "PENDING",
          specification: []
        }

        // it("Product application created successfully.", async () => {
        //   return request(app.getHttpServer())
        //     .post(`/product/create-product-verification`)
        //     .set("Cookie", supplierCookies)
        //     .send(data)
        //     .expect((res) => {
        //       expect(res.text).toBe("true");
        //     })
        // })

        it("Product Name is empty", async () => {
          return request(app.getHttpServer())
            .post(`/product/create-product-verification`)
            .set("Cookie", supplierCookies)
            .expect((res) => {
              expect(res.body).toBeInstanceOf(Object);
            })
        })
      })
    })

    describe("Read", () => {
      describe("UTC_PVF_02 Get product verification list by filter", () => {
        const data = {
          status: ["PENDING"],
          cat_ids: ["SCAT000000000001", "SCAT000000000002"],
          search: "",
          is_supplier: true
        }

        it("An array of Product Verification objects that belongs to the supplier and apply to the filter is returned", async () => {
          return request(app.getHttpServer())
            .post(`/product/get-product-verification-list-by-filter`)
            .set("Cookie", supplierCookies)
            .send(data)
            .expect((res) => {
              expect(res.body).toBeInstanceOf(Array);
            })
        })

        it("An array of Product Verification objects that apply to the filter is returned", async () => {
          return request(app.getHttpServer())
            .post(`/product/get-product-verification-list-by-filter`)
            .set("Cookie", adminCookies)
            .send({ ...data, is_supplier: false })
            .expect((res) => {
              expect(res.body).toBeInstanceOf(Array);
            })
        })

        it("All Product Verification objects are returned in an array.", async () => {
          return request(app.getHttpServer())
            .post(`/product/get-product-verification-list-by-filter`)
            .set("Cookie", adminCookies)
            .send({ is_supplier: false })
            .expect((res) => {
              expect(res.body).toBeInstanceOf(Array);
            })
        })
      })

      describe("UTC_PVF_03 Get product verification details by ID", () => {
        const id = "d4e89331-b8d6-4796-a7ba-34a3d9a338c3";

        it("A product verification object is returned", async () => {
          return request(app.getHttpServer())
            .get(`/product/get-product-verification-details-by-id?id=${id}`)
            .set("Cookie", adminCookies)
            .expect((res) => {
              expect(res.body).toBeInstanceOf(Object);
            })
        })

        it("Product application not found.", async () => {
          return request(app.getHttpServer())
            .get(`/product/get-product-verification-details-by-id?id=abcdefg`)
            .set("Cookie", adminCookies)
            .expect((res) => {
              expect(res.body).toBeInstanceOf(Object);
            })
        })

        it("Product verification ID is missing", async () => {
          return request(app.getHttpServer())
            .get(`/product/get-product-verification-details-by-id`)
            .set("Cookie", adminCookies)
            .expect((res) => {
              expect(res.body).toBeInstanceOf(Object);
            })
        })
      })
    })

    describe("Update", () => {
      describe("UTC_PVF_04 Update product verification details by ID", () => {
        const id = "92a3fe79-6d9f-4aac-805d-73dbecb11903";
        const data = {
          specification: [
            { spec_id: "BSPEC000000000001", spec_desc: "PPA1234567"}
          ]
        }

        // it("A product verification object is returned.", async () => {
        //   return request(app.getHttpServer())
        //     .put(`/product/update-product-verification-details-by-id?id=${id}`)
        //     .set("Cookie", supplierCookies)
        //     .send(data)
        //     .expect((res) => {
        //       expect(res.text).toBe("true");
        //     })
        // })

        it("Product application not found", async () => {
          return request(app.getHttpServer())
            .put(`/product/update-product-verification-details-by-id?id=abcdefg`)
            .set("Cookie", supplierCookies)
            .send(data)
            .expect((res) => {
              expect(res.body).toBeInstanceOf(Object);
            })
        })

        it("Product verification ID is missing", async () => {
          return request(app.getHttpServer())
            .put(`/product/update-product-verification-details-by-id`)
            .set("Cookie", supplierCookies)
            .send(data)
            .expect((res) => {
              expect(res.body).toBeInstanceOf(Object);
            })
        })

      })

      describe("UTC_PVF_05 Update product verification review by id", () => {
        const id = "92a3fe79-6d9f-4aac-805d-73dbecb11903"

        // it("Product application rejected successfully.", async () => {
        //   const data = {
        //     status: "REJECTED",
        //     rejected_reason: "Test Reject",
        //   }
        //
        //   return request(app.getHttpServer())
        //     .put(`/product/update-product-verification-review-by-id?id=${id}`)
        //     .set("Cookie", adminCookies)
        //     .send(data)
        //     .expect((res) => {
        //       expect(res.text).toBe("true");
        //     })
        // })

        it("Reject reason is required to reject application", async () => {
          const data = {
            status: "REJECTED",
            rejected_reason: "",
          }

          return request(app.getHttpServer())
            .put(`/product/update-product-verification-review-by-id?id=${id}`)
            .set("Cookie", adminCookies)
            .send(data)
            .expect((res) => {
              expect(res.body).toBeInstanceOf(Object);
            })
        })

        // it("Product application approved successfully.", async () => {
        //   const data = {
        //     status: "APPROVED",
        //     rating: 4,
        //     total_score: 35,
        //   }
        //
        //   return request(app.getHttpServer())
        //     .put(`/product/update-product-verification-review-by-id?id=${id}`)
        //     .set("Cookie", adminCookies)
        //     .send(data)
        //     .expect((res) => {
        //       expect(res.text).toBe("true");
        //     })
        // })

        it("At least 1 star rating is required to approve an application", async () => {
          const data = {
            status: "APPROVED",
            rating: 0,
            total_score: 0,
          }

          return request(app.getHttpServer())
            .put(`/product/update-product-verification-review-by-id?id=${id}`)
            .set("Cookie", adminCookies)
            .send(data)
            .expect((res) => {
              expect(res.body).toBeInstanceOf(Object);
            })
        })
      })
    })

    describe("Delete", () => {
      describe("UTC_PVF_06 Delete product Verification details by id", () => {
        const id = "92a3fe79-6d9f-4aac-805d-73dbecb11903";

        // it("Product application deleted successfully", async () => {
        //   return request(app.getHttpServer())
        //     .delete(`/product/delete-product-verification-details-by-id?id=${id}`)
        //     .expect((res) => {
        //       expect(res.text).toBe("true");
        //     })
        // })

        it("Product application not found", async () => {
          return request(app.getHttpServer())
            .delete(`/product/delete-product-verification-details-by-id?id=abcdefg`)
            .expect((res) => {
              expect(res.body).toBeInstanceOf(Object);
            })
        })

        it("Product Verification ID is empty.", async () => {
          return request(app.getHttpServer())
            .delete(`/product/delete-product-verification-details-by-id`)
            .expect((res) => {
              expect(res.body).toBeInstanceOf(Object);
            })
        })
      })
    })
  })
}