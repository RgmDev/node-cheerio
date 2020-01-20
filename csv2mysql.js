const fs = require('fs')
const mysql = require('mysql'); 

const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'bestbet'
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!")
});

/*
fs.readFile('data.csv', 'utf-8', (err, data) => {
  if(err){
    console.log('error: ', err)
  }else{
    console.log('Lectura del archivo correcta')
    let file = data.split("\n")
    
    file.forEach(function(item){
      console.log(item+"Linea")
    })
    
  }
});
*/





con.end()

