import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {

  constructor(@InjectRepository(User) private usersRepository: Repository<User>) { }

  async create(createUserDto: CreateUserDto) {
    const existingUser = await this.usersRepository.findOneBy({ userid: createUserDto.userid });
    if (existingUser) {
      throw new NotFoundException(`This user account already exists.`);
    }

    const user = new User();
    user.userid = createUserDto.userid;
    user.username = createUserDto.username;
    user.password = createUserDto.password;
    user.createdAt = new Date();

    await this.usersRepository.save(user);
    const { password, ...result } = user; // ตัด password ออกจาก ตัวแปร user แล้วนำมาเก็บไว้ใน result เพื่อส่งข้อมูลกลับไป
    const createdUser = Object.assign({}, result);
    return { message: `User created successfilly`, createdUser };
  }



  async findAll() {
    const users = await this.usersRepository.find({
      order: {
        userid: "ASC",
      }
    }).then(users => {
      return users.map(({ password, ...result }) => Object.assign({}, result));
    });
    return { message: `All users retrieved successfully`, users };
  }



  async findOne(userid: string) {
    const existingUser = await this.usersRepository.findOneBy({ userid });
    if (!existingUser) {
      throw new NotFoundException(`User with ID ${userid} not found`);
    }

    const { password, ...result } = existingUser; // ตัด password ออกจาก ตัวแปร user แล้วนำมาเก็บไว้ใน result เพื่อส่งข้อมูลกลับไป
    const user = Object.assign({}, result);
    return { message: `User with ID ${userid} retrieved successfully`, user };
  }



  async update(userid: string, updateUserDto: UpdateUserDto) {
    const existingUser = await this.usersRepository.findOneBy({ userid });
    if (!existingUser) {
      throw new NotFoundException(`User with ID ${userid} not found`);
    }

    if (updateUserDto['old_password'] !== existingUser.password) {
      throw new NotFoundException(`Passwords do not match`);
    }

    existingUser.userid = updateUserDto.userid || existingUser.userid;
    existingUser.username = updateUserDto.username || existingUser.username;
    existingUser.password = updateUserDto.password || existingUser.password;
    existingUser.updatedAt = new Date();

    await this.usersRepository.save(existingUser);
    const { password, ...result } = existingUser; // ตัด password ออกจาก ตัวแปร user แล้วนำมาเก็บไว้ใน result เพื่อส่งข้อมูลกลับไป

    const user = Object.assign({}, result);
    return { message: `Updated user ID ${userid} successfully`, user };
  }



  async remove(userid: string) {
    const existingUser = await this.usersRepository.findOneBy({ userid });
    if (!existingUser) {
      throw new NotFoundException(`User with ID ${userid} not found`);
    }

    await this.usersRepository.delete(existingUser.roworder);
    const { password, ...result } = existingUser; // ตัด password ออกจาก ตัวแปร user แล้วนำมาเก็บไว้ใน result เพื่อส่งข้อมูลกลับไป
    const user = Object.assign({}, result);
    return { message: `Deleted user ID ${userid} successfully`, user };
  }
}
