// function loadingTemplate() {
//   return `
//   <div class="pokeball_loader">
//     <img src="./assets/icons/pokeball_spin.png" alt="" />
//   </div>`;
// }

function errorTemplate() {
  return `<p>Seite konnte nicht geladen werden</p>`;
}

function pokemonTemplate(char) {
  console.log(char);

  return `<p>${char.name}</p>
          <img src="${char.url}" alt="">`;
}
