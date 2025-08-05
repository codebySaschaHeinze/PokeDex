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
  hideLoadMoreButton();
  addEventListeners();
  loadingTemplate();
  getPokemon(currentStartIndex);
}

/**
 * Renders the initial start-question overlay into the DOM.
 * This is called on page load to ask the user the Pikachu-color quiz.
 */
function showStartQuestion() {
  const overlayRef = document.getElementById("start-overlay");
  overlayRef.innerHTML = startTemplate();
}

/**
 * Reveals the "wrong answer" message container by removing its hidden CSS class.
 */
function showThatAnswerIsWrong() {
  const wrongOverlay = document.getElementById("wrong-answer-container");
  document.getElementById("wrong-answer-container").classList.remove("d_none_three");
  document.getElementById("start-overlay").classList.add("d_none_three");
  wrongOverlay.innerHTML = wrongAnswerTemplate();
}

/**
 * Hides the "wrong answer" message container by re-applying its hidden CSS class.
 */
function backToStartQuestion() {
  document.getElementById("wrong-answer-container").classList.add("d_none_three");
  document.getElementById("start-overlay").classList.remove("d_none_three");
}

/**
 * Checks the user's answer to the start question.
 * If correct, hides the overlay and starts the app.
 *
 * @param {string} selectedColor – The color the user clicked (e.g. "yellow", "green", "blue").
 */
function checkAnswer(selectedColor) {
  if (selectedColor === "yellow") {
    document.getElementById("start-overlay").classList.add("d_none_three");
    document.getElementById("nav-right").classList.remove("d_none_three");
    init();
  }
}

/**
 * Inserts the loading spinner into the container element.
 */
function showLoadingSpinner() {
  document.getElementById("loading-spinner-container").innerHTML = loadingTemplate();
}

/**
 * Removes the loading spinner from the container element.
 */
function hideLoadingSpinner() {
  document.getElementById("loading-spinner-container").innerHTML = "";
}

/**
 * Fetches a batch of Pokémon data from the PokéAPI.
 *
 * @param {number} startIndex - The index (0-based) of the first Pokémon to fetch.
 * @param {number} amount - The number of Pokémon to fetch in this batch.
 * @returns {Promise<Object[]>} A promise that resolves to an array of Pokémon data objects.
 */
async function fetchPokemon(startIndex, amount) {
  const result = [];
  for (let i = 0; i < amount; i++) {
    const url = `https://pokeapi.co/api/v2/pokemon/${startIndex + 1 + i}`;
    const res = await fetch(url);
    const data = await res.json();
    result.push(data);
  }
  return result;
}

/**
 * Loads and displays a batch of Pokémon cards in the main content container.
 * Hides the "Load More" button and shows a loading spinner while fetching.
 * On success, appends the rendered Pokémon cards and re-enables the "Load More" button.
 * On failure, displays an error template.
 *
 * @param {number} startIndex - The index (0-based) from which to start loading Pokémon.
 */
async function getPokemon(startIndex) {
  hideLoadMoreButton();
  showLoadingSpinner();
  const container = document.getElementById("main-content-container");
  if (startIndex === 0) container.innerHTML = "";
  try {
    await new Promise((r) => setTimeout(r, 500));
    const pokemons = await fetchPokemon(startIndex, 40);
    let html = "";
    for (let i = 0; i < pokemons.length; i++) {
      allPokemon.push(pokemons[i]);
      const index = allPokemon.length - 1;
      html += renderPokemonCard(pokemons[i], index);
    }
    container.innerHTML += html;
    showLoadMoreButton();
  } catch {
    container.innerHTML = errorTemplate();
  }
  hideLoadingSpinner();
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
  currentStartIndex += 40;
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
 * Filters the global allPokemon array for entries whose names include the given search value.
 *
 * @param {string} searchValue - The lowercase string to match against each Pokémon’s name.
 * @returns {Object[]} An array of Pokémon objects whose names contain the search value.
 */
function filterPokemonByName(searchValue) {
  const result = [];
  for (let i = 0; i < allPokemon.length; i++) {
    if (allPokemon[i].name.toLowerCase().includes(searchValue)) {
      result.push(allPokemon[i]);
    }
  }
  return result;
}

/**
 * Renders a list of Pokémon cards into the main content container, then appends
 * the "Back to Start" template at the end.
 *
 * @param {Object[]} pokemonList - Array of Pokémon objects to render.
 */
function renderSearchedPokemon(pokemonList) {
  const container = document.getElementById("main-content-container");
  container.innerHTML = "";
  for (let i = 0; i < pokemonList.length; i++) {
    const index = allPokemon.indexOf(pokemonList[i]);
    container.innerHTML += renderPokemonCard(pokemonList[i], index);
  }
  container.innerHTML += searchGetBackToStartTemplate();
}

/**
 * Handles the search action triggered by the user. Hides the "Load More" button,
 * closes any open detail card, validates the query length, performs the filtering,
 * and renders the results or error templates as needed.
 */
function searchPokemon() {
  hideLoadMoreButton();
  closeLargeCardOnX();
  const searchField = document.getElementById("search-field");
  const searchValue = searchField.value.toLowerCase();

  const container = document.getElementById("main-content-container");
  if (searchValue.length < 3) {
    container.innerHTML = searchErrorTemplate();
    return;
  }

  const searchedPokemon = filterPokemonByName(searchValue);

  if (searchedPokemon.length === 0) {
    container.innerHTML = searchNoPokemonFoundTemplate();
    return;
  }

  renderSearchedPokemon(searchedPokemon);
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
 * Shows the "Load More" button.
 */
function showLoadMoreButton() {
  document.getElementById("load-more-button").classList.remove("d_none");
}

/**
 * Hides the "Load More" button.
 */
function hideLoadMoreButton() {
  document.getElementById("load-more-button").classList.add("d_none");
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
  audio.volume = 0.03;
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
 * Attaches event listeners for loading more Pokémon, closing the large card with Escape key and start searching with Enter key.
 */
function addEventListeners() {
  document.getElementById("load-more-button").addEventListener("click", loadMorePokemon);

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeLargeCardOnX();
    }
  });
  document.getElementById("search-field").addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      searchPokemon();
    }
  });
  document.getElementById("search-field").addEventListener("input", () => {
    const value = document.getElementById("search-field").value.trim();
    if (value === "") {
      resetPokemonSearchIfWrongInput();
    }
  });
}
