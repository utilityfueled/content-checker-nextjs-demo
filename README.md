# Introduction

This is a [Next.js](https://nextjs.org/) project meant to demo the AI moderation functionality of [OpenModerator](https://www.openmoderator.com).
The project uses the open-source npm package [content-checker](https://www.npmjs.com/package/content-checker) to communicate with the OpenModerator API.
You'll notice that the project uses route handlers to communicate with the API. This is to prevent the API key from being exposed in the browser.

## Getting Started

1) First, get an API key for free from [OpenModerator](https://www.openmoderator.com). Make sure to add `OPEN_MODERATOR_API_KEY` to your environment variables.

2) Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Learn More

To learn more about OpenModerator and Next.js, take a look at the following resources:

- [OpenModerator App](https://www.openmoderator.com/) - get an API key here for free
- [Content Checker](https://www.npmjs.com/package/content-checker) - npm package used to moderate content and interact with the API
- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.