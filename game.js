document.getElementById("exploreBtn").onclick = function () {
  // Make sure POKEMON exists
  if (!POKEMON || POKEMON.length === 0) {
    alert("POKEMON list not loaded!");
    return;
  }

  // Pick a random Pokémon
  const randomIndex = Math.floor(Math.random() * POKEMON.length);
  const found = POKEMON[randomIndex];

  // Display its name
  document.getElementById("result").textContent =
    "A wild " + found.name + " appeared!";

  console.log(found); // Check browser console
};
