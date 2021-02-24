import React from "react";
import {HealthCheckEntry} from "../types";

const HealthCheckDisplay: React.FC<({entry: HealthCheckEntry})>=({entry})=>{
    // console.log(entry)
    return(
        <section>
            <h3>{entry.date}, {entry.type}</h3>
            <p>{entry.description}</p>
            <p>{entry.healthCheckRating}</p>
        </section>
    )
}

export default HealthCheckDisplay;