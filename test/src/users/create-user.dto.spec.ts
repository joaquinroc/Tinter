import { validate } from 'class-validator';
import { CreateUserDto } from '../../../src/users/create-user.dto';

describe('CreateUserDto', () => {
  it('should validate correctly with valid data', async () => {
    const dto = new CreateUserDto(
      'John Doe',
      'john.doe@example.com',
      'password123',
    );

    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('should fail validation if name is not a string', async () => {
    const dto = new CreateUserDto(
      123 as any,
      'john.doe@example.com',
      'password123',
    );

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0]?.constraints?.['isString']).toBe('name must be a string');
  });

  it('should fail validation if email is not a string', async () => {
    const dto = new CreateUserDto('John Doe', 123 as any, 'password123');

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0]?.constraints?.['isString']).toBe('email must be a string');
  });

  it('should fail validation if password is not a string', async () => {
    const dto = new CreateUserDto(
      'John Doe',
      'john.doe@example.com',
      123 as any,
    );

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0]?.constraints?.['isString']).toBe(
      'password must be a string',
    );
  });
});
