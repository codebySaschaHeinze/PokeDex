function loadingTemplate() {
  return `
          <div class="pokeball_loader">
            <img src="./assets/icons/pokeball_spin.png" alt="" />
          </div>`;
}

function errorTemplate() {
  return `
          <p>Page could not be loaded</p>`;
}

function renderPokemonCard(pokemon, index) {
  const pokemonType = pokemon.types[0].type.name;
  const color = typeColors[pokemonType];
  return `
          <div class="pokemon_card" style="background-color: ${color}" onclick="showLargeCard(${index})">
              <p>#${pokemon.id}</p>
              <h5>${capitalize(pokemon.name)}</h5>
              <img src="${pokemon.sprites.other["official-artwork"].front_default}" alt="${pokemon.name}" />
              <div class="little_type_container">
                <p class="pokemon_type" style="background-color: ${color}">${capitalize(pokemon.types[0].type.name)}</p>
              </div>
          </div>
        `;
}

function largeCardTemplate(pokemon, index) {
  const pokemonType = pokemon.types[0].type.name;
  const color = typeColors[pokemonType];

  return `
          <div class="large_card_content">
            <button class="close_button" onclick="closeLargeCardOnX()">
              <img src="./assets/icons/close.png" alt="Schließen" />
            </button>
            <h6>${capitalize(pokemon.name)}</h6>
            <div id="large-card-image" class="large_card_image"><img src="${
              pokemon.sprites.other["official-artwork"].front_default
            }" alt="">
            </div>
            <div
              class="bottom_part_card"
              style="background: linear-gradient(to top, ${color}, rgba(255, 255, 255, 1));box-shadow: 0 -10px 20px -10px ${color}"
              ;
            >
              <div class="tab_header">
                <p id="about-tab" class="tab_button" onclick="showAbout(${index})">About</p>
                <p id="stats-tab" class="tab_button" onclick="showStats(${index})">Stats</p>
              </div>
              <div class="large_card_tabs" style="box-shadow: 0 0 20px 1px ${color};">
                <div class="about_tab_content" id="about-tab-content"></div>
                <div class="stats_tab_content" id="stats-tab-content"></div>
              </div>
              <div class="prev_next_buttons">
                <button class="prev_button" onclick="prevLargeCard(${index})">
                  <img src="./assets/icons/prev_arrow.png" alt="Next large Card" />
                </button>
                <button class="sound_button" onclick="playCrySound(${index})">
                  <img src="./assets/icons/sound.png" alt="Pokemon sound" />
                </button>
                <button class="next_button" onclick="nextLargeCard(${index})">
                  <img src="./assets/icons/next_arrow.png" alt="Previous large Card" />
                </button>
              </div>
            </div>
          </div>
          `;
}

function aboutTemplate(pokemon) {
  const pokemonType = pokemon.types[0].type.name;
  const color = typeColors[pokemonType];
  return `  
          <table class="large_card_about_table">
            <tr>
                <td>HP</td>
                <td>${pokemon.stats[0].base_stat}</td>
              </tr>
              <tr>
                <td>Species</td>
                <td>${capitalize(pokemon.types[0].type.name)}</td>
              </tr>
              <tr>
                <td>Height</td>
                <td>${(pokemon.height / 10).toFixed(1).replace(".", ",")} m</td>
              </tr>
              <tr>
                <td>Weight</td>
                <td>${(pokemon.weight / 10).toFixed(1).replace(".", ",")} kg</td>
              </tr>
            </table>`;
}

function statsTemplate(pokemon) {
  return `
          <table class="large_card_stats_table">
            <tr>
                <td>Attack</td>
                <td>${pokemon.stats[1].base_stat}</td>
              </tr>
              <tr>
                <td colspan="2">
                 <div class="stats_progress_bar_container">
                 <div class="stats_progress_bar" style="width: ${calculateBaseStats(pokemon.stats[1].base_stat)}%">
                 </div>
                 </div>
                </td>
              </tr>
              <tr>
                <td>Defense</td>
                <td>${pokemon.stats[2].base_stat}</td>
              </tr>
              <tr>
                <td colspan="2">
                 <div class="stats_progress_bar_container">
                 <div class="stats_progress_bar" style="width: ${calculateBaseStats(pokemon.stats[1].base_stat)}%">
                 </div>
                 </div>
                </td>
              </tr>
              <tr>
                <td>Special-Attack</td>
                <td>${pokemon.stats[3].base_stat}</td>
              </tr>
              <tr>
                <td colspan="2">
                 <div class="stats_progress_bar_container">
                 <div class="stats_progress_bar" style="width: ${calculateBaseStats(pokemon.stats[1].base_stat)}%">
                 </div>
                 </div>
                </td>
              </tr>
              <tr>
                <td>Special-Defense</td>
                <td>${pokemon.stats[4].base_stat}</td>
              </tr>
              <tr>
                <td colspan="2">
                 <div class="stats_progress_bar_container">
                 <div class="stats_progress_bar" style="width: ${calculateBaseStats(pokemon.stats[1].base_stat)}%">
                 </div>
                 </div>
                </td>
              </tr>
               <tr>
                <td>Speed</td>
                <td>${pokemon.stats[5].base_stat}</td>
              </tr>
              <tr>
                <td colspan="2">
                 <div class="stats_progress_bar_container">
                 <div class="stats_progress_bar" style="width: ${calculateBaseStats(pokemon.stats[1].base_stat)}%">
                 </div>
                 </div>
                </td>
              </tr>
            </table>`;
}

function searchErrorTemplate() {
  return `
          <div class="search_error_message">
            <p>Please enter at least 3 letters.</p>
            <button onclick="resetPokemonSearchIfWrongInput()">Back to Start</button>
          </div>`;
}

function searchNoPokemonFoundTemplate() {
  return `
          <div class="search_error_message">
            <p>No matching Pokemon found.</p>
            <button onclick="resetPokemonSearchIfWrongInput()">Back to Start</button>
            </div>`;
}

function searchGetBackToStartTemplate() {
  return `
          <div class="search_error_message">
            <button onclick="resetPokemonSearchIfWrongInput()">Zurück zum Start</button>
          </div>`;
}
