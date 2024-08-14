import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { Repository } from 'typeorm';

import { Organization, Team, User } from 'src/entity';
import { CreateOrganizationInterface, OrganizationEnum } from 'src/types';

dotenv.config();

@Injectable()
export class OrganizationService {
  constructor(
    @InjectRepository(Organization)
    private organizationRepository: Repository<Organization>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Team)
    private teamRepository: Repository<Team>
  ) {}

  async findAll(): Promise<Organization[]> {
    return await this.organizationRepository.find();
  }

  async findById(id: string): Promise<Organization> {
    return await this.organizationRepository.findOne({
      where: { id },
      relations: ['users'] // Inclui a relação 'users'
    });
  }

  async createInitialOrganization(
    createBody: CreateOrganizationInterface
  ): Promise<Organization> {
    const { acronym, name } = createBody;

    const hasOrg = await this.organizationRepository.findOne({
      where: { type: OrganizationEnum.ORGANIZATION }
    });

    if (hasOrg) {
      throw new BadRequestException(
        'Only one organization can have the type ORGANIZATION'
      );
    }

    const newOrganization = this.organizationRepository.create({
      acronym,
      name,
      type: OrganizationEnum.ORGANIZATION
    });

    return await this.organizationRepository.save(newOrganization);
  }
}
