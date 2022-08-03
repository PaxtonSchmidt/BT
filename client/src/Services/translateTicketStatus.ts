export const statusTranslation = {
  translateTicketStatus(word: string) {
    switch (word) {
      case 'Unassigned':
        return 1;
        break;
      case 'Assigned':
        return 2;
        break;
      case 'Investigating':
        return 3;
        break;
      case 'Reviewing':
        return 4;
        break;
      case 'Closed':
        return 5;
        break;
      default:
        return 'ERROR IN TRANSLATING TICKET STATUS';
    }
  },
  translateTicketStatusBack(number: number) {
    switch (number) {
      case 1:
        return 'Unassigned';
        break;
      case 2:
        return 'Assigned';
        break;
      case 3:
        return 'Investigating';
        break;
      case 4:
        return 'Reviewing';
        break;
      case 5:
        return 'Closed';
        break;
      default:
        return 'ERROR IN TRANSLATING TICKET STATUS';
    }
  },
};
