TaskManager

This project is a full-stack Task Manager built with Angular 20 (using Signals) on the frontend and Express + Prisma + SQLite on the backend.

It demonstrates modern Angular practices such as Signals for state management, dependency injection, and reliable testing with Playwright.

Development server

To start a local development server, run:

ng serve


Once the server is running, open your browser and navigate to http://localhost:4200/.
The application will automatically reload whenever you modify any of the source files.

Backend server

The backend lives inside the /backend folder.
It uses Express + Prisma ORM + SQLite to persist tasks.

To run the backend:

cd backend
npm install
node server.js


The backend will run at http://localhost:3000/.

Code scaffolding

Angular CLI includes powerful scaffolding tools.
To generate a new component, run:

ng generate component component-name


For signals-based state management, services are injected using dependency injection, and task state is stored in Signals for reactivity without manual subscriptions.

Building

To build the project for production, run:

ng build


The build artifacts will be stored in the dist/ directory.
The production build is optimized for performance and can be deployed (e.g., Netlify).

Running end-to-end tests

This project uses Playwright for end-to-end (e2e) testing.

To run the tests:

npx playwright test


Tests use data-testid attributes for reliable selectors.

Additional Resources

Angular Signals → Angular Signals Guide

Playwright → Playwright Docs

Prisma ORM → Prisma Docs

Deployment

Frontend → Netlify

Backend → Render
