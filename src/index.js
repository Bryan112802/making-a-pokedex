const readline = require('readline')
const axios = require('axios')

const rl = readline.createInterface(process.stdin, process.stdout)

function showMenu () {
  console.log('----------------------------')
  console.log('Pokedex')
  console.log('1. Search for a Pokemon')
  console.log('2. Search for an Item')
  console.log('3. Search for a Move')
  console.log('4. Exit')
  console.log('----------------------------')

  console.log('Choose a Prompt!')
}

function searchPoke (term) {
  axios.get(`https://pokeapi.co/api/v2/pokemon/${term}`)
    .then(response => {
      printPoke(response.data)
    })
    .catch(error => {
      console.log(error.message)
    })
}

function prompt (cb) {
  rl.question('Your input: ', (input) => {
    cb(input)
  })
}

function printPoke (json) {
  console.log('----------------------------')
  console.log(`Pokemon Name: ${json.name}`)
  console.log(`Weight: ${json.weight}`)
  console.log(`Height: ${json.height}`)
  console.log(`Base Experience: ${json.base_experience}`)
  console.log('Moves: ')
  for (let i = 0; i < json.moves.length; i++) {
    console.log(`${i + 1}. ${json.moves[i].move.name}`)
  }
  console.log('----------------------------')
  rl.question('Press enter to return to menu', () => run())
}

function searchItem (term) {
  axios.get(`https://pokeapi.co/api/v2/item/${term}`)
    .then(response => {
      printItem(response.data)
    })
    .catch(error => {
      console.log(error.message)
    })
}

function printItem (json) {
  console.log('----------------------------')
  console.log(`Item Name: ${json.name}`)
  console.log(`ID: ${json.id}`)
  console.log(`Cost: ${json.cost}`)
  console.log(`Category: ${json.category.name}`)
  console.log('----------------------------')
  rl.question('Press enter to return to menu', () => run())
}

function searchMove (term) {
  axios.get(`https://pokeapi.co/api/v2/move/${term}`)
    .then(response => {
      printMove(response.data)
    })
    .catch(error => {
      console.log(error.message)
    })
}

function printMove (json) {
  console.log('----------------------------')
  console.log(`Move Name: ${json.name}`)
  console.log(`ID: ${json.id}`)
  console.log(`Power: ${json.power}`)
  console.log(`Accuracy: ${json.accuracy}`)
  console.log('----------------------------')
  rl.question('Press enter to return to menu', () => run())
}

function run () {
  showMenu()
  prompt((response) => {
    if (response.trim() === '1') {
      console.log('Enter Pokemon Name or ID:')
      prompt((term) => searchPoke(term))
    } else if (response.trim() === '2') {
      console.log('Search for Item Name or ID:')
      prompt((json) => searchItem(json))
    } else if (response.trim() === '3') {
      console.log('Search for Move Name or ID:')
      prompt((term) => searchMove(term))
    } else if (response.trim() === '4') {
      console.log('Exiting')
      rl.close()
    } else {
      console.log('Invalid input, try again.')
      run()
    }
  })
}

run()
