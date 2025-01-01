import { Body, Controller, Delete, Get, Headers, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { UserService } from './services/userServices';
import { CreateUserAppDTO } from './services/create-userapp.dto';
import { JwtAuthGuard } from './jwt-auth.guard'; 



@Controller('/users')
export class UserController {
  constructor(private readonly userService: UserService) {}


  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createUserAppdto: CreateUserAppDTO) {
    const user = await this.userService.createUser(createUserAppdto);
    if (user) {
      return { status: 'ok', user };
    } else {
      return { status: 'error', message: 'Failed to create user' };
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('user/:id')
  async getUser(@Param('id') id: string) {
    const result = await this.userService.findUser(id);
    return result;
  }

  @Get('details')
  async getUserDetails(@Headers('email') email: string) {
    if (!email) {
      return {error : "error"}
    }

    const userDetails = await this.userService.getUserDetailsByEmail(email);

    if (!userDetails) {
      {error : "user not found"}
    }

    return { status: 'ok', userDetails };
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() createUserAppdto: CreateUserAppDTO) {
    return this.userService.updateUser(id, createUserAppdto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }
}
