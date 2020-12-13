interface Result {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
};

const calculateExercises = (dailyExercisesHours: Array<number>, targetAmountsDaily: number): Result => {

    const periodLength=dailyExercisesHours.length;
    const trainingDays=dailyExercisesHours.filter(hour=>hour!==0).length;
    const average=dailyExercisesHours.reduce((a, b) => a + b)/dailyExercisesHours.length;
    const success= average>=targetAmountsDaily?true:false;
    const target=targetAmountsDaily;
    const diff=targetAmountsDaily-average
    let rating: number;
    let ratingDescription: string;
    switch(true){
        case diff===0: 
            rating=3;
            ratingDescription='you did it';
            break;
        case diff<0.5:
            rating=2;
            ratingDescription='not too bad but could be better';
            break;
        case diff<1: 
            rating=1
            ratingDescription='come one we know you could do better';
            break;
        default: rating=0; break;
    }

    return{
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average
    }
}

const dailyExercisesHours = [3, 0, 2, 4.5, 0, 3, 1]
const targetAmountsDaily = 2
console.log(calculateExercises(dailyExercisesHours, targetAmountsDaily))