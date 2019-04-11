var express = require('express');
var router = express.Router();
var connection = require('../config/connection');

/* GET HomePage */

router.get('/',function(req, res, next){

    connection.query('SELECT * FROM users',function(err,rows){
        if(err) throw err;
        console.log(rows);
        res.render('index',{users:rows});
    });
    
    
});


router.post('/addUser',function(req,res){
    const userData = {
        fname:req.body.fname,
        lname:req.body.lname,
        email:req.body.email,
        prof:req.body.prof
    };

    connection.query("INSERT INTO users SET ?", userData,function(err,result){
       if(err) throw err;
       res.redirect('/'); 
    });
    

});

router.get('/deleteUser/:id',function(req,res){
    var userid = req.params.id;

    connection.query("DELETE FROM users WHERE id = ?",[userid],function(err,rows){
        if(err) throw err;
        res.redirect('/');
    });
});

module.exports = router;
 