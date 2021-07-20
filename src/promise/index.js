// creando la funcion
const somethingWillHappen = () => {
    return new Promise((resolve, reject) => {
        if (true) {
            resolve(`HEY!`);
        } else {
            reject(`WHOOOOOOO`)
        }

    })
}

somethingWillHappen()
    .then(response => console.log(response))
    .catch(err => console.error(err))

somethingWillHappen2 = () => {
    return new Promise((resolve, reject) => {
        if (true) {
            setTimeout(() => { resolve(true) }, 2000)
        } else {
            const error = new Error('whooooosu')
            reject(error)

        }
    })
}
somethingWillHappen2()
.then(response => console.log(response))
.catch(err => console.error(err))

// corriendo promesas al mismo tiempo

Promise.all([somethingWillHappen(),somethingWillHappen2()])
.then(response => {
    console.log('array of result',response);
})
.catch(err => {
    console.error(err);
})