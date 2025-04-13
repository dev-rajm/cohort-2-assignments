# Simple NextJs App

Create a simple nextjs app

```bash
npx create-next-app@latest
```

Run your nextjs app

```bash
npm run dev
```

## File Structure

1. `next.config.mjs` - NextJS configuration file
2. `tailwind.config.js` - Tailwind configuration file
3. `app` - Contains all your code/components/layouts/routes/apis

## Routing in NextJS

NextJS has a `file based routing`.

To create `/signup` route:

1. Create a folder `signup` inside app folder.
2. Create a `page.tsx` inside `signup` folder.
3. Define your functional logic that need to execute when `/signup` was requested.

## Server Side Rendering

Now when you hit the `/signin` you notice the response you get back is your HTML file.

Now if `GoogleBot` tries to scrape your page, it’ll understand that this is a signup page without running any Javascript.

The first `index.html` file it get’s back will have context about the page since it was `server side rendered`.

## Layouts in NextJS

Layouts let you `wrap` all `child` pages inside some logic.
