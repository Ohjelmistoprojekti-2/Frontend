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
    'Oulu',
    'Jyväskylä'
]

// rivien 35-71 tapaukset testaavat, että funktio filtteröi ja palauttaa oikeanpituiset arrayt

// palauttaa arrayn, jossa valitut yritykset
describe('coJobs function returns an array of two objects', () => {
    const expected = coJobs(jobs, userOptions);
    test('length of the array is two', () => {
        expect(expected.length).toBe(2);
    });

})

// palauttaa arrayn, jossa käyttäjän valitsemat hakusanat
describe('yesTags function returns with three objects', () => {
    const expected = yesTags(jobs, yestags);
    test('length of the array is three', () => {
        expect(expected.length).toBe(3);
    });

})

// palauttaa arrayn, jossa ei ole käyttäjän kirjaamia sanoja
describe('noTags function returns an array of two objects', () => {
    const expected = noTags(jobs, notags);
    test('length of the array is two', () => {
        expect(expected.length).toBe(2);
    });

})

// palauttaa arrayn, jossa on käyttäjän kirjaamat paikkakunnat
describe('jobLocations function returns an array of three objects', () => {
    const expected = jobLocations(jobs, locations);
    test('length of the array is four', () => {
        expect(expected.length).toBe(4);
    });

})

// rivien 73-114 tapaukset testaavat, että funktiot palauttavat arrayn, jotkä sisältävät täsmälleen oikeanlaiset objektit
describe('function returns an array of jobs that contains only company names of Reaktor and Visma', () => {
    test('the received array matches with the expected one', () => {
        expect(coJobs(jobs, userOptions)).toEqual(
            expect.arrayContaining([
                expect.objectContaining(jobs[0]),
                expect.objectContaining(jobs[1])
            ]));
    });

})

describe('function returns an array of jobs that contains only companies that include yestags Frontend and DevOps', () => {
    test('the received array matches with the expected one', () => {
        expect(yesTags(jobs, yestags)).toEqual(
            expect.arrayContaining([
                expect.objectContaining(jobs[0]),
                expect.objectContaining(jobs[1]),
                expect.objectContaining(jobs[4])
            ]));
    });

})

describe('function returns an array of jobs that do not include notags Azure and Python', () => {
    test('the received array matches with the expected one', () => {
        expect(noTags(jobs, notags)).toEqual(
            expect.arrayContaining([
                expect.objectContaining(jobs[0]),
                expect.objectContaining(jobs[1])
            ]));
    });

})

describe('function returns an array of jobs that have Helsinki, Espoo or Oulu as locations', () => {
    test('the received array matches with the expected one', () => {
        expect(jobLocations(jobs, locations)).toEqual(
            expect.arrayContaining([
                expect.objectContaining(jobs[1]),
                expect.objectContaining(jobs[2]),
                expect.objectContaining(jobs[3]),
                expect.objectContaining(jobs[4])
            ]));
    });

})