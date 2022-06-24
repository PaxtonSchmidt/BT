export const priorityTranslation = {
    translateTicketPriority(word:  string){
        switch (word){
            case 'high':
                return 1
                break;
            case 'medium': 
                return 2
                break;
            case 'low':
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


