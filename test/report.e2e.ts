import { getTestApp } from "./test-app.factory";
import * as request from "supertest";

export const reportTest = () => {
  describe("Report Module (e2e)", () => {
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
      describe("UTC_RPT_01 Create report", () => {
        const data = {
          pro_id: "1408a6fd-0646-4275-a353-a5b51f18c0e3",
          rpt_title: "Test report",
          rpt_reason: "Test report reason",
        }

        it("A product report is created successfully.", async () => {
          return request(app.getHttpServer())
            .post(`/report/create-report`)
            .send(data)
            .expect((res) => {
              expect(res.text).toBe("true");
            })
        });

        it("Product not found", async () => {
          return request(app.getHttpServer())
            .post(`/report/create-report`)
            .send({ ...data, pro_id: "123456" })
            .expect((res) => {
              expect(res.body).toBeInstanceOf(Object);
            })
        })

        it("Report title is missing", async () => {
          return request(app.getHttpServer())
            .post(`/report/create-report`)
            .send({ ...data, rpt_title: "" })
            .expect((res) => {
              expect(res.body).toBeInstanceOf(Object);
            })
        })

        it("Report reason is missing", async () => {
          return request(app.getHttpServer())
            .post(`/report/create-report`)
            .send({ ...data, rpt_reason: "" })
            .expect((res) => {
              expect(res.body).toBeInstanceOf(Object);
            })
        })
      })
    });

    describe("Read", () => {
      describe("UTC_RPT_02 Get report details", () => {
        const id = "02248a08-53a5-4181-a799-3485ad18fcff";

        it("A report object is returned", async () => {
          return request(app.getHttpServer())
            .get(`/report/get-report-details?id=${id}`)
            .expect((res) => {
              expect(res.body).toBeInstanceOf(Object);
            });
        })

        it("Report not found", async () => {
          return request(app.getHttpServer())
            .get(`/report/get-report-details?id=ABCDEFG`)
            .expect((res) => {
              expect(res.body).toBeInstanceOf(Object);
            });
        })

        it("Report ID is empty", async () => {
          return request(app.getHttpServer())
            .get(`/report/get-report-details`)
            .expect((res) => {
              expect(res.body).toBeInstanceOf(Object);
            });
        })
      })

      describe("UTC_RPT_03 Get supplier report list by filter", () => {
        const data = {
          subcat_ids: ["SCAT000000000001", "SCAT000000000002"],
          search: "xiaomi",
          adm_status_list: ["NOTIFIED", "CLOSED"]
        }

        it("An array of report objects belonging to the supplier is returned", async () => {
          return request(app.getHttpServer())
            .post(`/report/get-supplier-report-list-by-filter`)
            .set("Cookie", supplierCookies)
            .send(data)
            .expect((res) => {
              expect(res.body).toBeInstanceOf(Array);
            });
        })

        it("All reports belonging to the supplier are returned in an array", async () => {
          return request(app.getHttpServer())
            .post(`/report/get-supplier-report-list-by-filter`)
            .set("Cookie", supplierCookies)
            .send({ subcat_ids: [], search: "", adm_status_list: ["NOTIFIED", "CLOSED"] })
            .expect((res) => {
              expect(res.body).toBeInstanceOf(Array);
            });
        })

        it("An empty array is returned", async () => {
          return request(app.getHttpServer())
            .post(`/report/get-supplier-report-list-by-filter`)
            .set("Cookie", supplierCookies)
            .send({ subcat_ids: ["SCAT100000000001"], search: "", adm_status_list: ["NOTIFIED", "CLOSED"] })
            .expect((res) => {
              expect(res.body).toBeInstanceOf(Array);
            });
        })
      })

      describe("UTC_RPT_04 Get admin report list by filter", () => {
        const data = {
          subcat_ids: ["SCAT000000000001", "SCAT000000000002"],
          search: "XiaoMi",
          adm_status_list: ["PENDING", "NOTIFIED"]
        }

        it("An array of report objects is returned", async () => {
          return request(app.getHttpServer())
            .post(`/report/get-admin-report-list-by-filter`)
            .set("Cookie", adminCookies)
            .send(data)
            .expect((res) => {
              expect(res.body).toBeInstanceOf(Array);
            });
        })

        it("All reports are returned in an array", async () => {
          return request(app.getHttpServer())
            .post(`/report/get-admin-report-list-by-filter`)
            .set("Cookie", adminCookies)
            .send({ subcat_ids: [], search: "", adm_status_list: ["PENDING", "NOTIFIED", "CLOSED"] })
            .expect((res) => {
              expect(res.body).toBeInstanceOf(Array);
            });
        })

        it("An empty array is returned", async () => {
          return request(app.getHttpServer())
            .post(`/report/get-admin-report-list-by-filter`)
            .set("Cookie", adminCookies)
            .send({ subcat_ids: ["SCAT100000000001"], search: "", adm_status_list: ["PENDING"] })
            .expect((res) => {
              expect(res.body).toBeInstanceOf(Array);
            });
        })
      })
    });

    describe("Update", () => {
      describe("UTC_RPT_05 update report details", () => {
        it("Report Successfully updated (Supplier)", async () => {
          const id = "02248a08-53a5-4181-a799-3485ad18fcff"
          const data = {sup_status: "CLOSED"}

          return request(app.getHttpServer())
            .put(`/report/update-report-status?id=${id}`)
            .set("Cookie", supplierCookies)
            .send(data)
            .expect(200)
            .expect((res) => {
              expect(res.text).toBe("true");
            })
        })

        it("Report Successfully updated (Administrator)", async () => {
          const id = "11df2cc5-6162-450c-99b0-f85c2f56be7a"
          const data = { adm_status: "NOTIFIED" };

          return request(app.getHttpServer())
            .put(`/report/update-report-status?id=${id}`)
            .set("Cookie", adminCookies)
            .send(data)
            .expect(200)
            .expect((res) => {
              expect(res.text).toBe("true");
            })
        })

        it("Report not found", async () => {
          const id = "abcdefg"
          const data = { adm_status: "NOTIFIED" };

          return request(app.getHttpServer())
            .put(`/report/update-report-status?id=${id}`)
            .set("Cookie", adminCookies)
            .send(data)
            .expect(400)
            .expect((res) => {
              expect(res.body).toBeInstanceOf(Object);
            })
        })
      })
    })
  });
}