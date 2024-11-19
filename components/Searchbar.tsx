// @crucial @learning by default, components in Next.js are server-side rendered
// but interactive components (that have eg. state, hooks, onChnage, onSubmit) need to be client-side. 
// So we need this directive.
'use client'
import { scrapeAndStoreProduct } from '@/lib/actions';
import React, { FormEvent, useState } from 'react';

const Searchbar = () => {
    const [searchPrompt, setSearchPrompt] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    // check if provided link is a valid amazon link
    const isValidAmazonProductUrl = (url: string) => {
        try {
            // @note @learning
            const parsedUrl = new URL(url);
            const hostname = parsedUrl.hostname;

            // check
            if (hostname.includes("amazon.com") ||
                hostname.includes("amazon.") ||
                hostname.endsWith("amazon")
            ) {
                return true;
            } else {
                return false;
            }
        } catch (error) {
            return false;
        }
    }

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // @note @learning default is to reload the page on submission. We dont want that
        const isValidLink = isValidAmazonProductUrl(searchPrompt);

        // display error message if link is invalid
        if (!isValidLink) {
            return alert("Please provide a valid Amazon link.")
        }

        try {
            setIsLoading(true);

            // @note scrape product
            const product = await scrapeAndStoreProduct(searchPrompt);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        // @note @learning input element is inside a form elementv
        <form
            className='flex flex-wrap gap-2 mt-12'
            onSubmit={handleSubmit}
        >
            <input
                type="text"
                value={searchPrompt}    // @learning this is reading from state
                onChange={(e) => setSearchPrompt(e.target.value)}   // new value from input field
                placeholder="Enter product link"
                className='searchbar-input'
            />

            <button
                type="submit"
                className='searchbar-btn'
                disabled={searchPrompt === ""}  // @note @learning
            >
                {isLoading ? "Searching..." : "Search"}
            </button>
        </form >
    )
}

export default Searchbar