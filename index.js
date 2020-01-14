
const cheerio = require('cheerio')
const axios = require('axios')
const fs = require('fs');


if(!fileExists('./data.csv')){
  fs.appendFile('data.csv', 'jornada;partido;equipo_local;marcador_local;equipo_visitante;marcador_visitante;resultado'+"\n", function (err) {
    if (err) throw err;
    console.log('Archivo creado (data.csv)');
  }); 
}

for(let i = 1; i <= 69; i++){
  console.log("Jornada "+i)
  getJornada(i)
}

function getJornada(jornada){
    axios.get('https://www.combinacionganadora.com/quiniela/2018-2019/jornada-'+jornada+'/').then((response) => {
    const $ = cheerio.load(response.data)
    const matchTable = $('table.matchTable tbody tr')
    for (let i = 0; i < matchTable.length; i++){
      let match = $(matchTable[i]).find('td')
      let result = $(matchTable[i]).find('td ul li.active')
      let reg = jornada+';'+parseInt($(match[0]).text())+';'+$(match[1]).text()+';'+parseInt($(match[3]).text())+';'+$(match[7]).text()+';'+parseInt($(match[5]).text())+';'+result.text()
      // console.log(reg)
      fs.appendFile('data.csv', reg+"\n", function (err) {
        if (err) throw err;
        // console.log('Registro añadido ['+reg+']');
      }); 
    }
  })
}


function fileExists(path) {
  try {
    return fs.statSync(path).isFile();
  } catch (e) {
    return false;
  }
}