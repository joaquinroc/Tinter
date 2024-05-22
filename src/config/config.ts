
export default () => ({
  port: parseInt(process.env['APP_PORT'] || '', 10) || 3000,
  database: {
    host: process.env['DB_HOST'],
    port: parseInt(process.env['DB_PORT'] || '', 10) || 27017,
    name: process.env['DB_NAME'],
    password: process.env['DB_PASSWORD'],
    user: process.env['DB_USER'],
    uri: process.env['DB_URI']

  }
});