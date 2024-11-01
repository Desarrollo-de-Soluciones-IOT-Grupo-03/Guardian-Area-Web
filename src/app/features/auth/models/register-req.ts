import { Roles } from "../enums/roles";

export interface RegisterReq {
  username: string;
  password: string;
  email: string;
  roles: Roles[];
  firstName: string;
  lastName: string;
}
