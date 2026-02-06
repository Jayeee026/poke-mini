document.addEventListener("DOMContentLoaded", () => {

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
        "Great choice! You received 5 Pokéballs and ₽3000!";

      document.querySelectorAll(".starterBtn").forEach(b => b.style.display = "none");
      document.getElementById("exploreBtn").style.display = "inline-block";

      updateUI();
      updateParty();
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
    let pool = [];
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
      document.getElementById("result").textContent = "No Pokéballs left!";
      return;
    }

    currentWild = getRandomPokemon();
    document.getElementById("result").textContent =
      `A wild ${currentWild.name} appeared!`;

    document.getElementById("catchBtn").style.display = "inline-block";
  };

  // ---------- CATCH ----------
  document.getElementById("catchBtn").onclick = () => {
    if (!currentWild) return;

    pokeballs--;

    const success = Math.random() < (currentWild.catchRate / 255);

    if (success) {
      if (party.length < 6) party.push(currentWild.name);
      else boxes.push(currentWild.name);

      money += 200; // reward for catching

      document.getElementById("result").textContent =
        `Gotcha! ${currentWild.name} was caught! (+₽200)`;
    } else {
      document.getElementById("result").textContent =
        `${currentWild.name} escaped!`;
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
    pokeballs += 1;
    updateUI();
  };

  // ---------- UI ----------
  function updateUI() {
    document.getElementById("pokeballText").textContent =
      `Pokéballs: ${pokeballs}`;
    document.getElementById("moneyText").textContent =
      `Money: ₽${money}`;
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
        if (party.length >= 6) return alert("Party full!");
        party.push(p);
        boxes = boxes.filter(x => x !== p);
        updateParty();
        updateBoxes();
      };
      list.appendChild(li);
    });
  }

});
