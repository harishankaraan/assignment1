import express from "express";
import mongoose from "mongoose";
import connectDB from "./db.js";

const assignmentSchema= mongoose.Schema({

     assignment:[{
    enrollNo:{
        type:String,
        // required:true,
    },
    name:{
        type:String,
        required:true,
    },
}]
})

const Assignment=mongoose.model("Assignment",assignmentSchema);
assignmentSchema.plugin(Assignment);

connectDB();
const app=express();
app.use(express.json());


const user={
    assignment:[
    {
        enrollNo:"0001",
        name:"Harish",
    },
    {
        enrollNo:"0002",
        name:"Shalini",
    },
    {
        enrollNo:"0003",
        name:"Devipriya",
    },
    {
        enrollNo:"0004",
        name:"Hem",
    },
    {
        enrollNo:"0005",
        name:"Hari",
    },
    {
        enrollNo:"0006",
        name:"Megha",
    },
    {
        enrollNo:"0007",
        name:"Aswini",
    },
    {
        enrollNo:"0008",
        name:"Naveen",
    },
]
}



// get 

app.get("/api/user",(req,res)=>{
    try{
        res.status(200).send(user);
    }
    catch(error){
        res.json({message:"not available"});
    }
});

// specificData

// app.get('/:id',(req,res)=>{
//     console.log(req.params.id);
//     Assignment.findById(req.params.id)

//     .then(result=>{
//         res.status(200).json({
//             user:result
//         })
//     })
//     .catch(err=>{
//         console.log(err);
//         res.status(505).json({
//             error:err
//         })
//     })
// })

// post

app.post("/api/user", async(req,res)=>{
    try{
        const details={
            assignment:req.body.assignment,
        }
        console.log(details);
        const user=new Assignment(details);
        const userCreated=await user.save();

        if(userCreated){
            console.log("created");
            res.status(201).json({message:"successfully created"});
        }
        else{
            res.status(401);
            throw new error("not found");
        }
    }
    catch(err){
        return res.status(500).json({message:err.message});
    }
});

// put

app.put("/api/user:id",(req,res)=>{
    console.log(req.params.id);
    Assignment.findOneAndUpdate({_id:req.params.id},{
        $set:{
            assignment:req.body.assignment,
        }
    })
    .then(result=>{
        res.status(200).json({
            updated_assignment:result
        })
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({
            error:err
        })
    })
})

// delete

app.delete("/api/user:id",(req,res)=>{
    console.log(req.params.id);
    Assignment.findByIdAndRemove({_id:req.params.id},{
        $set:{
            assignment:req.body.assignment,
        }
    })
    .then(result=>{
        res.status(200).json({
            Deleted_assignment:result
        })
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({
            error:err
        })
        
    })
})


function acceptOrReject(req, res) {
    const { status } = req.body;
  
    if (status === 'accepted') {
      // accept the request
      res.status(200).json({ message: 'Request accepted' });
    } else if (status === 'rejected') {
      // reject the request
      res.status(200).json({ message: 'Request rejected' });
    } else {
      res.status(400).json({ message: 'Invalid status'});
  }
  }

// export default router;

const port=9532;
app.listen(port,()=>{
    console.log(`server is running on ${port}`);
});