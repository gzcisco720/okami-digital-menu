import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { MenuService } from './menu.service';
import { CreateMenuDto, MenuItemDTO } from './dto/createMenu.dto';
import { Public } from 'src/auth/decorators';

@Controller('/api/menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Post()
  async createMenu(@Body() createMenuDto: CreateMenuDto) {
    return this.menuService.createMenu(createMenuDto);
  }

  @Get()
  async getAllMenus() {
    return this.menuService.getAllMenus();
  }

  @Public()
  @Get(':branch')
  async getMenuByBranch(@Param('branch') branch: string) {
    return this.menuService.getMenuByBranch(branch);
  }

  @Delete(':branch')
  async deleteMenuByBranch(
    @Param('branch') branch: string,
    @Query('itemName') itemName: string,
  ) {
    if (itemName) {
      return this.menuService.deleteMenuItem(branch, itemName);
    }
    return this.menuService.deleteMenuByBranch(branch);
  }

  @Post(':branch')
  async addMenuItem(
    @Param('branch') branch: string,
    @Body() item: MenuItemDTO,
  ) {
    return this.menuService.addMenuItem(branch, item);
  }

  @Put(':branch')
  async updateMenuItem(
    @Param('branch') branch: string,
    @Body() item: MenuItemDTO,
  ) {
    return this.menuService.updateMenuItem(branch, item);
  }
}
