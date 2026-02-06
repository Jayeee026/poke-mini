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

// --- Update Party list with click-to-box ---
function updatePartyList() {
  const list = document.getElementById("partyList");
  list.innerHTML = "";

  party.forEach((pkm, index) => {
    const li = document.createElement("li");
    li.textContent = pkm;

    // Move to Boxes on click
    li.onclick = function() {
      boxes.push(pkm);
      party.splice(index, 1);
      updatePartyList();
      updateBoxList();
    };

    list.appendChild(li);
  });
}

// --- Update Boxes list with click-to-party ---
function updateBoxList() {
  const list = document.getElementById("boxList");
  list.innerHTML = "";

  boxes.forEach((pkm, index) => {
    const li = document.createElement("li");
    li.textContent = pkm;

    // Move back to Party on click
    li.onclick = function() {
      if (party.length >= 6) {
        alert("Party is full! You can only have 6 Pokémon.");
        return;
      }
      party.push(pkm);
      boxes.splice(index, 1);
      updatePartyList();
      updateBoxList();
    };

    list.appendChild(li);
  });
}
