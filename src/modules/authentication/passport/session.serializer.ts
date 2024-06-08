import { PassportSerializer } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthenticationService } from './services/implementations/authentication.service';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  serializeUser(user: any, done: (err: Error, user: any) => void): any {
    done(null, {user_id: user.user_id })
  }

  deserializeUser(payload: any, done: (err: Error, payload: string) => void): any {
    done(null, payload)
  }
}