const sql = require("./db.js");

// constructor
const Tour = function(tour) {
    this.name = tour.name;
    this.description = tour.description;
  };

  Tour.create = (newTour,result)=>{
    sql.query("INSERT INTO tbl_tour SET ?",newTour,(err,res)=>{
        if(err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log(JSON.stringify(res)) 
        console.log("created tour: ", { id: res.insertId,newTour });
        result(null, { id: res.insertId,newTour });
    })
  }

  Tour.getAll = (param,result) =>{
    console.log(param);
    const itemSize= (param.offset > 0) ? param.offset*(param.perPage) : 1*(param.perPage);
    const offset =  param.perPage*param.offset;

     sql.query(`SELECT * FROM tbl_tour WHERE is_deleted=0 LIMIT ${offset},${itemSize}`,(err,res)=>{
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
          }
          console.log("tutorials: ", res);
          result(null, res);
     })
  }

  Tour.findById = (id,result) => {
    sql.query(`SELECT * FROM tbl_tour WHERE id=${id} `,(err,res)=>{
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
          result(null, res);
     })
  }

  Tour.editTour = (req,result)=>{
    const name = req.body.name;
    const description = req.body.description;

    sql.query("SELECT COUNT(*) as cnt FROM tbl_tour where id="+req.params.id+" AND is_deleted=0 " ,(err,findTo)=> {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
          }
        if(findTo[0].cnt > 0){
            sql.query("UPDATE tbl_tour SET name='"+name+"',description='"+description+"'  WHERE id="+req.params.id+" ",(err,res)=>{
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
  Tour.removeTour = (id,result)=>{

    sql.query(`UPDATE tbl_tour SET is_deleted=1  WHERE id=${id} `,(err,res)=>{
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
          }
          result(null, res);
     })
  }
  module.exports = Tour;