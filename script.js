let selectedCountry = null;

const countriesData = {
  USA: { money: 1000, oil: 50, tech: 30, food: 80, population: 330, infrastructure: 20, research: 0 },
  China: { money: 1000, oil: 40, tech: 40, food: 90, population: 1400, infrastructure: 15, research: 0 },
  Brazil: { money: 1000, oil: 20, tech: 10, food: 120, population: 210, infrastructure: 10, research: 0 }
};

const eventDeck = [
  { name: "Oil Crisis", description: "Oil becomes more valuable. Countries gain money based on their oil reserves.", effect: (c) => c.money += c.oil * 5 },
  { name: "Tech Boom", description: "Technology value surges. Countries gain money based on their tech level.", effect: (c) => c.money += c.tech * 3 },
  { name: "Recession", description: "Global recession hits. Each country loses $150.", effect: (c) => c.money = Math.max(0, c.money - 150) },
  { name: "Population Surge", description: "Populations grow, increasing resource demand. Each country gains +10M people.", effect: (c) => c.population += 10 },
  { name: "Infrastructure Investment", description: "A global infrastructure push boosts development. Countries with high infrastructure earn more.", effect: (c) => c.money += c.infrastructure * 2 },
  { name: "Research Breakthrough", description: "A major scientific discovery boosts tech. Countries with high research get more money.", effect: (c) => c.money += c.research * 5 }
};

// Start the game after selecting a country
function startGame(countryName) {
  selectedCountry = countryName;
  document.getElementById('country-selection').style.display = 'none';  // Hide selection screen
  document.getElementById('game-container').style.display = 'block';  // Show game screen
  drawCountryInfo();
  log(`${countryName} has entered the game!`);
}

// Draw the selected country's information
function drawCountryInfo() {
  const country = countriesData[selectedCountry];
  const container = document.getElementById("country-info");
  container.innerHTML = `
    <h3>${selectedCountry}</h3>
    <p>Money: $${country.money}</p>
    <p>Oil: ${country.oil}</p>
    <p>Technology: ${country.tech}</p>
    <p>Infrastructure: ${country.infrastructure}</p>
    <p>Population: ${country.population}M</p>
    <button onclick="trade()">Trade Oil</button>
    <button onclick="invest('tech')">Invest in Tech</button>
    <button onclick="invest('infrastructure')">Invest in Infrastructure</button>
    <button onclick="research()">Invest in Research</button>
    <button onclick="passTurn()">Pass</button>
  `;
}

// Log messages in the game
function log(msg) {
  const logBox = document.getElementById("log");
  logBox.innerHTML += `<p>${msg}</p>`;
  logBox.scrollTop = logBox.scrollHeight;
}

// Handle the "Trade Oil" action
function trade() {
  const country = countriesData[selectedCountry];
  if (country.oil >= 5) {
    country.money += 100;
    country.oil -= 5;
    log(`${selectedCountry} traded oil for $100.`);
    drawCountryInfo();
  } else {
    log(`${selectedCountry} doesn’t have enough oil to trade.`);
  }
}

// Handle the "Invest" action for Tech or Infrastructure
function invest(resource) {
  const country = countriesData[selectedCountry];
  const cost = 200;
  if (country.money >= cost) {
    country.money -= cost;
    if (resource === 'tech') {
      country.tech += 10;
      log(`${selectedCountry} invested in technology.`);
    } else if (resource === 'infrastructure') {
      country.infrastructure += 5;
      log(`${selectedCountry} invested in infrastructure.`);
    }
    drawCountryInfo();
  } else {
    log(`${selectedCountry} doesn’t have enough money to invest.`);
  }
}

// Handle the "Invest in Research" action
function research() {
  const country = countriesData[selectedCountry];
  const cost = 150;
  if (country.money >= cost) {
    country.money -= cost;
    country.research += 5;
    log(`${selectedCountry} invested in research.`);
    drawCountryInfo();
  } else {
    log(`${selectedCountry} doesn’t have enough money to invest in research.`);
  }
}

// Handle the "Pass" action
function passTurn() {
  log(`${selectedCountry} passed their turn.`);
}

// Handle the "Next Turn" action
function nextTurn() {
  const event = eventDeck[Math.floor(Math.random() * eventDeck.length)];
  log(`<strong>Random Event:</strong> ${event.name} - ${event.description}`);
  event.effect(countriesData[selectedCountry]); // Apply the event effect to the selected country
  drawCountryInfo();
}

