document.addEventListener("DOMContentLoaded", () => {
  console.log("game.js running");

  let party = [];
  let boxes = [];
  let pokeballs = 5;
  let money = 3000;
  let currentWild = null;

  // 🔧 SHINY SETTINGS
  // CHANGE THIS TO false AFTER YOU SEE SHINIES
  const SHINY_TEST_MODE = false;

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
        "Great choice! You received 5 Pokéballs!";
      document.querySelectorAll(".starterBtn").forEach(b => b.style.display = "none");
      document.getElementById("exploreBtn").style.display = "inline-block";
      updateUI();
      updateParty();
    };
  });

  // ---------- RANDOM POKÉMON ----------
  function getRandomPokemon() {
    const base = POKEMON[Math.floor(Math.random() * POKEMON.length)];

    let shiny;
    if (SHINY_TEST_MODE) {
      shiny = Math.random() < 0.5; // 50% for testing
    } else {
      shiny = Math.random() < (1 / 512); // real odds
    }

    console.log("Spawned:", base.name, "Shiny:", shiny);

    return {
      name: base.name,
      catchRate: base.catchRate,
      shiny
    };
  }

  // ---------- EXPLORE ----------
  document.getElementById("exploreBtn").onclick = () => {
    if (pokeballs <= 0) {
      document.getElementById("result").textContent = "No Pokéballs left!";
      return;
    }

    currentWild = getRandomPokemon();

    document.getElementById("result").textContent =
      `A wild ${currentWild.name}${currentWild.shiny ? " ✨SHINY✨" : ""} appeared!`;

    document.getElementById("catchBtn").style.display = "inline-block";
  };

  // ---------- CATCH ----------
  document.getElementById("catchBtn").onclick = () => {
    if (!currentWild) return;

    pokeballs--;

   // Poké Ball modifier (Poké Ball = 1.0)
const ballBonus = 1.0;

// Add difficulty randomness
const baseChance = currentWild.catchRate / 255;
const finalChance = baseChance * ballBonus * (0.5 + Math.random() * 0.5);

const success = Math.random() < finalChance;
    const displayName = currentWild.shiny
      ? `${currentWild.name} ✨SHINY✨`
      : currentWild.name;

    if (success) {
      if (party.length < 6) party.push(displayName);
      else boxes.push(displayName);

      document.getElementById("result").textContent =
        `Gotcha! ${displayName} was caught!`;
    } else {
      document.getElementById("result").textContent =
        `${displayName} escaped!`;
    }

    currentWild = null;
    document.getElementById("catchBtn").style.display = "none";
    updateParty();
    updateBoxes();
    updateUI();
  };

  // ---------- SHOP ----------
  document.getElementById("buyBallBtn").onclick = () => {
    if (money < 200) {
      alert("Not enough money!");
      return;
    }
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
        if (party.length >= 6) {
          alert("Party full!");
          return;
        }
        party.push(p);
        boxes = boxes.filter(x => x !== p);
        updateParty();
        updateBoxes();
      };
      list.appendChild(li);
    });
  }

  updateUI();
});
