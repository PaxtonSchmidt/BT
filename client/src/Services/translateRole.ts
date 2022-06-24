export const translateRole = {
    TranslateRole(team_role: number){
        if(team_role === undefined) return null
        switch(team_role){
            case 1:
                return 'Team Owner'
            case 2:     
                return 'Lead'
            case 3: 
                return 'Developer'
            default:
                console.log('Something broke the role translator...')
        }
    },
    TranslateRoleBack(team_role: string){
        if(team_role === undefined) return null
        switch(team_role){
            case 'Team Owner':
                return 1
            case 'Lead':     
                return 2
            case 'Developer': 
                return 3
            default:
                console.log('Something broke the role translator...')
        }
    },
    TranslateProjectRole(team_role: number){
        if(team_role === undefined) return null
        switch(team_role){
            case 1:
                return 'Team Owner'
            case 2:     
                return 'Project Lead'
            case 3: 
                return 'Developer'
            default:
                console.log('Something broke the role translator...')
        }
    },
    TranslateProjectRoleBack(team_role: string){
        if(team_role === undefined) return null
        switch(team_role){
            case 'Team Owner':
                return 1
            case 'Project Lead':     
                return 2
            case 'Developer': 
                return 3
            default:
                console.log('Something broke the role translator...')
        }
    
    }
}


