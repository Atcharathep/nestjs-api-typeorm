import { IsNotEmpty, IsString, MaxLength } from "class-validator"

export class CreateUserDto {

    @IsNotEmpty({ message: 'userid cannot be empty' })
    @IsString({ message: 'userid must be a string' })
    @MaxLength(13, { message: 'userid must be at most 13 characters long' })
    userid: string;

    @IsNotEmpty({ message: 'username cannot be empty' })
    @IsString({ message: 'username cannot be empty' })
    @MaxLength(20, { message: 'username must be at most 20 characters long' })
    username: string;

    @IsNotEmpty({ message: 'Password cannot be empty' })
    @IsString({ message: 'Password must be a string' })
    @MaxLength(16, { message: 'Password must be at most 16 characters long' })
    password: string;
}
