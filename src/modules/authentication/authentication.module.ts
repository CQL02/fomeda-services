import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Admin, AdminSchema } from './domain/schema/admin.schema';
import { Supplier, SupplierSchema } from './domain/schema/supplier.schema';
import { User, UserSchema } from './domain/schema/user.schema';
import { SessionSchema } from './domain/schema/session.schema';

import { AdminRepository } from './domain/repositories/admin.repository';
import { SupplierRepository } from './domain/repositories/supplier.repository';
import { UserRepository } from './domain/repositories/user.repository';
import { AuthenticationController } from './controllers/authentication.controller';
import { AuthenticationService } from './services/implementations/authentication.service';
import { SessionService } from './services/implementations/session.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './passport/local.strategy';
import { SessionSerializer } from './passport/session.serializer';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Admin.name, schema: AdminSchema },
      { name: Supplier.name, schema: SupplierSchema },
      { name: User.name, schema: UserSchema },
      { name: 'Session', schema: SessionSchema }
    ]),
    PassportModule.register({ session: true }),
    ScheduleModule.forRoot(),
  ],
  controllers: [AuthenticationController],
  exports: [ AuthenticationService.name, SessionService.name,],
  providers: [
    { provide: AuthenticationService.name, useClass: AuthenticationService },
    { provide: SessionService.name, useClass: SessionService},
    AdminRepository, SupplierRepository, UserRepository, LocalStrategy, SessionSerializer,
  ],
})

export class AuthenticationModule {}
