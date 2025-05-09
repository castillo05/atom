import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import * as path from 'path';
import * as fs from 'fs';

import { FirestoreUserRepository } from './infrastructure/repositories/FirestoreUserRepository';
import { FirestoreTaskRepository } from './infrastructure/repositories/FirestoreTaskRepository';
import { createUserRoutes } from './interfaces/routes/userRoutes';
import { createTaskRoutes } from './interfaces/routes/taskRoutes';
import { errorHandler } from './utils/errorHandler';
import { environment } from './config/environment';

// // Start writing functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

// Initialize Firebase Admin with service account
const serviceAccountPath = path.join(__dirname, '../config/service-account.json');
const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'));
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// Create Express app
const app = express();

// Middleware
app.use(cors({ origin: environment.cors.origin }));
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

// Initialize repositories
const userRepository = new FirestoreUserRepository();
const taskRepository = new FirestoreTaskRepository();

// Routes
app.use('/api/users', createUserRoutes(userRepository));
app.use('/api/tasks', createTaskRoutes(taskRepository));

// Error handling
app.use(errorHandler);

// Export the Express app as a Firebase Cloud Function
export const api = functions.https.onRequest(app);
