import { OpenidRequest } from 'express-openid-connect';

declare module 'express' {
  interface Request extends OpenidRequest {}
}