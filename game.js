let playerStarter = null;
let party = [];
let boxes = [];

// --- Rarity weights (higher = more common) ---
const rarityWeights = {
  common: 6,
  uncommon: 3,
  rare: 1,
  legendary: 0.1 // very rare
};

// --- Tab logic ---
const tabButtons = document.querySelectorAll(".tabBtn");
const tabSections = document.querySelectorAll(".tabSection");

tabButtons.forEach(btn => {
  btn.onclick = function() {
    const tab = btn.dataset.tab;
    tabSections.forEach(section => {
      section.style.display = section.id === tab ? "block" : "none";
    });
  };
});

// --- Starter selection ---
const starterButtons = document.querySelectorAll(".starterBtn");
starterButtons.forEach(button => {
  button.onclick = function() {
    playerStarter = button.dataset.starter;
    party.push(playerStarter);

    document.getElementById("oakText").textContent =
      "Great! You chose " + playerStarter + " as your starter! You now have 5 Pokéballs. Go explore and catch Pokémon!";

    starterButtons.forEach(btn => btn.style.display = "none");
    document.getElementById("exploreBtn").style.display = "inline-block";

    updatePartyList();
    console.log("Player starter:", playerStarter);
  };
});

// --- Weighted random Pokémon function ---
function getRandomPokemon() {
  const weightedList = [];

  POKEMON.forEach(p => {
    const weight = rarityWeights[p.rarity] || 1;
    const times = Math.ceil(weight * 10); // scale to integer
    for (let i = 0; i < times; i++) {
      weightedList.push(p);
    }
  });

  const randomIndex = Math.floor(Math.random() * weightedList.length);
  return weightedList[randomIndex];
}

// --- Explore button logic ---
document.getElementById("exploreBtn").onclick = function() {
  const found = getRandomPokemon();

  document.getElementById("result").textContent =
    "A wild " + found.name + " appeared!";

  console.log("Found Pokémon:", found);

  // Auto-add to Party if <6, else Boxes
  if (party.length < 6) {
    party.push(found.name);
    updatePartyList();
  } else {
    boxes.push(found.name);
    updateBoxList();
  }
};

// --- Update Party list (click to move to Boxes) ---
function updatePartyList() {
  const list = document.getElementById("partyList");
  list.innerHTML = "";

  party.forEach(pkm => {
    const li = document.createElement("li");
    li.textContent = pkm;

    li.onclick = function() {
      boxes.push(pkm);
      party = party.filter(p => p !== pkm); // remove by name
      updatePartyList();
      updateBoxList();
    };

    list.appendChild(li);
  });
}

// --- Update Boxes list (click to move to Party) ---
function updateBoxList() {
  const list = document.getElementById("boxList");
  list.innerHTML = "";

  boxes.forEach(pkm => {
    const li = document.createElement("li");
    li.textContent = pkm;

    li.onclick = function() {
      if (party.length >= 6) {
        alert("Party is full! You can only have 6 Pokémon.");
        return;
      }
      party.push(pkm);
      boxes = boxes.filter(p => p !== pkm);
      updatePartyList();
      updateBoxList();
    };

    list.appendChild(li);
  });
}
