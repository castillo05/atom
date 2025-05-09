export const environment = {
  nodeEnv: process.env.NODE_ENV || 'development',
  cors: {
    origin: process.env.CORS_ORIGIN || '*',
  },
  firebase: {
    projectId: process.env.PROJECT_ID || 'atom-df39d',
  },
};
