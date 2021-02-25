import React from "react";
import {OccupationalHealthcareEntry} from "../types";
import {Icon, Segment} from "semantic-ui-react"

interface MyProps{
    entry:OccupationalHealthcareEntry,
    iconType: string
}

const OccupationalHealthcareDisplay:React.FC<MyProps>=({entry,iconType})=>{
console.log(entry)
    return(
        <Segment color="blue">
            <h3>{entry.date}, <Icon className={iconType}/>, {entry.employerName}</h3>
            <p><i>{entry.description}</i></p>
        </Segment>
    )
}

export default OccupationalHealthcareDisplay;