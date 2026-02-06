document.getElementById("exploreBtn").onclick = function() {
  if (!POKEMON || POKEMON.length === 0) {
    alert("POKEMON list not loaded!");
    return;
  }

  // Rarity chances
  const rarityChances = {
    common: 0.6,
    uncommon: 0.25,
    rare: 0.1,
    legendary: 0.05
  };

  let found = null;

  // Keep trying until we pick one that passes the chance
  while (!found) {
    const randomIndex = Math.floor(Math.random() * POKEMON.length);
    const candidate = POKEMON[randomIndex];
    const chance = rarityChances[candidate.rarity] || 0;

    if (Math.random() < chance) {
      found = candidate;
    }
  }

  document.getElementById("result").textContent =
    "A wild " + found.name + " appeared!";

  console.log("Found Pokémon:", found);

  // Auto-add to Party/Box
  if (party.length < 6) {
    party.push(found.name);
    updatePartyList();
  } else {
    boxes.push(found.name);
    updateBoxList();
  }
};
