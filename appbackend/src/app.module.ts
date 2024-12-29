import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { UserService } from './services/userServices';
import { AuthController } from './auth.controller';
import { AdminApp, AdminAppSchema } from './schemas/admin.schema';
import { UserApp, UserAppSchema } from './schemas/user.schema';
import { AuthService } from './services/auth.service';

@Module({
  imports: [
    MongooseModule.forRoot("mongodb://127.0.0.1:27017/aaveg-doc"),
    MongooseModule.forFeature([
      { name: UserApp.name, schema: UserAppSchema },
      { name: AdminApp.name, schema: AdminAppSchema },
    ]),
  ],
  controllers: [AppController, AuthController],
  providers: [UserService, AuthService],
})
export class AppModule {}
