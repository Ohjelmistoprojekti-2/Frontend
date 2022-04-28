import testjobs from './testjobs.json';

// dummy data, joka mallintaa fetchattuja työpaikkoja
const originalJobs = testjobs;

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

]

// mallintaa paikkakuntia, joista käyttäjä haluaa löytää työpaikkoja
const locations = [
    'Helsinki',
    'Espoo',
    'Oulu'
]

// palauttaa työpaikka-arrayn valittujen yrityksien nimien mukaan (checkbox valinnat)
const coJobs = originalJobs.filter((job) => userOptions.includes(job._values.company));

// palauttaa työpaikka-arrayn, jotka sisältävät halutut hakusanat/keywords
const yesTags = originalJobs.filter((job) => {
    if (yestags.length > 0) {
        return yestags.some((tag) => {
            return job._values.text.toLowerCase().includes(tag.toLowerCase());
        });
    } else {
        return job;
    }
});

// palauttaa työpaikka-arrayn, jotka EIVÄT sisällä käyttäjän lisäämiä keywordeja
const noTags = originalJobs.filter((job) => {
    if (notags.length > 0) {
        return notags.some((tag) => {

            return (
                job._values.text.toLowerCase().includes(tag.toLowerCase()) === false
            );

        });
    } else {
        return job;
    }
});

// palauttaa työpaikka-arrayn, jotka sisältävät käyttäjän syöttämät paikkakunnat
const jobLocations = originalJobs.filter((job) => {
    if (locations.length > 0) {
        return locations.some((tag) => {
            // jos location on array muodossa (esim. Visma)
            if (Array.isArray(job._values.location) === true) {
                return job._values.location.some(
                    (loc) => loc.toLowerCase() === tag.toLowerCase()
                );
            } else {
                // jos location on string muodossa (esim. Reaktor)
                return job._values.location.toLowerCase().includes(tag.toLowerCase());
            }
        });
    } else {
        return job;
    }
});


export const filterFunctions = {
    coJobs,
    yesTags,
    noTags,
    jobLocations,
    originalJobs
}