
const cheerio = require('cheerio')
const axios = require('axios')
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const csvWriter = createCsvWriter({
  path: 'out.csv',
  fieldDelimiter: ';',
  header: [
    {id: 'jornada', title: 'Jornada'},
    {id: 'orden', title: 'Orden'},
    {id: 'local_equipo', title: 'Equipo local'},
    {id: 'local_marcador', title: 'Marcador local'},
    {id: 'visitante_equipo', title: 'Equipo visitante'},
    {id: 'visitante_marcador', title: 'Marcador visitante'},
    {id: 'resultado', title: 'Resultado 1X2'}
  ]
});


const data = [];

/*
csvWriter
  .writeRecords(data)
  .then(()=> console.log('The CSV file was written successfully'));
*/





function getJornada(jornada){

return new Promise(function(fulfill, reject){

    axios.get('https://www.combinacionganadora.com/quiniela/2018-2019/jornada-'+jornada+'/').then((response) => {

    const $ = cheerio.load(response.data)
    const matchTable = $('table.matchTable tbody tr')

    let out = [];

    for (let i = 0; i < matchTable.length; i++){

      const match = $(matchTable[i]).find('td')
      const result = $(matchTable[i]).find('td ul li.active')

      data.push({
        jornada: jornada,
        orden: parseInt($(match[0]).text()),
        local_equipo: $(match[1]).text(),
        local_marcador: parseInt($(match[3]).text()),
        visitante_equipo: $(match[7]).text(),
        visitante_marcador: parseInt($(match[5]).text()),
        resultado: result.text()
      })

    }

  }).finally(function(){console.log(data)})

fulfill({out: "fin jornada"})

})


}


async function run(){

  for (let i = 1; i <= 2; i++){
    var obj = await getJornada(i)
    console.log("Jornada "+i)
  }
  console.log("FIN")
}

run()





/*
// for (let i = 1; i <= 69; i++){
for (let i = 1; i <= 1; i++){
  getJornada(i)
}
setTimeout(function(){ console.log(data) }, 3000)
console.log(data)

function getJornada(jornada){

    axios.get('https://www.combinacionganadora.com/quiniela/2018-2019/jornada-'+jornada+'/').then((response) => {

    const $ = cheerio.load(response.data)
    const matchTable = $('table.matchTable tbody tr')

    let out = [];

    for (let i = 0; i < matchTable.length; i++){

      const match = $(matchTable[i]).find('td')
      const result = $(matchTable[i]).find('td ul li.active')

      data.push({
        jornada: jornada,
        orden: parseInt($(match[0]).text()),
        local_equipo: $(match[1]).text(),
        local_marcador: parseInt($(match[3]).text()),
        visitante_equipo: $(match[7]).text(),
        visitante_marcador: parseInt($(match[5]).text()),
        resultado: result.text()
      })

    }
  })

}


*/
