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
import { UpdateMenuPriceDto } from './dto/updateMenuPrice.dto';

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

  @Post(':branch/batch')
  async batchAddMenuItem(
    @Param('branch') branch: string,
    @Body() item: MenuItemDTO[],
  ) {
    return this.menuService.batchAddMenuItem(branch, item);
  }

  @Put(':branch')
  async updateMenuItem(
    @Param('branch') branch: string,
    @Body() item: MenuItemDTO,
  ) {
    return this.menuService.updateMenuItem(branch, item);
  }

  @Put(':branch/price')
  async updateMenuPrice(
    @Param('branch') branch: string,
    @Body() updateMenuPriceDto: UpdateMenuPriceDto,
  ) {
    return this.menuService.updateMenuPrice(branch, updateMenuPriceDto);
  }

  @Put(':branch/categories')
  async updateMenuCategories(
    @Param('branch') branch: string,
    @Body() categories: string[],
  ) {
    return this.menuService.updateMenuCategories(branch, categories);
  }
}
