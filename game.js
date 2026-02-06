let playerStarter = null;
let party = [];
let boxes = [];

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

// --- Explore button logic ---
document.getElementById("exploreBtn").onclick = function() {
  if (!POKEMON || POKEMON.length === 0) {
    alert("POKEMON list not loaded!");
    return;
  }

  const randomIndex = Math.floor(Math.random() * POKEMON.length);
  const found = POKEMON[randomIndex];

  document.getElementById("result").textContent =
    "A wild " + found.name + " appeared!";

  console.log(found);

  // Auto-add to party if less than 6 Pokémon
  if (party.length < 6) {
    party.push(found.name);
    updatePartyList();
  } else {
    boxes.push(found.name);
    updateBoxList();
  }
};

// --- Update Party and Box lists ---
function updatePartyList() {
  const list = document.getElementById("partyList");
  list.innerHTML = "";

  party.forEach((pkm, index) => {
    const li = document.createElement("li");
    li.textContent = pkm;

    // Add click-to-send-to-box functionality
    li.onclick = function() {
      // Move this Pokémon to boxes
      boxes.push(pkm);
      party.splice(index, 1); // remove from party
      updatePartyList();
      updateBoxList();
    };

    list.appendChild(li);
  });
}

function updateBoxList() {
  const list = document.getElementById("boxList");
  list.innerHTML = "";
  boxes.forEach(pkm => {
    const li = document.createElement("li");
    li.textContent = pkm;
    list.appendChild(li);
  });
}
