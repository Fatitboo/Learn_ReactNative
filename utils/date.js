export function getFomattedDate(date){
    return `${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}`;
} 
export function getMinusDate(date, days){
    return new Date(date.getFullYear(), date.getMonth(), date.getDate()-days);
}