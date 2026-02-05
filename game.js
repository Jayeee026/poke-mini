document.getElementById("exploreBtn").onclick = function () {
  // Pick a random Pokémon from the list
  const randomIndex = Math.floor(Math.random() * POKEMON.length);
  const found = POKEMON[randomIndex];

  // Display its name
  document.getElementById("result").textContent =
    "A wild " + found.name + " appeared!";

  // Optional: see rarity in console for debugging
  console.log("Rarity:", found.rarity);
};
