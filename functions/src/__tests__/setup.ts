import * as admin from 'firebase-admin';

// Initialize Firebase Admin for tests only if not already initialized
if (!admin.apps.length) {
  admin.initializeApp({
    projectId: 'test-project',
  });
}

// Limpiar mocks después de cada prueba
afterEach(() => {
  jest.clearAllMocks();
});

// Clean up after all tests
afterAll(async () => {
  if (admin.apps.length) {
    await admin.app().delete();
  }
});
