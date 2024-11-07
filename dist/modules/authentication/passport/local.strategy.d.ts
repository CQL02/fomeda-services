import { Strategy } from 'passport-local';
import { IAuthenticationService } from '../services/interfaces/authentication.service.interface';
declare const LocalStrategy_base: new (...args: any[]) => Strategy;
export declare class LocalStrategy extends LocalStrategy_base {
    private authService;
    constructor(authService: IAuthenticationService);
    validate(username: string, password: string): Promise<import("../dtos/user.dto").UserDto>;
}
export {};
