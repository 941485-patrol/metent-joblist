# Simple Job Listing Application using Next.js and App Router.

## Setup Instructions.
I cloned Next.js existing docker-compose setup for this project, so i ran this project inside docker desktop.
To run this inside Docker Desktop, use these commands on your terminal:

1. Run ```docker-compose -f docker-compose.yml up -d```.
2. It will build, mount and run the container for development. For shutting down the container, just push the 'Stop' button in Docker Desktop.
3. On the 'Exec' tab in Docker Desktop, type the command ```npm installl ``` to install node modules.
4. For running tests, on the same 'Exec' tab, tpe the command ```npm run test```.

Note: The app runs on ```http://localhost:3000```.

## How a real external job feed would be plugged in to replace the fixture.

For running this using a real job listing API, i would change the services layer file located in ```src/services/jobService.ts```.
I will set the API endpoint in the file and map the neccesary key/value pairs on the response object to the existing job type located in ```src/types/job.ts ```.

## My rendering strategy choice (SSG / ISR / SSR) and the reasoning behind it.

For the Job listing index page, i used CSR. My reasoning behind it because it uses React Hooks such as useEffect and useState for without requiring a full page reload when a user interacts with the components (Filter). It also uses useMemo hook that filters the listing actively.

For the Job details page, I used SSR. Aside from using URL search params, this is a dynamic page that can render different kinds of data on each request. SSR is also great for SEO that can index each job posting for feeding search engines.

## How your analytics stub would connect to a real GTM or analytics implementation.

I think I can just install the Google Tag Manager that is bundled in Next.js third-parties package and replace the windowLayer code with a sendGtmEvent function but with the existing JS object within it intact. I will also the GTM ID in the layout file.


## Reflecting on trade-offs you made during the exercise.

I used the Pages router initially for this task but realized I need the Metadata API for this project for SEO purposes. I switch to the more modern App router for this as a trade-off. Although I wanted to used Pages for a more traditional approach, I switched to App router for convenience and complete the exam criteria.

## Next steps you would take if you had more time.

I would definitely polish the UI more. I would also take the inline CSS classes in a file for readability. I would also consider adding validation on the response data itself even though this app does not handle forms. Also sanitazation on the description value to avoid invalid HTML leaking on the frontend.
I would also deploy this to Vercel, but since there is lot of vulnerabilities in there currently, I opted not to.

## What is still vital but missing before this could be considered production-ready.

Definitely the Logging feature for production monitoring of errors and visibility.

## Part of the work was generated or significantly influenced by AI.

The creation of unit tests is heavily influenced by AI. I also used AI for converting the JSON listing data in the PDF file into a JS object. I also used AI for setting up Tailwind CSS configurations (which I ended up not needing since I went with the inline CSS...) and custom Docker configurations.