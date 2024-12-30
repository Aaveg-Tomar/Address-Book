import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';


import { AdminApp, AdminAppDocument } from 'src/schemas/admin.schema';
import { ManagerApp, ManagerAppDocument } from 'src/schemas/manager.schema';
import { UserApp, UserAppDocument } from 'src/schemas/user.schema';

import { CreateUserAppDTO } from './create-userapp.dto';
import { CreateManagerAppDTO } from './create-managerapp.dto';
import { CreateAdminAppDTO } from './create-adminapp.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(AdminApp.name) private adminModel: Model<AdminAppDocument>,
    @InjectModel(ManagerApp.name) private managerModel: Model<ManagerAppDocument>,
    @InjectModel(UserApp.name) private userModel: Model<UserAppDocument>,
    private jwtService: JwtService,
  ) {}

  // Hash the password before saving to the database
  private async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  // Validate password during login
  private async validatePassword(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  // Generate JWT token
  private generateToken(payload: any): string {
    return this.jwtService.sign(payload);
  }

  // **Signup for Admin**
  async signupAdmin(createAdminDto: CreateAdminAppDTO): Promise<AdminApp> {
    const hashedPassword = await this.hashPassword(createAdminDto.password);

    const newAdmin = new this.adminModel({
      ...createAdminDto,
      password: hashedPassword,
    });

    newAdmin.token = this.generateToken({ email: newAdmin.email, role: 'admin' });

    return newAdmin.save();
  }

  // **Signup for Manager**
  async signupManager(createManagerDto: CreateManagerAppDTO): Promise<ManagerApp> {
    const hashedPassword = await this.hashPassword(createManagerDto.password);

    const newManager = new this.managerModel({
      ...createManagerDto,
      password: hashedPassword,
    });

    newManager.token = this.generateToken({ email: newManager.email, role: 'manager' });

    return newManager.save();
  }

  // **Signup for User**
  async signupUser(createUserDto: CreateUserAppDTO): Promise<UserApp> {
    const hashedPassword = await this.hashPassword(createUserDto.password);

    const newUser = new this.userModel({
      ...createUserDto,
      password: hashedPassword,
    });

    newUser.token = this.generateToken({ email: newUser.email, role: 'user' });

    return newUser.save();
  }

  // **Login for Admin**
  async loginAdmin(email: string, password: string): Promise<string> {
    const admin = await this.adminModel.findOne({ email });
    if (!admin) throw new UnauthorizedException('Invalid credentials');

    const isValidPassword = await this.validatePassword(password, admin.password);
    if (!isValidPassword) throw new UnauthorizedException('Invalid credentials');

    const token = this.generateToken({ email: admin.email, role: 'admin' });
    admin.token = token;
    await admin.save();

    return token;
  }

  // **Login for Manager**
  async loginManager(email: string, password: string): Promise<string> {
    const manager = await this.managerModel.findOne({ email });
    if (!manager) throw new UnauthorizedException('Invalid credentials');

    const isValidPassword = await this.validatePassword(password, manager.password);
    if (!isValidPassword) throw new UnauthorizedException('Invalid credentials');

    const token = this.generateToken({ email: manager.email, role: 'manager' });
    manager.token = token;
    await manager.save();

    return token;
  }

  // **Login for User**
  async loginUser(email: string, password: string): Promise<string> {
    const user = await this.userModel.findOne({ email });
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const isValidPassword = await this.validatePassword(password, user.password);
    if (!isValidPassword) throw new UnauthorizedException('Invalid credentials');

    const token = this.generateToken({ email: user.email, role: 'user' });
    user.token = token;
    await user.save();

    return token;
  }
}
