Next.js


Project setup

1. Next.js installation: npx create-next-app@latest https://nextjs.org/docs/getting-started/installation
2. app/page is the home
3. get the CSS from instrictor, paste it to app/globals.css
4. modify tailwinf.config.ts with instructors version
5. layout.tsx: @learning this is a special file. Allows to share different parts of the app across different pages. It is where you import fonts from google or elsewhere. 
    1. Add:
            import { Inter, Space_Grotesk } from "next/font/google";

            const inter = Inter({ subsets: ['latin'] });
            const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], weight: ["300", "400", "500", "600", "700"] });
    2. modify metadata with page title, desc
    3. It has our main with the children
        1. wrap children in a home component
            1. Add a classname. We always want a max width.
        2. add a nacbar component
6. change public folder to instuctors version



Development

1. Navbar:
    1. Add HTML5 semantic tags header and nav

2. Searchbar
    1. By default, in Next.js, all components are rendered on the server site.
    @crucial @learning
    However, interactive elements (like somtehing that has an onSubmit, onChange, states, hooks) need to be a client-side component - we then have to specifically.
    Actually, this might be a reason why this is separated to a component.
    To make is client-side, add `'use client'` to top of the file.
    2. Learnings @crucial @learning
             1. In next.js, use optimized <Image> instead of <img>
 2. <input> ususally goes into <form>, together with a <button>
 3. <form> tyically has the props: onSubmit
 4. <input> typically has the props: type, placeholder, value, onChange,  
 5. <button> can have a disabled prop for e.g. if user did not type anything yet
 6. Blocking notifications are easily displayed as `alert("Please provide a valid Amazon link.")`
    2. Input element in a form element @learning @crucial
            You want to handle form submissions (like in your case)
            You need to group related input fields
            You want to leverage built-in form features like:
            Form validation
            Easy data collection
            Native browser features (like form auto-fill)
            Handling Enter key submissions
            Accessibility benefits (screen readers handle forms better)
            Benefits of using <form> with <input>:
            Better semantic HTML
            Built-in form submission handling
            Can easily collect all form data using FormData
            Better mobile keyboard handling (submit button on mobile keyboards)
            Better accessibility
            Can handle multiple inputs as a single 

3. HeroCarousel
    1. Use 3rdparty package:
        1. install
        `npm install react-responsive-carousel`
        2. How to use it: 
            1. https://www.npmjs.com/package/react-responsive-carousel
            2. import component and Carousel element
            3. Copy demo Carousel from link, then adjust
            4. See docs to see what type of props to pass
        3. @learning @bug. See bug below. Had to make the component to a client-side c
                Server Error

                TypeError: Super expression must either be null or a function, not undefined

                This error happened while generating the page. Any console logs will be displayed in the terminal window.
                Call Stack
                _inherits
                node_modules/react-easy-swipe/lib/react-swipe.js (91:1)
    
4. For scraping:
    1. use Bright data





LEARNINGS:
 



