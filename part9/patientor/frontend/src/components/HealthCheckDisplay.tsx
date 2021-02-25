import React from "react";
import {HealthCheckEntry} from "../types";
import {Icon, Segment, SemanticCOLORS} from "semantic-ui-react";

const HealthCheckDisplay: React.FC<({entry: HealthCheckEntry, iconType: any})>=({entry, iconType})=>{
    // console.log(entry)

const getIconRating =(rating:number):SemanticCOLORS=>{
    if(rating=== 0){
        return "green"
    }
    else if(rating === 1){
        return "yellow"
    }
    else if(rating ===2){
        return "orange"
    }
    else{
        return "red"
    }
}
    return(
        <Segment color="blue">
            <h3>{entry.date}, <Icon className={iconType}/></h3>
            <p><i>{entry.description}</i></p>
            <p><Icon className="heart" color={getIconRating(entry.healthCheckRating)}/></p>
        </Segment>
    )
}

export default HealthCheckDisplay;