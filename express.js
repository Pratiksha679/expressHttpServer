const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());
let users =[{
    name:"Pratiksha",
    kidneys:[{
        healthy: true
    }]
}]


app.get("/", function(req, res){
    const johnKidneys = users[0].kidneys;
    const numberKidneys = johnKidneys.length;
    let healthyKidneyArray = johnKidneys.filter((state)=> {
        return (state.healthy == true);
    })
    let numberOfHealthyKidneys = healthyKidneyArray.length;
    let numberOfUnHealthyKidneys = numberKidneys- numberOfHealthyKidneys;
    res.json({
        numberKidneys,
        numberOfHealthyKidneys,
        numberOfUnHealthyKidneys
    })
});


app.post("/", function(req, res){
    const isHealthy = req.body.isHealthy;
    users[0].kidneys.push({
        healthy:isHealthy
    })
    res.json({
        msg:"Done"
    })
});


app.put("/", function(req, res){
    for(let i=0;i<users[0].kidneys.length;i++){
        users[0].kidneys[i].healthy=true;
    }
    res.json({
        msg:"Done"
    })
});


app.delete("/", function(req, res){
    let isAtleastUnhealthyKidneyPresentBool = isAtleastUnhealthyKidneyPresent();
    if(isAtleastUnhealthyKidneyPresentBool){
        let newKidneys = users[0].kidneys.filter((kidney)=>{
            return (kidney.healthy == true);
        })
        users[0].kidneys = newKidneys;
        res.json({
            msg:"Done"
        })
    }
    else{
    res.sendStatus(411).json({msg:"You have no bad kidneys"});
    }
});

function isAtleastUnhealthyKidneyPresent(){
    let isAtleastUnhealthyKidneyPresentBool = false;
    for(let i=0;i<users[0].kidneys.length;i++){
        if(users[0].kidneys[i].healthy == false){
            isAtleastUnhealthyKidneyPresentBool = true;
            break;
        }
    }
    return isAtleastUnhealthyKidneyPresentBool;
}
app.listen(3000)