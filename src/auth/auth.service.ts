import {Injectable, UnauthorizedException} from '@nestjs/common';
import {AuthDTO} from "./dto/auth.dto";
import {UserService} from "src/user/user.service";
import {compare} from "bcrypt";
import {UserDto} from "../user/dto/user.dto";
import {JwtService} from "@nestjs/jwt";
import * as process from "node:process";

const EXPIRE_TIME = 20 * 1000;

@Injectable()
export class AuthService {
    constructor(private userService: UserService, private  jwtService: JwtService) {}

    async login(dto: AuthDTO) {
       const user = await this.validate(dto);
       const payload = {
           username: user.email,
           sub: {
               name: user.name
           }
       }

       return {
           user,
           backendToken: {
               accessToken: await this.jwtService.signAsync(payload, {
                   expiresIn: '20s',
                   secret: process.env.JWT_SECRET_KEY
               }),
               refreshToken: await this.jwtService.signAsync(payload, {
                   expiresIn: '7d',
                   secret: process.env.JWT_REFRESH_SECRET_KEY
               }),
               expiresIn: new Date().setTime(new Date().getTime() + EXPIRE_TIME)
           }
       }
    }

    async validate(dto: AuthDTO) {
        const {password, ...result}: UserDto = await this.userService.findByEmail(dto.username)  //this is user email not username
        const comparePassword = await compare(dto.password, password)
        if(comparePassword){
            return result;
        }

        throw new UnauthorizedException('Invalid Credentials');
    }

    async refreshToken(user: any) {
        const payload = {
            username: user.username,
            sub: user.sub
        }

        return {
            accessToken: await this.jwtService.signAsync(payload, {
                expiresIn: '20s',
                secret: process.env.JWT_SECRET_KEY
            }),
            refreshToken: await this.jwtService.signAsync(payload, {
                expiresIn: '7d',
                secret: process.env.JWT_REFRESH_SECRET_KEY
            }),
            expiresIn: new Date().setTime(new Date().getTime() + EXPIRE_TIME)
        }
    }
}
