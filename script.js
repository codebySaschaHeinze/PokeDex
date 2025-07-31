let currentStartIndex = 0;
let allPokemon = [];
document.getElementById("load-more-button").addEventListener("click", loadMorePokemon);

function init() {
  loadingScreen();
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
  showAbout(index);
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
  const aboutRef = document.getElementById("about-tab-content");
  const statsRef = document.getElementById("stats-tab-content");
  aboutRef.classList.remove("d_none_two");
  statsRef.classList.add("d_none_two");
  aboutRef.innerHTML = "";
  aboutRef.innerHTML = aboutTemplate(pokemon);
}

function showStats(index) {
  const pokemon = allPokemon[index];
  const aboutRef = document.getElementById("about-tab-content");
  const statsRef = document.getElementById("stats-tab-content");
  statsRef.classList.remove("d_none_two");
  aboutRef.classList.add("d_none_two");
  statsRef.innerHTML = "";
  statsRef.innerHTML = statsTemplate(pokemon);
}

function searchPokemon() {
  closeLargeCard();
  let searchRef = document.getElementById("search-field").value.toLowerCase();
  let charsRef = document.getElementById("main-content-container");
  if (searchRef.length < 3) {
    charsRef.innerHTML = `<p>Bitte mindestens 3 Buchstaben eingeben.</p>
    <button onclick="resetPokemonSearchIfWrongInput()">Alle anzeigen</button>`;
    return;
  }
  let searchedPokemon = [];
  for (let i = 0; i < allPokemon.length; i++) {
    const currentPokemon = allPokemon[i];
    if (currentPokemon.name.toLowerCase().includes(searchRef)) {
      searchedPokemon.push(currentPokemon);
    }
  }
  if (searchedPokemon.length === 0) {
    charsRef.innerHTML = `<p>Kein Pokémon gefunden.</p>
    <button onclick="resetPokemonSearchIfWrongInput()">Alle anzeigen</button>`;
    return;
  }
  charsRef.innerHTML = "";
  for (let i = 0; i < searchedPokemon.length; i++) {
    const index = allPokemon.indexOf(searchedPokemon[i]);
    charsRef.innerHTML += renderPokemonCard(searchedPokemon[i], index);
  }
}

function resetPokemonSearchIfWrongInput() {
  document.getElementById("search-field").value = "";
  currentStartIndex = 0;
  allPokemon = [];
  getPokemon(currentStartIndex);
}

function hideLoadMoreButtonWhileSearching() {
  if (searchPokemon()) document.getElementById("load-more-button").classList.add("d_none");
}

function playCrySound(index) {
  const pokemon = allPokemon[index];
  const cryUrl = pokemon.cries.latest;
  const audio = new Audio(cryUrl);
  audio.play();
}
