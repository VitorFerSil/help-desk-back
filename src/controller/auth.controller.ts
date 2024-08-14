import { Body, Controller, Post } from '@nestjs/common';

import { AuthService } from 'src/service';
import { AuthInterface, ROUTES } from 'src/types';

@Controller(ROUTES.AUTH)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async auth(
    @Body() createBody: AuthInterface
  ): Promise<{ access_token: string }> {
    return await this.authService.validateUser(createBody);
  }
}
