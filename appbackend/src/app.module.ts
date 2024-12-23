import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserApp, UserAppSchema } from './schemas/user.schema';
import { UserService } from './services/userServices';


@Module({
  imports: [MongooseModule.forRoot("mongodb://127.0.0.1:27017/aaveg-doc") , MongooseModule.forFeature([{ name: UserApp.name, schema: UserAppSchema }])],
  
  controllers: [AppController],
  providers : [UserService]
  
})
export class AppModule {}
