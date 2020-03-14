import { Module } from '@nestjs/common';

import { DatabaseModule } from 'src/modules/database/database.module';

import { AnnuityController } from './annuity.controller';
import { AnnuityProvider } from "./annuity.provider";
import { AnnuityService } from './annuity.service';

@Module({
  imports: [DatabaseModule],
  controllers: [AnnuityController],
  providers: [AnnuityService, ...AnnuityProvider]
})
export class AnnuityModule {}
