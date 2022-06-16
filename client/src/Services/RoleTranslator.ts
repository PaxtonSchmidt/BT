export default function TranslateTeamRole(team_role: number){
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

}