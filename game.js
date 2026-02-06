let party = [];
let boxes = [];
let pokeballs = 5;
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
      `Great choice! You received 5 Pokéballs!`;

    document.querySelectorAll(".starterBtn").forEach(b => b.style.display = "none");
    document.getElementById("exploreBtn").style.display = "inline-block";

    updateParty();
    updateExploreText();
  };
});

// ---------- RARITY ----------
const rarityWeights = {
  common: 80,
  uncommon: 18,
  rare: 2,
  legendary: 0.2
};

function getRandomPokemon() {
  const pool = [];
  POKEMON.forEach(p => {
    for (let i = 0; i < rarityWeights[p.rarity] * 10; i++) {
      pool.push(p);
    }
  });
  return pool[Math.floor(Math.random() * pool.length)];
}

// ---------- EXPLORE ----------
document.getElementById("exploreBtn").onclick = () => {
  if (pokeballs <= 0) {
    document.getElementById("result").textContent = "You have no Pokéballs!";
    return;
  }

  currentWild = getRandomPokemon();
  document.getElementById("result").textContent =
    `A wild ${currentWild.name} appeared!`;

  document.getElementById("catchBtn").style.display = "inline-block";
};

// ---------- CATCH ----------
document.getElementById("catchBtn").onclick = () => {
  if (!currentWild || pokeballs <= 0) return;

  pokeballs--;

  const chance = currentWild.catchRate / 255;
  const success = Math.random() < chance;

  if (success) {
    if (party.length < 6) {
      party.push(currentWild.name);
    } else {
      boxes.push(currentWild.name);
    }
    document.getElementById("result").textContent =
      `Gotcha! ${currentWild.name} was caught!`;
  } else {
    document.getElementById("result").textContent =
      `${currentWild.name} broke free!`;
  }

  currentWild = null;
  document.getElementById("catchBtn").style.display = "none";

  updateParty();
  updateBoxes();
  updateExploreText();
};

// ---------- UI ----------
function updateExploreText() {
  document.getElementById("exploreBtn").textContent =
    `Explore (Pokéballs: ${pokeballs})`;
}

// ---------- PARTY ----------
function updateParty() {
  const list = document.getElementById("partyList");
  list.innerHTML = "";
  party.forEach(p => {
    const li = document.createElement("li");
    li.textContent = p;
    li.onclick = () => {
      boxes.push(p);
      party = party.filter(x => x !== p);
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
  boxes.forEach(p => {
    const li = document.createElement("li");
    li.textContent = p;
    li.onclick = () => {
      if (party.length >= 6) return alert("Party full!");
      party.push(p);
      boxes = boxes.filter(x => x !== p);
      updateParty();
      updateBoxes();
    };
    list.appendChild(li);
  });
}
