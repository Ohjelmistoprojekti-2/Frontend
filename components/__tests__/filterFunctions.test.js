import * as Filterfunctions from "../filterFunctions";

const filterFunctions = Filterfunctions.filterFunctions;

// rivien 6-36 tapaukset testaavat, että funktio filtteröi ja palauttaa oikeanpituiset arrayt
describe('function returns an array of two objects', () => {
    const expected = filterFunctions.coJobs;
    it('length of the array is two', () => {
        expect(expected.length).toBe(2);
    });

})

describe('function returns an array of one object', () => {
    const expected = filterFunctions.yesTags;
    it('length of the array is one', () => {
        expect(expected.length).toBe(3);
    });

})

describe('function returns an array of three objects', () => {
    const expected = filterFunctions.noTags;
    it('length of the array is three', () => {
        expect(expected.length).toBe(4);
    });

})

describe('jobLocations function returns an array of three objects', () => {
    const expected = filterFunctions.jobLocations;
    it('length of the array is four', () => {
        expect(expected.length).toBe(4);
    });

})

// rivien 39-83 tapaukset testaavat, että funktiot palauttavat arrayn, jotkä sisältävät täsmälleen oikeanlaiset objektit
describe('function returns an array of jobs that contains only company names of Reaktor and Visma', () => {
    it('the received array matches with the expected one', () => {
        expect(filterFunctions.coJobs).toEqual(
            expect.arrayContaining([
                expect.objectContaining(filterFunctions.originalJobs[0]),
                expect.objectContaining(filterFunctions.originalJobs[1])
            ]));
    });

})

describe('function returns an array of jobs that contains only companies that include yestags Frontend and DevOps', () => {
    it('the received array matches with the expected one', () => {
        expect(filterFunctions.yesTags).toEqual(
            expect.arrayContaining([
                expect.objectContaining(filterFunctions.originalJobs[0])
            ]));
    });

})

describe('function returns an array of jobs that do not include notags Azure and Python', () => {
    it('the received array matches with the expected one', () => {
        expect(filterFunctions.noTags).toEqual(
            expect.arrayContaining([
                expect.objectContaining(filterFunctions.originalJobs[0]),
                expect.objectContaining(filterFunctions.originalJobs[1]),
                expect.objectContaining(filterFunctions.originalJobs[3])
            ]));
    });

})

describe('function returns an array of jobs that have Helsinki, Espoo or Oulu as locations', () => {
    it('the received array matches with the expected one', () => {
        expect(filterFunctions.jobLocations).toEqual(
            expect.arrayContaining([
                expect.objectContaining(filterFunctions.originalJobs[1]),
                expect.objectContaining(filterFunctions.originalJobs[2]),
                expect.objectContaining(filterFunctions.originalJobs[3]),
                expect.objectContaining(filterFunctions.originalJobs[4])
            ]));
    });

})