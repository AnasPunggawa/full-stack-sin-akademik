export function averagePredicate(averageGrade) {
  if (averageGrade >= 93 && averageGrade <= 100) return 'A';
  if (averageGrade >= 84 && averageGrade <= 92) return 'B';
  if (averageGrade >= 75 && averageGrade <= 83) return 'C';
  return 'D';
}
