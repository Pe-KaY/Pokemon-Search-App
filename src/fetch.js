const fetcham = () => {
  const input = document.getElementById("search-input")
  const searchBtn = document.getElementById("search-button")
  const pokemonName = document.getElementById("pokemon-name")
  const id = document.getElementById("pokemon-id")
  const weight = document.getElementById("weight")
  const height = document.getElementById("height")
  const infoTypes = document.getElementById("types")
  const hp = document.getElementById("hp")
  const attack = document.getElementById("attack")
  const result = document.getElementById("search-result")
  const defense = document.getElementById("defense")
  const specialAttack = document.getElementById("special-attack")
  const specialDefense = document.getElementById("special-defense")
  const speed = document.getElementById("speed")
  const img = document.getElementById("sprite")
  let alpokeArr = []

  //Fetches all pokemon from API and stores em in alpokeArr using an async function
  const fetchAllPokemon = async () => {
    try {
      const resolve = await fetch(
        "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon"
      )
      if (!resolve.ok) {
        throw new Error("The server cant be reached")
      }
      const data = await resolve.json()
      alpokeArr = data.results
      if (input.value === "25") {
        searchBtn.click()
      }
    } catch (error) {
      console.error(`ERROR : ${error}`)
    }
  }

  window.onload = () => {
    fetchAllPokemon()
  }
  //this function fetch the matching id or name from the alpokeArr which contains all the pokemon
  const fetchPokefromAll = (idname) => {
    const isNumber = (value) => (isNaN(value) ? value : parseInt(value))
    const entered = isNumber(idname)
    const id = alpokeArr.find(
      ({ id, name }) => id === entered || name === entered
    )
    if (!id) {
      alert("Pokémon not found")
      return
    }
    fetchIndvidualPoke(
      `https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${id.id}`
    )
  }
  //some functions

  //this function updates the UI with the respective values from the API
  const fetchIndvidualPoke = async (url) => {
    const pokeUrl = url
    try {
      const pokemon = await fetch(pokeUrl)
      if (!pokemon.ok) {
        throw new Error("Failed to fetch Pokémon")
      }
      const data = await pokemon.json()
      pokemonName.textContent = `${data.name.toUpperCase()}`
      id.textContent = `#${data.id}`
      weight.textContent = `Weight: ${data.weight}`
      height.textContent = `Height: ${data.height}`
      infoTypes.innerHTML += pokemonType(data.types)
      img.src = `${data.sprites.front_default}`
      hp.textContent = `${data.stats[0].base_stat}`
      attack.textContent = `${data.stats[1].base_stat}`
      defense.textContent = `${data.stats[2].base_stat}`
      specialAttack.textContent = `${data.stats[3].base_stat}`
      specialDefense.textContent = `${data.stats[4].base_stat}`
      speed.textContent = `${data.stats[5].base_stat}`
    } catch (error) {
      console.error(`ERROR: ${error}`)
      result.textContent += `ERROR: ${error}`
    }
  }

  //this function fetches the pokemon Types
  const pokemonType = (arr) => {
    let result = ""
    arr.forEach(({ type }) => {
      result += `<div class="types" style="align-self: start">${type.name}</div>`
    })
    return result
  }

  //this function checks if the input contains ♂(male) or ♀(female)
  const inputChecker = (input) => {
    let result = input.replace(/[^\w]/g, "").toLowerCase()
    const male = input.includes("♂")
    const female = input.includes("♀")
    return male ? `${result}-m` : female ? `${result}-f` : result
  }

  const launch = () => {
    infoTypes.innerHTML = ""
    const userInput = inputChecker(input.value)
    input.value = userInput
    if (userInput === "") {
      alert("Enter a Pokemon Name or ID")
      return
    }

    fetchPokefromAll(userInput)
  }

  //end of functions

  //Event listeners start here
  searchBtn.addEventListener("click", launch)
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      launch()
    }
  })
}

export default fetcham
