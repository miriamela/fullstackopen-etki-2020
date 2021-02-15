import diagnosesData from "../../data/diagnoses.json";
import {DiagnoseEntry} from "../types";

const diagnoses : Array<DiagnoseEntry> =diagnosesData

const getAll =(): DiagnoseEntry[]=>{
    return diagnoses;
}

const addEntry =()=>{
    return null
}

export default {
    getAll: getAll,
    addEntry: addEntry
}