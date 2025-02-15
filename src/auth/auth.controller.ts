import { Body, Controller, Post } from '@nestjs/common'
import { ApiResponse, ApiTags } from '@nestjs/swagger'

import { AuthService } from './auth.service'
import { AuthDto, LoginResponseDto, RegistrationDto, RegistrationResponseDto } from './dto'
import { Public } from 'src/common'
import { plainToInstance } from 'class-transformer'

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('register')
  @ApiResponse({ type: RegistrationResponseDto })
  async register(@Body() registrationDto: RegistrationDto) {
    const userEntity = await this.authService.register(registrationDto)
    return plainToInstance(RegistrationResponseDto, userEntity, { excludeExtraneousValues: true })
  }

  @Public()
  @Post('login')
  @ApiResponse({ type: LoginResponseDto })
  async login(@Body() authDto: AuthDto): Promise<LoginResponseDto> {
    return await this.authService.login(authDto)
  }
}
