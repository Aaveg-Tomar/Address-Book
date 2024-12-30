import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthService } from './services/auth.service';
import { AuthController } from './auth.controller';
import { AdminApp, AdminAppSchema } from './schemas/admin.schema';
import { ManagerApp, ManagerAppSchema } from './schemas/manager.schema';
import { UserApp, UserAppSchema } from './schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AdminApp.name, schema: AdminAppSchema },
      { name: ManagerApp.name, schema: ManagerAppSchema },
      { name: UserApp.name, schema: UserAppSchema },
    ]),
    JwtModule.register({
      secret: 'your-secret-key', 
      
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
