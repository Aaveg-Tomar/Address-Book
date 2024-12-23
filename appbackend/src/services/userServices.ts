import { Body, Injectable, Post } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { UserApp, UserAppDocument } from "src/schemas/user.schema";
import { CreateUserAppDTO } from "./create-userapp.dto";

@Injectable()
export class UserService{
    constructor(@InjectModel(UserApp.name) private userModel: Model<UserApp>) {}


    createUser(createUserAppdto : CreateUserAppDTO):Promise<UserApp> {
        const createdUser = new this.userModel(createUserAppdto);
        return createdUser.save();
    }

    async findAll(): Promise<UserApp[]> {
        return this.userModel.find().exec();
    }

    async findUser(id: string): Promise<UserApp> {
        const user = await this.userModel.findById(id).exec();
        return user
    }
    

    async updateUser(id: string, createUserAppdto: CreateUserAppDTO): Promise<UserApp> {
        return this.userModel.findByIdAndUpdate(id, createUserAppdto, { new: true }).exec();
        
    }

    
    async deleteUser(id: string): Promise<{ message: string }> {
        await this.userModel.findByIdAndDelete(id).exec();
        return { message: `User with ID ${id} deleted successfully.` };
    }
       

    
}