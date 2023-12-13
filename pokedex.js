let allPokemon;
let pokemons = [];
let currentPokemon;
let amountLoadedPokemon;
let pokemonNumber = [1, 2, 3, 4, 5];
let loadMore = 10;
let filteredPokemonList = [];
let colorsByType = {
  normal: '#BBBBAA',
  fire: '#CF3F26',
  water: '#2D9BE3',
  electric: '#FFDB00',
  grass: '#62BC5A',
  ice: '#74CFC0',
  fighting: '#BC5544',
  poison: '#9553CD',
  ground: '#A67439',
  psychic: '#FF6480',
  bug: '#92C12A',
  rock: '#BBAA66',
  ghost: '#6E4370',
  dragon: '#5770BE',
  dark: '#4E4545',
  steel: '#AAAABB',
  fairy: '#EC8FE6',
};

async function init() {
  await loadAllPokemon();
  await loadPokemons(0, 10);
}

//////////////////////////// Load Pokemon-Data via API //////////////////////////////

async function loadAllPokemon() {
  let url = 'https://pokeapi.co/api/v2/pokemon?limit=151';
  let response = await fetch(url);
  allPokemon = await response.json();

  addAllPokemonToArray();
}

function addAllPokemonToArray() {
  for (let i = 0; i < allPokemon['results'].length; i++) {
    let pokemonNames = allPokemon['results'][i]['name'];
    pokemons.push(pokemonNames);
  }
}

async function loadPokemons(a, b) {
  for (let i = a; i < b; i++) {
    let urlCurrentPokemon = allPokemon['results'][i]['url'];
    let response = await fetch(urlCurrentPokemon);
    currentPokemon = await response.json();

    console.log('currentPokemon:', currentPokemon);
    renderPokemonCards(i);
  }
}

//////////////////////////// Pokemon Galery //////////////////////////////

function renderPokemonCards(i) {
  renderPokemonCardsHTML(i);
  contentCards(i);
  setBackgroundColor(i);
}

function renderPokemonCardsHTML(i) {
  let cards = document.getElementById('cards');
  cards.innerHTML += /*html*/ `
    <div class="card-content" id="card-content${i}" onclick="openPokedex(${i})">
          <h1 id="pokemon-name-card${i}"></h1>
          <div class="species-and-img">
            <div class="species" id="species-card${i}"></div>
            <img class="img-card" id="img-card${i}" src="" alt="Pokemon-Image-Card">
          </div>
        </div>
    `;
}

function contentCards(i) {
  document.getElementById(`pokemon-name-card${i}`).innerHTML = capitalizeFirstLetter(currentPokemon['name']);
  document.getElementById(`img-card${i}`).src = currentPokemon['sprites']['other']['dream_world']['front_default'];

  let species = currentPokemon['types'];
  for (let j = 0; j < species.length; j++) {
    const speciesValues = species[j]['type']['name'];
    document.getElementById(`species-card${i}`).innerHTML += /*html*/ `
    <span>${speciesValues}</span>
    `;
  }
}

//////////////////////////// Pokedex Card //////////////////////////////

function renderPokedex(i) {
  renderPokedexHTML(); //
  renderPokemonData(i);
  renderAbilities(i);
  renderBaseStats(i);
}

function renderPokemonData(i) {
  document.getElementById(`pokemon-name`).innerHTML = capitalizeFirstLetter(currentPokemon['name']);
  document.getElementById(`number`).innerHTML = '#00' + currentPokemon['id'];
  document.getElementById(`pokemon-img`).src = currentPokemon['sprites']['other']['dream_world']['front_default'];
  document.getElementById(`species`).innerHTML = capitalizeFirstLetter(currentPokemon['types']['0']['type']['name']);
  document.getElementById(`height`).innerHTML = (currentPokemon['height'] * 0.1).toFixed(2) + ' m';
  document.getElementById(`weight`).innerHTML = (currentPokemon['weight'] * 0.1).toFixed(2) + ' kg';
}

function renderAbilities(i) {
  let abilities = currentPokemon['abilities'];
  let abilityContent = document.getElementById(`abilities`);
  abilityContent.innerHTML = '';
  for (let j = 0; j < abilities.length; j++) {
    const ability = capitalizeFirstLetter(abilities[j]['ability']['name']);
    abilityContent.innerHTML += /*html*/ `
    <span>${ability}</span>
    `;
  }
}

function renderBaseStats(i) {
  let stats = currentPokemon['stats'];
  const statName = ['HP', 'Attak', 'Defense', 'Sp. Atk', 'Sp. Def', 'Speed'];
  let baseStats = document.getElementById(`base-stats`);
  baseStats.innerHTML = '';
  for (let j = 0; j < stats.length; j++) {
    const statValue = stats[j]['base_stat'];
    baseStats.innerHTML += /*html*/ `
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
  }
}

function changeInfoData() {
  document.getElementById('about-h').classList.toggle('color-lightgray');
  document.getElementById('base-stats-h').classList.toggle('color-black');
  document.getElementById('about-data-wrapper').classList.toggle('d-none');
  document.getElementById('base-stats').classList.toggle('d-flex');
}

function setBackgroundColor(i) {
  for (let x = 0; x < pokemons.length; x++) {
    let backgroundByType = currentPokemon['types'][0]['type']['name'];
    let backgroundColor = colorsByType[backgroundByType];

    document.getElementById(`card-content${i}`).style.background = backgroundColor;
    document.getElementById('pokedex-top').style.background = backgroundColor;
  }
}

//////////////////////////// Search //////////////////////////////

function searchInput() {
  let searchInput = document.getElementById('search');
  searchInput.addEventListener('input', searchPokemon); // event listener wird aktiviert und bleibt aktiv
}

function searchPokemon() {
  let search = document.getElementById('search').value;
  search = search.toLowerCase();
  // console.log(search);

  let cards = document.getElementById('cards');
  cards.innerHTML = '';

  for (let index = 0; index < pokemons.length; index++) {
    let name = pokemons[index]['name'];
    if (name.toLowerCase().includes(search)) {
      generatePokemonCards(index);
    }
  }
}

function deleteInput() {
  document.getElementById('search').value = '';
}

//////////////////////////// Open Pokedex //////////////////////////////

function openPokedex(i) {
  document.getElementById('pokedex-wrapper').classList.add('d-block');

  renderPokemonInfo(i);
}

function closePokedex() {
  document.getElementById('pokedex-wrapper').classList.remove('d-block');
}

function doNotClose(event) {
  event.stopPropagation();
}

//////////////////////////// Usefull Functions //////////////////////////////

// Replaces first letter of a string in Uppercase
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
