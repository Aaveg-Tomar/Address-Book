import { Body, Injectable, Post } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { UserApp, UserAppDocument } from "src/schemas/user.schema";
import { CreateUserAppDTO } from "./create-userapp.dto";
import { AdminApp } from "src/schemas/admin.schema";
import { ManagerApp } from "src/schemas/manager.schema";


@Injectable()
export class UserService{
    constructor(@InjectModel(UserApp.name) private userModel: Model<UserApp>,
    @InjectModel(AdminApp.name) private adminModel: Model<AdminApp>,
    @InjectModel(ManagerApp.name) private managerModel: Model<ManagerApp>,) {}


    async getUserIdByEmail(email: string): Promise<string | null> {
      let user = await this.userModel.findOne({ email });
    
      if (!user) {
        user = await this.managerModel.findOne({ email });
        if (!user) {
          user = await this.adminModel.findOne({ email });
        }
      }
    
      if (!user) {
        return null; // User not found
      }
    
      return user.id; // Return the userId
    }
    


    async validateToken(userId: string, token: string): Promise<boolean> {
      let user = await this.userModel.findById(userId);
    
      if (!user) {
        user = await this.managerModel.findById(userId);
        if (!user) {
          user = await this.adminModel.findById(userId);
        }
      }
    
      if (!user) {
        return false; // User not found
      }
    
      if (user.token !== token) {
        return false; // Token mismatch
      }
    
      return true; // Token is valid
    }
    

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

    async getUserDetailsByEmail(email: string): Promise<UserApp> {
      let user = await this.userModel.findOne({ email });
    
      if (!user) {
        user = await this.managerModel.findOne({ email });
        if (!user) {
          user = await this.adminModel.findOne({ email });
        }
      }
    
      return user; 
    }
    

    
    async deleteUser(id: string): Promise<{ message: string }> {
        await this.userModel.findByIdAndDelete(id).exec();
        return { message: `User with ID ${id} deleted successfully.` };
    }
       
    async addAddress(id : string , newAddress : string):Promise<UserApp>{
        const updatedUser = await this.userModel.findByIdAndUpdate(
            id,
            { $push: { addresses: newAddress } }, 
            { new: true } 
        );

        return updatedUser;

    }


    

    
}