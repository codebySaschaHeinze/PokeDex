let currentStartIndex = 0;
let allPokemon = [];
document.getElementById("load-more-button").addEventListener("click", loadMorePokemon);

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

    const maxPokemon = 20;
    let html = "";
    for (let i = 0; i < maxPokemon; i++) {
      const pokemonId = startIndex + 1 + i;

      const url = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`;
      const response = await fetch(url);
      const pokemon = await response.json();

      allPokemon.push(pokemon);
      const index = allPokemon.length - 1;
      html += renderPokemonCard(pokemon, index);
    }
    charsRef.innerHTML += html;
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
  cardRef.innerHTML = largeCardTemplate(pokemon, index);
}

function nextLargeCard(index) {
  index = index + 1;
  if (index == allPokemon.length) {
    index = 0;
  }
  showLargeCard(index);
}

function prevLargeCard(index) {
  index = index - 1;
  if (index < 0) {
    index = allPokemon.length - 1;
  }
  showLargeCard(index);
}

function closeLargeCard() {
  let cardRef = document.getElementById("large-card-container");
  cardRef.classList.add("d_none");
  cardRef.innerHTML = "";
}

function showAbout(index) {
  const pokemon = allPokemon[index];
  const aboutRef = document.getElementById("large-card-tab-content");
  document.getElementById("about-tab-content").classList.remove("d_none_two");
  document.getElementById("stats-tab-content").classList.add("d_none_two");
  document.getElementById("evolution-tab-content").classList.add("d_none_two");
  aboutRef.innerHTML = "";
  aboutRef.innerHTML += aboutTemplate(pokemon);
}

function showStats(index) {
  const pokemon = allPokemon[index];
  const statsRef = document.getElementById("large-card-tab-content");
  document.getElementById("stats-tab-content").classList.remove("d_none_two");
  document.getElementById("about-tab-content").classList.add("d_none_two");
  document.getElementById("evolution-tab-content").classList.add("d_none_two");
  statsRef.innerHTML = "";
  statsRef.innerHTML += statsTemplate(pokemon);
}

function showEvolution(index) {
  const pokemon = allPokemon[index];
  const evolutionRef = document.getElementById("large-card-tab-content");
  document.getElementById("evolution-tab-content").classList.remove("d_none_two");
  document.getElementById("about-tab-content").classList.add("d_none_two");
  document.getElementById("stats-tab-content").classList.add("d_none_two");
  evolutionRef.innerHTML = "";
  evolutionRef.innerHTML += evolutionTemplate(pokemon);
}
