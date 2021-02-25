import React from "react";
import {HospitalEntry} from "../types";
import {useStateValue} from "../state/state";
import {Icon, Segment} from "semantic-ui-react";

const HospitalDisplay: React.FC<{entry:HospitalEntry, iconType: string}>=({entry,iconType})=>{
    const [{diagnoses}] =useStateValue()
    // console.log(entry)
    if(!diagnoses){
        return null
    }
    return(
        <Segment color="blue">
            <h3>{entry.date}, <Icon className={iconType}/></h3>
            <p><i>{entry.description}</i></p>
            {/* this part is still creating issues, the page will render before the diagnoses promise is fulfilled, 
            therefore if reloading the page it will give error*/}
            <h4>Diagnoses:</h4>
            <ul>
                {
                    entry.diagnosisCodes!== undefined? entry.diagnosisCodes.map(each=>
                        <li key={each}>{entry.diagnosisCodes}: {diagnoses[each].name} </li>
                        ):null
                }
               
            </ul>
            <h4>Discharged: {entry.discharge.date}</h4>
            <p>{entry.discharge.criteria}</p> 
        </Segment>
    )
}
export default HospitalDisplay;