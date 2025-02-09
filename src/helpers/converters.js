export const firestoreDateToLocaleString = (date) => {
    const dateJS = date.toDate();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    return dateJS.toLocaleDateString('en-GB', options);
}