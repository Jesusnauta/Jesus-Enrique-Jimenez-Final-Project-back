import { Users } from './users';

export type Players = {
  id: string;
  name: string;
  position: string;
  nationality: string;
  age: number;
  preferredFoot: string;
  creator: Users;
};
