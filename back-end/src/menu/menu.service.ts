import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Menu } from './schema';
import { CreateMenuDto, MenuItemDTO } from './dto';
import { cleanUpString } from 'src/utils/string.utils';

@Injectable()
export class MenuService {
  private readonly logger = new Logger(MenuService.name);

  constructor(@InjectModel(Menu.name) private menuModel: Model<Menu>) {}

  async createMenu(createMenuDto: CreateMenuDto) {
    try {
      const existingMenuItem = await this.menuModel
        .findOne({ branch: createMenuDto.branch })
        .exec();
      if (existingMenuItem) {
        throw new ConflictException(
          `Menu already exists for ${createMenuDto.branch}`,
        );
      }
      const menuItem = new this.menuModel(createMenuDto);
      return await menuItem.save();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getAllMenus() {
    try {
      return await this.menuModel.find().exec();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getMenuByBranch(branch: string) {
    try {
      return await this.menuModel.findOne({ branch }).exec();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async deleteMenuByBranch(branch: string) {
    try {
      const deleteCount = await this.menuModel
        .findOneAndDelete({ branch })
        .exec();
      if (!deleteCount) {
        throw new NotFoundException(`No menu found for ${branch}`);
      }
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async addMenuItem(branch: string, item: MenuItemDTO) {
    try {
      const menu = await this.menuModel.findOne({ branch }).exec();
      if (!menu) {
        throw new NotFoundException(`No menu found for ${branch}`);
      }
      if (menu.menuItems.some((i) => i.name === item.name)) {
        throw new ConflictException(`Item ${item.name} already exists`);
      }
      menu.menuItems.push(item);
      return await menu.save();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async deleteMenuItem(branch: string, itemName: string) {
    try {
      const menu = await this.menuModel.findOne({ branch }).exec();
      if (!menu) {
        throw new NotFoundException(`No menu found for ${branch}`);
      }
      const itemIndex = menu.menuItems.findIndex(
        (i) => cleanUpString(i.name) === cleanUpString(itemName),
      );
      if (itemIndex === -1) {
        throw new NotFoundException(`Item ${itemName} not found`);
      }
      menu.menuItems.splice(itemIndex, 1);
      return await menu.save();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async updateMenuItem(branch: string, item: MenuItemDTO) {
    try {
      const menu = await this.menuModel.findOne({ branch });
      if (!menu) {
        throw new NotFoundException(`Item ${item.name} not found`);
      }
      const itemIndex = menu.menuItems.findIndex(
        (i) => cleanUpString(i.name) === cleanUpString(item.name),
      );
      if (itemIndex === -1) {
        throw new NotFoundException(`Item ${item.name} not found`);
      }
      menu.menuItems[itemIndex] = item;
      return await menu.save();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
