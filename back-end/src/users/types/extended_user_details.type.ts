import { UserAuth } from '../schemas/user_auth.schema';
import { UserDetails } from '../schemas/user_details.schema';

export type ExtendedUserDetails = Omit<
  UserAuth & UserDetails,
  'password' | 'userDetails' | 'userAuth' | 'hashedRefreshToken'
>;
