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

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
