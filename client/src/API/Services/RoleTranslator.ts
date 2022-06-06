export default function TranslateTeamRole(team_role: number){
    switch(team_role){
        case 1:
            return 'Team Owner'
            break;
        case 2:     
            return 'Project Lead'
            break;
        case 3: 
            return 'Dev'
            break;
        default:
            console.log('What are you?')
    }

}