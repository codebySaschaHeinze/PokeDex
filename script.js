let currentStartIndex = 0;
let allPokemon = [];

function init() {
  getPokemon(currentStartIndex);
}

async function getPokemon(startIndex) {
  let charsRef = document.getElementById("main-content-container");
  loadingScreen();
  try {
    if (startIndex === 0) {
      charsRef.innerHTML = "";
    }

    const limit = 20;

    for (let i = 0; i < limit; i++) {
      const pokemonId = startIndex + 1 + i;

      const url = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`;
      const response = await fetch(url);
      const pokemon = await response.json();

      allPokemon.push(pokemon);
      const index = allPokemon.length - 1;

      charsRef.innerHTML += renderPokemonCard(pokemon, index);
    }
  } catch (error) {
    charsRef.innerHTML = errorTemplate();
  }
}

function capitalize(upperCase) {
  return upperCase.charAt(0).toUpperCase() + upperCase.slice(1);
}

function loadingScreen() {
  if (currentStartIndex === 0) {
    let spinRef = document.getElementById("main-content-container");
    spinRef.innerHTML = loadingTemplate();
  }
}

async function loadMorePokemon() {
  currentStartIndex += 20;
  await getPokemon(currentStartIndex);
}

function showLargeCard(index) {
  const pokemon = allPokemon[index];
  let cardRef = document.getElementById("large-card-container");
  cardRef.classList.remove("d_none");
  cardRef.innerHTML = largeCardTemplate(pokemon);
}

// function closeLargeCard() {
//   let cardRef = document.getElementById("large-card-container");
//   cardRef.classList.add("d_none");
//   cardRef.innerHTML = "";
// }

document.getElementById("load-more-button").addEventListener("click", loadMorePokemon);
