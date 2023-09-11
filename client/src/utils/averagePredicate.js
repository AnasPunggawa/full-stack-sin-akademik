export function averagePredicate(averageGrade) {
  switch (averageGrade) {
    case averageGrade >= 93 && averageGrade <= 100:
      return 'A';
    case averageGrade >= 84 && averageGrade <= 92:
      return 'B';
    case averageGrade >= 75 && averageGrade <= 83:
      return 'C';
    default:
      return 'D';
  }
}
