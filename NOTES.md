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

    
    

