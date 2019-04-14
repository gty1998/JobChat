const mongoose=require('mongoose')
const DB_URL="mongodb://127.0.0.1:27017/chat"
mongoose.connect(DB_URL,{useNewUrlParser: true }, function(err){
    if(err){
    console.log('Connection Error:' + err)
    }else{
    console.log('Connection success!')
    }
  })
const models={
  user:{
    'user':{type:String,require:true},
    'pwd':{type:String,require:true},
    'type':{type:String,require:true},
    //头像
    'avatar':{type:String},
    //简介
    'desc':{type:String},
    //职位名称
    'title':{type:String},
    'company':{type:String},
    'money':{type:String}
  },
  chat:{
    'chatid':{type:String,require:true},
    'from':{type:String,require:true},
    'to':{type:String,require:true},
    'content':{type:String,require:true,default:''},
    'create_time':{type:Number,default:new Date().getTime()},
    'read':{type:Boolean,default:false}
  }
}
for(let m in models){
  mongoose.model(m,new mongoose.Schema(models[m]))
}
mongoose.connection.on('connected',function(){
    console.log('mongo connect success')
})
module.exports={
  getModel:function(name){
    return mongoose.model(name)
  }
}