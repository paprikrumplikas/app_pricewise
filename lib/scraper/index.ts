import axios from "axios";
import * as cheerio from "cheerio";
import { extractPrice, extractCurrency } from "../utils";

export async function scrapeAmazonProduct(url: string) {
    if (!url) return;

    // BrightData proxy config
    const username = String(process.env.BRIGHT_DATA_USERNAME);
    const password = String(process.env.BRIGHT_DATA_PWD);
    const port = 2225;  // from brightdata curl command
    const session_id = (1000000 * Math.random()) | 0;   // random
    const options = {
        auth: {
            username: `${username}-session-${session_id}`,
            password,
        },
        host: "brd.superproxy.io",
        port,
        rejectUnauthorized: false
    }


    try {
        // fetch product page
        const response = await axios.get(url, options);
        const $ = cheerio.load(response.data);  // init cheerio

        // extract product title, etc
        // @note @learning @crucial this says: give me the text from an element with id=producTitle (from html code)
        const title = $("#productTitle").text().trim(); // $ referring to cheerio here
        // this is more challenging to get, element does not have an id
        const currentPriceWhole = extractPrice(
            $(".priceToPay span.a-price-whole"),    // $ referring to cheerio here
            $("a.sizebase.a-color-price"),
            $(".a-button-selected .a-color-base"),
        );

        const currentPriceFraction = extractPrice(
            $(".priceToPay span.a-price-fraction"),    // $ referring to cheerio here
        );

        const currentPriceFull = currentPriceWhole
            ? `${currentPriceWhole}${currentPriceFraction ? '' + currentPriceFraction : ''}`
            : null;

        const originalPrice = extractPrice(
            $("#priceblock ourprice"),  //sometimes listed as such
            /* @note @learning looks for an element that
             has both the class a-price and a-text-price 
             and then looks for a span child of this element that has is a span a-offscreen as a class */
            $(".a-price.a-text-price .a-offscreen"),
            $("#listPrice"),
            $("#priceblock_dealprice"),
            $(".a-size-base.a-color-price")
        );

        const isOutOfStock = $("#availability span").text().trim().toLocaleLowerCase() === "currently unavailable";

        const images =
            $("#landingImage").attr("data-a-dynamic-image") ||
            $("#imgB1kFront").attr("data-a-dynamic-image") ||
            "{}";   // for proper parsing, so that imageUrls work perfectly

        const imageUrls = Object.keys(JSON.parse(images));
        const currency = extractCurrency($(".a-price-symbol"));
        const savings = $(".savingsPercentage").text().replace(/[-%]/g, "");

        console.log({ title, currentPriceFull, currentPriceWhole, currentPriceFraction, originalPrice, isOutOfStock, imageUrls, currency, savings });


    } catch (error: any) {
        throw new Error(`Failed to scrape product: ${error.message}`)
    }
}