import { Body, Controller, Post } from '@nestjs/common'
import { ApiResponse, ApiTags } from '@nestjs/swagger'

import { AuthService } from './auth.service'
import { RegistrationDto, RegistrationResponseDto } from './dto'

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiResponse({ type: RegistrationResponseDto })
  async register(@Body() registrationDto: RegistrationDto) {
    return await this.authService.register(registrationDto)
  }
}
