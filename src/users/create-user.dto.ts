import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsString()
  @ApiProperty()
  readonly name!: string;

  @IsString()
  @ApiProperty()
  readonly email!: string;

  @IsString()
  @ApiProperty()
  readonly password!: string;

  constructor(name: string, email: string, password: string) {
    this.name = name;
    this.email = email;
    this.password = password;
  }
}
