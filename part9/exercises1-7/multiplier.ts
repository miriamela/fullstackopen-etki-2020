// npm run ts-node -- multiplier.ts

// defining the entry values, and all possibilities of errors

// defining value1 and value2 as numbers
interface MultiplyValues{
    value1 : number;
    value2 : number;
}
// defining the args values as array of strings and building function to verify if the 
// values entered in command line are exactly the one we need to have the multiplier working!
const parseArguments = (args:Array<string>): MultiplyValues =>{
    console.log(args)
    
    if(args.length<4){
        throw new Error ("Not enough arguments")
    }
    if(args.length>4){
        throw new Error ("Too many arguments")
    }
    if(!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        return {
            value1:Number(args[2]),
            value2:Number(args[3])
        }
    } else {
        throw new Error ("Provided values were not numbers!")
    }
}

const multiplicator = (a:number,b:number,printText:string)=>{
    console.log(printText, a*b);
}
try {
    const { value1, value2 } = parseArguments(process.argv);
    multiplicator(value1, value2, `Multiplied ${value1} and ${value2}, the result is:`);
  } catch (e) {
    console.log('Error, something bad happened, message: ', e.message);
  }


