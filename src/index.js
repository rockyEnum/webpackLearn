// var comp = require('./component');
// console.log(comp.name)
import {name} from './component';
console.log(name)

function getFun(obj){
   var newObj = {};
   // var math ={};

  for(var i =0;i<obj.length;i++){
      if(newObj[obj.lesson]){
          if(newObj[obj.gender]){
              newObj[obj.gender] +=obj.score;
          }else{
              newObj[obj.gender] =obj.score;
          }

      }
  }
}