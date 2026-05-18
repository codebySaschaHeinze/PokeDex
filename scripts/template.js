function loadingTemplate() {
  return `
          <div class="pokeball_loader" role="status" aria-live="polite" aria-label="Loading Pokémon">
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
          <button
            class="pokemon_card" type="button" onclick="handlePokemonCardClick(${index})"
            aria-label="Open details for ${capitalize(pokemon.name)}" style="background-color: ${color};">
            <p>#${pokemon.id}</p>
            <h5>${capitalize(pokemon.name)}</h5>
            <img src="${pokemon.sprites.other["official-artwork"].front_default}" alt="${pokemon.name} artwork" loading="lazy"
            />
            <div class="little_type_container">
              <p class="pokemon_type" style="background-color: ${color}">
                ${capitalize(pokemon.types[0].type.name)}
              </p>
            </div>
          </button>
        `;
}

function largeCardTemplate(pokemon, index, idPrefix = "large-card", showControls = true) {
  const pokemonType = pokemon.types[0].type.name;
  const color = typeColors[pokemonType];

  return `
          <div class="large_card_content">
            ${
              showControls
                ? `
                    <button
                      id="${idPrefix}-close-button" class="close_button" onclick="closeLargeCardOnX()"
                      type="button" aria-label="Close detail card">
                      <img src="./assets/icons/close.png" alt="" />
                    </button>
                  `
                : ""
            }
            <h2>${capitalize(pokemon.name)}</h2>
            <div id="${idPrefix}-image" class="large_card_image"><img src="${pokemon.sprites.other["official-artwork"].front_default}" alt="${pokemon.name} artwork">
            </div>
            <div
              class="bottom_part_card"
              style="background: linear-gradient(to top, ${color}, rgba(255, 255, 255, 1));box-shadow: 0 -10px 20px -10px ${color}"
              ;
            >
              <div class="tab_header">
                <button id="${idPrefix}-about-tab" class="tab_button" type="button" onclick="showAbout(${index}, '${idPrefix}')">About</button>
                <button id="${idPrefix}-stats-tab" class="tab_button" type="button" onclick="showStats(${index}, '${idPrefix}')">Stats</button>
              </div>
              <div class="large_card_tabs" style="box-shadow: 0 0 20px 1px ${color};">
                <div class="about_tab_content" id="${idPrefix}-about-tab-content"></div>
                <div class="stats_tab_content" id="${idPrefix}-stats-tab-content"></div>
              </div>
              ${
                showControls
                  ? `
                      <div class="prev_next_buttons">
                        <button class="prev_button" type="button" onclick="prevLargeCard(${index})" aria-label="Previous Pokémon">
                          <img src="./assets/icons/prev_arrow.png" alt="" />
                        </button>
                        <button class="sound_button" type="button" onclick="playCrySound(${index})" aria-label="How the Pokémon sounds">
                          <img src="./assets/icons/sound.png" alt="" />
                        </button>
                        <button class="next_button" type="button" onclick="nextLargeCard(${index})" aria-label="Next Pokémon">
                          <img src="./assets/icons/next_arrow.png" alt="" />
                        </button>
                      </div>
                    `
                  : ""
              }
            </div>
          </div>
          `;
}

