import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { UserAuth } from './user_auth.schema';

@Schema({ versionKey: false })
export class UserDetails {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  mobile: string;

  @Prop({ required: true, type: Date })
  birthday: Date;

  @Prop({ type: Types.ObjectId, ref: 'UserAuth' })
  userAuth: UserAuth;
}

export const UserDetailsSchema = SchemaFactory.createForClass(UserDetails);
export type UserDetailsDocument = HydratedDocument<UserDetails>;
