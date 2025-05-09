# Task Manager API

This is the backend API for the Task Manager application, built with Express.js, TypeScript, and Firebase Cloud Functions.

## Architecture

The project follows Clean Architecture principles with the following layers:

- **Domain**: Contains business entities and repository interfaces
- **Application**: Contains use cases and business logic
- **Infrastructure**: Contains implementations of repositories and external services
- **Interfaces**: Contains controllers and routes

## Setup

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
Create a `.env` file in the root directory with the following variables:
```
NODE_ENV=development
CORS_ORIGIN=*
FIREBASE_PROJECT_ID=your-project-id
```

3. Run locally:
```bash
npm run serve
```

## API Endpoints

### Users

- `POST /api/users/find` - Find user by email
- `POST /api/users` - Create new user

### Tasks

- `GET /api/tasks/user/:userId` - Get all tasks for a user
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

## Development

- `npm run build` - Build the project
- `npm run serve` - Run locally
- `npm run deploy` - Deploy to Firebase
- `npm run lint` - Run linter

## Testing

The project uses Jest for testing. Run tests with:
```bash
npm test
```

## Error Handling

The API uses a centralized error handling system with custom error classes and middleware.

## Security

- CORS enabled
- Helmet for security headers
- Input validation
- Error handling 