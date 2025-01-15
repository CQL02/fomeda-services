import { getTestApp } from './test-app.factory';
import * as request from 'supertest';

export const authenticationTest = () => {
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
      describe('UTC_AUT_01 Register supplier account', () => {
        it('A supplier account was created successfully.', async () => {
        });
        it('Supplier details is not complete.', async () => {
        });
      });
    });

    describe('Read', () => {
      describe('UTC_AUT_02 Check duplicate username', () => {
        it('Username is not duplicated.', async () => {
        });
        it('Username is duplicated.', async () => {
        });
        it('Username is empty.', async () => {
        });
      });
      describe('UTC_AUT_03 Check duplicate email', () => {
        it('Email is not duplicated.', async () => {
        });
        it('Email is duplicated.', async () => {
        });
        it('Email is empty.', async () => {
        });
      });
      describe('UTC_AUT_04 Check supplier account status', () => {
        it('An object of supplier account status is returned.', async () => {
        });
        it('Username is invalid.', async () => {
        });
        it('Username is empty.', async () => {
        });
      });
      describe('UTC_AUT_05 Get rejection info ', () => {
        it('An object of supplier account\'s latest rejection info is returned.', async () => {
        });
        it('User id is invalid.', async () => {
        });
        it('User id is empty.', async () => {
        });
      });
      describe('UTC_AUT_06 Get appeal info ', () => {
        it('An object of supplier account\'s info is returned.', async () => {
        });
        it('User id is invalid.', async () => {
        });
        it('User id is empty.', async () => {
        });
      });
      describe('UTC_AUT_07 Get profile info ', () => {
        it('An object of account profile info is returned.', async () => {
        });
        it('User id is invalid.', async () => {
        });
        it('User id is empty.', async () => {
        });
      });
      describe('UTC_AUT_08 Check forget password email  ', () => {
        it('Email exists.', async () => {
        });
        it('Email does not exist.', async () => {
        });
        it('Email is empty.', async () => {
        });
      });
      describe('UTC_AUT_09 Get email by user id', () => {
        it('An object of account email is returned.', async () => {
        });
        it('User id is invalid. ', async () => {
        });
        it('User id is empty. ', async () => {
        });
      });
    });

    describe('Update', () => {
      describe('UTC_AUT_10 Appeal supplier account registration', () => {
        it('A supplier account status is updated successfully.', async () => {
        });
        it('Supplier details is not complete.', async () => {
        });
        it('Supplier account not found.', async () => {
        });
      });
      describe('UTC_AUT_11 Update profile', () => {
        it('A supplier account profile info is updated successfully.', async () => {
        });
        it('An admin account profile info is updated successfully.', async () => {
        });
        it('User id is invalid.', async () => {
        });
        it('User id is empty.', async () => {
        });
      });
      describe('UTC_AUT_12 Update password', () => {
        it('A supplier account password is updated successfully.', async () => {
        });
        it('An admin account password is updated successfully.', async () => {
        });
        it('Old password is empty.', async () => {
        });
        it('New password is empty.', async () => {
        });
        it('User id is invalid.', async () => {
        });
        it('User id is empty.', async () => {
        });
      });
      describe('UTC_AUT_13 Reset password', () => {
        it('A supplier account password is reset successfully.', async () => {
        });
        it('An admin account password is reset successfully.', async () => {
        });
        it('Password is empty.', async () => {
        });
        it('User id is invalid.', async () => {
        });
        it('User id is empty.', async () => {
        });
      });

      describe('UTC_AUT_14 Deactivate account', () => {
        it('A supplier account status is deactivated successfully.', async () => {
        });
        it('An admin account status is deactivated successfully.', async () => {
        });
        it('User id is invalid.', async () => {
        });
        it('User id is empty.', async () => {
        });
      });
    });
  });
};