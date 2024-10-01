# Issue Tracker

## Overview

Issue Tracker is a web application built with Next.js and Prisma. It allows users to create, track, and manage issues. The application is deployed on Vercel.

## Features

-   Create, update, and delete issues
-   Track issue status (Open, In Progress, Closed)
-   View issue summaries and charts
-   Authentication with Google

## Technologies Used

-   [Next.js](https://nextjs.org/)
-   [Prisma](https://www.prisma.io/)
-   [Vercel](https://vercel.com/)
-   [PostgreSQL](https://www.postgresql.org/)
-   [Sentry](https://sentry.io/)

## Getting Started

### Prerequisites

-   Node.js (v14 or later)
-   PostgreSQL database

### Installation

1.  Clone the repository:

    git clone https://github.com/ifuenteromero/issue-tracker.git
    cd issue-tracker

2.  Install dependencies:
    npm install

3.  Set up environment variables:

        Create a .env.local file in the root of the project and add the following variables: (env.example file)

    POSTGRES_URL=""
    POSTGRES_PRISMA_URL=""
    POSTGRES_URL_NO_SSL=""
    POSTGRES_URL_NON_POOLING=""
    POSTGRES_USER=""
    POSTGRES_HOST=""
    POSTGRES_PASSWORD=""
    POSTGRES_DATABASE=""
    AUTH_SECRET=""
    AUTH_GOOGLE_ID = ""
    AUTH_GOOGLE_SECRET = ""
    SENTRY_AUTH_TOKEN=""

4.  Generate Prisma client:
    npx prisma generate

5.  Apply database migrations:
    npx prisma migrate deploy
