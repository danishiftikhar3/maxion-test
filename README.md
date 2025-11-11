# Maxion Test API

## Project Overview

This project is a Node.js + TypeScript REST API that simulates matchmaking logic for MAXION, a dating app for expats. It finds mutual matches and calculates both compatibility and attractiveness scores. The goal is to demonstrate how to structure a scoring and matching system clearly and logically.

## How to Run

1. Install pnpm (if not installed):

   ```sh
   npm install -g pnpm
   ```
2. Set to Node Version 20 +
4. Install dependencies:

```sh
   pnpm clean:install
```

4. Copy `.env.sample` to `.env` and set `PORT=4000` (optional):

   ```env
   PORT=4000
   ```

   If no port is set, defaults to 4000.
5. Start the API:

   ```sh
   pnpm dev
   ```
6. Visit `http://localhost:4000/matches/2` in a browser or API client (e.g., Postman, HTTPie)

### Example Test Command

```sh
curl http://localhost:4000/matches/10
```

## Tech Stack

- Node.js with Express
- TypeScript
- Winston for logging
- Dotenv for environment variables

## Requirements

- Node.js v20.19.5
- [pnpm](https://pnpm.io/) package manager

## Folder Structure

> ```
> maxion-test/
> ├── babel.config.cjs
> ├── package.json
> ├── pnpm-lock.yaml
> ├── README.md
> ├── tsconfig.json
> ├── log/
> ├── src/
> │   ├── index.ts
> │   ├── controllers/
> │   │   └── matches.controller.ts
> │   ├── data/
> │   │   └── users.json
> │   ├── middleware/
> │   │   └── errorHandler.ts
> │   ├── routes/
> │   │   ├── index.ts
> │   │   └── matches.ts
> │   ├── services/
> │   ├── types/
> │   │   ├── error.ts
> │   │   ├── index.ts
> │   │   ├── ProcessEnv.d.ts
> │   │   └── express/
> │   │       └── index.d.ts
> │   └── utils/
> │       ├── winston.ts
> │       └── response/
> │           └── customError.ts
> ```

## Scoring System

**Compatibility Score (0–100):**

- Age alignment – 20%
- Dealbreakers (smoking, distance, etc.) – 25%
- Preferences (diet, education, religion, etc.) – 20%
- Shared interests – 20%
- Lifestyle and education similarity – 10%
- Location proximity – 5%

**Attractiveness Score (0–100):**

- Likes received rate – 35%
- Match rate – 30%
- Date rate – 20%
- Recency and activity – 15%

All scores are normalized so active users are not unfairly boosted.

## API Endpoint

### GET /matches/:userId

Returns the top 5 mutual matches for a given user.

Example response:

```
{
  "userId": 2,
  "matchesFound": 3,
  "topMatches": [
	 {
		"candidateId": 5,
		"compatibilityScore": 84,
		"attractivenessScore": 72,
		"finalScore": 80,
		"explanation": "Within preferred age range. Shared interests: travel, music."
	 }
  ]
}
```

## Sample Data

User data is stored in `src/data/users.json`. The original dataset was downloaded from [Kaggle: okcupid-profiles](https://www.kaggle.com/datasets/andrewmvd/okcupid-profiles) and has been cleaned and customized for the Maxion use case.

## Future Improvements

- Add a database and authentication
- Suggest non-mutual matches
- Use ML to learn preferences over time
- Cache scoring results for performance
- Add a small frontend for visual testing

## License

MIT

## Author

Developed by Danish Iftikhar for the MAXION Technical Test.
