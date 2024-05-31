# Shiru Guestbook App

Shiru Guestbook is a web application that allows users to create and view guestbook entries. This project is bootstrapped with the T3 Stack, AmazonRDS and OpenAI API.

## Live Demo

Check out the live demo hosted on Vercel: [shiru-guestbook-t3.vercel.app](https://shiru-guestbook-t3.vercel.app/)

![Shiru Guestbook Screenshot](https://github.com/sylfort/guestbook-t3/assets/24916160/87bfd091-454a-4c91-9904-b3d2b6905507)

## Features

- **Create Guestbook Entries**: Users can submit new entries to the guestbook.
- **View Guestbook Entries**: Users can view all entries in the guestbook.
- **Japanese Translation**: Integrated with OpenAI API to generate Japanese translations of guestbook messages.

## Technologies Used

- **TypeScript**: For static typing and enhanced code quality.
- **Next.js**: For server-side rendering and static site generation.
- **Tailwind CSS**: For rapid UI development with utility-first CSS.
- **tRPC**: For end-to-end typesafe APIs.
- **Amazon RDS (PostgreSQL)**: As the database to store guestbook entries.
- **OpenAI API**: For generating Japanese translations of messages.
- **Vercel**: For deployment and hosting.

## Getting Started

### Prerequisites

- Node.js and npm installed
- PostgreSQL database setup (Amazon RDS recommended)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/sylfort/guestbook-t3.git
   cd guestbook-t3
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Setup environment variables**

   Create a `.env` file in the root directory and add the following:

   ```env
   DATABASE_URL=your_postgresql_database_url

   NEXTAUTH_SECRET=your_nextauth_secret
   NEXTAUTH_URL=http://localhost:3000

   GITHUB_ID=your_github_client_id
   GITHUB_SECRET=your_github_client_secret

   DISCORD_CLIENT_ID=your_discord_client_id
   DISCORD_CLIENT_SECRET=your_discord_client_secret

   OPENAI_API_KEY=your_openai_api_key
   ```

4. **Run the development server**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) to view the app in the browser.

### Deployment

Deploy the application to Vercel by following their [deployment guide](https://vercel.com/docs/concepts/deployments/overview).
