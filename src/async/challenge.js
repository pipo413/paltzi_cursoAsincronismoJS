const fetchData = require('../utils/fetchData')
const API = 'https://rickandmortyapi.com/api/character/'

const anotherFunction = async (url_api) => {
    try {
        // creamos los elementos de las peticiones que vamos a hacer
        // traemos la data
        const data = await fetchData(url_api)
        const character = await fetchData(`${API}${data.results[0].id}`)
        const origin = await fetchData(`${character.origin.url}`)
        console.log(data.info.count);
        console.log(character.name);
        console.log(origin.dimension);
    } catch (error) {
        console.error(error);
    }
}
console.log('before');
anotherFunction(API)
console.log('after');