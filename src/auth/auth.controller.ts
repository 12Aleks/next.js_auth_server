import {Body, Controller, Post, UseGuards, Request} from '@nestjs/common';
import {UserDto} from "../user/dto/user.dto";
import {UserService} from "../user/user.service";
import {AuthDTO} from "./dto/auth.dto";
import {AuthService} from "./auth.service";
import {RefreshJwtGuards} from "./guards/refresh.guard";

@Controller('auth')
export class AuthController {
    constructor(private userService: UserService,
                private authService: AuthService,) {}

    @Post('register')
    async registerUser(@Body() dto: UserDto){
      console.log("Controller", dto)
      return await this.userService.create(dto)
    }

    @Post('login')
    async loginUser(@Body() dto: AuthDTO){
        return await this.authService.login(dto)
    }

    //For refresh token
    @UseGuards(RefreshJwtGuards)
    @Post('refresh')
    async refreshToken(@Request() req){
        return await this.authService.refreshToken(req.user)
    }
}
