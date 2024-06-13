import { PassportStrategy } from '@nestjs/passport';
import { AuthenticationService } from '../services/implementations/authentication.service';
import { Strategy } from 'passport-local';
import { UnauthorizedException , HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor (private authService: AuthenticationService) {
    super()
  }

  async validate(username: string, password: string) {
    const user = await this.authService.findUser({ username});

    if (!user || !(await bcrypt.compare(password, user.password)))
      throw new UnauthorizedException("Unauthorized access")

    // password was returned
    return user;
  }
}