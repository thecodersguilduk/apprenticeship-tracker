export function ragRatingColor(rating){
    switch (rating) {
      case 'Action Required':
        return 'bg-red-500';
      case 'Attention Required':
        return 'bg-orange-500';
      case 'Progressing Well':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
}