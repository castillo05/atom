import * as admin from 'firebase-admin';

// Inicializar Firebase Admin para las pruebas solo si no está inicializado
if (!admin.apps.length) {
  admin.initializeApp({
    projectId: 'test-project',
  });
}

// Limpiar mocks después de cada prueba
afterEach(() => {
  jest.clearAllMocks();
});

// Limpiar después de todas las pruebas
afterAll(async () => {
  if (admin.apps.length) {
    await admin.app().delete();
  }
});
