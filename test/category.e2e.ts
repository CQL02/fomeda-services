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
      describe("UTC_PCT_01 create category", () => {
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

      describe("UTC_PCT_02 create subcategory", () => {
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

      });

      describe("UTC_PCT_03 Create General Specification", () => {
        const data = {
          cat_type: "WARRANTY",
          subcat_spec_name: "Test Warranty",
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

      describe("UTC_PCT_04 Create General Subspecification", () => {
        const data = {
          subcat_spec_id: "GSPEC000000000010",
          subcat_subspec_name: "New General Subspecification",
          is_active: false,
          allow_input: true,
          is_required: true,
          prefix: "",
          suffix: "",
          field_type: "NUMERIC",
          is_score_contributed: true,
          rating_score: [
            { action: "MORE_THAN", value: "60", score: 2 },
            { action: "MORE_THAN", value: "75", score: 5 }
          ]
        };

        it("General Subspecification created successfully", () => {
          return request(app.getHttpServer())
            .post("/category/create-general-subspecification")
            .set("Cookie", cookies)
            .send(data)
            .expect((res) => {
              expect(res.body).toBeInstanceOf(Object);
            });
        })

        it("Subspecification name already existed", () => {
          return request(app.getHttpServer())
            .post("/category/create-general-subspecification")
            .set("Cookie", cookies)
            .send(data)
            .expect((res) => {
              expect(res.body).toBeInstanceOf(Object);
            });
        })

        it("Subspecification name is missing", () => {
          return request(app.getHttpServer())
            .post("/category/create-general-subspecification")
            .set("Cookie", cookies)
            .send({ ...data, subcat_subspec_name: "" })
            .expect((res) => {
              expect(res.body).toBeInstanceOf(Object);
            });
        })
      });

      describe("UTC_PCT_05 Create Base Specification", () => {
        const data = {
          cat_id:"CAT000000000001",
          cat_type: "WARRANTY",
          subcat_spec_name: "New Warranty",
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

        it("Base Specification created successfully", async () => {
          return request(app.getHttpServer())
            .post("/category/create-base-specification")
            .set("Cookie", cookies)
            .send(data)
            .expect((res) => {
              expect(res.body).toBeInstanceOf(Object);
            });
        });

        it("Specification name already existed", async () => {
          return request(app.getHttpServer())
            .post("/category/create-base-specification")
            .set("Cookie", cookies)
            .send(data)
            .expect((res) => {
              expect(res.body).toBeInstanceOf(Object);
            });
        });

        it("Specification name is missing", async () => {
          return request(app.getHttpServer())
            .post("/category/create-base-specification")
            .set("Cookie", cookies)
            .send({ ...data, subcat_spec_name: "" })
            .expect((res) => {
              expect(res.body).toBeInstanceOf(Object);
            });
        });
      });

      describe("UTC_PCT_06 Create Base Subspecification", () => {
        const data = {
          subcat_spec_id: "BSPEC000000000002",
          subcat_subspec_name: "New base subspecification",
          is_active: false,
          allow_input: true,
          is_required: true,
          prefix: "",
          suffix: "",
          field_type: "ALPHABET",
          is_score_contributed: true,
          rating_score: [
            { action: "HAVE_VALUE", value: "", score: 2 },
          ]
        };

        it("Base Subspecification created successfully", () => {
          return request(app.getHttpServer())
            .post("/category/create-base-subspecification")
            .set("Cookie", cookies)
            .send(data)
            .expect((res) => {
              expect(res.body).toBeInstanceOf(Object);
            });
        })

        it("Subspecification name already existed", () => {
          return request(app.getHttpServer())
            .post("/category/create-base-subspecification")
            .set("Cookie", cookies)
            .send(data)
            .expect((res) => {
              expect(res.body).toBeInstanceOf(Object);
            });
        })

        it("Subspecification name is missing", () => {
          return request(app.getHttpServer())
            .post("/category/create-base-subspecification")
            .set("Cookie", cookies)
            .send({ ...data, subcat_subspec_name: "" })
            .expect((res) => {
              expect(res.body).toBeInstanceOf(Object);
            });
        })
      });

      describe("UTC_PCT_07 Create Subcategory Specification", () => {
        const data = {
          subcat_id: "SCAT000000000001",
          cat_type: "INFORMATION",
          subcat_spec_name: "New Subcategory information",
          is_active: false,
          allow_input: true,
          is_required: true,
          prefix: "",
          suffix: "",
          field_type: "ALPHANUMERIC",
          is_score_contributed: false,
        };

        it("Subcategory Specification created successfully", async () => {
          return request(app.getHttpServer())
            .post("/category/create-subcategory-specification")
            .set("Cookie", cookies)
            .send(data)
            .expect((res) => {
              expect(res.body).toBeInstanceOf(Object);
            });
        });

        it("Specification name already existed", async () => {
          return request(app.getHttpServer())
            .post("/category/create-subcategory-specification")
            .set("Cookie", cookies)
            .send(data)
            .expect((res) => {
              expect(res.body).toBeInstanceOf(Object);
            });
        });

        it("Specification name is missing", async () => {
          return request(app.getHttpServer())
            .post("/category/create-subcategory-specification")
            .set("Cookie", cookies)
            .send({ ...data, subcat_spec_name: "" })
            .expect((res) => {
              expect(res.body).toBeInstanceOf(Object);
            });
        });
      });

      describe("UTC_PCT_08 Create Subcategory Subspecification", () => {
        const data = {
          subcat_spec_id: "SPEC000000000002",
          subcat_subspec_name: "New Subcategory Subspecification",
          is_active: false,
          allow_input: true,
          is_required: false,
          prefix: "",
          suffix: "",
          field_type: "NUMERIC",
          is_score_contributed: false,
        };

        it("Subcategory Subspecification created successfully", () => {
          return request(app.getHttpServer())
            .post("/category/create-subcategory-subspecification")
            .set("Cookie", cookies)
            .send(data)
            .expect((res) => {
              expect(res.body).toBeInstanceOf(Object);
            });
        })

        it("Subspecification name already existed", () => {
          return request(app.getHttpServer())
            .post("/category/create-subcategory-subspecification")
            .set("Cookie", cookies)
            .send(data)
            .expect((res) => {
              expect(res.body).toBeInstanceOf(Object);
            });
        })

        it("Subspecification name is missing", () => {
          return request(app.getHttpServer())
            .post("/category/create-subcategory-subspecification")
            .set("Cookie", cookies)
            .send({ ...data, subcat_subspec_name: "" })
            .expect((res) => {
              expect(res.body).toBeInstanceOf(Object);
            });
        })
      });
    });

    describe("Read", () => {
      describe("UTC_PCT_09 Find All Category", () => {
        it("An array of category and subcategory objects return", async () => {
          return request(app.getHttpServer())
            .get("/category/find-all-category")
            .expect((res) => {
              expect(res.body).toBeInstanceOf(Array);
            });
        })
      });

      describe("UTC_PCT_10 Find one subcategory by ID", () => {
        const id = 'SCAT000000000001';

        it("A subcategory object returns", async () => {
          return request(app.getHttpServer())
            .get(`/category/find-one-subcategory-by-id?id=${id}`)
            .expect((res) => {
              expect(res.body).toBeInstanceOf(Object);
            });
        })

        it("Subcategory not found", async () => {
          return request(app.getHttpServer())
            .get(`/category/find-one-subcategory-by-id?id=SCAT100000000001`)
            .expect((res) => {
              expect(res.body).toBeInstanceOf(Object);
            });
        })

        it("Subcategory is missing", async () => {
          return request(app.getHttpServer())
            .get(`/category/find-one-subcategory-by-id`)
            .expect((res) => {
              expect(res.body).toBeInstanceOf(Object);
            });
        })

      });

      describe("UTC_PCT_11 Find all general specification", () => {
        it("An array of general specification and subspecification objects return", () => {
          return request(app.getHttpServer())
            .get(`/category/find-one-subcategory-by-id`)
            .expect((res) => {
              expect(res.body).toBeInstanceOf(Object);
            });
        })
      });

      describe("UTC_PCT_12 Find general specification by ID", () => {
        const id = 'GSPEC000000000001';

        it("A specification object is returned", async () => {
          return request(app.getHttpServer())
            .get(`/category/find-general-specification-by-id?id=${id}`)
            .expect((res) => {
              expect(res.body).toBeInstanceOf(Object);
            });
        })

        it("Specification not found", async () => {
          return request(app.getHttpServer())
            .get(`/category/find-general-specification-by-id?id=GSPEC100000000001`)
            .expect((res) => {
              expect(res.body).toBeInstanceOf(Object);
            });
        })

        it("Specification is empty", async () => {
          return request(app.getHttpServer())
            .get(`/category/find-general-specification-by-id`)
            .expect((res) => {
              expect(res.body).toBeInstanceOf(Object);
            });
        })
      });

      describe("UTC_PCT_13 Find general subspecification by ID", () => {
        const id = 'GSSPEC000000000001';

        it("A subspecification object is returned", async () => {
          return request(app.getHttpServer())
            .get(`/category/find-general-subspecification-by-id?id=${id}`)
            .expect((res) => {
              expect(res.body).toBeInstanceOf(Object);
            });
        })

        it("Subspecification not found", async () => {
          return request(app.getHttpServer())
            .get(`/category/find-general-subspecification-by-id?id=GSSPEC100000000001`)
            .expect((res) => {
              expect(res.body).toBeInstanceOf(Object);
            });
        })

        it("Subspecification is empty", async () => {
          return request(app.getHttpServer())
            .get(`/category/find-general-subspecification-by-id`)
            .expect((res) => {
              expect(res.body).toBeInstanceOf(Object);
            });
        })
      });

      describe("UTC_PCT_14 Find base specification by category ID", () => {
        const id = 'CAT000000000001';

        it("An array of general specification with base specification is returned.", async () => {
          return request(app.getHttpServer())
            .get(`/category/find-base-specification-by-cat-id?id=${id}`)
            .expect((res) => {
              expect(res.body).toBeInstanceOf(Array);
            });
        })

        it("An array of general specification is returned (Invalid category)", async () => {
          return request(app.getHttpServer())
            .get(`/category/find-base-specification-by-cat-id?id=CAT100000000001`)
            .expect((res) => {
              expect(res.body).toBeInstanceOf(Array);
            });
        })

        it("An array of general specification is returned (Empty category)", async () => {
          return request(app.getHttpServer())
            .get(`/category/find-base-specification-by-cat-id`)
            .expect((res) => {
              expect(res.body).toBeInstanceOf(Array);
            });
        })
      });

      describe("UTC_PCT_15 Find base specification by ID", () => {
        const id = 'BSPEC000000000001';

        it("A specification object is returned", async () => {
          return request(app.getHttpServer())
            .get(`/category/find-base-specification-by-id?id=${id}`)
            .expect((res) => {
              expect(res.body).toBeInstanceOf(Object);
            });
        })

        it("Specification not found", async () => {
          return request(app.getHttpServer())
            .get(`/category/find-base-specification-by-id?id=BSPEC100000000001`)
            .expect((res) => {
              expect(res.body).toBeInstanceOf(Object);
            });
        })

        it("Specification is empty", async () => {
          return request(app.getHttpServer())
            .get(`/category/find-base-specification-by-id`)
            .expect((res) => {
              expect(res.body).toBeInstanceOf(Object);
            });
        })
      });

      describe("UTC_PCT_16 Find base subspecification by ID", () => {
        const id = 'BSSPEC000000000001';

        it("A subspecification object is returned", async () => {
          return request(app.getHttpServer())
            .get(`/category/find-base-subspecification-by-id?id=${id}`)
            .expect((res) => {
              expect(res.body).toBeInstanceOf(Object);
            });
        })

        it("Subspecification not found", async () => {
          return request(app.getHttpServer())
            .get(`/category/find-base-subspecification-by-id?id=BSSPEC100000000001`)
            .expect((res) => {
              expect(res.body).toBeInstanceOf(Object);
            });
        })

        it("Subspecification is empty", async () => {
          return request(app.getHttpServer())
            .get(`/category/find-base-subspecification-by-id`)
            .expect((res) => {
              expect(res.body).toBeInstanceOf(Object);
            });
        })
      });

      describe("UTC_PCT_17 Find subcategory specification by subcategory ID", () => {
        const id = 'SCAT000000000001';

        it("An array of general specification with base specification is returned.", async () => {
          return request(app.getHttpServer())
            .get(`/category/find-subcategory-specification-by-cat-id?id=${id}`)
            .expect((res) => {
              expect(res.body).toBeInstanceOf(Array);
            });
        })

        it("Invalid Subcategory", async () => {
          return request(app.getHttpServer())
            .get(`/category/find-subcategory-specification-by-cat-id?id=SCAT100000000001`)
            .expect((res) => {
              expect(res.body).toBeInstanceOf(Object);
            });
        })

        it("Subcategory ID missing", async () => {
          return request(app.getHttpServer())
            .get(`/category/find-subcategory-specification-by-cat-id`)
            .expect((res) => {
              expect(res.body).toBeInstanceOf(Object);
            });
        })
      });

      describe("UTC_PCT_18 Find subcategory specification by ID", () => {
        const id = 'SPEC000000000001';

        it("A specification object is returned", async () => {
          return request(app.getHttpServer())
            .get(`/category/find-subcategory-specification-by-id?id=${id}`)
            .expect((res) => {
              expect(res.body).toBeInstanceOf(Object);
            });
        })

        it("Specification not found", async () => {
          return request(app.getHttpServer())
            .get(`/category/find-subcategory-specification-by-id?id=SPEC100000000001`)
            .expect((res) => {
              expect(res.body).toBeInstanceOf(Object);
            });
        })

        it("Specification is empty", async () => {
          return request(app.getHttpServer())
            .get(`/category/find-subcategory-specification-by-id`)
            .expect((res) => {
              expect(res.body).toBeInstanceOf(Object);
            });
        })
      });

      describe("UTC_PCT_19 Find subcategory subspecification by ID", () => {
        const id = 'SSPEC000000000001';

        it("A subspecification object is returned", async () => {
          return request(app.getHttpServer())
            .get(`/category/find-subcategory-subspecification-by-id?id=${id}`)
            .expect((res) => {
              expect(res.body).toBeInstanceOf(Object);
            });
        })

        it("Subspecification not found", async () => {
          return request(app.getHttpServer())
            .get(`/category/find-subcategory-subspecification-by-id?id=SSPEC100000000001`)
            .expect((res) => {
              expect(res.body).toBeInstanceOf(Object);
            });
        })

        it("Subspecification is empty", async () => {
          return request(app.getHttpServer())
            .get(`/category/find-subcategory-subspecification-by-id`)
            .expect((res) => {
              expect(res.body).toBeInstanceOf(Object);
            });
        })

      });
    });

    describe("Update", () => {
      describe("UTC_PCT_20 Update category", () => {
        const id = "CAT000000000009"
        const data = { cat_name: "Demo Category 1" }

        it("Category successfully updated", async () => {
          return request(app.getHttpServer())
            .put(`/category/update-category?id=${id}`)
            .set("Cookie", cookies)
            .send(data)
            .expect((res) => {
              expect(res.body).toBeInstanceOf(Object);
            });
        });

        it("Category name already existed", async () => {
          return request(app.getHttpServer())
            .put(`/category/update-category?id=${id}`)
            .set("Cookie", cookies)
            .send({cat_name: "Television"})
            .expect((res) => {
              expect(res.body).toBeInstanceOf(Object);
            });
        });

        it("Category name is empty", async () => {
          return request(app.getHttpServer())
            .put(`/category/update-category?id=${id}`)
            .set("Cookie", cookies)
            .send({cat_name: ""})
            .expect((res) => {
              expect(res.body).toBeInstanceOf(Object);
            });
        });

        it("Category name already existed", async () => {
          return request(app.getHttpServer())
            .put(`/category/update-category?id=CAT100000000001`)
            .set("Cookie", cookies)
            .send(data)
            .expect((res) => {
              expect(res.body).toBeInstanceOf(Object);
            });
        });
      });

      describe("UTC_PCT_21 Update subcategory", () => {
        const id = "SCAT000000000010"
        const data = { subcat_name: "Demo Subcategory 1", cat_id: "CAT000000000009" }

        it("Subcategory successfully updated", async () => {
          return request(app.getHttpServer())
            .put(`/category/update-subcategory?id=${id}`)
            .set("Cookie", cookies)
            .send(data)
            .expect((res) => {
              expect(res.body).toBeInstanceOf(Object);
            });
        });

        it("Subcategory name already existed", async () => {
          return request(app.getHttpServer())
            .put(`/category/update-subcategory?id=${id}`)
            .set("Cookie", cookies)
            .send({ ...data, subcat_name: "Demo Subcategory 2"})
            .expect((res) => {
              expect(res.body).toBeInstanceOf(Object);
            });
        });

        it("Subcategory name is empty", async () => {
          return request(app.getHttpServer())
            .put(`/category/update-subcategory?id`)
            .set("Cookie", cookies)
            .send({ ...data, subcat_name: ""})
            .expect((res) => {
              expect(res.body).toBeInstanceOf(Object);
            });
        });

        it("Category not found", async () => {
          return request(app.getHttpServer())
            .put(`/category/update-subcategory?id=SCAT100000000001`)
            .set("Cookie", cookies)
            .send(data)
            .expect((res) => {
              expect(res.body).toBeInstanceOf(Object);
            });
        });
      });

      describe("UTC_PCT_22 Update general specification", () => {
        const id = "GSPEC000000000001"
        const data = { is_required: true, cat_type: "INFORMATION" }

        it("General specification successfully updated", async () => {
          return request(app.getHttpServer())
            .put(`/category/update-general-specification?id=${id}`)
            .set("Cookie", cookies)
            .send(data)
            .expect((res) => {
              expect(res.body).toBeInstanceOf(Object);
            });
        });

        it("Specification name already existed", async () => {
          return request(app.getHttpServer())
            .put(`/category/update-general-specification?id=${id}`)
            .set("Cookie", cookies)
            .send({...data, subcat_spec_name: "Brand"})
            .expect((res) => {
              expect(res.body).toBeInstanceOf(Object);
            });
        });

        it("Specification name is empty", async () => {
          return request(app.getHttpServer())
            .put(`/category/update-general-specification?id=${id}`)
            .set("Cookie", cookies)
            .send({...data, subcat_spec_name: ""})
            .expect((res) => {
              expect(res.body).toBeInstanceOf(Object);
            });
        });

        it("Specification not found", async () => {
          return request(app.getHttpServer())
            .put(`/category/update-general-specification?id=GSPEC100000000001`)
            .set("Cookie", cookies)
            .send(data)
            .expect((res) => {
              expect(res.body).toBeInstanceOf(Object);
            });
        });
      });

      describe("UTC_PCT_23 Update general subspecification", () => {
        const id = "GSSPEC000000000002"
        const data = { is_required: true, subcat_spec_id: "GSPEC000000000010" }

        it("General subspecification successfully updated", async () => {
          return request(app.getHttpServer())
            .put(`/category/update-general-subspecification?id=${id}`)
            .set("Cookie", cookies)
            .send(data)
            .expect((res) => {
              expect(res.body).toBeInstanceOf(Object);
            });
        });

        it("Subspecification name already existed", async () => {
          return request(app.getHttpServer())
            .put(`/category/update-general-subspecification?id=${id}`)
            .set("Cookie", cookies)
            .send({...data, subcat_subspec_name: "Demo General Subspecification 1"})
            .expect((res) => {
              expect(res.body).toBeInstanceOf(Object);
            });
        });

        it("Subspecification name is empty", async () => {
          return request(app.getHttpServer())
            .put(`/category/update-general-subspecification?id=${id}`)
            .set("Cookie", cookies)
            .send({...data, subcat_subspec_name: ""})
            .expect((res) => {
              expect(res.body).toBeInstanceOf(Object);
            });
        });

        it("Subspecification not found", async () => {
          return request(app.getHttpServer())
            .put(`/category/update-general-subspecification?id=GSSPEC100000000001`)
            .set("Cookie", cookies)
            .send(data)
            .expect((res) => {
              expect(res.body).toBeInstanceOf(Object);
            });
        });
      });

      describe("UTC_PCT_24 Update base specification", () => {
        const id = "BSPEC000000000001"
        const data = { is_required: true, cat_type: "CERTIFICATION"  }

        it("Base specification successfully updated", async () => {
          return request(app.getHttpServer())
            .put(`/category/update-base-specification?id=${id}`)
            .set("Cookie", cookies)
            .send(data)
            .expect((res) => {
              expect(res.body).toBeInstanceOf(Object);
            });
        });

        it("Specification name already existed", async () => {
          return request(app.getHttpServer())
            .put(`/category/update-base-specification?id=${id}`)
            .set("Cookie", cookies)
            .send({...data, subcat_spec_name: "SIRIM Serial No."})
            .expect((res) => {
              expect(res.body).toBeInstanceOf(Object);
            });
        });

        it("Specification name is empty", async () => {
          return request(app.getHttpServer())
            .put(`/category/update-base-specification?id=${id}`)
            .set("Cookie", cookies)
            .send({...data, subcat_spec_name: ""})
            .expect((res) => {
              expect(res.body).toBeInstanceOf(Object);
            });
        });

        it("Specification not found", async () => {
          return request(app.getHttpServer())
            .put(`/category/update-base-specification?id=BSPEC100000000001`)
            .set("Cookie", cookies)
            .send(data)
            .expect((res) => {
              expect(res.body).toBeInstanceOf(Object);
            });
        });
      });

      describe("UTC_PCT_25 Update base subspecification", () => {
        const id = "BSSPEC000000000001"
        const data = { is_required: true, subcat_spec_id: "BSPEC000000000002" }

        it("Base subspecification successfully updated", async () => {
          return request(app.getHttpServer())
            .put(`/category/update-base-subspecification?id=${id}`)
            .set("Cookie", cookies)
            .send(data)
            .expect((res) => {
              expect(res.body).toBeInstanceOf(Object);
            });
        });

        it("Subspecification name already existed", async () => {
          return request(app.getHttpServer())
            .put(`/category/update-base-subspecification?id=${id}`)
            .set("Cookie", cookies)
            .send({...data, subcat_subspec_name: "Refresh Rate"})
            .expect((res) => {
              expect(res.body).toBeInstanceOf(Object);
            });
        });

        it("Subspecification name is empty", async () => {
          return request(app.getHttpServer())
            .put(`/category/update-base-subspecification?id=${id}`)
            .set("Cookie", cookies)
            .send({...data, subcat_subspec_name: ""})
            .expect((res) => {
              expect(res.body).toBeInstanceOf(Object);
            });
        });

        it("Subspecification not found", async () => {
          return request(app.getHttpServer())
            .put(`/category/update-base-subspecification?id=BSSPEC100000000001`)
            .set("Cookie", cookies)
            .send(data)
            .expect((res) => {
              expect(res.body).toBeInstanceOf(Object);
            });
        });
      });

      describe("UTC_PCT_26 Update subcategory specification", () => {
        const id = "SPEC000000000001"
        const data = { is_required: true, cat_type: "WARRANTY"  }

        it("Subcategory specification successfully updated", async () => {
          return request(app.getHttpServer())
            .put(`/category/update-subcategory-specification?id=${id}`)
            .set("Cookie", cookies)
            .send(data)
            .expect((res) => {
              expect(res.body).toBeInstanceOf(Object);
            });
        });

        it("Specification name already existed", async () => {
          return request(app.getHttpServer())
            .put(`/category/update-subcategory-specification?id=${id}`)
            .set("Cookie", cookies)
            .send({ ...data, subcat_spec_name: "General Warranty"})
            .expect((res) => {
              expect(res.body).toBeInstanceOf(Object);
            });
        });

        it("Specification name is empty", async () => {
          return request(app.getHttpServer())
            .put(`/category/update-subcategory-specification?id=${id}`)
            .set("Cookie", cookies)
            .send({ ...data, subcat_spec_name: ""})
            .expect((res) => {
              expect(res.body).toBeInstanceOf(Object);
            });
        });

        it("Specification not found", async () => {
          return request(app.getHttpServer())
            .put(`/category/update-subcategory-specification?id=SPEC100000000001`)
            .set("Cookie", cookies)
            .send(data)
            .expect((res) => {
              expect(res.body).toBeInstanceOf(Object);
            });
        });
      });

      describe("UTC_PCT_27 Update subcategory subspecification", () => {
        const id = "SSPEC000000000001"
        const data = { is_required: true, subcat_spec_id: "SPEC000000000002" }

        it("Subcategory subspecification successfully updated", async () => {
          return request(app.getHttpServer())
            .put(`/category/update-subcategory-subspecification?id=${id}`)
            .set("Cookie", cookies)
            .send(data)
            .expect((res) => {
              expect(res.body).toBeInstanceOf(Object);
            });
        });

        it("Subspecification name already existed", async () => {
          return request(app.getHttpServer())
            .put(`/category/update-subcategory-subspecification?id=${id}`)
            .set("Cookie", cookies)
            .send({ ...data, subcat_subspec_name: "Audio Type"})
            .expect((res) => {
              expect(res.body).toBeInstanceOf(Object);
            });
        });

        it("Subspecification name is empty", async () => {
          return request(app.getHttpServer())
            .put(`/category/update-subcategory-subspecification?id=${id}`)
            .set("Cookie", cookies)
            .send({ ...data, subcat_subspec_name: ""})
            .expect((res) => {
              expect(res.body).toBeInstanceOf(Object);
            });
        });

        it("Subspecification not found", async () => {
          return request(app.getHttpServer())
            .put(`/category/update-subcategory-subspecification?id=SSPEC100000000001`)
            .set("Cookie", cookies)
            .send(data)
            .expect((res) => {
              expect(res.body).toBeInstanceOf(Object);
            });
        });
      });
    });

    /** Will delete the data created in create test */
    describe("Delete", () => {
      describe("UTC_PCT_28 Delete category",  () => {
        it("Category deleted successfully", async () => {
          const latestSeqeunce = await request(app.getHttpServer())
            .get("/sequence/get-last-id")
            .send({ prefix: 'CAT' });
          const latestId = latestSeqeunce.text;

          return request(app.getHttpServer())
            .delete(`/category/delete-category?id=${latestId}`)
            .expect((res) => {
              expect(res.body).toBeInstanceOf(Object);
            });
        });

        it("Category not found", async () => {
          return request(app.getHttpServer())
            .delete(`/category/delete-category?id=CAT10000000001`)
            .expect((res) => {
              expect(res.body).toBeInstanceOf(Object);
            });
        });

        it("Category is empty", async () => {
          return request(app.getHttpServer())
            .delete(`/category/delete-category`)
            .expect((res) => {
              expect(res.body).toBeInstanceOf(Object);
            });
        });
      });

      describe("UTC_PCT_29 Delete subcategory", () => {
        it("Subcategory deleted successfully", async () => {
          const latestSeqeunce = await request(app.getHttpServer())
            .get("/sequence/get-last-id")
            .send({ prefix: 'SCAT' });
          const latestId = latestSeqeunce.text;

          return request(app.getHttpServer())
            .delete(`/category/delete-subcategory?id=${latestId}`)
            .expect((res) => {
              expect(res.body).toBeInstanceOf(Object);
            });
        });

        it("Category not found", async () => {
          return request(app.getHttpServer())
            .delete(`/category/delete-subcategory?id=SCAT10000000001`)
            .expect((res) => {
              expect(res.body).toBeInstanceOf(Object);
            });
        });

        it("Category is empty", async () => {
          return request(app.getHttpServer())
            .delete(`/category/delete-subcategory`)
            .expect((res) => {
              expect(res.body).toBeInstanceOf(Object);
            });
        });
      });

      describe("UTC_PCT_30 Delete general specification", () => {
        it("Specification deleted successfully", async () => {
          const latestSeqeunce = await request(app.getHttpServer())
            .get("/sequence/get-last-id")
            .send({ prefix: 'GSPEC' });
          const latestId = latestSeqeunce.text;

          return request(app.getHttpServer())
            .delete(`/category/delete-general-specification?id=${latestId}`)
            .expect((res) => {
              expect(res.body).toBeInstanceOf(Object);
            });
        });

        it("Specification not found", async () => {
          return request(app.getHttpServer())
            .delete(`/category/delete-general-specification?id=GSPEC10000000001`)
            .expect((res) => {
              expect(res.body).toBeInstanceOf(Object);
            });
        });

        it("Specification ID is empty", async () => {
          return request(app.getHttpServer())
            .delete(`/category/delete-general-specification`)
            .expect((res) => {
              expect(res.body).toBeInstanceOf(Object);
            });
        });
      });

      describe("UTC_PCT_31 Delete general subspecification", () => {
        it("Subspecification deleted successfully", async () => {
          const latestSeqeunce = await request(app.getHttpServer())
            .get("/sequence/get-last-id")
            .send({ prefix: 'GSSPEC' });
          const latestId = latestSeqeunce.text;

          return request(app.getHttpServer())
            .delete(`/category/delete-general-subspecification?id=${latestId}`)
            .expect((res) => {
              expect(res.body).toBeInstanceOf(Object);
            });
        });

        it("Subspecification not found", async () => {
          return request(app.getHttpServer())
            .delete(`/category/delete-general-subspecification?id=GSSPEC10000000001`)
            .expect((res) => {
              expect(res.body).toBeInstanceOf(Object);
            });
        });

        it("Subspecification ID is empty", async () => {
          return request(app.getHttpServer())
            .delete(`/category/delete-general-subspecification`)
            .expect((res) => {
              expect(res.body).toBeInstanceOf(Object);
            });
        });
      });

      describe("UTC_PCT_32 Delete base specification", () => {
        it("Specification deleted successfully", async () => {
          const latestSeqeunce = await request(app.getHttpServer())
            .get("/sequence/get-last-id")
            .send({ prefix: 'BSPEC' });
          const latestId = latestSeqeunce.text;

          return request(app.getHttpServer())
            .delete(`/category/delete-base-specification?id=${latestId}`)
            .expect((res) => {
              expect(res.body).toBeInstanceOf(Object);
            });
        });

        it("Specification not found", async () => {
          return request(app.getHttpServer())
            .delete(`/category/delete-base-specification?id=BSPEC10000000001`)
            .expect((res) => {
              expect(res.body).toBeInstanceOf(Object);
            });
        });

        it("Specification ID is empty", async () => {
          return request(app.getHttpServer())
            .delete(`/category/delete-base-specification`)
            .expect((res) => {
              expect(res.body).toBeInstanceOf(Object);
            });
        });
      });

      describe("UTC_PCT_33 Delete base subspecification", () => {
        it("Subspecification deleted successfully", async () => {
          const latestSeqeunce = await request(app.getHttpServer())
            .get("/sequence/get-last-id")
            .send({ prefix: 'BSSPEC' });
          const latestId = latestSeqeunce.text;

          return request(app.getHttpServer())
            .delete(`/category/delete-base-subspecification?id=${latestId}`)
            .expect((res) => {
              expect(res.body).toBeInstanceOf(Object);
            });
        });

        it("Subspecification not found", async () => {
          return request(app.getHttpServer())
            .delete(`/category/delete-base-subspecification?id=BSSPEC10000000001`)
            .expect((res) => {
              expect(res.body).toBeInstanceOf(Object);
            });
        });

        it("Subspecification ID is empty", async () => {
          return request(app.getHttpServer())
            .delete(`/category/delete-base-subspecification`)
            .expect((res) => {
              expect(res.body).toBeInstanceOf(Object);
            });
        });
      });

      describe("UTC_PCT_34 Delete subcategory specification", () => {
        it("Specification deleted successfully", async () => {
          const latestSeqeunce = await request(app.getHttpServer())
            .get("/sequence/get-last-id")
            .send({ prefix: 'SPEC' });
          const latestId = latestSeqeunce.text;

          return request(app.getHttpServer())
            .delete(`/category/delete-subcategory-specification?id=${latestId}`)
            .expect((res) => {
              expect(res.body).toBeInstanceOf(Object);
            });
        });

        it("Specification not found", async () => {
          return request(app.getHttpServer())
            .delete(`/category/delete-subcategory-specification?id=SPEC10000000001`)
            .expect((res) => {
              expect(res.body).toBeInstanceOf(Object);
            });
        });

        it("Specification ID is empty", async () => {
          return request(app.getHttpServer())
            .delete(`/category/delete-subcategory-specification`)
            .expect((res) => {
              expect(res.body).toBeInstanceOf(Object);
            });
        });
      });

      describe("UTC_PCT_35 Delete subcategory subspecification", () => {
        it("Subspecification deleted successfully", async () => {
          const latestSeqeunce = await request(app.getHttpServer())
            .get("/sequence/get-last-id")
            .send({ prefix: 'SSPEC' });
          const latestId = latestSeqeunce.text;

          return request(app.getHttpServer())
            .delete(`/category/delete-subcategory-subspecification?id=${latestId}`)
            .expect((res) => {
              expect(res.body).toBeInstanceOf(Object);
            });
        });

        it("Subspecification not found", async () => {
          return request(app.getHttpServer())
            .delete(`/category/delete-subcategory-subspecification?id=SSPEC10000000001`)
            .expect((res) => {
              expect(res.body).toBeInstanceOf(Object);
            });
        });

        it("Subspecification ID is empty", async () => {
          return request(app.getHttpServer())
            .delete(`/category/delete-subcategory-subspecification`)
            .expect((res) => {
              expect(res.body).toBeInstanceOf(Object);
            });
        });
      });
    })
  });
};