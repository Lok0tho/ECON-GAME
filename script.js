// Initial countries with resources
const countries = [
  { name: "USA", money: 1000, oil: 50, tech: 30, food: 80, population: 330 },
  { name: "China", money: 1000, oil: 40, tech: 40, food: 90, population: 1400 },
  { name: "Brazil", money: 1000, oil: 20, tech: 10, food: 120, population: 210 }
];

// Event deck for random events (e.g., recession, population surge)
const eventDeck = [
  "Oil Crisis",
  "Tech Boom",
  "Recession",
  "Population Surge"
];

// Function to draw the countries on the page
function drawCountries() {
  const container = document.getElementById("countries");
  container.innerHTML = "";
  countries.forEach((c, i) => {
    container.innerHTML += `
      <div class="country">
        <h2>${c.name}</h2>
        <p>Money: $${c.money}</p>
        <p>Oil: ${c.oil} | Tech: ${c.tech} | Food: ${c.food}</p>
        <p>Population: ${c.population}M</p>
        <button onclick="trade(${i})">Trade</button>
        <button onclick="invest(${i})">Invest</button>
        <button onclick="passTurn(${i})">Pass</button>
      </div>
    `;
  });
}

// Function to log messages
function log(msg) {
  const logBox = document.getElementById("log");
  logBox.innerHTML += `<p>${msg}</p>`;
  logBox.scrollTop = logBox.scrollHeight;
}

// Function for trading resources
function trade(index) {
  const c = countries[index];
  c.money += 100;
  c.oil = Math.max(0, c.oil - 5);
  log(`${c.name} traded oil for $100.`);
  drawCountries();
}

// Function to invest in tech
function invest(index) {
  const c = countries[index];
  if (c.money >= 200) {
    c.money -= 200;
    c.tech += 10;
    log(`${c.name} invested in tech.`);
    drawCountries();
  } else {
    log(`${c.name} doesn't have enough money to invest.`);
  }
}

// Function to pass the turn
function passTurn(index) {
  log(`${countries[index].name} passed their turn.`);
}

// Function for next turn and random events
function nextTurn() {
  const event = eventDeck[Math.floor(Math.random() * eventDeck.length)];
  log(`<strong>Random Event:</strong> ${event}`);

  switch(event) {
    case "Oil Crisis":
      countries.forEach(c => c.money += c.oil * 5);
      log("Oil became more valuable. Countries gained money based on oil reserves.");
      break;
    case "Tech Boom":
      countries.forEach(c => c.money += c.tech * 3);
      log("Tech value surged. Countries gained money based on tech level.");
      break;
    case "Recession":
      countries.forEach(c => c.money = Math.max(0, c.money - 150));
      log("Global recession hit. Each country lost $150.");
      break;
    case "Population Surge":
      countries.forEach(c => c.population += 10);
      log("Populations grew. +10M people per country.");
      break;
  }

  drawCountries();
}

// Initial render
drawCountries();
