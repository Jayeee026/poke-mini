let party = [];
let boxes = [];
let pokeballs = 5;
let currentWild = null;

// ---------- TAB LOGIC ----------
document.querySelectorAll(".tabBtn").forEach(btn => {
  btn.addEventListener("click", () => {
    const tab = btn.dataset.tab;
    document.querySelectorAll(".tabSection").forEach(sec => {
      sec.style.display = sec.id === tab ? "block" : "none";
    });
  });
});

// ---------- STARTER ----------
document.querySelectorAll(".starterBtn").forEach(btn => {
  btn.addEventListener("click", () => {
    const starter = btn.dataset.starter;
    party.push(starter);

    document.getElementById("oakText").textContent =
      `Great choice! ${starter} is now your partner! You received 5 Pokéballs.`;

    document.querySelectorAll(".starterBtn").forEach(b => b.style.display = "none");
    document.getElementById("exploreBtn").style.display = "inline-block";

    updateParty();
    updateUI();
  });
});

// ---------- RARITY WEIGHTS ----------
const rarityWeights = {
  common: 80,
  uncommon: 18,
  rare: 2,
  legendary: 0.2
};

function getRandomPokemon() {
  let pool = [];
  POKEMON.forEach(p => {
    const weight = rarityWeights[p.rarity];
    for (let i = 0; i < weight * 10; i++) {
      pool.push(p);
    }
  });
  return pool[Math.floor(Math.random() * pool.length)];
}

// ---------- EXPLORE ----------
document.getElementById("exploreBtn").addEventListener("click", () => {
  if (pokeballs <= 0) {
    document.getElementById("result").textContent =
      "You are out of Pokéballs!";
    return;
  }

  currentWild = getRandomPokemon();
  document.getElementById("result").textContent =
    `A wild ${currentWild.name} appeared! (Catch rate: ${currentWild.catchRate})`;

  updateUI();
});

// ---------- TRY TO CATCH ----------
document.getElementById("result").addEventListener("click", () => {
  if (!currentWild || pokeballs <= 0) return;

  pokeballs--;

  const catchChance = currentWild.catchRate / 255;
  const roll = Math.random();

  if (roll < catchChance) {
    if (party.length < 6) {
      party.push(currentWild.name);
    } else {
      boxes.push(currentWild.name);
    }

    document.getElementById("result").textContent =
      `Gotcha! ${currentWild.name} was caught!`;
  } else {
    document.getElementById("result").textContent =
      `${currentWild.name} broke free and fled!`;
  }

  currentWild = null;
  updateParty();
  updateBoxes();
  updateUI();
});

// ---------- UI ----------
function updateUI() {
  document.getElementById("exploreBtn").textContent =
    `Explore (Pokéballs: ${pokeballs})`;
}

// ---------- PARTY ----------
function updateParty() {
  const list = document.getElementById("partyList");
  list.innerHTML = "";

  party.forEach(pkm => {
    const li = document.createElement("li");
    li.textContent = pkm;

    li.onclick = () => {
      boxes.push(pkm);
      party = party.filter(p => p !== pkm);
      updateParty();
      updateBoxes();
    };

    list.appendChild(li);
  });
}

// ---------- BOXES ----------
function updateBoxes() {
  const list = document.getElementById("boxList");
  list.innerHTML = "";

  boxes.forEach(pkm => {
    const li = document.createElement("li");
    li.textContent = pkm;

    li.onclick = () => {
      if (party.length >= 6) {
        alert("Party is full!");
        return;
      }
      party.push(pkm);
      boxes = boxes.filter(p => p !== pkm);
      updateParty();
      updateBoxes();
    };

    list.appendChild(li);
  });
}
