import React from 'react';

// palauttaa työpaikka-arrayn valittujen yrityksien nimien mukaan (checkbox valinnat)
export const coJobs = (jobs, userOptions) => {
    return (
        jobs.filter((job) => userOptions.includes(job._values.company)));
}

// palauttaa työpaikka-arrayn, jotka sisältävät halutut hakusanat/keywords
export const yesTags = (jobs, yestags) => {
    return (
        jobs.filter((job) => {
            if (yestags.length > 0) {
                return yestags.some((tag) => {
                    return job._values.text.toLowerCase().includes(tag.toLowerCase());
                });
            } else {
                return job;
            }
        }));
}
// palauttaa työpaikka-arrayn, jotka EIVÄT sisällä käyttäjän lisäämiä keywordeja
export const noTags = (jobs, notags) => {
    return (
        jobs.filter((job) => {
            if (notags.length > 0) {
                return notags.every((tag) => {

                    return (
                        job._values.text.toLowerCase().includes(tag.toLowerCase()) === false &&
                        job._values.header.toLowerCase().includes(tag.toLowerCase()) === false
                    );

                });
            } else {
                return job;
            }
        }));
}

// palauttaa työpaikka-arrayn, jotka sisältävät käyttäjän syöttämät paikkakunnat
export const jobLocations = (jobs, locations) => {
    return (
        jobs.filter((job) => {
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
        }));
}


