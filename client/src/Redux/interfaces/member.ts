export interface Member {
  username: string;
  discriminator: number;
}

export interface ProjectMember extends Member {
  role_id?: number;
  project_id: number;
}
