# Atom - Task Management Application

A modern task management application built with Angular and Firebase, following clean architecture principles.

## Project Overview

Atom is a full-stack application that allows users to manage their tasks efficiently. The application features a clean, modern UI built with Angular Material and a robust backend powered by Firebase.

### Features

- User authentication with email
- Task management (Create, Read, Update, Delete)
- Task status tracking (Complete/Incomplete)
- Real-time updates
- Responsive design
- Secure API endpoints

## Tech Stack

### Frontend
- Angular 17
- Angular Material
- TypeScript
- SCSS
- RxJS
- Firebase Hosting

### Backend
- Firebase Functions
- Express.js
- TypeScript
- Clean Architecture
- Jest for testing
- Winston for logging

## Project Structure

```
atom/
├── atom-frontend/           # Angular frontend application
│   ├── src/
│   │   ├── app/
│   │   │   ├── features/   # Feature modules
│   │   │   ├── data/       # Services and models
│   │   │   └── shared/     # Shared components
│   │   └── assets/         # Static assets
│   └── ...
│
├── functions/              # Firebase Functions backend
│   ├── src/
│   │   ├── application/   # Use cases
│   │   ├── domain/        # Entities and interfaces
│   │   ├── infrastructure/# Repositories and external services
│   │   └── interfaces/    # Controllers and routes
│   └── ...
│
└── firebase.json          # Firebase configuration
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)
- Firebase CLI
- Angular CLI

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/atom.git
   cd atom
   ```

2. Install frontend dependencies:
   ```bash
   cd atom-frontend
   npm install
   ```

3. Install backend dependencies:
   ```bash
   cd ../functions
   npm install
   ```

### Development

1. Start the frontend development server:
   ```bash
   cd atom-frontend
   npm start
   ```

2. Start the backend emulator:
   ```bash
   cd functions
   npm run serve
   ```

### Testing

1. Run frontend tests:
   ```bash
   cd atom-frontend
   npm test
   ```

2. Run backend tests:
   ```bash
   cd functions
   npm test
   ```

### Deployment

1. Deploy frontend:
   ```bash
   cd atom-frontend
   npm run build -- --configuration production
   cd ..
   firebase deploy --only hosting
   ```

2. Deploy backend:
   ```bash
   cd functions
   npm run build
   cd ..
   firebase deploy --only functions
   ```

## API Endpoints

### Authentication
- `POST /api/users/generate-token` - Generate authentication token
- `POST /api/users/find` - Find user by email
- `POST /api/users` - Create new user

### Tasks
- `GET /api/tasks` - Get all tasks for a user
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

## Architecture

### Frontend Architecture
The frontend follows Angular's best practices with a feature-based structure:
- Feature modules for authentication and tasks
- Shared services for API communication
- Material Design components for UI
- Reactive forms for data handling
- Route guards for authentication

### Backend Architecture
The backend implements Clean Architecture principles:
- Domain layer: Entities and business rules
- Application layer: Use cases and business logic
- Infrastructure layer: External services and repositories
- Interface layer: Controllers and routes

## Security
- Firebase Authentication for user management
- Custom token-based authentication
- Helmet.js for security headers
- Input validation and sanitization
- Environment variable management

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Angular Material for the UI components
- Firebase for the backend infrastructure
- Clean Architecture principles by Robert C. Martin 