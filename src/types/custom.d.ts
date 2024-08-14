import { User } from 'src/entity/user.entity';

declare module 'express' {
  export interface Request {
    user?: User;
  }
}
