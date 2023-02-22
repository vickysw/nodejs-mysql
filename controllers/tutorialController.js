const Tutorial = require('./../models/tutorialModel');

exports.validateTour = (req, res, next ,val) =>{
     console.log('------'+JSON.stringify(req.params));
        // Validate request
    if (!req.params.id) {
        res.status(400).send({
        message: "Id Not Found!"
        });
    }
    next();
}

exports.createTutorial = (req,res)=>{
    // Create a Tutorial
  const tutorial = new Tutorial({
    title: req.body.title,
    description: req.body.description,
    published: req.body.published || false
  });;
  Tutorial.create(tutorial,(err,data)=>{
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial."
      });
    else res.send(data);
  })
}

exports.getAllTutorials = (req,res)=>{
    const name = req.body.title;
    const perPage = req.body.perPage;
    const offset = req.body.offset;
    console.log('--------------------',(req.body));
    Tutorial.getAll({name:name,offset:offset,perPage:perPage},(err,data)=>{

        if (err)
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving tutorials."
        });
        else res.send({status:"success",result:data.length,data});
    });
}

exports.getTutorial = (req,res)=>{
     Tutorial.findById(req.params.id,(err,result)=> {
        if (err)
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving tutorials."
        });
        else res.send({status:"success",result});
     })
}

exports.updateTutorial = (req,res)=>{
    Tutorial.editTour(req,(err,result)=>{
        if (err)
        res.status(500).send({
            message:
            err.message || "Some error occurred while updating Tutorial."
        });
        else res.send({status:"success",result});
    })
}

exports.deleteTutorial = (req,res)=>{
    Tutorial.removeTour(req.params.id,(err,result)=>{
        if (err)
        res.status(500).send({
            message:
            err.message || "Some error occurred while deleteing tour."
        });
        else res.send({status:"success",result});
    })
}