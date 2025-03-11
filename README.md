# Lumeo - Immersive VR Training Platform

## Overview

Lumeo is a VR-driven, gamified Learning Management System (LMS) built with Next.js 15, shadcn/ui, and TailwindCSS. It delivers immersive, hands-on training experiences for industries like automotive, aviation, medical response, and more.

## Features

- 🚀 **Next.js 15** for optimized performance and scalability.
- 🎨 **shadcn/ui** for modern, accessible UI components.
- 💨 **TailwindCSS** for rapid styling and responsive design.
- 🔥 **VR-Ready** with real-time interactions and gamified modules.
- 📊 **Instructor Dashboard** with analytics, live session tracking, and course management.

## Getting Started

### 1. Clone the repository

```bash 
git clone git@github.com:cbutler90/lumeo.git
cd lumeo
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Run the development server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Tech Stack

- Frontend: Next.js 15, React, shadcn/ui, TailwindCSS
- State Management: Zustand
- Data Fetching: SWR

## Folder Structure

```plaintext
/src
 ├── /app        # Next.js App Router pages
 ├── /components # Reusable UI components (shadcn-based)
 ├── /styles     # TailwindCSS global styles
 ├── /lib        # Utility functions & API handlers
 ├── /store      # Zustand state management
 ```

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
