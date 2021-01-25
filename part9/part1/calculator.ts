// npm run ts-node -- calculator.ts

type Operations = "multiply" | "add"|"divide";
type Result= number;

const calculator = (a:number, b:number, op:Operations):Result=>{
    switch (op) {
        case "multiply":
            return a*b;
        case "add":
            return a+b;
        case "divide":
            if(b ===0) throw new Error("Can\'t divide by 0!")
            return a/b;
        default:
            throw new Error ("The operation is not multiply, add or divide")
    }
}
try{
    console.log(calculator(10,0, "divide"))
}catch (error){
    console.log("Something went wrong:", error.message)
}
