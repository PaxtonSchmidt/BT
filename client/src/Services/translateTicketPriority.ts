export const priorityTranslation = {
    translateTicketPriority(word:  string){
        switch (word){
            case 'High':
                return 1
                break;
            case 'Medium': 
                return 2
                break;
            case 'Low':
                return 3
                break;
            default: 
                return 'ERROR IN TRANSLATING TICKET PRIORITY'
        }
    },
    translateTicketPriorityBack(number: number){
        switch (number){
            case 1:
                return 'High'
                break;
            case 2: 
                return 'Medium'
                break;
            case 3:
                return 'Low'
                break;
            default: 
                return 'ERROR IN TRANSLATING TICKET PRIORITY'
        }
    }
}


