let currentPokemon;

async function loadPokemon() {
  let url = 'https://pokeapi.co/api/v2/pokemon/charmander';
  let response = await fetch(url);
  currentPokemon = await response.json();
  console.log(currentPokemon);

  renderPokemonInfo();
}

function renderPokemonInfo() {
  document.getElementById('pokemon-name').innerHTML = capitalizeFirstLetter(
    currentPokemon['name']
  );
  document.getElementById('number').innerHTML = '#00' + currentPokemon['id'];

  document.getElementById('pokemon-img').src =
    currentPokemon['sprites']['other']['dream_world']['front_default'];
  document.getElementById('species').innerHTML = capitalizeFirstLetter(
    currentPokemon['types']['0']['type']['name']
  );
  document.getElementById('height').innerHTML =
    (currentPokemon['height'] * 0.1).toFixed(2) + ' m';
  document.getElementById('weight').innerHTML =
    (currentPokemon['weight'] * 0.1).toFixed(2) + ' kg';
  renderAbilities();
  renderBaseStats();
}

function renderAbilities() {
  let abilities = currentPokemon['abilities'];
  for (let i = 0; i < abilities.length; i++) {
    const ability = capitalizeFirstLetter(abilities[i]['ability']['name']);
    document.getElementById('abilities').innerHTML += /*html*/ `
    <span>${ability}</span>
    `;
  }
}

function renderBaseStats() {
  let stats = currentPokemon['stats'];
  const statName = ['HP', 'Attak', 'Defense', 'Sp. Atk', 'Sp. Def', 'Speed'];
  for (let i = 0; i < stats.length; i++) {
    // const statName = capitalizeFirstLetter(stats[i]['stat']['name']);
    const statValue = stats[i]['base_stat'];
    document.getElementById('base-stats').innerHTML += /*html*/ `
    <div class="stats-data">
      <p>${statName[i]}</p>
      <span><b>${statValue}</b></span>
      <div class="progress" role="progressbar" aria-label="Basic example" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
              <div class="progress-bar" id="progressbar${i}" style="width: ${statValue}%"></div>
    `;
    checkProgressBar(statValue, i);
  }
}

function checkProgressBar(statValue, i) {
  let barColor = document.getElementById(`progressbar${i}`);
  console.log(statValue);
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
