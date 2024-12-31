import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth.module';  
import { JwtModule } from '@nestjs/jwt'; 
import { UserApp, UserAppSchema } from './schemas/user.schema'; 
import { UserService } from './services/userServices'; 
import { AuthService } from './services/auth.service';
import { AdminApp, AdminAppSchema } from './schemas/admin.schema';
import { ManagerApp, ManagerAppSchema } from './schemas/manager.schema';
import { UserController } from './user.controller';


@Module({
  imports: [
    MongooseModule.forRoot("mongodb://127.0.0.1:27017/aaveg-doc"),
    AuthModule,  
    JwtModule.register({
      secret: 'abc', 
    }),
    MongooseModule.forFeature([
      { name: AdminApp.name, schema: AdminAppSchema }, 
      { name: ManagerApp.name, schema: ManagerAppSchema }, 
      { name: UserApp.name, schema: UserAppSchema },
    ]),
  ],
  controllers: [UserController],
  providers: [UserService, AuthService], 
  
})
export class AppModule {}
