
// EXERCISE 9.2

const calculateBmi = (height:number, mass:number):string=>{
    let bmi = mass/Math.pow(height/100, 2)
    
    if(bmi< 18.5 ){
        return "Underweight";
    }
    else if(bmi< 25){
        return "Normal (Healthy weight)";
    }
    else if(bmi>25 && bmi<30){
        return "Overweight";
    }
    else if(bmi>30){
        return "Obese";
    }
    
}
// console.log(calculateBmi(180, 74))


// VERSION WITH ARGV, EXERCISE 9.3


// const height: number = Number(process.argv[2])
// const mass:number=Number(process.argv[3])

interface Values{
    height:number,
    mass:number
}

const Arguments = (args:Array<string>):Values=>{
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');
  if(!isNaN(Number(args[2])) && !isNaN(Number(args[3]))){
      return {
          height: Number(args[2]),
          mass:Number(args[3])
      }
  }else{
      throw new Error ("the entered values should be numbers")
  }
}


try{
    const {height, mass}= Arguments(process.argv);
    console.log(calculateBmi(height, mass))
}catch(e){
    console.log(`Something went wrong: ${e.message}`)
}
