import { Module } from '@nestjs/common';
import { EasyconfigModule } from 'nestjs-easyconfig';
import { AuthModule } from './auth/auth.module';
import { AuditorModule } from './auditor/auditor.module';
import { EntityModule } from './entity/entity.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
    imports: [
        AuthModule,
        EasyconfigModule.register({}),
        AuditorModule,
        EntityModule
    ],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {}
