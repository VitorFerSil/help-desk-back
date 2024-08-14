import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';

import { Organization, User } from 'src/entity';
import { CreateInitialUserInterface, CreateUserInterface } from 'src/types';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Organization)
    private organizationRepository: Repository<Organization>
  ) {}

  async create(createBody: CreateUserInterface): Promise<User> {
    const { email, organization, password } = createBody;

    const emailInUse = await this.userRepository.findOne({ where: { email } });

    if (emailInUse) {
      throw new BadRequestException('E-mail already in use');
    }

    const hasOrganization = await this.organizationRepository.findOne({
      where: { id: organization }
    });

    if (!hasOrganization) {
      throw new BadRequestException('No organization with acronym');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const userDto: User = this.userRepository.create({
      email,
      name: createBody.name,
      password: hashedPassword,
      picture: createBody.picture,
      organization: hasOrganization
    });

    try {
      return await this.userRepository.save(userDto);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async createInitialUser(
    createBody: CreateInitialUserInterface
  ): Promise<User> {
    const { email, organization, password, name, role } = createBody;

    const hasOrganization = await this.organizationRepository.findOne({
      where: { id: organization }
    });

    if (!hasOrganization) {
      throw new BadRequestException('No organization with acronym');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = this.userRepository.create({
      email,
      name: name,
      role,
      password: hashedPassword,
      organization: hasOrganization
    });

    try {
      return await this.userRepository.save(newUser);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
