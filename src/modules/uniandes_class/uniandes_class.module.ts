import { Module } from '@nestjs/common';
import { UniandesClassController } from './uniandes_class.controller';
import { UniandesClassService } from './uniandes_class.service';

@Module({
  controllers: [UniandesClassController],
  providers: [UniandesClassService]
})
export class UniandesClassModule {}