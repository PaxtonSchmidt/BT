export interface Teammate {
  username: string;
  discriminator: number;
  team_role: number;
}
export interface TeammateDetail extends Teammate {
  email: string;
}
