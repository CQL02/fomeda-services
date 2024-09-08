import { PassportStrategy } from '@nestjs/passport';
import { AuthenticationService } from '../services/implementations/authentication.service';
import { Strategy } from 'passport-local';
import { UnauthorizedException, Injectable, Inject } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { IAuthenticationService } from '../services/interfaces/authentication.service.interface';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor (
    @Inject(AuthenticationService.name) private authService: IAuthenticationService) {
    super()
  }

  async validate(username: string, password: string) {
    const user = await this.authService.findUser({username});

    if (!user || !(await bcrypt.compare(password, user.password)))
      throw new UnauthorizedException("Unauthorized access")

    // password was returned
    return user;
  }
}