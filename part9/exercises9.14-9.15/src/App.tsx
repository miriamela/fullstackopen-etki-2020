/* eslint-disable react/prop-types */
import React from "react";
import Header from "./components/Header";
import Total  from "./components/Total";

interface CoursePartBase {
  name: string;
  exerciseCount: number;
}
interface CourseBaseTwo  extends CoursePartBase {
  description: string,
}

interface CoursePartOne extends CourseBaseTwo {
  name: "Fundamentals";
}

interface CoursePartTwo extends CoursePartBase {
  name: "Using props to pass data";
  groupProjectCount: number;
}

interface CoursePartThree extends CourseBaseTwo {
  name: "Deeper type usage";
  exerciseSubmissionLink: string;
}

type CoursePart = CoursePartOne | CoursePartTwo | CoursePartThree;
const assertNever = (value: never): never => {
  throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Content: React.FC<{courseParts: CoursePart[]}> =({courseParts})=>{
    
  return(
      <div>
      {courseParts.map((each: CoursePart)=>(
          <Part part={each} key={each.name} />
      ))
       } </div>
  )
  
}
const Part: React.FC<{part:CoursePart}> =({part})=>{
  
      switch (part.name) {
          case "Fundamentals":
              return (<p>{part.name} {part.description} {part.exerciseCount}</p>);
          case "Using props to pass data":
              return (<p>{part.name} {part.exerciseCount} {part.groupProjectCount}</p>);
          case "Deeper type usage":
              return (<p>{part.name} {part.description} {part.exerciseCount} {part.exerciseSubmissionLink}</p>);
          default:
              return assertNever(part)
      }  
}



const App: React.FC = () => {
  const courseName = "Half Stack application development";
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev"
    }
  ];
  const total= courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)

  return (
    <div>
      <Header courseName={courseName}/>
      <Content courseParts ={courseParts} />
     <Total total={total}/>
    
    </div>
  );
};


export default App;
