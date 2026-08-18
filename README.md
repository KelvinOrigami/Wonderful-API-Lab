# Wonderful API Lab

This repo contains API tests for the public Restful API using Playwright.

## Setup

```powershell
npm ci
Copy-Item .env.example .env
```

The `.env` file is optional. If `BASE_URL` is missing, the tests use the public Restful API URL by default.

## Run the suites

```powershell
npm run test:api
npm run test:api:smoke
npm run test:api:regression
npm run typecheck
```

The API tests are grouped by resource and behavior. The CRUD smoke test covers the full Create, Read, Update and Delete flow. The other tests check each operation independently.

## Tags

Tags can be filtered directly with Playwright:

```powershell
npx playwright test --grep @smoke
npx playwright test --grep @regression
```
