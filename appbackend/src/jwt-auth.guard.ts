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

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1]; 

    if (!token) {
      return false;
    }

    try {
      const decoded = this.jwtService.verify(token, {
        secret: 'your-secret-key', 
      });

      
      const isTokenValid = await this.userService.validateToken(decoded.userId, token);
      if (!isTokenValid) {
        return false; 
      }

      request.user = decoded; 
      return true;
    } catch (error) {
      return false;
    }
  }
}
