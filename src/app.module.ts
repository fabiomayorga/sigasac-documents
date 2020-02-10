import { Module } from '@nestjs/common';
import { EasyconfigModule } from 'nestjs-easyconfig';
import { AuthModule } from './auth/auth.module';


@Module({
    imports: [
        AuthModule,
        EasyconfigModule.register({})
    ],
    controllers: [],
    providers: []
})
export class AppModule {}
