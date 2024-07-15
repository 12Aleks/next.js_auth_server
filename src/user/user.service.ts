import {ConflictException, Injectable} from '@nestjs/common';
import {PrismaService} from "../prisma.service";
import {UserDto} from "./dto/user.dto";
import {hash} from "bcrypt";

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) {}

    async create(dto: UserDto){
       const user = this.findByEmail(dto.email);

       if (user) throw new ConflictException(`User with this email ${dto.email} already exists`);

       const newUser = await this.prisma.user.create({
           data: {
               ...dto,
               password: await hash(dto.password, 10),
           }
       });

       const {password, ...result} = newUser;

       return result;
    }

    async findByEmail(email: string){
        return this.prisma.user.findUnique({
            where: {
                email: email
            }
        });
    }
}
