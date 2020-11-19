export const API_URL: string =
  'https://5fb53090e473ab0016a17a71.mockapi.io/users';

export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  tel: string;
  address: string;
  avatar_url: string;
}
