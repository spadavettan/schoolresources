import React, { useContext, useEffect } from 'react';
import {useHistory} from "react-router-dom";
import UniversityFinder from "../apis/UniversityFinder";
import { UniversitiesContext } from "../context/UniversitiesContext";
const UniversityList = (props) => {
    const{universities, setUniversities} = useContext(UniversitiesContext)

    let history = useHistory()
    //empty array second parameter means only happen on mount
    useEffect(() => {
        async function fetchData(){
            //*AXIOS* request is the method, params are whatever we want to append to baseURL in apis/UF.js
            const response = await UniversityFinder.get("/");
            setUniversities(response.data.data.universities);
    }
    fetchData();
    }, []);

    const handleDelete = async(id) =>{
        try {
            const response = await UniversityFinder.delete(`/${id}`);
            setUniversities(universities.filter(university => {
                return university.id !== id;
            }))
            console.log(response)
        } catch (error) {
            
        }
    }
    const handleClassSelect = async(id) =>{
        try {
            const response = await UniversityFinder.get(`/${id}`);
            setUniversities(response.data.data)
            console.log(response)
        } catch (error) {
            
        }
    }
  return (
    <div className="list-group">
        <table className="table table-hover">
            <thead>
                <tr className="bg-primary">
                    <th scope="col">
                        Universities
                    </th>
                    <th scope = "col">Delete</th>
                </tr>
            </thead>
            <tbody>
                {universities.map(university=> {
                    return(
                        <tr onClick = {()=>handleClassSelect(university.id)} key = {university.id}>
                            <td>{university.name}</td>
                            <td><button onClick = {()=>handleDelete(university.id)} className="btn-warning"> Delete </button></td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    </div>
  )
}

export default UniversityList