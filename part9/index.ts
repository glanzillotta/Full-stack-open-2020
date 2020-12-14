import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    const { height, weight } = req.query;

    if (!height || !weight) {
        res.status(400).json({ error: 'malformatted parameters' });
    } else {
        const heightNum = Number(height);
        const weightNum = Number(weight);

        if (isNaN(heightNum) || isNaN(weightNum))
            res.status(400).json({ error: 'malformatted parameters' });

        res.json({
            weight: weightNum,
            height: heightNum,
            bmi: calculateBmi(heightNum, weightNum),
        });
    }
});

app.get('/exercises', (req, res) => {
    const { daily_exercises, target } = req.body as {
        daily_exercises: number[];
        target: number;
      };

    if (!daily_exercises || !target)
        res.status(400).json({ error: 'missing parameters' });
    else {
        if (isNaN(target) || daily_exercises.filter((num) => isNaN(num)).length > 0) {
            res.status(400).json({ error: 'malformatted parameters' });
          } else {
            res.json(calculateExercises(daily_exercises, target));
          }
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});