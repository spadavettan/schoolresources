import React, {useState, createContext} from "react";

export const UniversitiesContext = createContext();

export const UniversitiesContextProvider = (props) => {
    const [universities, setUniversities] = useState([])
    const[type, setType] = useState("universities")
    const [path, setPath] = useState({})
    const [open, setOpen] = useState(false)
    const addUniversity = (university) => {
        console.log("about to set state in context:")
        console.log(universities)
        setUniversities([...universities, university])
        console.log("set state in context:")
        console.log(universities)
    }


    





    return(
        <UniversitiesContext.Provider value = {{universities, setUniversities, addUniversity, type, setType, path, setPath, open, setOpen}}>
            {props.children}
        </UniversitiesContext.Provider>
    );
}