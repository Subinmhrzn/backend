exports.testfunction = (req,res)=>{
    res.send("This is message is form controller")
}

exports.hellofunction = (req,res)=>{
    res.send(`Hello ${req.params.name}`)
}