let playerStarter = null;
let party = [];
let boxes = [];

// --- Rarity weights ---
const rarityWeights = {
  common: 6,
  uncommon: 3,
  rare: 1,
  legendary: 0.1
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
function initStarterButtons() {
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
}

// Call this once to attach events
initStarterButtons();

// --- Weighted random Pokémon function ---
function getRandomPokemon() {
  const weightedList = [];

  POKEMON.forEach(p => {
    const weight = rarityWeights[p.rarity] || 1;
    const times = Math.ceil(weight * 10); // scale up
    for (let i = 0; i < times; i++) {
      weightedList.push(p);
    }
  });

  const randomIndex = Math.floor(Math.random() * weightedList.length);
  return weightedList[randomIndex];
}

// --- Explore button ---
const exploreBtn = document.getElementById("exploreBtn");
exploreBtn.onclick = function() {
  if (!POKEMON || POKEMON.length === 0) {
    alert("POKEMON list not loaded!");
    return;
  }

  const found = getRandomPokemon();

  document.getElementById("result").textContent =
    "A wild " + found.name + " appeared!";

  console.log("Found Pokémon:", found);

  if (party.length < 6) {
    party.push(found.name);
    updatePartyList();
  } else {
    boxes.push(found.name);
    updateBoxList();
  }
};

// --- Update Party list ---
function updatePartyList() {
  const list = document.getElementById("partyList");
  list.innerHTML = "";

  party.forEach(pkm => {
    const li = document.createElement("li");
    li.textContent = pkm;

    li.onclick = function() {
      boxes.push(pkm);
      party = party.filter(p => p !== pkm);
      updatePartyList();
      updateBoxList();
    };

    list.appendChild(li);
  });
}

// --- Update Boxes list ---
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
