require("dotenv").config()
const express = require("express");
const morgan = require("morgan");
const db = require("./db");
const app = express();
const port = process.env.PORT || 3001;
const cors = require("cors");

app.use(cors());
app.use(express.json());
//get universities
app.get("/api/v1/universities", async (req, res) => {
    try{
        const results = await db.query("select * from universities");
        //console.log(results)
        res.status(200).json({
        status: "success",
        results: results.rows.length,
        data:{
            universities: results.rows
        },
    });
    }
    catch(err){
        console.log(err)
    }
    
});

//get a single university
app.get("/api/v1/universities/:id", async (req, res) =>{
    try{
        const results = await db.query("select * from universities where id = $1", [req.params.id]);
        //console.log(results)
        res.status(200).json({
        status: "success",
        results: results.rows.length,
        data:{
            name: results.rows
        },
    });
    }
    catch(err){
        console.log(err)
    }
});

//create a university
app.post("/api/v1/universities", async (req, res)=>{
    //console.log(req.body);
    try{
        const results = await db.query("insert into universities (name) values ($1) returning *", [req.body.name]);
        //console.log(results)
        res.status(200).json({
        status: "success",
        results: results.rows.length,
        data:{
            university: results.rows[0]
        },
    });
    }
    catch(err){
        console.log(err)
    }
});

//update restaurants
app.put("/api/v1/universities/:id", async (req, res)=>{
    try{
        const results = await db.query("UPDATE universities SET name = $1  where id = $2 returning *", [req.body.name, req.params.id]);
        //console.log(results)
        res.status(200).json({
            status: "success",
            results: results.rows.length,
            data: results.rows[0],
    });
    }
    catch(err){
        console.log(err)
    }
});
app.delete("/api/v1/universities/:id", async (req,res)=>{
    try{
        const results = await db.query("DELETE from universities where id = $1", [req.params.id]);
        //console.log(results)
        res.status(200).json({
            status: "success",
            results: results.rows.length
    });
    }
    catch(err){
        console.log(err)
    }
});

//////////////////////////////////////---------------CLASSESAPI---------------/////////////////////////////////////////////////

//get all classes
app.get("/api/v1/universities/:id/classes", async (req,res)=>{
    try{
        const results = await db.query("SELECT * from classes where university_id= $1", [req.params.id]);
        console.log(results)
        res.status(200).json({
            status: "success",
            results: results.rows.length,
            data:results.rows
    });
    }
    catch(err){
        console.log(err)
    }
});

//get a single class by id 
app.get("/api/v1/universities/:id/classes/:classid", async (req, res) =>{
    try{
        const results = await db.query(
            "select * from classes where id = $1", [req.params.classid]
        );
        //console.log(results)
        res.status(200).json({
        status: "success",
        results: results.rows.length,
        data:results.rows
    });
    }
    catch(err){
        console.log(err)
    }
});

//get a group of classes from a given university with a given prefix
app.get("/api/v1/universities/:id/classes/byprefix/:prefix", async (req, res) =>{
    try{
        const results = await db.query(
            "select * from classes where university_id = $1 and prefix = $2", 
            [req.params.id, req.params.prefix]
        );
        console.log(results)
        res.status(200).json({
        status: "success",
        results: results.rows.length,
        data:results.rows
    });
    }
    catch(err){
        console.log(err)
    }
});

//create a class in a given university
app.post("/api/v1/universities/:id/classes", async (req, res)=>{
    //console.log(req.body);
    try{
        const results = await db.query(
            "insert into classes (university_id, prefix, suffix) values ($1, $2, $3) returning *",
            [req.params.id, req.body.prefix, req.body.suffix]
        );
        //console.log(results)
        res.status(201).json({
        status: "success",
        results: results.rows.length,
        data:{
            class: results.rows[0]
        },
    });
    }
    catch(err){
        console.log(err)
    }
});


//delete a class
app.delete("/api/v1/universities/:id/classes/:classid", async (req,res)=>{
    try{
        const results = await db.query("DELETE from classes where id = $1", [req.params.classid]);
        //console.log(results)
        res.status(200).json({
            status: "success",
            results: results.rows.length
    });
    }
    catch(err){
        console.log(err)
    }
});

/////////////////////////////////////////////////////--------------PROFESSOR API---------/////////////////////////////////////////////////
//get all professors at a university 
app.get("/api/v1/universities/:id/professors", async (req, res) =>{
    try{
        const results = await db.query(
            "select * from professors where university_id = $1 ", [req.params.id]
        );
        //console.log(results)
        res.status(200).json({
        status: "success",
        results: results.rows.length,
        data:results.rows
    });
    }
    catch(err){
        console.log(err)
    }
});

