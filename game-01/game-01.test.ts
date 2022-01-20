import {subSetSum} from "./game-01";


describe('test for game 01', () => {
    it('should get a response that the array cannot be empty', function () {
        const fakeArrayNumbers: number[]= [];
        const target = 2;
        const dialog:string = subSetSum(fakeArrayNumbers, target)
        expect(dialog).toBe('you must enter numbers for the sum of subsets')
    });
    it('should not get any result from this sum of subsets', function () {
        const fakeArrayNumbers: number[]= [5,5];
        const target = 100;
        const dialog:string = subSetSum(fakeArrayNumbers, target)
        expect(dialog).toBe('No matches')
    });
    it('should get the first result of the sum of subsets for the array [2, 5, 8, 14, 0] getting [2, 8]', function () {
        const fakeArrayNumbers: number[]= [2, 5, 8, 14, 0];
        const target = 10;
        const match:string = subSetSum(fakeArrayNumbers, target)
        expect(match).toBe('first possible solution found for the sum of the entered number [2,8]')
    });
})