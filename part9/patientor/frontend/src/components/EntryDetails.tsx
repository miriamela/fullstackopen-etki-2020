import React from "react";
import { Entry } from "../types";
import HealthCheckDisplay from "./HealthCheckDisplay";
import HospitalDisplay from "./HospitalDisplay";
import OccupationalHealthcareDisplay from "./OccupationalHealthcareDisplay";

const EntryDetails: React.FC<{entry: Entry}> = ({entry})=>{
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  const showIconType=(type: string): "user md"|"stethoscope"|"hospital"=>{
    if(type === "OccupationalHealthcare"){
      return "stethoscope"
    }
    else if(type=== "Hospital"){
      return "hospital"
    }
    else{
      return "user md"
    }
    
  }
switch (entry.type) {
  case "HealthCheck":
    return (
      <HealthCheckDisplay iconType={showIconType(entry.type)} entry={entry}/>
    );
  case "Hospital":
    return(
      <HospitalDisplay iconType={showIconType(entry.type)}entry={entry}/>
    );
  case "OccupationalHealthcare":
    return(
      <OccupationalHealthcareDisplay iconType={showIconType(entry.type)} entry={entry}/>
    )
  default:
    return assertNever(entry)
}

}
export default EntryDetails;

