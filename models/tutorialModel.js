const sql = require("./db.js");

// constructor
const Tutorial = function(tutorial) {
    this.title = tutorial.title;
    this.description = tutorial.description;
    this.published = tutorial.published;
  };

  Tutorial.create = (newTutorial,result)=>{
    sql.query("INSERT INTO tutorials SET ?",newTutorial,(err,res)=>{
        if(err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log(JSON.stringify(res)) 
        console.log("created tour: ", { id: res.insertId,newTutorial });
        result(null, { id: res.insertId,newTutorial });
    })
  }

  Tutorial.getAll = (param,result) =>{
    console.log(param);
    const itemSize= (param.offset > 0) ? param.offset*(param.perPage) : 1*(param.perPage);
    const offset =  param.perPage*param.offset;

     sql.query(`SELECT * FROM tutorials WHERE 	published=0 LIMIT ${offset},${itemSize}`,(err,res)=>{
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
          }
          console.log("tutorials: ", res);
          result(null, res);
     })
  }

  Tutorial.findById = (id,result) => {
    sql.query(`SELECT * FROM tutorials WHERE id=${id} `,(err,res)=>{
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
          }

        if (res.length) {
            console.log("found tutorial: ", res[0]);
            result(null, res[0]);
            return;
        }
          console.log("tutorials: ", res);
          result('Resource ID not found from model', res);
     })
  }

  Tutorial.editTour = (req,result)=>{
    const name = req.body.name;
    const description = req.body.description;

    sql.query("SELECT COUNT(*) as cnt FROM tutorials where id="+req.params.id+" AND is_deleted=0 " ,(err,findTo)=> {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
          }
        if(findTo[0].cnt > 0){
            sql.query("UPDATE tbl_user SET name='"+name+"',description='"+description+"'  WHERE id="+req.params.id+" ",(err,res)=>{
                if (err) {
                    console.log("error: ", err);
                    result(null, err);
                    return;
                  }
                  result(null, res);
             })
        }else{
              result(null, {mesage:"Id not found."});
              return;
        }
    })
    
  }
  Tutorial.removeTour = (id,result)=>{

    sql.query(`UPDATE tbl_user SET is_deleted=1  WHERE id=${id} `,(err,res)=>{
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
          }
          result(null, res);
     })
  }
  module.exports = Tutorial;