export interface Statistic{
    amount: number
}

export interface AssigneeStatistic extends Statistic{
    username: string
    discriminator: number
}

export interface OtherStatistic extends Statistic{
    title: string
}