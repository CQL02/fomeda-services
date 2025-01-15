import { getTestApp } from './test-app.factory';
import * as request from 'supertest';

export const supplierManagementTest = () => {
  describe('Announcement Management Module (e2e)', () => {
    let app, adminCookies;

    beforeEach(async () => {
      app = await getTestApp();

      const adminLogin = await request(app.getHttpServer())
        .post('/auth/login')
        .send({ username: 'publicity_admin', password: '123456@ABCdefg' });
      adminCookies = adminLogin.headers['set-cookie'];
    });

    describe('Read', () => {
      describe('UTC_SPR_01 Get pending review suppliers', () => {
        it('An array of pending review Suppliers objects is returned.', async () => {
        });
      });
      describe('UTC_SPR_02 Get rejected suppliers', () => {
        it('An array of rejected Suppliers objects is returned.', async () => {
        });
      });
      describe('UTC_SPR_03 Get approved suppliers', () => {
        it('An array of approved Suppliers objects is returned.', async () => {
        });
      });
    });

    describe('Update', () => {
      describe('UTC_SPR_04 Approve supplier', () => {
        it('A supplier account status is updated successfully.', async () => {
        });
        it('Supplier account not found.', async () => {
        });
      });

      describe('UTC_SPR_05 Reject supplier', () => {
        it('A supplier account status is updated successfully.', async () => {
        });
        it('Reason is empty', async () => {
        });
        it('Supplier account not found.', async () => {
        });
      });
    });
  });
};