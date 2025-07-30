function loadingTemplate() {
  return `
          <div class="pokeball_loader">
            <img src="./assets/icons/pokeball_spin.png" alt="" />
          </div>`;
}

function errorTemplate() {
  return `
          <p>Seite konnte nicht geladen werden</p>`;
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
            <div class="large_card_content" style="background-color: ${color};">
            <button class="close_button" onclick="closeLargeCard()"><img src="./assets/icons/close.png" alt="Schließen"></button>
              <h6>${capitalize(pokemon.name)}</h6>
              <div id="large-card-image" class="large_card_image"><img src="${
                pokemon.sprites.other["official-artwork"].front_default
              }" alt="">
            </div>
            <div class="large_card_about_stats_evolution">
              <p id="tab-content-about" class="tab_button aboutTab" onclick="showAbout(${index})">About</p>
              <p id="tab-content-stats" class="tab_button statsTab" onclick="showStats(${index})">Stats</p>
              <p id="tab-content-evolution" class="tab_button evolutionTab" onclick="showEvolution(${index})">Evolution</p>
            </div>
            <div class="large_card_tab_content" id="large-card-tab-content">
            
            <div>
            <div class="prev_next_buttons">
              <button class="prev_button" onclick="prevLargeCard(${index})"><img src="./assets/icons/prev_arrow.png" alt="" /></button>
              <button class="next_button" onclick="nextLargeCard(${index})"><img src="./assets/icons/next_arrow.png" alt="" /></button>
            </div>
            </div>
          `;
}

function aboutTemplate(pokemon) {
  const pokemonType = pokemon.types[0].type.name;
  const color = typeColors[pokemonType];
  return `<table class="large_card_about_table">
              <tr>
                <td>species</td>
                <td>${capitalize(pokemon.types[0].type.name)}</td>
              </tr>
              <tr>
                <td>height</td>
                <td>${(pokemon.height / 10).toFixed(1)} m</td>
              </tr>
              <tr>
                <td>weight</td>
                <td>${(pokemon.weight / 10).toFixed(1)} kg</td>
              </tr>
              <tr>
                <td>abilities</td>
                <td>blabla</td>
              </tr>
            </table>`;
}

function statsTemplate(pokemon, index) {}

function evolutionTemplate(pokemon, index) {}
