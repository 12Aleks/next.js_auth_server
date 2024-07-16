import {Controller, Get, Param, UseGuards} from '@nestjs/common';
import {UserService} from "./user.service";
import {JwtGuards} from "../auth/guards/jwt.guards";

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @UseGuards(JwtGuards)
    @Get(":id")
    async getUserProfile(@Param("id") id: number) {
         return await this.userService.findById(id)
    }
}
