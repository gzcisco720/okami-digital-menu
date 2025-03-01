import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

class MenuItem {
  @Prop()
  name: string;
  @Prop()
  image: string;
  @Prop()
  description: string;
}

@Schema({ versionKey: false })
export class Menu {
  @Prop()
  branch: string;

  @Prop()
  buffetPrice: number;

  @Prop({ type: [MenuItem] })
  menuItems: MenuItem[];

  @Prop()
  categories: string[];
}

export const MenuSchema = SchemaFactory.createForClass(Menu);
export type MenuDocument = HydratedDocument<Menu>;
