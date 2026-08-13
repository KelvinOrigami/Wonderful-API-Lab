# Wonderful API Lab

This is a small API testing exercise using Playwright and the public Restful API.

The test covers the full flow:

- create an object
- read it
- update it
- delete it
- check that it is no longer available

## Run the test

```powershell
npm ci
npx playwright test tests/restful-api-crud.spec.ts
```

The test uses `https://api.restful-api.dev/objects`.
