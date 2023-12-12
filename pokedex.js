let pokemonNumber = [1, 2, 3, 4, 5];
let pokemonByIndex = [];
let currentPokemon;

async function loadPokemon() {
  for (let i = 0; i < pokemonNumber.length; i++) {
    const number = pokemonNumber[i];
    let url = 'https://pokeapi.co/api/v2/pokemon/' + `${number}`;
    let response = await fetch(url);
    currentPokemon = await response.json();
    pokemonByIndex.push(currentPokemon);

    generatePokemonCards(i);
  }
}

function generatePokemonCards(i) {
  let cards = document.getElementById('cards');
  cards.innerHTML += /*html*/ `
    <div class="card-content bg-grass" onclick="openPopup(${i})">
          <h1 id="pokemon-name-card${i}"></h1>
          <div class="species-and-img">
            <div class="species" id="species-card${i}"></div>
            <img class="img-card" id="img-card${i}" src="" alt="Pokemon-Image-Card">
          </div>
        </div>
    `;

  renderPokemonCards(i);
}

function renderPokemonCards(i) {
  document.getElementById(`pokemon-name-card${i}`).innerHTML =
    capitalizeFirstLetter(currentPokemon['name']);
  document.getElementById(`img-card${i}`).src =
    currentPokemon['sprites']['other']['dream_world']['front_default'];

  renderSpecies(i);
}

function openPopup(i) {
  document.getElementById('cards').classList.add('d-none');
  document.getElementById('pokedex-wrapper').classList.remove('d-none');

  renderPokemonInfo(i);
}

function renderPokemonInfo(i) {
  document.getElementById(`pokemon-name`).innerHTML = capitalizeFirstLetter(
    pokemonByIndex[i]['name']
  );
  console.log(pokemonByIndex[i]['name']);

  document.getElementById(`number`).innerHTML = '#00' + pokemonByIndex[i]['id'];

  document.getElementById(`pokemon-img`).src =
    pokemonByIndex[i]['sprites']['other']['dream_world']['front_default'];
  document.getElementById(`species`).innerHTML = capitalizeFirstLetter(
    pokemonByIndex[i]['types']['0']['type']['name']
  );
  document.getElementById(`height`).innerHTML =
    (pokemonByIndex[i]['height'] * 0.1).toFixed(2) + ' m';
  document.getElementById(`weight`).innerHTML =
    (pokemonByIndex[i]['weight'] * 0.1).toFixed(2) + ' kg';
  renderAbilities(i);
  renderBaseStats(i);
}

// async function loadPokemon() {
//   let url = 'https://pokeapi.co/api/v2/pokemon/charmander';
//   let response = await fetch(url);
//   currentPokemon = await response.json();
//   console.log(currentPokemon);

//   renderPokemonInfo();
// }

// function renderPokemonInfo() {
//   document.getElementById('pokemon-name').innerHTML = capitalizeFirstLetter(
//     currentPokemon['name']
//   );
//   document.getElementById('number').innerHTML = '#00' + currentPokemon['id'];

//   document.getElementById('pokemon-img').src =
//     currentPokemon['sprites']['other']['dream_world']['front_default'];
//   document.getElementById('species').innerHTML = capitalizeFirstLetter(
//     currentPokemon['types']['0']['type']['name']
//   );
//   document.getElementById('height').innerHTML =
//     (currentPokemon['height'] * 0.1).toFixed(2) + ' m';
//   document.getElementById('weight').innerHTML =
//     (currentPokemon['weight'] * 0.1).toFixed(2) + ' kg';
//   renderAbilities();
//   renderBaseStats();
// }

function renderSpecies(i) {
  let species = currentPokemon['types'];
  for (let j = 0; j < species.length; j++) {
    const speciesValues = species[j]['type']['name'];
    document.getElementById(`species-card${i}`).innerHTML += /*html*/ `
    <span>${speciesValues}</span>
    `;
  }
}

function renderAbilities(i) {
  let abilities = pokemonByIndex[i]['abilities'];
  for (let j = 0; j < abilities.length; j++) {
    const ability = capitalizeFirstLetter(abilities[j]['ability']['name']);
    document.getElementById(`abilities`).innerHTML += /*html*/ `
    <span>${ability}</span>
    `;
  }
}

function renderBaseStats(i) {
  let stats = pokemonByIndex[i]['stats'];
  const statName = ['HP', 'Attak', 'Defense', 'Sp. Atk', 'Sp. Def', 'Speed'];
  for (let j = 0; j < stats.length; j++) {
    // const statName = capitalizeFirstLetter(stats[i]['stat']['name']);
    const statValue = stats[j]['base_stat'];
    document.getElementById(`base-stats`).innerHTML += /*html*/ `
    <div class="stats-data">
      <p>${statName[j]}</p>
      <span><b>${statValue}</b></span>
      <div class="progress" role="progressbar" aria-label="Basic example" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
              <div class="progress-bar" id="progressbar${j}" style="width: ${statValue}%"></div>
    `;
    checkProgressBar(statValue, j);
  }
}

function checkProgressBar(statValue, j) {
  let barColor = document.getElementById(`progressbar${j}`);
  if (statValue < 50) {
    barColor.classList.add('progressbar-bg-red');
    console.log('True');
  }
}

function changeInfoData() {
  document.getElementById('about-h').classList.toggle('color-lightgray');
  document.getElementById('base-stats-h').classList.toggle('color-black');
  document.getElementById('about-data-wrapper').classList.toggle('d-none');
  document.getElementById('base-stats').classList.toggle('d-flex');
}

// Replaces first letter of a string in Uppercase
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
