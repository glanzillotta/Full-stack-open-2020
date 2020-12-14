interface Result {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
};

interface InputExercise {
    targetAmountsDaily: number,
    dailyExercisesHours: Array<number>
};

const parseArgumentsExercise = (args: Array<string>): InputExercise => {
    if (args.length < 4) throw new Error('Not enough arguments');

    if (!isNaN(Number(args[2]))) {
        return {
            targetAmountsDaily: Number(args[2]),
            dailyExercisesHours: args.filter((arg,i)=>i>2&&!isNaN(Number(arg))).map((arg) => Number(arg))
        }
    } else {
        throw new Error('Provided values were not numbers!');
    }
}


const calculateExercises = (dailyExercisesHours: Array<number>, targetAmountsDaily: number): Result => {

    const periodLength = dailyExercisesHours.length;
    const trainingDays = dailyExercisesHours.filter(hour => hour !== 0).length;
    const average = dailyExercisesHours.reduce((a, b) => a + b) / dailyExercisesHours.length;
    const success = average >= targetAmountsDaily ? true : false;
    const target = targetAmountsDaily;
    const diff = targetAmountsDaily - average
    let rating: number;
    let ratingDescription: string;
    switch (true) {
        case diff === 0:
            rating = 3;
            ratingDescription = 'you did it';
            break;
        case diff < 0.5:
            rating = 2;
            ratingDescription = 'not too bad but could be better';
            break;
        case diff < 1:
            rating = 1
            ratingDescription = 'come one we know you could do better';
            break;
        default: rating = 0; break;
    }

    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average
    }
}

try {
    const { targetAmountsDaily, dailyExercisesHours } = parseArgumentsExercise(process.argv);
    console.log(calculateExercises(dailyExercisesHours, targetAmountsDaily))
} catch (e) {
    console.log('Error, something bad happened, message: ', e.message)
}