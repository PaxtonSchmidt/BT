export interface Invite {
    team_name: string,
    sender_name: string,
    sender_discriminator: number,
    date_sent: Date
}

export interface Invites {
    invites: Invite[]    
}