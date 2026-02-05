let playerStarter = null;

// Starter buttons
const starterButtons = document.querySelectorAll(".starterBtn");

starterButtons.forEach(button => {
  button.onclick = function() {
    // Save starter choice
    playerStarter = button.dataset.starter;

    // Show confirmation
    document.getElementById("oakText").textContent =
      "Great! You chose " + playerStarter + " as your starter! You now have 5 Pokéballs. Go explore and catch Pokémon!";

    // Hide starter buttons
    starterButtons.forEach(btn => btn.style.display = "none");

    // Show explore button
    document.getElementById("exploreBtn").style.display = "inline-block";

    console.log("Player starter:", playerStarter);
  };
});

// Explore button logic (unchanged)
document.getElementById("exploreBtn").onclick = function () {
  if (!POKEMON || POKEMON.length === 0) {
    alert("POKEMON list not loaded!");
    return;
  }

  const randomIndex = Math.floor(Math.random() * POKEMON.length);
  const found = POKEMON[randomIndex];

  document.getElementById("result").textContent =
    "A wild " + found.name + " appeared!";

  console.log(found);
};
