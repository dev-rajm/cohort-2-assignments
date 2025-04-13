# Next JS

NextJS was a framework that was introduced because of some `minor inconveniences` in React.

## Downside of React

1. In a React project, you have to maintain a separate Backend project for your API routes.

2. React does not provide out of the box routing (you have to use `react-router-dom`).

3. React is not SEO Optimized:

   1. The `web crawlers` that hit websites to figure out what the website does. It helps your website to **rank** on google, bing etc based on the **HTML** it gets back.

      The crawlers don't usually run your **JS** and render your page to see the final output. So in React websites crawler get back noting on the initial request instead of only the website title.

4. Waterfalling Problem:

   In React `request cycles` are happen sequentially one after the other.

   Example of a blogging website:

   1. Fetching the index.html from CDN.
   2. Fetching the script.js from CDN.
   3. Checking if user if logged in (if not redirect to /login).
   4. Fetching the actual blogs.

   So 4 steps that happen one after the other.

   Its called `Waterfalling problem` that is refers to a scenario where data fetching operations are chained/dependent on each others in a way that leads to inefficient loading behavior.

## Upside of NextJS

1. Server side rendering - Solved SEO problems
2. Single codebase with frontend and backend (full-stack framework)
3. File based routing (no need for react-router-dom)
4. Bundle size optimization, Static site generation
5. Maintained by the Vercel team

## Downside of NextJS

1. Can't be distributed via CDN, always need a server running that does `Server side rendering` and hence is expensive.
2. Very opinionated. very hard to move out of it.
