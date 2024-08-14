import {
  Injectable,
  NestMiddleware,
  UnauthorizedException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { Repository } from 'typeorm';

import { Organization, User } from 'src/entity';

@Injectable()
export class UserValidationMiddleware implements NestMiddleware {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Organization)
    private readonly organizationRepository: Repository<Organization>
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException('Token not provided');
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET) as {
        userId: string;
        exp: number;
      };
      const user = await this.userRepository.findOne({
        where: { id: decoded.userId },
        relations: ['organization']
      });

      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      const organization = await this.organizationRepository.findOne({
        where: { id: user.organization.id }
      });

      if (!organization) {
        throw new UnauthorizedException('Organization not found');
      }

      req.user = user; // Adiciona o usuário à requisição para uso posterior
      next();
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
