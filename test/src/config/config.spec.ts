import config from '../../../src/config/config';

describe('Configuration Function', () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...OLD_ENV }; // Copia el entorno original
  });

  afterAll(() => {
    process.env = OLD_ENV; // Restaura el entorno original
  });

  it('should return default configuration when environment variables are not set', () => {
    delete process.env['APP_PORT'];
    delete process.env['API_DESCRIPTION'];
    delete process.env['DB_HOST'];
    delete process.env['DB_PORT'];
    delete process.env['DB_NAME'];
    delete process.env['DB_PASSWORD'];
    delete process.env['DB_USER'];
    delete process.env['DB_URI'];

    const result = config();
    expect(result).toEqual({
      port: 3000,
      description: undefined,
      database: {
        host: undefined,
        port: 27017,
        name: undefined,
        password: undefined,
        user: undefined,
        uri: undefined,
      },
    });
  });

  it('should return configuration based on environment variables', () => {
    process.env['APP_PORT'] = '4000';
    process.env['API_DESCRIPTION'] = 'Test API';
    process.env['DB_HOST'] = 'localhost';
    process.env['DB_PORT'] = '5432';
    process.env['DB_NAME'] = 'testdb';
    process.env['DB_PASSWORD'] = 'secret';
    process.env['DB_USER'] = 'admin';
    process.env['DB_URI'] = 'mongodb://localhost:27017/testdb';

    const result = config();
    expect(result).toEqual({
      port: 4000,
      description: 'Test API',
      database: {
        host: 'localhost',
        port: 5432,
        name: 'testdb',
        password: 'secret',
        user: 'admin',
        uri: 'mongodb://localhost:27017/testdb',
      },
    });
  });
});
