import { Module } from '@nestjs/common';

import { DatabaseModule } from "../database/database.module";

import { CertificatesReceivedController } from './certificates-received.controller';
import { CertificatesReceivedProvider } from "./certificates-received.provider";
import { CertificatesReceivedService } from './certificates-received.service';

@Module({
    imports: [DatabaseModule],
    controllers: [CertificatesReceivedController],
    providers: [CertificatesReceivedService, ...CertificatesReceivedProvider],
    
})
export class CertificatesReceivedModule {}
