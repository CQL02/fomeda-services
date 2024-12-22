import { Module } from '@nestjs/common';
import { RoleService } from './services/implementations/role.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Role, RoleSchema } from './domain/schema/role.schema';
import { RoleRepository } from './domain/repositories/role.repository';
import { RoleController } from './controllers/role.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Role.name, schema: RoleSchema },
    ]),
  ],
  controllers: [RoleController],
  exports: [RoleService.name],
  providers: [
    { provide: RoleService.name, useClass: RoleService },
    RoleRepository,
  ],
})
export class RoleModule {}
