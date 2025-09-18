# Image Prompt Generator

This is a Next.js application that generates creative variations of image generation prompts and generates images for each variation.

## Features

- Generate multiple variations of a given prompt.
- Generate an image for each prompt variation.
- User-friendly interface for entering prompts and viewing results.

## Getting Started

First, you need to set up the environment variables. Create a `.env.local` file in the root of the project and add the following:

```
GEMINI_API_KEY=your_gemini_api_key
```

Then, run the development server:

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

## Technologies Used

- [Next.js](https://nextjs.org)
- [React](https://reactjs.org)
- [TypeScript](https://www.typescriptlang.org)
- [Tailwind CSS](https://tailwindcss.com)
- [Google Gemini API](https://ai.google.dev)
