import { getTestApp } from './test-app.factory';
import * as request from 'supertest';

export const announcementManagementTest = () => {
  describe('Announcement Management and Announcement Module (e2e)', () => {
    let app, adminCookies;

    beforeEach(async () => {
      app = await getTestApp();

      const adminLogin = await request(app.getHttpServer())
        .post('/auth/login')
        .send({ username: 'publicity_admin', password: '123456@ABCdefg' });
      adminCookies = adminLogin.headers['set-cookie'];
    });

    describe('Create', () => {
      describe('UTC_ANN_01 Create announcement', () => {

        it('Announcement created successfully.', async () => {
          return request(app.getHttpServer())
            .post(`/announcement/create-announcement`)
            .set('Cookie', adminCookies)
            .send({
              title: 'Test: Create announcement',
              description: 'Test: Announcement details',
              created_by: '0aa97297-a669-483c-b7c1-3dcbe3634876',
              updated_by: '0aa97297-a669-483c-b7c1-3dcbe3634876',
            })
            .expect(201)
            .expect((res) => {
              expect(res.body).toEqual(
                expect.objectContaining({
                  title: expect.any(String),
                  description: expect.any(String),
                  created_by: expect.any(String),
                  updated_by: expect.any(String),
                  visibility: expect.any(Boolean),
                  _id: expect.any(String),
                  created_on: expect.any(String),
                  updated_on: expect.any(String),
                }),
              );
            });
        });

        it('Title is empty', async () => {
          return request(app.getHttpServer())
            .post(`/announcement/create-announcement`)
            .set('Cookie', adminCookies)
            .send({
              title: 'Test: Create announcement',
              created_by: '0aa97297-a669-483c-b7c1-3dcbe3634876',
              updated_by: '0aa97297-a669-483c-b7c1-3dcbe3634876',
            })
            .expect(500);
        });

        it('Description is empty', async () => {
          return request(app.getHttpServer())
            .post(`/announcement/create-announcement`)
            .set('Cookie', adminCookies)
            .send({
              title: 'Test: Create announcement',
              created_by: '0aa97297-a669-483c-b7c1-3dcbe3634876',
              updated_by: '0aa97297-a669-483c-b7c1-3dcbe3634876',
            })
            .expect(500);
        });

      });
    });

    describe('Read', () => {
      describe('UTC_ANN_02 Find all announcements.', () => {

        it('An array of announcement objects is returned.', async () => {
          return request(app.getHttpServer())
            .get(`/announcement/find-all-announcement`)
            .set('Cookie', adminCookies)
            .expect((res) => {
              expect(res.body).toBeInstanceOf(Array);
            });
        });
      });

      describe('UTC_ANN_03 Find visible announcements.', () => {

        it('An array of announcement objects is returned.', async () => {
          return request(app.getHttpServer())
            .get(`/announcement/find-visible-announcement`)
            .set('Cookie', adminCookies)
            .expect((res) => {
              expect(res.body).toBeInstanceOf(Array);
            });
        });
      });
    });

    describe('Update', () => {
      describe('UTC_ANN_04 Update announcement', () => {
        const id = 'f5d90a93-0c60-497a-9ad7-f0eb9bd9aefd';

        it('An announcement is updated successfully.', async () => {
          return request(app.getHttpServer())
            .patch(`/announcement/edit-announcement?id=${id}`)
            .set('Cookie', adminCookies)
            .send({
              description: 'Test: Announcement details',
              title: 'Test: Update announcement',
              updated_by: '0aa97297-a669-483c-b7c1-3dcbe3634876',
            })
            .expect(200)
        });

        it('Title is empty', async () => {
          return request(app.getHttpServer())
            .patch(`/announcement/edit-announcement?id=${id}`)
            .set('Cookie', adminCookies)
            .expect(200);
        });

        it('Description is empty', async () => {
          return request(app.getHttpServer())
            .patch(`/announcement/edit-announcement?id=${id}`)
            .set('Cookie', adminCookies)
            .expect(200);
        });

        it('Announcement not found', async () => {
          return request(app.getHttpServer())
            .patch(`/announcement/edit-announcement?id=Invalid`)
            .set('Cookie', adminCookies)
            .send({
              description: 'Test: Announcement details',
              title: 'Test: Update announcement',
              updated_by: '0aa97297-a669-483c-b7c1-3dcbe3634876',
            })
            .expect(200)
            .expect((res) => {
              expect(res.text).toBe('');
            });
        });
      });
    });
  });
};