function init() {
  getPokemons();
  // loadingScreen();
}

async function getPokemons() {
  let charsRef = document.getElementById("main-content-container");
  charsRef.innerHTML = "";

  try {
    const url = "https://pokeapi.co/api/v2/pokemon?limit=20&offset=0";
    const response = await fetch(url);
    const chars = await response.json();
    console.log(chars.results);

    for (let i = 0; i < chars.results.length; i++) {
      const char = chars.results[i];
      charsRef.innerHTML += pokemonTemplate(char);
      // console.log(char.results);
    }
  } catch (error) {
    charsRef.innerHTML = errorTemplate();
  }
}

// function loadingScreen() {
//   let spinRef = document.getElementById("main-content-container");
//   spinRef.innerHTML = loadingTemplate();
// }
