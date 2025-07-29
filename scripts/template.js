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

function pokemonDetailsTemplate(pokemon) {
  const pokemonType = pokemon.types[0].type.name;
  const color = typeColors[pokemonType];
  return `
          <div
            id="pokemon-card" class="pokemon_card" style="background-color: ${color}">
              <p>#${pokemon.id}</p>
              <h5>${capitalize(pokemon.name)}</h5>
              <img src="${pokemon.sprites.other["official-artwork"].front_default}" alt="${pokemon.name}" />
              <p class="pokemon_type">${capitalize(pokemon.types[0].type.name)}</p>
          </div>
        `;
}
