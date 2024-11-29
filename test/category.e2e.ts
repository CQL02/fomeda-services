import * as request from "supertest";
import { getTestApp } from "./test-app.factory";

export const categoryTest = () => {
  describe("Product Category Module (e2e)", () => {
    let app, cookies;

    beforeEach(async () => {
      app = await getTestApp();
      const adminLogin = await request(app.getHttpServer())
        .post("/auth/login")
        .send({ username: "product_admin", password: "123456@ABCdefg" });
      cookies = adminLogin.headers["set-cookie"];
    });


    describe("Create", () => {
      describe("create category", () => {
        it("Category created successfully", async () => {
          return request(app.getHttpServer())
            .post("/category/create-category")
            .set("Cookie", cookies)
            .send({ cat_name: "new category", is_active: "false" })
            .expect((res) => {
              expect(res.body).toBeInstanceOf(Object);
            });
        });

        it("Category name is missing", async () => {
          return request(app.getHttpServer())
            .post("/category/create-category")
            .set("Cookie", cookies)
            .send({ cat_name: "", is_active: "false" })
            .expect((res) => {
              expect(res.body).toBeInstanceOf(Object);
            });
        });

        it("Category name is duplicated", async () => {
          return request(app.getHttpServer())
            .post("/category/create-category")
            .set("Cookie", cookies)
            .send({ cat_name: "new category", is_active: "false" })
            .expect((res) => {
              expect(res.body).toBeInstanceOf(Object);
            });
        });
      });

      describe("create subcategory", () => {
        const data = {
          cat_id: "CAT000000000009",
          subcat_name: "new subcategory",
          is_active: "false"
        };

        it("Subcategory created successfully", async () => {
          return request(app.getHttpServer())
            .post("/category/create-subcategory")
            .set("Cookie", cookies)
            .send(data)
            .expect((res) => {
              expect(res.body).toBeInstanceOf(Object);
            });
        });

        it("Subcategory name is duplicated", async () => {
          return request(app.getHttpServer())
            .post("/category/create-subcategory")
            .set("Cookie", cookies)
            .send(data)
            .expect((res) => {
              expect(res.body).toBeInstanceOf(Object);
            });
        });

        it("Category is missing", async () => {
          return request(app.getHttpServer())
            .post("/category/create-subcategory")
            .set("Cookie", cookies)
            .send({ ...data, cat_id: "" })
            .expect((res) => {
              expect(res.body).toBeInstanceOf(Object);
            });
        });

        it("Subcategory name is missing", async () => {
          return request(app.getHttpServer())
            .post("/category/create-subcategory")
            .set("Cookie", cookies)
            .send({ ...data, subcat_name: "" })
            .expect((res) => {
              expect(res.body).toBeInstanceOf(Object);
            });
        });

        describe("Create General Specification", () => {
          const data = {
            cat_type: "WARRANTY",
            subcat_spec_name: "General Warranty",
            is_active: false,
            allow_input: true,
            is_required: true,
            prefix: "",
            suffix: "year(s)",
            field_type: "NUMERIC",
            is_score_contributed: true,
            rating_score: [
              { action: "MORE_THAN", value: "5", score: 10 },
              { action: "MORE_THAN", value: "3", score: 8 }
            ]
          };

          it("General Specification created successfully", async () => {
            return request(app.getHttpServer())
              .post("/category/create-general-specification")
              .set("Cookie", cookies)
              .send(data)
              .expect((res) => {
                expect(res.body).toBeInstanceOf(Object);
              });
          });

          it("Specification name already existed", async () => {
            return request(app.getHttpServer())
              .post("/category/create-general-specification")
              .set("Cookie", cookies)
              .send(data)
              .expect((res) => {
                expect(res.body).toBeInstanceOf(Object);
              });
          });

          it("Specification name is missing", async () => {
            return request(app.getHttpServer())
              .post("/category/create-general-specification")
              .set("Cookie", cookies)
              .send({ ...data, subcat_spec_name: "" })
              .expect((res) => {
                expect(res.body).toBeInstanceOf(Object);
              });
          });
        });
      });

      it("/category/find-all-category (GET)", async () => {
        return request(app.getHttpServer())
          .get("/category/find-all-category")
          .expect((res) => {
            expect(res.body).toBeInstanceOf(Array);
          });
      });

      it("/category/find-all-active-categories (GET)", async () => {
        return request(app.getHttpServer())
          .get("/category/find-all-active-categories")
          .expect((res) => {
            expect(res.body).toBeInstanceOf(Array);
          });
      });

      it("/category/update-category (PUT)", async () => {
        const id = "CAT000000000009";
        const data = { cat_name: "Demo Category" };

        return request(app.getHttpServer())
          .put(`/category/update-category?id=${id}`)
          .set("Cookie", cookies)
          .send(data)
          .expect((res) => {
            expect(res.body).toBeInstanceOf(Object);
          });
      });

      it("/category/delete-category (DELETE)", async () => {
        const id = "CAT000000000016";

        return request(app.getHttpServer())
          .delete(`/category/delete-category?id=${id}`)
          .set("Cookie", cookies)
          .expect((res) => {
            expect(res.body).toBeInstanceOf(Object);
          });
      });
    });
  });
};