export interface NewUser {
    email: string;
    username: string;
    password: string;
    confirmPass: string;
    discriminator: number;
    bio: string;
}