const optionsLocale = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

export const firestoreDateToLocaleString = (date) => {
    const dateJS = date.toDate();

    return dateJS.toLocaleDateString('en-GB', optionsLocale);
}

export const firestoreDateToJSDate = (date) => {
    const dateJS = date.toDate();

    return dateJS;
}

export const dateToLocaleString = (date) => {
    return date.toLocaleDateString('en-GB', optionsLocale)
}