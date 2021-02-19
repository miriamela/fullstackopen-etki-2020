/* eslint-disable react/prop-types */
import React from "react";


const Part: React.FC<{name: string, exerciseCount: number }> =({name, exerciseCount})=>{
    return(
        <>
        <p>{name}, {exerciseCount}</p>
        </>
    )
}

export default Part;