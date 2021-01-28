// EXERCISE 9.2

export interface Object{
    periodLength: number,
    trainingDays: number,
    target: number,
    average: number,
    success: boolean,
    rating:number,
    ratingDescription:string 
}

const calculateRating = (average:number, target:number):number=>{
    const rate = (100*average)/target;
    if(average>=target){
        return 3
    }
    else if(rate >= 75){
        return 2
    }
    else{
        return 1
    }
    
}

const ratingSentence=(rating:number):string=>{
    console.log(rating)

    
    if(rating ===3){
        return "Well done you!"
    }
    else if(rating ===2){
        return "Not too bad but you can do better, and you know it";
    }
    else{
        return "Nice try kid" 
    }
}


export const calculateExercise =(days: Array<number>, target:number):Object =>{
    const numberOfDays= days.length;
    const numberOfTrainedDays= days.filter(each=> each !==0).length
    const average= days.reduce((total, amount)=> total+amount)/days.length;
    const rating = calculateRating(average, target);
    const success= (rating === 3)? true: false;
    const ratingDescription= ratingSentence(rating);

return{
    periodLength: numberOfDays,
    trainingDays: numberOfTrainedDays,
    target: target,
    average: average,
    rating: rating,
    success: success,
    ratingDescription: ratingDescription,
}

}

// console.log(calculateExercise([3, 0, 2, 4.5, 0, 3, 1], 2))

// EXERCISE 9.3

// interface ValuesNeeded{
//     days: Array<number>,
//     target: number | undefined,
    
// }

// const argvArgument =(args:Array<string>):ValuesNeeded=>{
    
//     if(args.length < 4){
//         throw new Error ("not enough arguments")
//     }
//     const numbers= args.slice(2).map(each=> Number(each))
// // first version the checked was performed with typeof each === "number", the issue is: when you change to
// // number whatever you have inside the array numbers, if there is s string it will output that element as NaN and
// // NaN, when goes through the check of typeof, is red as a Number... one of the random things of JS...
//     const allNumbers = numbers.every(each => !isNaN(each))
//     if(allNumbers){
//         const target =numbers.shift()
//         return{
//             days: numbers,
//             target: target,
//         }
//     }else{
//         throw new Error ("all data provided should be numbers")
//     }
// }

// try{
//     const {days, target}= argvArgument(process.argv);
//     console.log(calculateExercise(days, target))
// }catch(e){
//     console.log(`Something went wrong: ${e.message}`)
// }