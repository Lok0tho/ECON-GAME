const countries = [
  { name: "USA", money: 1000, oil: 50, tech: 30, food: 80, population: 330, infrastructure: 20, research: 0 },
  { name: "China", money: 1000, oil: 40, tech: 40, food: 90, population: 1400, infrastructure: 15, research: 0 },
  { name: "Brazil", money: 1000, oil: 20, tech: 10, food: 120, population: 210, infrastructure: 10, research: 0 }
];

const eventDeck = [
  { name: "Oil Crisis", description: "Oil becomes more valuable. Countries gain money based on their oil reserves.", effect: (c) => c.money += c.oil * 5 },
  { name: "Tech Boom", description: "Technology value surges. Countries gain money based on their tech level.", effect: (c) => c.money += c.tech * 3 },
  { name: "Recession", description: "Global recession hits. Each country loses $150.", effect: (c) => c.money = Math.max(0, c.money - 150) },
  { name: "Population Surge", description: "Populations grow, increasing resource demand. Each country gains +10M people.", effect: (c) => c.population += 10 },
  { name: "Infrastructure Investment", description: "A global infrastructure push boosts development. Countries with high infrastructure earn more.", effect: (c) => c.money += c.infrastructure * 2 },
  { name: "Research Breakthrough", description: "A major scientific discovery boosts tech. Countries with high research get more money.", effect: (c) => c.money += c.research * 5 }
];

function drawCountries() {
  const container = document.getElementById("countries");
  container.innerHTML = "";
  countries.forEach((c, i) => {
    container.innerHTML += `
      <div class="country">
        <h3>${c.name}</h3>
        <p>Money: $${c.money}</p>
        <div class="resource-bar">
          <div class="resource-progress" style="width: ${Math.min(100, (c.oil / 100) * 100)}%; background-color: #FF5722;"></div>
        </div>
        <p>Oil: ${c.oil}</p>
        <p>Technology: ${c.tech}</p>
        <p>Infrastructure: ${c.infrastructure}</p>
        <button onclick="trade(${i})">Trade Oil</button>
        <button onclick="invest(${i}, 'tech')">Invest in Tech</button>
        <button onclick="invest(${i}, 'infrastructure')">Invest in Infrastructure</button>
        <button onclick="research(${i})">Invest in Research</button>
        <button onclick="passTurn(${i})">Pass</button>
      </div>
    `;
  });
}

function log(msg) {
  const logBox = document.getElementById("log");
  logBox.innerHTML += `<p>${msg}</p>`;
  logBox.scrollTop = logBox.scrollHeight;
}

function trade(index) {
  const c = countries[index];
  if (c.oil >= 5) {
    c.money += 100;
    c.oil -= 5;
    log(`${c.name} traded oil for $100.`);
    drawCountries();
  } else {
    log(`${c.name} doesn’t have enough oil to trade.`);
  }
}

function invest(index, resource) {
  const c = countries[index];
  const cost = 200;
  if (c.money >= cost) {
    c.money -= cost;
    if (resource === "tech") {
      c.tech += 10;
      log(`${c.name} invested in technology.`);
    } else if (resource === "infrastructure") {
      c.infrastructure += 5;
      log(`${c.name} invested in infrastructure.`);
    }
    drawCountries();
  } else {
    log(`${c.name} doesn’t have enough money to invest.`);
  }
}

function research(index) {
  const c = countries[index];
  const cost = 150;
  if (c.money >= cost) {
    c.money -= cost;
    c.research += 5;
    log(`${c.name} invested in research.`);
    drawCountries();
  } else {
    log(`${c.name} doesn’t have enough money to invest in research.`);
  }
}

function passTurn(index) {
  log(`${countries[index].name} passed their turn.`);
}

function nextTurn() {
  const event = eventDeck[Math.floor(Math.random() * eventDeck.length)];
  log(`<strong>Random Event:</strong> ${event.name} - ${event.description}`);

  countries.forEach(c => {
    event.effect(c);
  });

  drawCountries();
}

drawCountries();
