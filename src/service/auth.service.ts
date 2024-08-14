import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { Repository } from 'typeorm';

import { User } from 'src/entity';
import { AuthInterface } from 'src/types';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  async validateUser(body: AuthInterface): Promise<{ access_token: string }> {
    const { email, password } = body;

    const user = await this.userRepository.findOne({
      where: { email },
      relations: ['organization']
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = {
      userId: user.id,
      organizationId: user.organization.id,
      expiresIn: Date.now() + 3600 * 1000 // 1 hour in milliseconds
    };

    const access_token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '1h'
    });

    return { access_token };
  }
}
