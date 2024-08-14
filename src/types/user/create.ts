export interface CreateUserInterface {
  name: string;
  password: string;
  picture?: string;
  organization: string;
  email: string;
  team: string[];
}
