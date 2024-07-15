import {Body, Controller, Post} from '@nestjs/common';
import {UserDto} from "../user/dto/user.dto";
import {UserService} from "../user/user.service";
import {AuthDTO} from "./dto/auth.dto";
import {AuthService} from "./auth.service";

@Controller('auth')
export class AuthController {
    constructor(private userService: UserService,
                private authService: AuthService,) {}

    @Post('register')
    async registerUser(@Body() dto: UserDto){
      return await this.userService.create(dto)
    }

    @Post('login')
    async loginUser(@Body() dto: AuthDTO){
        return await this.authService.login(dto)
    }
}
