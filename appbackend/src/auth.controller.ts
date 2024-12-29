import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './services/auth.service';

@Controller('/auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('signup')
    @HttpCode(HttpStatus.CREATED)
    async signup(@Body() body: { email: string; password: string }) {
        return this.authService.signup(body.email, body.password);
    }

    @Post('signin')
    @HttpCode(HttpStatus.OK)
    async signin(@Body() body: { email: string; password: string }) {
        return this.authService.signin(body.email, body.password);
    }
}
