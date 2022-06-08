export function translateTicketPriority(word:  string){
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
}

export function translateTicketPriorityBack(number: number){
    switch (number){
        case 1:
            return 'high'
            break;
        case 2: 
            return 'medium'
            break;
        case 3:
            return 'low'
            break;
        default: 
            return 'ERROR IN TRANSLATING TICKET PRIORITY'
    }
}

module.exports = {translateTicketPriority, translateTicketPriorityBack}