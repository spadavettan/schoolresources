import React, {useState, createContext} from "react";

export const UniversitiesContext = createContext();

export const UniversitiesContextProvider = (props) => {
    const [universities, setUniversities] = useState([])
    const[type, setType] = useState("universities")
    const [path, setPath] = useState({})
    const addUniversity = (university) => {
        setUniversities([...universities, university])
    }

    





    return(
        <UniversitiesContext.Provider value = {{universities, setUniversities, addUniversity, type, setType, path, setPath}}>
            {props.children}
        </UniversitiesContext.Provider>
    );
}