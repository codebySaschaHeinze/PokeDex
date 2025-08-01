/**
 * Current starting index for fetching Pokémon.
 * @type {number}
 */
let currentStartIndex = 0;

/**
 * Array holding all fetched Pokémon data.
 * @type {Object[]}
 */
let allPokemon = [];

/**
 * Initializes the application by setting up event listeners, rendering the loading template, and fetching the initial batch of Pokémon.
 */
function init() {
  addEventListeners();
  loadingTemplate();
  getPokemon(currentStartIndex);
}

/**
 * Fetches a batch of Pokémon from the PokéAPI starting at the provided index.
 * Updates the UI to show loading state and renders the fetched Pokémon cards.
 *
 * @param {number} startIndex - The index from which to start fetching Pokémon.
 * @returns {Promise<void>} A promise that resolves when the fetching and rendering are complete.
 */
async function getPokemon(startIndex) {
  hideLoadMoreButton();
  loadingScreen(startIndex);
  const container = document.getElementById("main-content-container");
  await new Promise((resolve) => setTimeout(resolve, 100));
  try {
    if (startIndex === 0) {
      container.innerHTML = "";
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
      showLoadMoreButton();
    }
    container.innerHTML += html;
  } catch (error) {
    container.innerHTML = errorTemplate();
  }
}

/**
 * Capitalizes the first character of a string.
 *
 * @param {string} text - The string to capitalize.
 * @returns {string} The capitalized string.
 */
function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

/**
 * Displays the loading template on the main content container if starting from index 0.
 *
 * @param {number} startIndex - The index determining if the loading template should be shown.
 */
function loadingScreen(startIndex) {
  if (startIndex === 0) {
    const container = document.getElementById("main-content-container");
    container.innerHTML = loadingTemplate();
  }
}

/**
 * Loads the next batch of Pokémon by incrementing the start index and fetching again.
 * @returns {Promise<void>} A promise that resolves when the next batch is fetched.
 */
async function loadMorePokemon() {
  currentStartIndex += 20;
  await getPokemon(currentStartIndex);
}

/**
 * Shows a large detailed card for the Pokémon at the given index.
 *
 * @param {number} index - The index of the Pokémon in the allPokemon array.
 */
function showLargeCard(index) {
  const pokemon = allPokemon[index];
  const card = document.getElementById("large-card-container");

  card.classList.remove("d_none");
  card.innerHTML = largeCardTemplate(pokemon, index);
  showAbout(index);
}

/**
 * Shows the next Pokémon in the large card view, wrapping to the first if at the end.
 *
 * @param {number} index - The current index of the displayed Pokémon.
 */
function nextLargeCard(index) {
  let newIndex = index + 1;
  if (newIndex >= allPokemon.length) {
    newIndex = 0;
  }
  showLargeCard(newIndex);
}

/**
 * Shows the previous Pokémon in the large card view, wrapping to the last if at the beginning.
 *
 * @param {number} index - The current index of the displayed Pokémon.
 */
function prevLargeCard(index) {
  let newIndex = index - 1;
  if (newIndex < 0) {
    newIndex = allPokemon.length - 1;
  }
  showLargeCard(newIndex);
}

/**
 * Closes the large Pokémon detail card.
 */
function closeLargeCardOnX() {
  const card = document.getElementById("large-card-container");

  card.classList.add("d_none");
  card.innerHTML = "";
}

/**
 * Displays the "About" tab content for the Pokémon at the given index.
 *
 * @param {number} index - The index of the Pokémon in the allPokemon array.
 */
function showAbout(index) {
  const pokemon = allPokemon[index];
  const aboutTab = document.getElementById("about-tab-content");
  const statsTab = document.getElementById("stats-tab-content");

  aboutTab.classList.remove("d_none_two");
  statsTab.classList.add("d_none_two");
  highlightAboutTab();

  aboutTab.innerHTML = aboutTemplate(pokemon);
}

/**
 * Displays the "Stats" tab content for the Pokémon at the given index.
 *
 * @param {number} index - The index of the Pokémon in the allPokemon array.
 */
function showStats(index) {
  const pokemon = allPokemon[index];
  const aboutTab = document.getElementById("about-tab-content");
  const statsTab = document.getElementById("stats-tab-content");

  aboutTab.classList.add("d_none_two");
  statsTab.classList.remove("d_none_two");
  highlightStatsTab();

  statsTab.innerHTML = statsTemplate(pokemon);
}

/**
 * Calculates the percentage width of a base stat relative to a maximum value.
 *
 * @param {number} baseStat - The base stat value.
 * @returns {number} The percentage representation of the base stat.
 */
function calculateBaseStats(baseStat) {
  const maxStat = 150;
  const percent = (baseStat / maxStat) * 100;
  return percent;
}

/**
 * Searches for Pokémon by name based on the input field and updates the display.
 * Displays error messages for invalid input or if no Pokémon match the search.
 */
function searchPokemon() {
  hideLoadMoreButton();
  closeLargeCardOnX();

  const query = document.getElementById("search-field").value.toLowerCase();
  const container = document.getElementById("main-content-container");

  if (query.length < 3) {
    container.innerHTML = searchErrorTemplate();
    return;
  }

  const searched = allPokemon.filter((p) => p.name.toLowerCase().includes(query));

  if (searched.length === 0) {
    container.innerHTML = searchNoPokemonFoundTemplate();
    return;
  }

  container.innerHTML = "";
  searched.forEach((p) => {
    const idx = allPokemon.indexOf(p);
    container.innerHTML += renderPokemonCard(p, idx);
  });

  container.innerHTML += searchGetBackToStartTemplate();
}

/**
 * Resets the search field and reloads the initial batch of Pokémon.
 */
function resetPokemonSearchIfWrongInput() {
  document.getElementById("search-field").value = "";
  currentStartIndex = 0;
  allPokemon = [];
  getPokemon(currentStartIndex);
}

/**
 * Hides the "Load More" button.
 */
function hideLoadMoreButton() {
  document.getElementById("load-more-button").classList.add("d_none");
}

/**
 * Shows the "Load More" button.
 */
function showLoadMoreButton() {
  document.getElementById("load-more-button").classList.remove("d_none");
}

/**
 * Plays the cry sound of the Pokémon at the given index.
 *
 * @param {number} index - The index of the Pokémon in the allPokemon array.
 */
function playCrySound(index) {
  const pokemon = allPokemon[index];
  const cryUrl = pokemon.cries.latest;
  const audio = new Audio(cryUrl);
  audio.play();
}

/**
 * Highlights the "About" tab button.
 */
function highlightAboutTab() {
  document.getElementById("about-tab").className = "tab_button active_tab";
  document.getElementById("stats-tab").className = "tab_button";
}

/**
 * Highlights the "Stats" tab button.
 */
function highlightStatsTab() {
  document.getElementById("stats-tab").classList.add("active_tab");
  document.getElementById("about-tab").classList.remove("active_tab");
}

/**
 * Attaches event listeners for loading more Pokémon and closing the large card with Escape key.
 */
function addEventListeners() {
  document.getElementById("load-more-button").addEventListener("click", loadMorePokemon);

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeLargeCardOnX();
    }
  });
}
