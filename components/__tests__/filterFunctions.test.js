import { coJobs, yesTags, noTags, jobLocations } from "../filterFunctions";
import testjobs from '../testjobs.json';

// mallintaa saatuja työpaikkoja fetchin kautta
const jobs = testjobs;

// mallintaa käyttäjän tekemiä valintoja checboxeista
const userOptions = [
    'Visma',
    'Reaktor'
]

// mallintaa hakusanoja, jotka käyttäjä haluaa löytää hakutuloksista
const yestags = [
    'Frontend',
    'DevOps'
]

// mallintaa sanoja, joita käyttäjä ei halua saada hakutuloksiinsa
const notags = [
    'Azure',
    'Python',
    'Cloud'

]

// mallintaa paikkakuntia, joista käyttäjä haluaa löytää työpaikkoja
const locations = [
    'Helsinki',
    'Espoo',
    'Oulu'
]

// rivien 6-36 tapaukset testaavat, että funktio filtteröi ja palauttaa oikeanpituiset arrayt
describe('function returns an array of two objects', () => {
    const expected = coJobs(jobs, userOptions);
    it('length of the array is two', () => {
        expect(expected.length).toBe(2);
    });

})

describe('function returns with three objects', () => {
    const expected = yesTags(jobs, yestags);
    it('length of the array is three', () => {
        expect(expected.length).toBe(3);
    });

})

describe('function returns an array of three objects', () => {
    const expected = noTags(jobs, notags);
    it('length of the array is three', () => {
        expect(expected.length).toBe(3);
    });

})

describe('jobLocations function returns an array of three objects', () => {
    const expected = jobLocations(jobs, locations);
    it('length of the array is four', () => {
        expect(expected.length).toBe(4);
    });

})

// // rivien 39-83 tapaukset testaavat, että funktiot palauttavat arrayn, jotkä sisältävät täsmälleen oikeanlaiset objektit
// describe('function returns an array of jobs that contains only company names of Reaktor and Visma', () => {
//     it('the received array matches with the expected one', () => {
//         expect(filterFunctions.coJobs).toEqual(
//             expect.arrayContaining([
//                 expect.objectContaining(filterFunctions.testjobs[0]),
//                 expect.objectContaining(filterFunctions.testjobs[1])
//             ]));
//     });

// })

// describe('function returns an array of jobs that contains only companies that include yestags Frontend and DevOps', () => {
//     it('the received array matches with the expected one', () => {
//         expect(filterFunctions.yesTags).toEqual(
//             expect.arrayContaining([
//                 expect.objectContaining(filterFunctions.testjobs[0])
//             ]));
//     });

// })

// describe('function returns an array of jobs that do not include notags Azure and Python', () => {
//     it('the received array matches with the expected one', () => {
//         expect(filterFunctions.noTags).toEqual(
//             expect.arrayContaining([
//                 expect.objectContaining(filterFunctions.testjobs[0]),
//                 expect.objectContaining(filterFunctions.testjobs[1]),
//                 expect.objectContaining(filterFunctions.testjobs[4])
//             ]));
//     });

// })

// describe('function returns an array of jobs that have Helsinki, Espoo or Oulu as locations', () => {
//     it('the received array matches with the expected one', () => {
//         expect(filterFunctions.jobLocations).toEqual(
//             expect.arrayContaining([
//                 expect.objectContaining(filterFunctions.testjobs[1]),
//                 expect.objectContaining(filterFunctions.testjobs[2]),
//                 expect.objectContaining(filterFunctions.testjobs[3]),
//                 expect.objectContaining(filterFunctions.testjobs[4])
//             ]));
//     });

// })