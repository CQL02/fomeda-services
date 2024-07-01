import { Module } from '@nestjs/common';
import { MapperUtils } from './utils/mapper.utils';

@Module({
  providers: [MapperUtils],
  exports: [MapperUtils]
})
export class CommonModule {}
