import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { AdminApp, AdminAppDocument } from 'src/schemas/admin.schema';

@Injectable()
export class AuthService {
    constructor(@InjectModel(AdminApp.name) private adminModel: Model<AdminAppDocument>) {}

    async signup(email: string, password: string): Promise<{ message: string }> {
        const existingAdmin = await this.adminModel.findOne({ email }).exec();
        if (existingAdmin) {
            throw new Error('Admin with this email already exists.');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newAdmin = new this.adminModel({ email, password: hashedPassword });
        await newAdmin.save();
        return { message: 'Signup successful' };
    }

    async signin(email: string, password: string): Promise<{ token: string }> {
        const admin = await this.adminModel.findOne({ email }).exec();
        if (!admin) {
            throw new Error('Invalid email or password');
        }

        const isPasswordValid = await bcrypt.compare(password, admin.password);
        if (!isPasswordValid) {
            throw new Error('Invalid email or password');
        }

        const token = jwt.sign({ id: admin._id }, 'your-secret-key', { expiresIn: '1h' });
        admin.token = token;
        await admin.save();
        return { token };
    }
}
