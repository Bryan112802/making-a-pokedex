const readline = require('readline')
const axios = require('axios')

const rl = readline.createInterface(process.stdin, process.stdout)

function showMenu () {
  console.log('Pokedex')
  console.log('1. Search for a Pokemon')
  console.log('2. Search for an Item')
  console.log('3. Search for a Move')
}

// TODO: Fix after "Enter pokemon" and "Your Input"

// Update to actually use term
function searchPoke (term) {
  axios.get('https://pokeapi.co/api/v2/pokemon/pikachu')
    .then(response => {
      console.log(`ID: ${response.data.id}`)
    })
    .catch()
}

function prompt (cb) {
  rl.question('Your input: ', (input) => {
    cb(input)
  })
}

/*
function printPoke (json) {

}

function searchItem (term) {

}

function printItem (json) {

}

function searchMove (term) {

}

function printMove (json) {

}
*/
function run () {
  showMenu()
  rl.question('Choose a prompt number\n', (response) => {
    if (response.trim() === '1') {
      rl.question('Enter pokemon term', (pokeTerm) => {
        prompt(searchPoke)
      })
    } else if (response.trim() === '2') {
      console.log('2')
      // searchItem('item')
    } else if (response.trim() === '3') {
      console.log('3')
      // searchMove('move')
    } else {
      console.log('Invalid input, try again.')
      run()
    }
  })
}

run()
