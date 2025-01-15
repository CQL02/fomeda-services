import { getTestApp } from './test-app.factory';
import * as request from 'supertest';

export const contentManagementTest = () => {
  describe('Content Management and Content Module (e2e)', () => {
    let app, adminCookies;

    beforeEach(async () => {
      app = await getTestApp();

      const adminLogin = await request(app.getHttpServer())
        .post('/auth/login')
        .send({ username: 'publicity_admin', password: '123456@ABCdefg' });
      adminCookies = adminLogin.headers['set-cookie'];
    });

    describe('Create', () => {
      describe('UTC_CNT_01 Create carousel', () => {
        it('Carousel image created successfully.', async () => {
        });

        it('Carousel image is empty', async () => {
          return request(app.getHttpServer())
            .post(`/content/create-carousel`)
            .set('Cookie', adminCookies)
            .send({
              title: 'Test: Create announcement',
              created_by: '0aa97297-a669-483c-b7c1-3dcbe3634876',
              last_updated_by: '0aa97297-a669-483c-b7c1-3dcbe3634876',
            })
            .expect(500);
        });
      });

      describe('UTC_ANN_02 Create content card', () => {
        it('Content card created successfully.', async () => {
          return request(app.getHttpServer())
            .post(`/content/create-content`)
            .set('Cookie', adminCookies)
            .send({
              title: 'Test: Create content card',
              description: 'Test: Content card details',
              created_by: '0aa97297-a669-483c-b7c1-3dcbe3634876',
              last_updated_by: '0aa97297-a669-483c-b7c1-3dcbe3634876',
            })
            .expect(201)
            .expect((res) => {
              expect(res.body).toEqual(
                expect.objectContaining({
                  _id: expect.any(String),
                  title: expect.any(String),
                  description: expect.any(String),
                  created_by: expect.any(String),
                  last_updated_by: expect.any(String),
                  created_on: expect.any(String),
                  last_updated_on: expect.any(String),
                }),
              );
            });
        });

        it('Title is empty', async () => {
          return request(app.getHttpServer())
            .post(`/content/create-content`)
            .set('Cookie', adminCookies)
            .send({
              description: 'Test: Content card details',
              created_by: '0aa97297-a669-483c-b7c1-3dcbe3634876',
              last_updated_by: '0aa97297-a669-483c-b7c1-3dcbe3634876',
            })
            .expect(500);
        });

        it('Description is empty', async () => {
          return request(app.getHttpServer())
            .post(`/content/create-content`)
            .set('Cookie', adminCookies)
            .send({
              title: 'Test: Create content card',
              created_by: '0aa97297-a669-483c-b7c1-3dcbe3634876',
              last_updated_by: '0aa97297-a669-483c-b7c1-3dcbe3634876',
            })
            .expect(500);
        });
      });

      describe('UTC_ANN_03 Create history timeline', () => {
        it('History timeline created successfully.', async () => {
          return request(app.getHttpServer())
            .post(`/content/create-history-timeline`)
            .set('Cookie', adminCookies)
            .send({
              title: 'Test: Create history timeline',
              description: 'Test: History timeline details',
              date: '2025-01-02T03:46:50.400Z',
              created_by: '0aa97297-a669-483c-b7c1-3dcbe3634876',
              last_updated_by: '0aa97297-a669-483c-b7c1-3dcbe3634876',
            })
            .expect(201)
            .expect((res) => {
              expect(res.body).toEqual(
                expect.objectContaining({
                  _id: expect.any(String),
                  title: expect.any(String),
                  description: expect.any(String),
                  date: expect.any(String),
                  created_by: expect.any(String),
                  last_updated_by: expect.any(String),
                  created_on: expect.any(String),
                  last_updated_on: expect.any(String),
                }),
              );
            });
        });

        it('Title is empty', async () => {
          return request(app.getHttpServer())
            .post(`/content/create-history-timeline`)
            .set('Cookie', adminCookies)
            .send({
              description: 'Test: History timeline details',
              date: '2025-01-02T03:46:50.400Z',
              created_by: '0aa97297-a669-483c-b7c1-3dcbe3634876',
              last_updated_by: '0aa97297-a669-483c-b7c1-3dcbe3634876',
            })
            .expect(500);
        });

        it('Description is empty', async () => {
          return request(app.getHttpServer())
            .post(`/content/create-history-timeline`)
            .set('Cookie', adminCookies)
            .send({
              title: 'Test: Create history timeline',
              date: '2025-01-02T03:46:50.400Z',
              created_by: '0aa97297-a669-483c-b7c1-3dcbe3634876',
              last_updated_by: '0aa97297-a669-483c-b7c1-3dcbe3634876',
            })
            .expect(500);
        });

        it('Date is empty', async () => {
          return request(app.getHttpServer())
            .post(`/content/create-history-timeline`)
            .set('Cookie', adminCookies)
            .send({
              title: 'Test: Create history timeline',
              description: 'Test: History timeline details',
              created_by: '0aa97297-a669-483c-b7c1-3dcbe3634876',
              last_updated_by: '0aa97297-a669-483c-b7c1-3dcbe3634876',
            })
            .expect(500);
        });
      });
    });

    describe('Read', () => {
      describe('UTC_CNT_04 Find all carousel.', () => {

        it('An array of carousel objects is returned.', async () => {
          return request(app.getHttpServer())
            .get(`/content/find-all-carousel`)
            .set('Cookie', adminCookies)
            .expect((res) => {
              expect(res.body).toBeInstanceOf(Array);
            });
        });
      });

      describe('Read', () => {
        describe('UTC_CNT_04 Find all carousel.', () => {
          it('An array of carousel objects is returned.', async () => {
            return request(app.getHttpServer())
              .get(`/content/find-all-carousel`)
              .set('Cookie', adminCookies)
              .expect((res) => {
                expect(res.body).toBeInstanceOf(Array);
              });
          });
        });

        describe('UTC_CNT_05 Find visible carousel.', () => {
          it('An array of carousel objects is returned.', async () => {
            return request(app.getHttpServer())
              .get(`/content/find-visible-carousel`)
              .set('Cookie', adminCookies)
              .expect((res) => {
                expect(res.body).toBeInstanceOf(Array);
              });
          });
        });

        describe('UTC_CNT_06 Find all content.', () => {
          it('An array of content objects is returned.', async () => {
            return request(app.getHttpServer())
              .get(`/content/find-all-content`)
              .set('Cookie', adminCookies)
              .expect((res) => {
                expect(res.body).toBeInstanceOf(Array);
              });
          });
        });

        describe('UTC_CNT_07 Find visible content.', () => {
          it('An array of content objects is returned.', async () => {
            return request(app.getHttpServer())
              .get(`/content/find-visible-content`)
              .set('Cookie', adminCookies)
              .expect((res) => {
                expect(res.body).toBeInstanceOf(Array);
              });
          });
        });

        describe('UTC_CNT_08 Find all history timelines.', () => {
          it('An array of history timeline objects is returned.', async () => {
            return request(app.getHttpServer())
              .get(`/content/find-all-history-timeline`)
              .set('Cookie', adminCookies)
              .expect((res) => {
                expect(res.body).toBeInstanceOf(Array);
              });
          });
        });

        describe('UTC_CNT_09 Find visible history timelines.', () => {
          it('An array of content objects is returned.', async () => {
            return request(app.getHttpServer())
              .get(`/content/find-visible-history-timeline`)
              .set('Cookie', adminCookies)
              .expect((res) => {
                expect(res.body).toBeInstanceOf(Array);
              });
          });
        });
      });

      describe('Update', () => {
        describe('UTC_CNT_10 Update carousel', () => {
          const id = '6785da8751dd090274e9aa69';

          it('Carousel successfully updated.', async () => {
            return request(app.getHttpServer())
              .patch(`/content/update-carousel?id=${id}`)
              .set('Cookie', adminCookies)
              .send({
                image: {
                  name: 'fomeda3.png',
                  percent: 100,
                  size: 100,
                  type: 'image/png',
                  uid: 'rc-upload-1736825589671-11',
                  base64: 'data:image/png;base64,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',
                  'thumbUrl': 'data:image/png;base64,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',
                },
                created_by: '0aa97297-a669-483c-b7c1-3dcbe3634876',
                last_updated_by: '0aa97297-a669-483c-b7c1-3dcbe3634876',
                created_on: '2025-01-02T03:31:19.094Z',
                last_updated_on: '2025-01-02T03:56:08.194Z',
                key: '6785da8751dd090274e9aa69',
              })
              .expect(200)
              .expect((res) => {
                expect(res.body).toEqual(
                  expect.objectContaining({
                    image: expect.any(Object),
                    created_by: expect.any(String),
                    last_updated_by: expect.any(String),
                    _id: expect.any(String),
                    created_on: expect.any(String),
                    last_updated_on: expect.any(String),
                  }),
                );
              });
          });

          it('Title is empty', async () => {
            return request(app.getHttpServer())
              .patch(`/content/update-carousel?id=${id}`)
              .set('Cookie', adminCookies)
              .expect(200);
          });

          it('Description is empty', async () => {
            return request(app.getHttpServer())
              .patch(`/content/update-carousel?id=${id}`)
              .set('Cookie', adminCookies)
              .expect(200);
          });

          it('Carousel not found', async () => {
          });
        });

        describe('UTC_CNT_11 Update content', () => {

          it('Content successfully updated.', async () => {
          });

          it('Title is empty.', async () => {
          });

          it('Description is empty.', async () => {
          });

          it('Content not found.', async () => {
          });
        });


        describe('UTC_CNT_12 History timeline', () => {
          const id = 'f5d90a93-0c60-497a-9ad7-f0eb9bd9aefd';

          it('History timeline successfully updated.', async () => {
          });

          it('Title is empty.', async () => {
          });

          it('Description is empty.', async () => {
          });

          it('Date is empty.', async () => {
          });

          it('History timeline not found.', async () => {
          });
        });
      });


      describe('Delete', () => {
        describe('UTC_CNT_13 Delete carousel', () => {
          it('Carousel deleted successfully.', async () => {
          });

          it('Carousel not found.', async () => {
          });

          it('Carousel is emtpy.', async () => {
          });
        });

        describe('UTC_CNT_14 Delete content', () => {
          it('Content deleted successfully.', async () => {
          });

          it('Content not found.', async () => {
          });

          it('Content is empty.', async () => {
          });
        });

        describe('UTC_CNT_15 Delete history timeline', () => {
          it('History timeline deleted successfully.', async () => {
          });

          it('History timeline not found.', async () => {
          });

          it('History timeline is empty', async () => {
          });
        });
      });
    });
  });
};