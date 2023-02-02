import React, { useState, useContext, useEffect } from 'react';
import {useHistory} from "react-router-dom"
import UniversityFinder from "../apis/UniversityFinder";
import { UniversitiesContext } from "../context/UniversitiesContext";
const UniversityList = (props) => {
    const{universities, setUniversities} = useContext(UniversitiesContext)
    const{type, setType} = useContext(UniversitiesContext)
    const{path, setPath} = useContext(UniversitiesContext)
    let history = useHistory()
    //empty array second parameter means only happen on mount
    useEffect(() => {
        async function fetchData(){
            //*AXIOS* request is the method, params are whatever we want to append to baseURL in apis/UF.js
                const response = await UniversityFinder.get("/");
                setUniversities(response.data.data.universities);
                setType("universities");
    }
    fetchData();
    }, []);

    //works for all because we use id
    const handleDelete = async(id) =>{
        try {
            //handling delete!
            if (type==="universities"){
                const response = await UniversityFinder.delete(`/${id}`);
            }
            else if(type==="classes"){
                const response = await UniversityFinder.delete(`/${universities[0].university_id}/${id}`);
            }
            else if(type==="professors"){
                const response = await UniversityFinder.delete(`/${universities[0].university_id}/classes/${universities[0].class_id}/professors/${id}}`);
            }
            else if(type==="resources"){
                const response = await UniversityFinder.delete(`/${universities[0].university_id}/classes/${universities[0].class_id}/professors/${universities[0].professor_id}/${id}}`);
            }
            setUniversities(universities.filter(university => {
                return university.id !== id;
            }))
            //console.log(response)
        } catch (error) {
            
        }
    }
    
    const handleUniversitySelect = async() => {
        try{
            console.log("getting universities")
            const response = await UniversityFinder.get("/");
            setUniversities(response.data.data.universities);
            console.log(response.data.data.universities);
            setType("universities");
        }
        catch(error){}
    }
    const handleClassSelect = async(id, name) =>{
        try {
            console.log("onclick works")
            const response = await UniversityFinder.get(`/${id}/classes/`);
            console.log(response.data.data)
            console.log("save the state to path, works because you cannot get to classSelect without already having a uni saved to state")

            //set the list data
            setUniversities(response.data.data);
            let newPath = {}
            newPath = {"uid" : id}
            setPath(newPath)
            //set the type
            setType("classes")
        } catch (error) {
            
        }
    }

    //professor list data
    const handleProfessorSelect = async(uid, cid, prefix, suffix) => {
        try{
            console.log("onclick works from classes list")
            //get the list of professors for the class
            const response = await UniversityFinder.get(`/${uid}/classes/${cid}/professors`)
            console.log(response.data.data)
            console.log("save professor path state")
            let newPath = {}
            newPath = {"uid": uid, "cid": cid}
            setPath(newPath)
            setUniversities(response.data.data)
            setType("professors")
        }
        catch(error){}
    }
    const handleResourcesSelect = async(uid, cid, pid, name) => {
        try{
            console.log("onclick works from professors list")
            const response = await UniversityFinder.get(`/${uid}/classes/${cid}/professors/${pid}/resources`)
            console.log("save resource path state")
            //length 3 indicates coming from professor 
            let newPath = {}
            newPath = {"uid": uid, "cid": cid, "pid": pid}
            setPath(newPath)
            setUniversities(response.data.data)
            console.log(response.data.data)
            setType("resources")
        }
        catch(error){}
    }
    
    const renderUniversities = () => {
        return universities.map(university=> {
            return(
                <tr onClick = {()=>handleClassSelect(university.id, university.name)} key = {university.id}>
                    <td>{university.name}</td>
                    <td><button onClick = {()=>handleDelete(university.id)} className="btn-warning"> Delete </button></td>
                </tr>
            )
        })
    }
    const renderClasses = () =>{
        return universities.map(university=> {
            //cols: prefix, suffix
            return(
                <tr onClick = {()=>handleProfessorSelect(university.university_id, university.id, university.prefix, university.suffix)} key = {university.id}>
                    <td>{university.prefix.concat(university.suffix)}</td>
                    <td><button onClick = {()=>handleDelete(university.id)} className="btn-warning"> Delete </button></td>
                </tr>
            )
        })
    }
    const renderProfessors = () =>{
        return universities.map(university=>{
            //just need name and delete?
            return(
                <tr onClick = {()=>handleResourcesSelect(university.university_id, university.class_id, university.id, university.name)} key = {university.id}>
                    <td>{university.name}</td>
                    <td><button onClick = {()=>handleDelete(university.id)} className="btn-warning"> Delete </button></td>
                </tr>
            )
        })
    }
    const renderResources = () =>{
        return universities.map(university=>{
            //need the most things - name, assignment, assignment name(tbd), description, link, delete
            return(
                <tr key = {university.id}>
                    <td>{university.name}</td>
                    <td>{university.type}</td>
                    <td>{university.link} </td>
                    <td>{university.description}</td>
                    <td><button onClick = {()=>handleDelete(university.id)} className="btn-warning"> Delete </button></td>
                </tr>
            )
        })
    }
    
    const listHandler = () =>{
        if (type == "classes"){
            return renderClasses()
        }
        else if (type == "universities"){
            return renderUniversities()
        }
        else if (type == "professors"){
            return renderProfessors()
        }
        else if (type == "resources"){
            return renderResources()
        }
    }

    const pathHandler = () => {
        if (type == "classes"){
            return cPath()
        }
        else if (type == "universities"){
            return uPath()
        }
        else if (type == "professors"){
            return pPath()
        }
        else if (type == "resources"){
            return rPath()
        }
    }
    const cPath = () => {
        return(
        <div class="pathrow">
            <div class = "upath" onClick = {()=>handleUniversitySelect()}> Universities </div>
            <div class= "cpath" > Classes </div>
        </div>
        )
    }
    //used to return the "path" bar above the table 
    const uPath = () => {
        return(
            <div class="pathrow">
                <div class = "upath"> Universities </div>
            </div>
            )
    }
    const pPath = () => {
        return(
            <div class="pathrow">
            <div class = "upath" onClick = {()=>handleUniversitySelect()}> Universities </div>
            <div class= "cpath" onClick = {()=>handleClassSelect(path["uid"])}> Classes </div>
            <div class = "ppath"> Professors </div>
            </div>
        )
    }
    const rPath = () => {
        return(
            <div class="pathrow">
                <div class = "upath" onClick = {()=>handleUniversitySelect()}> Universities </div>
                <div class= "cpath" onClick = {()=>handleClassSelect(path["uid"])}> Classes </div>
                <div class = "ppath" onClick = {()=>handleProfessorSelect(path["uid"], path["cid"])}> Professors </div>
                <div class = "rpath"> Resources </div>
            </div>
    )
    }
    const headHandler = () => {
        if (type == "classes"){
            return cHead()
        }
        else if (type == "universities"){
            return uHead()
        }
        else if (type == "professors"){
            return pHead()
        }
        else if (type == "resources"){
            return rHead()
        }
    }
    const uHead = () => {
        return (
            <tr className="bg-primary">
                <th scope="col">University</th>
                <th scope = "col">Delete</th>
            </tr>
        )
    }
    const cHead = () => {
        return (
            <tr className="bg-primary">
                <th scope="col">Class</th>
                <th scope = "col">Delete</th>
            </tr>
        )
    }
    const pHead = () => {
        return (
            <tr className="bg-primary">
                <th scope="col">Professor</th>
                <th scope = "col">Delete</th>
            </tr>
        )
    }
    const rHead = () => {
        return (
            <tr className="bg-primary">
                <th scope="col">Name</th>
                <th scope="col">Type</th>
                <th scope="col">Link</th>
                <th scope="col">Description</th>
                <th scope = "col">Delete</th>
            </tr>
        )
    }
  return (
    <div className="list-group">
        <div class="pathrow">
                {pathHandler()}
        </div>
        <table className="table table-hover">
            <thead>
                {headHandler()}
            </thead>
            <tbody>
                {listHandler()/*universities.map(university=> {
                    return(
                        <tr onClick = {()=>handleClassSelect(university.id)} key = {university.id}>
                            <td>{university.name}</td>
                            <td><button onClick = {()=>handleDelete(university.id)} className="btn-warning"> Delete </button></td>
                        </tr>
                    )
                })*/}
            </tbody>
        </table>
    </div>
  )
}

export default UniversityList