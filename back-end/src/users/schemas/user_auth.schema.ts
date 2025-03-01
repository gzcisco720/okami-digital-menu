import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { UserDetails } from './user_details.schema';
import { Role } from 'src/auth/enums';

@Schema({ versionKey: false })
export class UserAuth {
  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  hashedRefreshToken: string;

  @Prop({ type: String, enum: Role, default: Role.USER })
  role: Role;

  @Prop({ type: Types.ObjectId, ref: 'UserDetails' })
  userDetails: UserDetails;
}

export const UserAuthSchema = SchemaFactory.createForClass(UserAuth);
export type UserAuthDocument = HydratedDocument<UserAuth>;