function aboutTemplate(pokemon) {
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
            </table>
            `;
}

function statsTemplate(pokemon) {
  const pokemonType = pokemon.types[0].type.name;
  const color = typeColors[pokemonType];

  return `
          <table class="large_card_stats_table">
            <tr>
                <td>Attack</td>
                <td>${pokemon.stats[1].base_stat}</td>
              </tr>
              <tr>
                <td colspan="2">
                 <div class="stats_progress_bar_container">
                 <div class="stats_progress_bar" style="width: ${calculateBaseStats(pokemon.stats[1].base_stat)}% ;background-color: ${color};">
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
                 <div class="stats_progress_bar" style="width: ${calculateBaseStats(pokemon.stats[2].base_stat)}%;background-color: ${color};">
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
                 <div class="stats_progress_bar" style="width: ${calculateBaseStats(pokemon.stats[3].base_stat)}% ;background-color: ${color};">
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
                 <div class="stats_progress_bar" style="width: ${calculateBaseStats(pokemon.stats[4].base_stat)}% ;background-color: ${color};">
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
                 <div class="stats_progress_bar" style="width: ${calculateBaseStats(pokemon.stats[5].base_stat)}% ;background-color: ${color};">
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
            <button onclick="resetPokemonSearchIfWrongInput()">Back to Start</button>
          </div>`;
}

function startTemplate() {
  return `
          <div class="start_overlay_content" id="start-overlay-content">
            <p>Let’s see if you're a true Pokémon fan: What color is Pikachu (this little yellow mouse)?</p>
          </div>
            <div class="start_overlay_colors">
              <div class="start_overlay_colors">
              <button class="green_button" type="button" onclick="showThatAnswerIsWrong()">Green</button>
              <button class="blue_button" type="button" onclick="showThatAnswerIsWrong()">Blue</button>
              <button class="yellow_button" type="button" onclick="checkAnswer('yellow')">Yellow</button>
            </div>
          </div>
        `;
}

function wrongAnswerTemplate() {
  return `
          <p>Wrong answer! Are you sure you've ever seen a Pikachu before?</p>
          <button onclick="backToStartQuestion()" class="try_again_button" id="try-again-button">Try again!
          </button>`;
}

function compareOverlayTemplate(firstPokemon, secondPokemon) {
  return `
    <div class="compare_overlay">
      <div class="compare_content">
        <button
          id="compare-close-button"
          class="compare_close_button"
          type="button"
          onclick="closeCompareOverlay()"
          aria-label="Close compare overlay"
        >
          <img src="./assets/icons/close.png" alt="" />
        </button>
        <div class="compare_cards">
          ${largeCardTemplate(firstPokemon, selectedPokemonForCompare[0], "compare-first", false)}
          ${largeCardTemplate(secondPokemon, selectedPokemonForCompare[1], "compare-second", false)}
        </div>
      </div>
    </div>
  `;
}

/**
 * Returns the HTML template for one Pokémon inside the compare overlay.
 *
 * @param {Object} pokemon - The Pokémon data object.
 * @returns {string} The compare card HTML.
 */
function comparePokemonCardTemplate(pokemon) {
  const pokemonType = pokemon.types[0].type.name;
  const color = typeColors[pokemonType];

  return `
    <article class="compare_detail_card">
      <h3>${capitalize(pokemon.name)}</h3>

      <div class="large_card_image">
        <img
          src="${pokemon.sprites.other["official-artwork"].front_default}"
          alt="${pokemon.name} artwork"
        />
      </div>

      <div
        class="bottom_part_card"
        style="background: linear-gradient(to top, ${color}, rgba(255, 255, 255, 1)); box-shadow: 0 -10px 20px -10px ${color};"
      >
        <div class="large_card_tabs compare_stats_box">
          ${statsTemplate(pokemon)}
        </div>
      </div>
    </article>
  `;
}

function generationOverlayTemplate() {
  return `
    <div class="generation_overlay" onclick="closeGenerationOverlayOnBackgroundClick(event)">
      <div class="generation_overlay_content">
        <button
          class="generation_overlay_close_button"
          type="button"
          onclick="closeGenerationOverlay()"
          aria-label="Close generation selection"
        >
          <img src="./assets/icons/close.png" alt="" />
        </button>

        <h2>Choose Generation</h2>

        <div class="generation_list">
          ${generationButtonsTemplate()}
        </div>
      </div>
    </div>
  `;
}

function generationButtonsTemplate() {
  let html = "";

  for (const generation in generations) {
    html += `
      <button
        class="generation_select_button"
        type="button"
        onclick="selectGeneration(${generation})"
      >
        ${generations[generation].label}
      </button>
    `;
  }

  return html;
}
