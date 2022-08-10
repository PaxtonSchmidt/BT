export interface DemoAccountType {
    name: string,
    description: string,
    teamCount: number
}

interface DemoCharacters {
    Jessie: DemoAccountType,
    Jamie: DemoAccountType,
    Jordan: DemoAccountType
}

export const DemoCharacters: DemoCharacters = {
    Jessie: {
        name: 'Jessie',
        description: 'A senior level professional',
        teamCount: 4
    },
    Jamie: {
        name: 'Jamie',
        description: 'A junior level professional',
        teamCount: 2
    },
    Jordan: {
        name: 'Jordan',
        description: 'A hobbyist',
        teamCount: 1
    }

}