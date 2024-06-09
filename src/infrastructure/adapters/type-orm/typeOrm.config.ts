import { env } from 'node:process';

export default {
  host: env['MYSQL_HOST'],
  port: env['MYSQL_PORT'],
  user: env['MYSQL_USER'],
  password: env['MYSQL_PASSWORD'],
  database: env['MYSQL_DATABASE'],

};
