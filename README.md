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