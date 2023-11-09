const searchButton = document.getElementById("searchDomain");

searchButton.addEventListener('click', function(){
    searchDomain();
})

function searchDomain() {
    var dropdown = document.getElementById("domainList");
    var selectedValue = dropdown.options[dropdown.selectedIndex].value;
    var domainName = document.getElementById("domainField").value;

    var modalContent = document.getElementById("modalContent");

    if (selectedValue !== "") {
      modalContent.innerHTML = `${domainName}.${selectedValue}<br /> ist leider schon vergeben.`;
      openModal();
    if(domainName == "")
        modalContent.innerHTML = "Bitte gib einen Domainnamen an."
    } else {
      modalContent.innerText = "Bitte wähle eine Domain-Endung aus.";
      openModal();
    }
}

function openModal() {
    var modal = document.getElementById("modal");
    var button = document.getElementById("searchDomain");
    var rect = button.getBoundingClientRect();
    
    modal.style.top = rect.bottom + window.scrollY + "px";
    modal.style.left = rect.left + window.scrollX + "px";

    modal.style.display = "block";
}

function closeModal() {
    var modal = document.getElementById("modal");
    modal.style.display = "none";
}