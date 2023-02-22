const Tour = require('./../models/tourModel');

exports.validateTour = (req, res, next ,val) =>{
     console.log('------'+JSON.stringify(req.params));
        // Validate request
    if (!req.params.id) {
        res.status(400).send({
        message: "Id Not Found.!"
        });
    }
    next();
}

exports.createTour = (req,res)=>{
    // Create a Tutorial
  const tour = new Tour({
    name: req.body.name,
    description: req.body.description
  });

  Tour.create(tour,(err,data)=>{
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial."
      });
    else res.send(data);
  })
}

exports.getAllTours = (req,res)=>{
    const name = req.body.title;
    const perPage = req.body.perPage;
    const offset = req.body.offset;
    console.log('--------------------',(req.body));
    Tour.getAll({name:name,offset:offset,perPage:perPage},(err,data)=>{

        if (err)
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving tutorials."
        });
        else res.send({status:"success",result:data.length,data});
    });
}

exports.getTour = (req,res)=>{
     Tour.findById(req.params.id,(err,result)=> {
        if (err)
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving tutorials."
        });
        else res.send({status:"success",result});
     })
}

exports.updateTour = (req,res)=>{
    Tour.editTour(req,(err,result)=>{
        if (err)
        res.status(500).send({
            message:
            err.message || "Some error occurred while updating tour."
        });
        else res.send({status:"success",result});
    })
}

exports.deleteTour = (req,res)=>{
    Tour.removeTour(req.params.id,(err,result)=>{
        if (err)
        res.status(500).send({
            message:
            err.message || "Some error occurred while deleteing tour."
        });
        else res.send({status:"success",result});
    })
}