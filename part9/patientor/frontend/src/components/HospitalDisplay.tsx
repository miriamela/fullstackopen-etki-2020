import React from "react";
import {HospitalEntry} from "../types";
import {useStateValue} from "../state/state";

const HospitalDisplay: React.FC<{entry:HospitalEntry}>=({entry})=>{
    const [{diagnoses}] =useStateValue()
    // console.log(entry)
    if(!diagnoses ||entry.diagnosisCodes ===undefined ){
        return null
    }
    return(
        <section>
            <h3>{entry.date}, {entry.type}</h3>
            <p>{entry.description}</p>
            <h4>Diagnoses:</h4>
            <ul>
                {
                    entry.diagnosisCodes.length>0? entry.diagnosisCodes.map(each=>
                        <li key={each}>{entry.diagnosisCodes}: {diagnoses[each].name} </li>
                        ):null
                }
               
            </ul>
            <h4>Discharged: {entry.discharge.date}</h4>
            <p>{entry.discharge.criteria}</p> 
        </section>
    )
}
export default HospitalDisplay;