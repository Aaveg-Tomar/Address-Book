import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { CreateUserAppDTO } from './services/create-userapp.dto';
import { CreateManagerAppDTO } from './services/create-managerapp.dto';
import { CreateAdminAppDTO } from './services/create-adminapp.dto';



@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // Admin Signup
  @Post('signup/admin')
  async signupAdmin(@Body() createAdminDto: CreateAdminAppDTO) {
    return this.authService.signupAdmin(createAdminDto);
  }

  // Manager Signup
  @Post('signup/manager')
  async signupManager(@Body() createManagerDto: CreateManagerAppDTO) {
    return this.authService.signupManager(createManagerDto);
  }

  // User Signup
  @Post('signup/user')
  async signupUser(@Body() createUserDto: CreateUserAppDTO) {
    return this.authService.signupUser(createUserDto);
  }

  // Admin Login
  @Post('login/admin')
  async loginAdmin(@Body() body: { email: string; password: string }) {
    return this.authService.loginAdmin(body.email, body.password);
  }

  // Manager Login
  @Post('login/manager')
  async loginManager(@Body() body: { email: string; password: string }) {
    return this.authService.loginManager(body.email, body.password);
  }

  // User Login
  @Post('login/user')
  async loginUser(@Body() body: { email: string; password: string }) {
    return this.authService.loginUser(body.email, body.password);
  }
}
