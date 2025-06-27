import express from 'express';

import attendanceRoutes from './routes/attendanceRoutes.js';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/', attendanceRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});