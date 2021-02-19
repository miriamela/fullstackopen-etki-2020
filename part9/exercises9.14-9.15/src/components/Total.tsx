/* eslint-disable react/prop-types */
import React from "react";

const Total: React.FC<{total:number}>=({total})=>{
    return(
        <p>
        Number of exercises, {total}
      </p>
    ) 
}

export default Total;
