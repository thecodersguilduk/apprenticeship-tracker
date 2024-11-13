import { differenceInDays, differenceInWeeks, differenceInMonths } from 'date-fns';

export function getDifferenceFormatted(date) {
  const today = new Date();
  
  const daysDifference = differenceInDays(date, today);

  if (daysDifference < 14) {
    return `${daysDifference} days`;
  }
  
  const weeksDifference = differenceInWeeks(date, today);
  
  if (weeksDifference < 8) {
    return `${weeksDifference} weeks`;
  }
  
  const monthsDifference = differenceInMonths(date, today);
  return `${monthsDifference} months`;
}

