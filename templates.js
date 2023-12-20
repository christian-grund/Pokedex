function renderPokemonCardsHTML(currentPokemon, i) {
  let cardsHTML = document.getElementById('cards');
  cardsHTML.innerHTML += /*html*/ `
    <div class="card-content" id="card-content${i}" onclick="loadClickedPokemon(${i})">
      <div class="name-and-number">
          <h1 id="pokemon-name-card${i}"></h1>
          <p id="number${i}" class="number">####</p>
          </div>
          <div class="species-and-img">
            <div class="species" id="species-card${i}"></div>
            <img class="img-card" id="img-card${i}" src="" alt="Pokemon-Image-Card">
          </div>
        </div>
    `;
}

function renderPokedexHTML(i) {
  let pokedexHTML = document.getElementById('pokedex-wrapper');
  pokedexHTML.innerHTML = /*html*/ `
    <section class="pokedex-container" id="pokedex-container">
      <div class="wrapper-buttons" onclick="doNotClose(event)">
      <div class="previous-btn"  onclick="previousPokemon(${i})"><img src="./img/arrow-left.png" alt="Arrow-Left" id="previous-btn"></div>
        <div class="pokedex" id="pokedex" onclick="doNotClose(event)">
          <div class="pokedex-top" id="pokedex-top">
            <div class="name-and-number">
              <h1 id="pokemon-name">Name</h1>
              <p id="number" class="number">####</p>
            </div>
            <div class="species" id="species"> </div>
            <div class="pokemon-img">
              <img id="pokemon-img" alt="Pokemon" />
            </div>
          </div>

          <div class="info-container">
            <div class="info-nav">
              <h3 id="about-h" class="about-h" style="color: black" onclick="changeInfoData()">About</h3>
              <h3 id="base-stats-h" class="base-stats-h" style="color: lightgray" onclick="changeInfoData()">Base Stats</h3>
            </div>
            <div class="about-data-wrapper" id="about-data-wrapper">
              <div class="about-data">
                <p>Height</p>
                <span id="height"></span>
              </div>
              <div class="about-data">
                <p>Weight</p>
                <span id="weight"></span>
              </div>
              <div class="about-data">
                <p>Abilities</p>
                <div id="abilities"> </div>
              </div>
            </div>
            <div class="base-stats" id="base-stats" style="display: none"> </div>
          </div>
          <div class="buttons-bottom" style="display: none">
        <img src="./img/arrow-left.png" alt="Arrow-Left-Button" class="previous-btn-bottom" id="previous-btn-bottom" onclick="previousPokemon(${i})">
        <img src="./img/arrow-left.png" alt="Arrow-Right-Button" class="next-btn-bottom" id="next-btn-bottom" onclick="nextPokemon(${i})">
      </div>
        </div>
        <div class="next-btn" onclick="nextPokemon(${i})"><img src="./img/arrow-left.png" alt="Arrow-Right" id="next-btn"></div>
      </div>
      
    </section>
    `;
}

function renderAbilities() {
  let abilities = clickedPokemon['abilities'];
  let abilityContent = document.getElementById(`abilities`);
  abilityContent.innerHTML = '';
  for (let j = 0; j < abilities.length; j++) {
    const ability = capitalizeFirstLetter(abilities[j]['ability']['name']);
    abilityContent.innerHTML += /*html*/ `
    <span>${ability}</span>
    `;
  }
}

function renderBaseStats() {
  let stats = clickedPokemon['stats'];
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
