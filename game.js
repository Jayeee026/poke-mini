alert("game.js LOADED"); // 🚨 THIS MUST POP UP

let party = [];
let boxes = [];
let pokeballs = 5;
let money = 3000;
let currentWild = null;

// ---------- TABS ----------
document.querySelectorAll(".tabBtn").forEach(btn => {
  btn.onclick = () => {
    document.querySelectorAll(".tabSection").forEach(sec => {
      sec.style.display = sec.id === btn.dataset.tab ? "block" : "none";
    });
  };
});

// ---------- STARTER ----------
document.querySelectorAll(".starterBtn").forEach(btn => {
  btn.onclick = () => {
    party.push(btn.dataset.starter);
    document.getElementById("oakText").textContent =
      "Starter chosen. You got 5 Pokéballs!";
    document.querySelectorAll(".starterBtn").forEach(b => b.style.display = "none");
    document.getElementById("exploreBtn").style.display = "inline-block";
    updateUI();
    updateParty();
  };
});

// ---------- RANDOM POKÉMON (FORCED SHINY) ----------
function getRandomPokemon() {
  const base = POKEMON[Math.floor(Math.random() * POKEMON.length)];

  // 🚨 FORCE SHINY — NO RNG
  const shiny = true;

  console.log("SPAWNED:", base.name, "SHINY:", shiny);

  return { ...base, shiny };
}

// ---------- EXPLORE ----------
document.getElementById("exploreBtn").onclick = () => {
  currentWild = getRandomPokemon();

  alert("A SHINY SPAWNED"); // 🚨 MUST SHOW

  document.getElementById("result").textContent =
    `A wild ${currentWild.name} ✨SHINY✨ appeared!`;

  document.getElementById("catchBtn").style.display = "inline-block";
};

// ---------- CATCH ----------
document.getElementById("catchBtn").onclick = () => {
  pokeballs--;

  const displayName = `${currentWild.name} ✨SHINY✨`;

  if (party.length < 6) party.push(displayName);
  else boxes.push(displayName);

  document.getElementById("result").textContent =
    `You caught ${displayName}!`;

  currentWild = null;
  document.getElementById("catchBtn").style.display = "none";
  updateParty();
  updateBoxes();
  updateUI();
};

// ---------- SHOP ----------
document.getElementById("buyBallBtn").onclick = () => {
  money -= 200;
  pokeballs++;
  updateUI();
};

// ---------- UI ----------
function updateUI() {
  document.getElementById("pokeballText").textContent =
    `Pokéballs: ${pokeballs}`;
  document.getElementById("shopMoney").textContent =
    `Money: ₽${money}`;
}

// ---------- PARTY ----------
function updateParty() {
  const list = document.getElementById("partyList");
  list.innerHTML = "";
  party.forEach(p => {
    const li = document.createElement("li");
    li.textContent = p;
    list.appendChild(li);
  });
}

// ---------- BOXES ----------
function updateBoxes() {
  const list = document.getElementById("boxList");
  list.innerHTML = "";
  boxes.forEach(p => {
    const li = document.createElement("li");
    li.textContent = p;
    list.appendChild(li);
  });
}

updateUI();
