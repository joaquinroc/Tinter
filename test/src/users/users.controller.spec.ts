import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from '../../../src/users/users.controller';
import { UsersService } from '../../../src/users/users.service';
import { CreateUserDto } from '../../../src/users/create-user.dto';
import { User } from '../../../src/users/users.schema';

const mockUsersService = {
  create: jest.fn(),
  findAll: jest.fn(),
};

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a new user', async () => {
    const createUserDto: CreateUserDto = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'password123',
    };
    const createdUser: User = createUserDto;
    mockUsersService.create.mockResolvedValue(createdUser);

    const result = await controller.create(createUserDto);
    expect(result).toEqual(createdUser);
    expect(mockUsersService.create).toHaveBeenCalledWith(createUserDto);
  });

  it('should return all users', async () => {
    const users: User[] = [
      {
        name: 'John Doe',
        email: 'john.doe@example.com',
        password: 'password123',
      },
      {
        name: 'Jane Doe',
        email: 'jane.doe@example.com',
        password: 'password123',
      },
    ];
    mockUsersService.findAll.mockResolvedValue(users);

    const result = await controller.findAll();
    expect(result).toEqual(users);
    expect(mockUsersService.findAll).toHaveBeenCalled();
  });
});
