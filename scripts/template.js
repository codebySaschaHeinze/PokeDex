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
              <p class="pokemon_type">${capitalize(pokemon.types[0].type.name)}</p>
          </div>
        `;
}

function largeCardTemplate(pokemon) {
  return `
            <h6>${capitalize(pokemon.name)}</h6>
              <p class="large_card_type">${capitalize(pokemon.types[0].type.name)}</p>
            <div id="large-card-image" class="large_card_image"><img src="${
              pokemon.sprites.other["official-artwork"].front_default
            }" alt=""></div>
            <div class="large_card_about_stats_evolution">
              <p>about</p>
              <p>stats</p>
              <p>evolution</p>
            </div>
            <table class="large_card_about_table">
              <tr>
                <td>species</td>
                <td>seed</td>
              </tr>
              <tr>
                <td>height</td>
                <td>120</td>
              </tr>
              <tr>
                <td>weight</td>
                <td>40</td>
              </tr>
              <tr>
                <td>abilities</td>
                <td>blabla</td>
              </tr>
            </table>
            <div class="prev_next_buttons">
              <button class="prev_button"><img src="./assets/icons/prev_arrow.png" alt="" /></button>
              <button class="next_button"><img src="./assets/icons/next_arrow.png" alt="" /></button>
            </div>
          `;
}
