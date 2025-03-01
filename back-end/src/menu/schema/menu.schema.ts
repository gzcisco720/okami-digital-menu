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
  @Prop({ type: [MenuItem] })
  menuItems: MenuItem[];
}

export const MenuSchema = SchemaFactory.createForClass(Menu);
export type MenuDocument = HydratedDocument<Menu>;