//get all professors for a certain class
app.get("/api/v1/universities/:id/classes/:classid/professors", async (req, res) =>{
    try{
        const results = await db.query(
            "select * from professors where university_id = $1 and class_id = $2", [req.params.id, req.params.classid]
        );
        //console.log(results)
        res.status(200).json({
        status: "success",
        results: results.rows.length,
        data:results.rows
    });
    }
    catch(err){
        console.log(err)
    }
});

//create a professor for a class at a given university
app.post("/api/v1/universities/:id/classes/:classid/professors", async (req, res)=>{
    //console.log(req.body);
    try{
        const results = await db.query(
            "insert into professors (university_id, class_id, name) values ($1, $2, $3) returning *",
            [req.params.id, req.params.classid, req.body.name]
        );
        //console.log(results)
        res.status(201).json({
        status: "success",
        results: results.rows.length,
        data:{
            university: results.rows[0]
        },
    });
    }
    catch(err){
        console.log(err)
    }
});


//delete a professor
//TODO: Change database to not create multiple instances of a single professor when they teach at multiple schools
//structure database to allow multiple foreign key references to universities
app.delete("/api/v1/universities/:id/classes/:classid/professors/:professorid", async (req,res)=>{
    try{
        const results = await db.query("DELETE from professors where id = $1", 
        [req.params.professorid]);
        //console.log(results)
        res.status(200).json({
            status: "success",
            results: results.rows.length
    });
    }
    catch(err){
        console.log(err)
    }
});



/////////////////////////////////////////////////////--------------RESOURCES API---------/////////////////////////////////////////////////


//get resources for a u/c/p
app.get("/api/v1/universities/:id/classes/:classid/professors/:professorid/resources", async (req, res) =>{
    try{
        const results = await db.query(
            "select * from resources where professor_id = $1", 
            [req.params.professorid]
        );
        //console.log(results)
        res.status(200).json({
        status: "success",
        results: results.rows.length,
        data: results.rows
    });
    }
    catch(err){
        console.log(err)
    }
});
//get resources by type for a u/c/p
app.get("/api/v1/universities/:id/classes/:classid/professors/:professorid/resources/:type", async (req, res) =>{
    try{
        const results = await db.query(
            "select * from resources where university_id = $1 and class_id = $2 and professor_id = $3 and type = $4",
            [req.params.id,req.params.classid,req.params.professorid, req.params.type]
        );
        //console.log(results)
        res.status(200).json({
        status: "success",
        results: results.rows.length,
        data:{
            name: results.rows
        },
    });
    }
    catch(err){
        console.log(err)
    }
});
//add a resource for a u/c/p
app.post("/api/v1/universities/:id/classes/:classid/professors/:professorid/resources", async (req, res)=>{
    //console.log(req.body);
    try{
        const results = await db.query(
            "insert into resources (university_id, class_id, professor_id, link, name, description, type) values ($1, $2, $3, $4, $5, $6, $7) returning *",
            [req.params.id, req.params.classid, req.params.professorid, req.body.link, req.body.name, req.body.description, req.body.type]
        );
        //console.log(results)
        res.status(201).json({
        status: "success",
        results: results.rows.length,
        data:{
            university: results.rows[0]
        },
    });
    }
    catch(err){
        console.log(err)
    }
});

//update a resource for a u/c/p
app.put("/api/v1/universities/:id/classes/:classid/professors/:professorid/resources/:resourceid", async (req, res)=>{
    try{
        const results = await db.query("UPDATE resources SET link = $1, name = $2, description = $3, type = $4 where id = $5 returning *", 
        [req.body.link, req.body.name, req.body.description, req.body.type, req.params.resourceid]);
        //console.log(results)
        res.status(200).json({
            status: "success",
            results: results.rows.length,
            data: results.rows[0],
    });
    }
    catch(err){
        console.log(err)
    }
});

//delete a resource for a u/c/p
app.delete("/api/v1/universities/:id/classes/:classid/professors/:professorid/resources/:resourceid", async (req,res)=>{
    try{
        const results = await db.query("DELETE from resources where id=$1", 
        [req.params.resourceid]);
        //console.log(results)
        res.status(200).json({
            status: "success",
            results: results.rows.length
    });
    }
    catch(err){
        console.log(err)
    }
});

app.listen(port, () =>(
    console.log(`server is up and listening on port ${port}`)
));