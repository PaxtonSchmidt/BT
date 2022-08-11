export interface DemoAccountType {
    name: string,
    description: string
}

interface DemoCharacters {
    Jessie: DemoAccountType,
    Jamie: DemoAccountType,
    Jordan: DemoAccountType
}

export const DemoCharacters: DemoCharacters = {
    Jessie: {
        name: 'Jessie',
        description: 'A senior level professional'
    },
    Jamie: {
        name: 'Jamie',
        description: 'A junior level professional'
    },
    Jordan: {
        name: 'Jordan',
        description: 'A hobbyist'
    }

}