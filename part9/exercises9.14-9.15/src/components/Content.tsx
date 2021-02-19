/* eslint-disable react/prop-types */
import React from "react";
import Part from "./Part";

interface EachPart{
    name: string
    exerciseCount: number
}

const Content: React.FC<{courseParts: EachPart[]}> =({courseParts})=>{
    return(
        <div>
        {courseParts.map((each, i)=>(
            <div key={i}><Part name={each.name} exerciseCount={each.exerciseCount}/></div>
        ))
         } </div>
    )
    
}

export default Content;