function renderPokedexHTML() {
  let pokedexHTML = document.getElementById('pokedex-wrapper');
  pokedexHTML.innerHTML = /*html*/ `
    <div class="pokedex-container">
        <div class="pokedex" id="pokedex" onclick="doNotClose(event)">
          <div class="pokedex-top" id="pokedex-top">
            <div class="name-and-class">
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
        </div>
      </div>
    `;
}
