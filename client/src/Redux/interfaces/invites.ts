export interface Invite {
  invite_id: string;
  team_name: string;
  sender_name: string;
  sender_discriminator: number;
  date_sent: string;
}

export interface Invites {
  invites: Invite[];
}
