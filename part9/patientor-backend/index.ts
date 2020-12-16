import express from 'express';
import cors from 'cors';
import ping from 'ping';

const app = express();
app.use(express.json());
app.use(cors());

const PORT = 3001;

app.use('/ping',ping);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});