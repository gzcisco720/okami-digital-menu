import { IUserDetails } from "./userDetails.interface";

export interface IAuth {
  username: string;
  userDetails: IUserDetails;
}
