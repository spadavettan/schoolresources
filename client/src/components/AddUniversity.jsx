import React, { useState, useContext } from 'react'
import UniversityFinder from '../apis/UniversityFinder';
import { UniversitiesContext } from '../context/UniversitiesContext';
const AddUniversity = () => {
    const [name, setName] = useState("");
    const {addUniversities} = useContext(UniversitiesContext);
    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
            const response = await UniversityFinder.post("/", {
                name
            });
            addUniversities(response.data.data);
            console.log(response);
        }
        catch(err){}
    }

  return (
    <div className="mb-4">
        <form action = "">
            <div className="from-row">
                <div className="col">
                    <input value = {name} onChange={e=>setName(e.target.value)} type = "text" className="form-control" placeholder="University Name"/>
                </div>
                <button type = "submit" onClick = {handleSubmit} className="btn btn-primary">Add University</button>
            </div>
        </form>
    </div>
  )
}

export default AddUniversity