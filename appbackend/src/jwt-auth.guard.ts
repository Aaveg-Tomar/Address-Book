import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from './services/userServices'; 
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private userService: UserService, 
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1];
  
    if (!token) {
      return false;
    }
  
    try {
      const decoded = this.jwtService.verify(token, {
        secret: 'abc',
      });
  
      // Extract the email from the token
      const email = decoded.email;
  
      if (!email) {
        return false; // If email is missing in the token
      }
  
      // Find userId using email
      const userId = await this.userService.getUserIdByEmail(email);
  
      if (!userId) {
        return false; // User not found
      }
  
      // Validate the token using userId
      const isTokenValid = await this.userService.validateToken(userId, token);
  
      if (!isTokenValid) {
        return false;
      }
  
      request.user = { ...decoded, userId }; // Attach userId to the request
      return true;
    } catch (error) {
      return false;
    }
  }
  
}
