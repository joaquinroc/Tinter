import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { UsersService } from '../../../src/users/users.service';
import { User, UserDocument } from '../../../src/users/users.schema';
import { CreateUserDto } from '../../../src/users/create-user.dto';

const mockUser = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  password: 'password123',
};

const createUserDto: CreateUserDto = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  password: 'password123',
};

class MockUserModel {
  constructor(private data: any) {}
  save = jest.fn().mockResolvedValue(this.data);
  static find = jest.fn().mockReturnValue({
    exec: jest.fn().mockResolvedValue([mockUser]),
  });
}

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getModelToken(User.name),
          useValue: MockUserModel,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new user', async () => {
      const mockUserInstance = new MockUserModel(mockUser);
      jest
        .spyOn(mockUserInstance, 'save')
        .mockResolvedValueOnce(mockUser as UserDocument);

      const result = await service.create(createUserDto);
      expect(result).toEqual(mockUser);
    });
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const result = await service.findAll();
      expect(result).toEqual([mockUser]);
      expect(MockUserModel.find).toHaveBeenCalled();
    });
  });
});
