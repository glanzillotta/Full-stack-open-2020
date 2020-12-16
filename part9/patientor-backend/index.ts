import express from 'express';
import cors from 'cors';
import ping from './src/routes/ping';
import patients from './src/routes/patients';

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/ping',ping);
app.use('/api/patients',patients);

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});