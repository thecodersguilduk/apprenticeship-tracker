export function ragRatingColor(rating){
    switch (rating) {
      case 'Unauthorised Absence':
      case 'Action Required':
        return 'bg-red-500';
      case 'Late':
      case 'Authorised Absence':
      case 'Attention Required':
        return 'bg-orange-500';
      case 'Present':
      case 'Progressing Well':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
}