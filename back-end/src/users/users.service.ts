import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { UserAuth } from './schemas';
import { UserDetails } from './schemas';
import { CreateUserDto } from './dto';
import { ExtendedUserDetails } from './types';
import { Role } from 'src/auth/enums';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(UserAuth.name) private userAuthModel: Model<UserAuth>,
    @InjectModel(UserDetails.name) private userDetailsModel: Model<UserDetails>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<ExtendedUserDetails> {
    const { firstName, lastName, mobile, email, birthday, username, password } =
      createUserDto;
    const existingUser = await this.userAuthModel.findOne({ username }).exec();
    if (existingUser) {
      throw new BadRequestException('Username already exists');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const userDetails = new this.userDetailsModel({
      firstName,
      lastName,
      mobile,
      email,
      birthday,
    });

    try {
      const savedUserDetails = await userDetails.save();
      const userAuth = new this.userAuthModel({
        username,
        password: hashedPassword,
        userDetails: savedUserDetails._id,
        role: Role.USER,
      });
      const savedUserAuth = await userAuth.save();
      await this.userDetailsModel
        .findOneAndUpdate({ email }, { userAuth: savedUserAuth._id })
        .exec();
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }

    return {
      firstName,
      lastName,
      mobile,
      email,
      birthday,
      username,
      role: Role.USER,
    };
  }

  async findUserByUsername(
    username: string,
    withPassword: boolean = false,
    withPasswordHash: boolean = false,
  ) {
    return await this.userAuthModel
      .findOne({ username })
      .select(
        `-_id ${!withPassword ? '-password' : ''} ${!withPasswordHash ? '-hashedRefreshToken' : ''}`,
      )
      .populate('userDetails', '-userAuth -_id')
      .exec();
  }

  async findUserByEmail(email: string, withPassword: boolean = true) {
    return await this.userDetailsModel
      .findOne({ email })
      .populate({
        path: 'userAuth',
        select: `${!withPassword ? '-password' : ''}`,
      })
      .exec();
  }

  async updateHashedRefreshToken(
    username: string,
    hashedRefreshToken: string | null,
  ) {
    return this.userAuthModel
      .findOneAndUpdate({ username }, { hashedRefreshToken })
      .exec();
  }
}
