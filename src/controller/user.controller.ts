import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import * as yup from 'yup';

import { User } from 'src/entity/user.entity';
import { UserService } from 'src/service/user.service';
import { CreateUserInterface, ROUTES } from 'src/types';

@Controller(ROUTES.USER)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUser: CreateUserInterface): Promise<User> {
    const createUserSchema: yup.ObjectSchema<CreateUserInterface> = yup.object({
      name: yup.string().required(),
      email: yup.string().email().required(),
      password: yup.string().min(8).max(36).required(),
      picture: yup.string().optional(),
      organization: yup.string().uuid().required(),
      team: yup.array().optional()
    });

    try {
      await createUserSchema.validate(createUser, { abortEarly: false });
    } catch (error) {
      throw new BadRequestException(error.errors);
    }

    return this.userService.create(createUser);
  }
}
