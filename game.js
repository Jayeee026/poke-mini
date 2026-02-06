let playerStarter = null;

// Starter button logic
const starterButtons = document.querySelectorAll(".starterBtn");

starterButtons.forEach(button => {
  button.onclick = function() {
    // Save starter choice
    playerStarter = button.dataset.starter;

    // Update Oak text
    document.getElementById("oakText").textContent =
      "Great! You chose " + playerStarter + " as your starter! You now have 5 Pokéballs. Go explore and catch Pokémon!";

    // Hide starter buttons
    starterButtons.forEach(btn => btn.style.display = "none");

    // Show Explore button
    document.getElementById("exploreBtn").style.display = "inline-block";

    console.log("Player starter:", playerStarter);
  };
});

// Explore button logic
document.getElementById("exploreBtn").onclick = function () {
  if (!POKEMON || POKEMON.length === 0) {
    alert("POKEMON list not loaded!");
    return;
  }

  // Pick a random Pokémon
  const randomIndex = Math.floor(Math.random() * POKEMON.length);
  const found = POKEMON[randomIndex];

  // Show it on the page
  document.getElementById("result").textContent =
    "A wild " + found.name + " appeared!";

  console.log(found);
};
