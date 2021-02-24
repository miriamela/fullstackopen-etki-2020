import React from "react";
import {OccupationalHealthcareEntry} from "../types";

const OccupationalHealthcare:React.FC<{entry:OccupationalHealthcareEntry}>=({entry})=>{
console.log(entry)
    return(
        <section>
            <h3>{entry.date}, {entry.type}, {entry.employerName}</h3>
            <p>{entry.description}</p>
        </section>
    )
}

export default OccupationalHealthcare;