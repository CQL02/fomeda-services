import { getTestApp } from './test-app.factory';
import * as request from 'supertest';

export const roleManagementTest = () => {
  describe('Announcement Management Module (e2e)', () => {
    let app, adminCookies;

    beforeEach(async () => {
      app = await getTestApp();

      const adminLogin = await request(app.getHttpServer())
        .post('/auth/login')
        .send({ username: 'publicity_admin', password: '123456@ABCdefg' });
      adminCookies = adminLogin.headers['set-cookie'];
    });

    describe('Create', () => {
      describe('UTC_RLE_01 Create role', () => {
        it('A role was created successfully.', async () => {
        });
        it('Role name is empty.', async () => {
        });
        it('Role module is empty.', async () => {
        });
      });
    });

    describe('Read', () => {
      describe('UTC_RLE_02 Get all roles', () => {
        it('An array of Roles objects is returned.', async () => {
        });
      });
      describe('UTC_RLE_03 Get all roles', () => {
        it('An array of active Roles objects is returned.', async () => {
        });
      });
    });

    describe('Update', () => {
      describe('UTC_RLE_04 Update role', () => {
        it('A role is updated successfully.', async () => {
        });
        it('A role is updated successfully.', async () => {
        });
        it('Role name is empty.', async () => {
        });
        it('Role module is empty.', async () => {
        });
        it('Role not found.', async () => {
        });
      });
    });
  });
};