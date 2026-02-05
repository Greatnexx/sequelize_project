import express from 'express';
import { testConnections } from './config/testConnection.js';
import sequelize from './config/database.js';
import routers from './routes/index.js';
import dotenv from 'dotenv';
import { errorHandler, notFound } from './middlewares/errorHandler.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api/v1', routers);

app.use(notFound);
app.use(errorHandler);

async function startServer() {
  try {
    const connected = await testConnections();
    if (!connected) {
      process.exit(1);
    }

    await sequelize.sync();
    console.log('✅ Database synced');

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('❌ Unable to start server:', error);
    process.exit(1);
  }
}

startServer();
