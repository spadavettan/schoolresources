import React, { useState, useContext } from 'react'
import UniversityFinder from '../apis/UniversityFinder';
import { UniversitiesContext } from '../context/UniversitiesContext';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
//generate forms to add elements to each category
const ShowForm = () => {
    const [name, setName] = useState("");
    const [prefix, setPrefix] = useState("");
    const [suffix, setSuffix] = useState("");
    const [assignment, setAssignment] = useState("");
    const [link, setLink] = useState("");
    const [aType, setAType] = useState("");
    const [description, setDescription] = useState("");
    const {universities, setUniversities} = useContext(UniversitiesContext);
    const {addUniversities} = useContext(UniversitiesContext);
    const {type, setType} = useContext(UniversitiesContext);
    const {path, setPath} = useContext(UniversitiesContext);
    const {open, setOpen} = useContext(UniversitiesContext);
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };
    const formHandler = () => {
        if (type == "universities"){
            
           return( <div className="mb-4">
                <form action = "">
                    <div className="from-row">
                        <div className="col">
                            <input value = {name} onChange={e=>setName(e.target.value)} type = "text" className="form-control" placeholder="University Name"/>
                        </div>
                        <button type = "submit" onClick = {handleSubmit} className="btn btn-primary">Add University</button>
                    </div>
                </form>
            </div> )          
        }
        else if (type == "classes"){
           return (<div className="mb-4">
            <form action = "">
                <div className="from-row">
                    <div className="col">
                        <input value = {prefix} onChange={e=>setPrefix(e.target.value)} type = "text" className="form-control" placeholder="Like 'CSE,' 'ENG,' 'MATH'..."/>
                        <input value = {suffix} onChange={e=>setSuffix(e.target.value)} type = "text" className="form-control" placeholder="Like '101,' '8A,' '13B'..."/>
                    </div>
                    <button type = "submit" onClick = {handleSubmit} className="btn btn-primary">Add Class</button>
                </div>
            </form>
        </div>)
        }
        else if (type == "professors"){
           return (<div className="mb-4">
            <form action = "">
                <div className="from-row">
                    <div className="col">
                        <input value = {name} onChange={e=>setName(e.target.value)} type = "text" className="form-control" placeholder="Professor Name"/>
                    </div>
                    <button type = "submit" onClick = {handleSubmit} className="btn btn-primary">Add Professor</button>
                </div>
            </form>
        </div>)
        }
        else if (type == "resources"){
            return (<div className="mb-4">
                <form action = "">
                    <div className="from-row">
                        <div className="col">
                            <input value = {name} onChange={e=>setName(e.target.value)} type = "text" className="form-control" placeholder="Name your resource"/>
                            <select onChange={(e)=>setAType(e.target.value)}name="aType">
                                <option value="assignment">Assignment</option>
                                <option value="assessment">Assessment</option>
                            </select>
                            <input value = {link} onChange={e=>setLink(e.target.value)} type = "text" className="form-control" placeholder="Link to your resource"/>
                            <input value = {description} onChange={e=>setDescription(e.target.value)} type = "text" className="form-control" placeholder="Add a short desciprtion for your resource"/>
                        </div>
                        <button type = "submit" onClick = {handleSubmit} className="btn btn-primary">Add Resource</button>
                    </div>
                </form>
            </div>)
        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            let response
            if (type == "universities"){
            const response = await UniversityFinder.post("/", {
                name
            });
            console.log("added university post request complete");
            setOpen(false);
            console.log("adding university");
            console.log(universities);
            setUniversities([...universities, response.data.data.university]);
            console.log(universities);
        }
            else if (type == "classes"){
            const response = await UniversityFinder.post(`/${path["uid"]}/classes`, {
                    prefix,
                    suffix
                });
                setOpen(false);
            console.log("adding university");
            console.log(universities);
            setUniversities([...universities, response.data.data.class]);
            console.log(universities);
            }
            else if (type == "professors"){
            const response = await UniversityFinder.post(`/${path["uid"]}/classes/${path["cid"]}/professors`, {
                    name
                });
                setOpen(false);
                console.log("adding university");
                console.log(universities);
                setUniversities([...universities, response.data.data.university]);
                console.log(universities);
            }
            else if (type == "resources"){
            const response = await UniversityFinder.post(`/${path["uid"]}/classes/${path["cid"]}/professors/${path["pid"]}/resources`, {
                    link,
                    name,
                    description,
                    aType
                });
            setOpen(false);
            console.log("adding university");
            console.log(universities);
            setUniversities([...universities, response.data.data.university]);
            console.log(universities);
            }
            
        }
        catch(err){}
    }

  return (
    <div>
    <Button onClick={()=>setOpen(true)}>Add something.</Button>
    <Modal
        open={open}
        onClose={()=>setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
    >
    <Box sx={style}>
        {formHandler()}
    </Box>
    </Modal>
    </div>
  )
}

export default ShowForm