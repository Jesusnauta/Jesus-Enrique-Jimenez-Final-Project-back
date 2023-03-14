import { Players } from './players';

export type Users = {
  id: string;
  email: string;
  userName: string;
  password: string;
  players: Players[];
};
