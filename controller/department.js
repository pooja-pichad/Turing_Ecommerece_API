const knex = require('../model/db')


//get all data of department
const department =  (req, res) => {
    knex.select('*').from('department')
        .then((getdepart) => {
            console.log(getdepart);
            // res.send(getdepart)
            res.json({
                succes: true,
                status: 200,
                message: 'derpatmets datas',
                All_deparments: getdepart
            })
        }).catch((err) => {
            console.log(err)
           return res.json({
                succes: false,
                status: 400,
                message: 'Derpartment data not found',
            })

        })

}
//get by id get data of department
const get_by_id=(req,res)=>{
    knex.select("*").from("department").where('department_id','=',req.params.department_id)
    .then((get_id)=>{
        res.send(get_id)

    }).catch((err)=>{
        res.send({Err:err})
    })
}






module.exports={department,get_by_id}