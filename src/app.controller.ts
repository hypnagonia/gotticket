import { Controller, Get,  Request, Post, UseGuards ,Body } from '@nestjs/common';
import { AppService } from './app.service';

import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private authService: AuthService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // @UseGuards(LocalAuthGuard)
  // email, password
  @Post('auth/login')
  async login(@Body() user) {
    return this.authService.login(user);
  }
}
