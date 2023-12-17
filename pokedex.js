let allPokemon; // loads Name and URL of first 151 Pokemon
let pokemon = []; // Array of Pokemon Names
let loadedPokemon = [];
let currentPokemon; // Pokemon with current Index
let clickedPokemon;
let amountLoadedPokemon = 25;
let currentLoadedPokemon;
let colorsByType = {
  // Value for setting background color by type of Pokemon
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

function init() {
  loadingScreen();
}

//////////////////////////// Loading Screen //////////////////////////////

async function loadingScreen() {
  toggleVisibilityAndRotation();
  await loadAllPokemon();
  await loadPokemons(0, amountLoadedPokemon);
  toggleVisibilityAndRotation();
}

function toggleVisibilityAndRotation() {
  document.getElementById('loading-screen').classList.toggle('d-flex');
  document.getElementById('loading-screen').classList.toggle('d-none');
  document.getElementById('loading-animation').classList.toggle('rotation-animation');
}

////////////////// Load Pokemon-Data via API for Galery //////////////////

async function loadAllPokemon() {
  let url = 'https://pokeapi.co/api/v2/pokemon?limit=151';
  let response = await fetch(url);
  allPokemon = await response.json();

  addAllPokemonToArray();
}

function addAllPokemonToArray() {
  for (let i = 0; i < allPokemon['results'].length; i++) {
    let pokemonNames = allPokemon['results'][i]['name'];
    pokemon.push(pokemonNames);
  }
}

async function loadPokemons(a, b) {
  for (let i = a; i < b; i++) {
    let urlCurrentPokemon = allPokemon['results'][i]['url'];
    let response = await fetch(urlCurrentPokemon);
    currentPokemon = await response.json();
    loadedPokemon.push(currentPokemon);

    renderPokemonCards(currentPokemon, i);
  }
}

//////////////////////////// Load More Pokemon //////////////////////////////

async function loadMorePokemon() {
  toggleVisibilityAndRotation();
  document.getElementById('load-more-h2').innerHTML = 'Loading more Pokémon...';
  await loadMore();
  toggleVisibilityAndRotation();
}

async function loadMore() {
  currentLoadedPokemon = amountLoadedPokemon;

  if (amountLoadedPokemon + 51 >= pokemon.length) {
    amountLoadedPokemon = 151;
    await loadPokemons(currentLoadedPokemon, amountLoadedPokemon);
    document.getElementById('load-more-btn').disabled = true;
    document.getElementById('load-more-btn').innerHTML = 'All 151 Pokémon loaded!';
  } else {
    amountLoadedPokemon = amountLoadedPokemon + 51;
    await loadPokemons(currentLoadedPokemon, amountLoadedPokemon);
  }
}

//////////////////////////// Search //////////////////////////////

async function searchPokemon() {
  let search = document.getElementById('search').value;

  document.getElementById('cards').innerHTML = '';

  for (let index = 0; index < loadedPokemon.length; index++) {
    let pokemon = loadedPokemon[index];
    let pokemonName = pokemon['name'].toLowerCase();

    if (pokemonName.includes(search.toLowerCase())) {
      renderPokemonCards(pokemon, index);
    }
  }

  checkSearchInput();
}

function checkSearchInput() {
  searchInput = document.getElementById('search');

  if (searchInput && searchInput.value) {
    document.getElementById('load-more-btn').classList.add('d-none');
  } else {
    document.getElementById('load-more-btn').classList.remove('d-none');
  }
}

function refreshPage() {
  document.getElementById('cards').innerHTML = '';
  init();
}

//////////////////////////// Pokemon Galery //////////////////////////////

function renderPokemonCards(currentPokemon, i) {
  renderPokemonCardsHTML(currentPokemon, i);
  contentCards(currentPokemon, i);
  setBackgroundColorCards(currentPokemon, i);
}

function contentCards(currentPokemon, i) {
  document.getElementById(`pokemon-name-card${i}`).innerHTML = capitalizeFirstLetter(currentPokemon['name']);
  document.getElementById(`number${i}`).innerHTML = '#' + zeroPad(currentPokemon['id'], 3);
  document.getElementById(`img-card${i}`).src = currentPokemon['sprites']['other']['dream_world']['front_default'];

  let species = currentPokemon['types'];
  for (let j = 0; j < species.length; j++) {
    const speciesValues = species[j]['type']['name'];
    document.getElementById(`species-card${i}`).innerHTML += /*html*/ `
    <span>${speciesValues}</span>
    `;
  }
}

const zeroPad = (num, places) => String(num).padStart(places, '0');

function setBackgroundColorCards(currentPokemon, i) {
  for (let x = 0; x < pokemon.length; x++) {
    let backgroundByType = currentPokemon['types'][0]['type']['name'];
    let backgroundColor = colorsByType[backgroundByType];

    document.getElementById(`card-content${i}`).style.background = backgroundColor;
  }
}

//////////////////////////// Load Pokemon-Data via API for Pokedex //////////////////////////////

async function loadClickedPokemon(i) {
  let clickedPokemonName = pokemon[i];
  let url = 'https://pokeapi.co/api/v2/pokemon/' + `${clickedPokemonName}`;
  let response = await fetch(url);
  clickedPokemon = await response.json();

  openPokedex(i);
}

//////////////////////////// Open / Close Pokedex //////////////////////////////

function openPokedex(i) {
  document.getElementById('pokedex-wrapper').classList.add('d-block');

  renderPokedex(i);
}

function closePokedex() {
  document.getElementById('pokedex-wrapper').classList.remove('d-block');
}

function doNotClose(event) {
  event.stopPropagation();
}

//////////////////////////// Pokedex Card //////////////////////////////

function renderPokedex(i) {
  renderPokedexHTML(i);
  renderPokemonData();
  renderAbilities();
  renderBaseStats();
  setBackgroundColorPokedex();
}

function renderPokemonData() {
  document.getElementById('pokemon-name').innerHTML = capitalizeFirstLetter(clickedPokemon['name']);
  document.getElementById('number').innerHTML = '#00' + clickedPokemon['id'];
  document.getElementById('pokemon-img').src = clickedPokemon['sprites']['other']['dream_world']['front_default'];
  document.getElementById('species').innerHTML = capitalizeFirstLetter(clickedPokemon['types']['0']['type']['name']);
  document.getElementById('height').innerHTML = (clickedPokemon['height'] * 0.1).toFixed(2) + ' m';
  document.getElementById('weight').innerHTML = (clickedPokemon['weight'] * 0.1).toFixed(2) + ' kg';
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

function setBackgroundColorPokedex() {
  for (let x = 0; x < pokemon.length; x++) {
    let backgroundByType = clickedPokemon['types'][0]['type']['name'];
    let backgroundColor = colorsByType[backgroundByType];

    document.getElementById('pokedex-top').style.background = backgroundColor;
    document.getElementById('previous-btn').style.background = backgroundColor;
    document.getElementById('next-btn').style.background = backgroundColor;
  }
}

//////////////////////////// Next / Previous Pokemon //////////////////////////////

function previousPokemon(i) {
  if (i > 0) {
    i--;
  } else {
    i = loadedPokemon.length - 1;
  }
  loadClickedPokemon(i);
}

function nextPokemon(i) {
  if (i < loadedPokemon.length - 1) {
    i++;
  } else {
    i = 0;
  }
  loadClickedPokemon(i);
}

function backwardImage(i) {
  if (i > 0) {
    i--;
  } else {
    i = images.length - 1;
  }
  openImage(i);
}

//////////////////////////// Usefull Functions //////////////////////////////

// Replaces first letter of a string in Uppercase
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
