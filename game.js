let party = [];
let boxes = [];

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
      `Great choice! ${starter} is now your partner!`;

    document.querySelectorAll(".starterBtn").forEach(b => b.style.display = "none");
    document.getElementById("exploreBtn").style.display = "inline-block";

    updateParty();
  });
});

// ---------- RARITY SYSTEM ----------
const rarityWeights = {
  common: 60,
  uncommon: 25,
  rare: 10,
  legendary: 5
};

function getRandomPokemon() {
  let pool = [];

  POKEMON.forEach(p => {
    for (let i = 0; i < rarityWeights[p.rarity]; i++) {
      pool.push(p);
    }
  });

  return pool[Math.floor(Math.random() * pool.length)];
}

// ---------- EXPLORE ----------
document.getElementById("exploreBtn").addEventListener("click", () => {
  const found = getRandomPokemon();
  document.getElementById("result").textContent =
    `A wild ${found.name} appeared!`;

  if (party.length < 6) {
    party.push(found.name);
  } else {
    boxes.push(found.name);
  }

  updateParty();
  updateBoxes();
});

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
