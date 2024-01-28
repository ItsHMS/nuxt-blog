// ~/utils/dateUtils.ts

export function getRandomDate() {
    const startYear = 2000;
    const endYear = 2024;

    const randomYear = Math.floor(Math.random() * (endYear - startYear + 1)) + startYear;
    const randomMonth = Math.floor(Math.random() * 12) + 1;
    const randomDay = Math.floor(Math.random() * 28) + 1;

    const randomDate = new Date(randomYear, randomMonth - 1, randomDay);
    const dateString = randomDate.toISOString().slice(0, 10);

    return dateString;
}

export function formatDateStrings() {
    const randomDateString = getRandomDate();

    const options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' };

    const frenchDate = new Date(randomDateString).toLocaleDateString('fr-FR', options);
    const englishDate = new Date(randomDateString).toLocaleDateString('en-US', options);

    return {
        fr: frenchDate,
        en: englishDate,
    };
}
