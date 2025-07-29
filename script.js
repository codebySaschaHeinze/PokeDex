let currentOffset = 0;

function init() {
  getPokemon(currentOffset);
}

async function getPokemon(offset) {
  let charsRef = document.getElementById("main-content-container");
  loadingScreen();

  try {
    const url = "https://pokeapi.co/api/v2/pokemon?limit=20&offset=" + offset;
    const response = await fetch(url);
    const chars = await response.json();
    const results = chars.results;
    if (offset === 0) {
      charsRef.innerHTML = "";
    }

    for (let i = 0; i < results.length; i++) {
      await getPokemonDetails(results[i]);
    }
  } catch (error) {
    charsRef.innerHTML = errorTemplate();
  }
}

async function getPokemonDetails(char) {
  try {
    const response = await fetch(char.url);
    const data = await response.json();
    const charsRef = document.getElementById("main-content-container");
    charsRef.innerHTML += pokemonDetailsTemplate(data);
  } catch (error) {
    return errorTemplate();
  }
}

function capitalize(upperCase) {
  return upperCase.charAt(0).toUpperCase() + upperCase.slice(1);
}

function loadingScreen() {
  if (currentOffset === 0) {
    let spinRef = document.getElementById("main-content-container");
    spinRef.innerHTML = loadingTemplate();
  }
}

document.getElementById("load-more-button").addEventListener("click", loadMorePokemon);

function loadMorePokemon() {
  currentOffset += 20;
  getPokemon(currentOffset);
}
