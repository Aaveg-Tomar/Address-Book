import { UserApp } from './schemas/user.schema';
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put } from "@nestjs/common";
import { UserService } from "./services/userServices";
import { CreateUserAppDTO } from "./services/create-userapp.dto";

@Controller('/users')
export class AppController {
    constructor(private readonly userService: UserService) {}

    @Post()
    @HttpCode(200)
    async create(@Body() createUserAppdto: CreateUserAppDTO) {
        const user = await this.userService.createUser(createUserAppdto);
        if (user) {
            return { status: 'ok', user }; 
        } else {
            return { status: 'error', message: 'Failed to create user' };
        }
    }

    @Get()
    findAll() {
        return this.userService.findAll();
    }

    

    @Get('user/:id')
    async getUser(@Param('id') id: string) {
        const result = await this.userService.findUser(id);
        return result;  
    }
    


    @Put(':id')
    update(@Param('id') id: string, @Body() createUserAppdto: CreateUserAppDTO) {
        return this.userService.updateUser(id, createUserAppdto);
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.userService.deleteUser(id);
    }


    
}
