export function extractPrice(...elements: any) {

    // iterating becasue of mapping, 
    // because The function needs to return the first valid price it finds (early return)
    // i.e. We're not creating a new array of transformed values, which is what map() is designed for
    for (const element of elements) {
        const priceText = element.text().trim();

        // remove every char that is not a digit or .
        if (priceText) return priceText.replace(/[^0-9.]/g, "");
    }

    return "";
}

export function extractCurrency(element: any) {

    const currencyText = element.text().trim().slice(0, 1);
    return currencyText ? currencyText : "";
}