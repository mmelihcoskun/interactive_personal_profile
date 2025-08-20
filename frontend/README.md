## Interactive AI Resume

This is an interactive personal profile web app for [melihcoskun.ai]. It features a profile photo and a chat interface that answers questions about Melih Coskun using AI (RAG) and text-to-speech.

### Tech Stack
- **Frontend:** Next.js (React 18), Chakra UI
- **Deployment:** Vercel
- **Backend API:** AWS Lambda (planned)
- **AI:** OpenAI APIs (planned)

### Features
- Large profile avatar and personal info
- Chat interface for asking questions
- (Planned) RAG-powered answers about Melih Coskun
- (Planned) Text-to-speech responses

### Folder Structure
- `public/assets/` — Static assets (profile photo, images)
- `src/app/` — Main app code
- `src/components/` — Reusable UI components

### Getting Started

## Getting Started


First, run the development server:

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


You can start editing the homepage by modifying `src/app/page.tsx`. The page auto-updates as you edit the file.

To update your profile photo, place a JPG or PNG in `public/assets/` and update the avatar `src` in `page.tsx`.

### Contributing
Pull requests and issues are welcome! Please keep assets under 1MB and use Git LFS for large files.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
