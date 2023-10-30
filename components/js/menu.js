function navbar() {
    const selectButton = document.getElementById("menuBar");
    if (selectButton.classList.contains("hidden")) {
      selectButton.classList.replace("hidden", "popNav");
    } else {
      selectButton.classList.replace("popNav", "hidden");
    }
  }