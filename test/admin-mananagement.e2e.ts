import { getTestApp } from './test-app.factory';
import * as request from 'supertest';

export const adminManagementTest = () => {
  describe('Admin Management Module (e2e)', () => {
    let app, adminCookies;

    beforeEach(async () => {
      app = await getTestApp();

      const adminLogin = await request(app.getHttpServer())
        .post('/auth/login')
        .send({ username: 'developer123', password: '123456@ABCdefg' });
      adminCookies = adminLogin.headers['set-cookie'];
    });

    describe('Create', () => {
      describe('UTC_ADM_01 Create admin account', () => {
        it('An admin account was created successfully.', async () => {
        });
        it('Admin details is not complete ', async () => {
        });
      });
    });

    describe('Read', () => {
      describe('UTC_ADM_02 Find all admins', () => {
        it('An array of Admins objects is returned.', async () => {
        });
      });
    });

    describe('Update', () => {
      describe('UTC_ADM_03 Update admin', () => {
        it('An admin account details is updated successfully.', async () => {
        });
        it('Admin details is not complete.', async () => {
        });
        it('Supplier account not found.', async () => {
        });
      });
    });
  });
};