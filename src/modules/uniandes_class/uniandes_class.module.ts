import { Module } from '@nestjs/common';
import { Uniandes_ClassController } from './uniandes_class.controller';
import { Uniandes_ClassService } from './uniandes_class.service';

@Module({
  controllers: [Uniandes_ClassController],
  providers: [Uniandes_ClassService]
})
export class Uniandes_ClassModule {}