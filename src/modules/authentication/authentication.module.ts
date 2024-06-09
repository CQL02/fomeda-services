import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Admin, AdminSchema } from './domain/schema/admin.schema';
import { Supplier, SupplierSchema } from './domain/schema/supplier.schema';
import { User, UserSchema } from './domain/schema/user.schema';

import { AdminRepository } from './domain/repositories/admin.repository';
import { SupplierRepository } from './domain/repositories/supplier.repository';
import { UserRepository } from './domain/repositories/user.repository';
import { AuthenticationController } from './controllers/authentication.controller';
import { AuthenticationService } from './services/implementations/authentication.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './passport/local.strategy';
import { SessionSerializer } from './passport/session.serializer';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Admin.name, schema: AdminSchema },
      { name: Supplier.name, schema: SupplierSchema },
      { name: User.name, schema: UserSchema },
    ]),
    PassportModule.register({
      session: true
    }),
  ],
  providers: [AuthenticationService, AdminRepository, SupplierRepository, UserRepository, LocalStrategy, SessionSerializer],
  controllers: [AuthenticationController],
})

export class AuthenticationModule {}
