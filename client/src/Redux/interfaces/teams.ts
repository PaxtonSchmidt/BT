export interface Team{
    team_id: string,
    team_name: string,
    owner_name: string, 
    date_joined: string,
    owner_discriminator: string
}

export interface Teams{
    teams: Team[]
}