var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
//conecting db/api confi
mongoose.connect('mongodb://localhost:27017/GiangVien',{
  useNewUrlParser: true,
  useCreateIndex:true,
  useFindAndModify:false
});
// create collection
let GiangVienSchema = mongoose.Schema({
  MaGiangVien:{
    type: String,
  },
  HoTen:{
    type: String,
  },
  //Dia chi
  DiaChi:{
    type: String
  },
  TelNum:{
    type: Number,
  }
})
let GiangVien = mongoose.model('GiangVien', GiangVienSchema);


/* GET home page. */
router.get('/', function(req, res, next) {
  GiangVien.find({}, function(err,data) {
    console.log('danh sach nguoi doc', data)
    res.render('index', {GiangViens: data});
  })
});

// create file ejs - form-add
router.get('/form-add', function(req, res , next){
  res.render('form-add', {});
})
router.post('/add',function(req, res, next){
  GiangVien.create(req.body);
  res.redirect('/')
})
router.get('/form-update/:id', function(req, res, next){
  GiangVien.findById(req.params.id, (error, data)=>{
    res.render('form-update', {GiangViens: data});
  });
});
router.post('/update', function(req, res, next){
  console.log(req.body);
  GiangVien.findByIdAndUpdate(req.body.id, req.body, (error, data)=>{
    res.redirect('/');
  });
});
router.get('/form-delete/:id', function(req, res, next){
  GiangVien.findByIdAndDelete(req.params.id, (error, data)=>{
    res.redirect('/');
  });
});
module.exports = router;
