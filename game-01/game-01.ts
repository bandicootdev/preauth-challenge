//first Solution
export function subSetSum(numbers: number[], target: number): string {
    if (numbers.length === 0) return `you must enter numbers for the sum of subsets`;
    const matches: string[] = [];
    for (let i = 0; i < numbers.length; i++) {
        for (let j = i + 1; j < numbers.length; j++) {
            if (numbers[i] + numbers[j] === target && i !== j) {
                matches.push(`[${numbers[i]},${numbers[j]}]`)
            }
        }
    }
    if (matches.length === 0) return `No matches`;
    return `first possible solution found for the sum of the entered number ${matches[0]}`;
}

// second Solution
// export function subSetSum(numbers: number[], target: number, allMatches: boolean = false): number[] | number[][] | string {
//     if (numbers.length === 0) return `you must enter numbers for the sum of subsets`;
//     const matches: number[][] = [];
//     numbers.map(((n, i = 0) =>
//         numbers.filter((num, idx = i + 1) => {
//             if ((n + num) === target && i !== idx) matches.push([n, num]);
//         })))
//     if (matches.length > 0) {
//         if (!allMatches) return matches[0]
//         else return matches;
//     }
//     return `No matches`;
// }

// console.log(subSetSum([5, 5, 8, 2, 7], 10))