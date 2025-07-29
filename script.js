const typeColors = {
  fire: "#ff0000ff",
  water: "#2092fcff",
  grass: "#2b8a15ff",
  electric: "#f8ed1dff",
  psychic: "#97009fff",
  normal: "#d75d00ff",
  bug: "#b47e00ff",
  ground: "#775300ff",
  poison: "#8be700ff",
  fighting: "#002c9dff",
  rock: "#5e5e5eff",
  fairy: "#f400f4ff",
  ice: "#9ff1ffff",
  dragon: "#3b6300ff",
  ghost: "#ffffffff",
  dark: "#4e006fff",
};

function init() {
  getPokemons();
}

async function getPokemons() {
  let charsRef = document.getElementById("main-content-container");
  loadingScreen();

  try {
    const url = "https://pokeapi.co/api/v2/pokemon?limit=20&offset=0";
    const response = await fetch(url);
    const chars = await response.json();
    const results = chars.results;
    charsRef.innerHTML = "";
    for (let i = 0; i < results.length; i++) {
      getPokemonDetails(results[i]);
    }
  } catch (error) {
    charsRef.innerHTML = errorTemplate();
  }
}

async function getPokemonDetails(char) {
  try {
    const details = await fetch(char.url);
    const data = await details.json();
    const charsRef = document.getElementById("main-content-container");
    charsRef.innerHTML += pokemonDetailsTemplate(data);
  } catch (error) {}
}

function capitalize(upperCase) {
  return upperCase.charAt(0).toUpperCase() + upperCase.slice(1);
}

function loadingScreen() {
  let spinRef = document.getElementById("main-content-container");
  spinRef.innerHTML = loadingTemplate();
}
