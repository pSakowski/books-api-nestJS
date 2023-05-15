import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('/')
  getAll() {
    return this.usersService.getAll();
  }

  @Get('/:id')
  async getById(@Param('id') id: string) {
    const user = await this.usersService.getById(id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }
}
