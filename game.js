document.getElementById("exploreBtn").onclick = function () {
  // Pick a random Pokémon
  const randomIndex = Math.floor(Math.random() * POKEMON.length);
  const found = POKEMON[randomIndex];

  // Show it on the page
  document.getElementById("result").textContent =
    "A wild " + found.name + " appeared!";

  // For now, rarity is just for later mechanics
  console.log("Rarity:", found.rarity);
};
