// Get the elements from the DOM
const profileCard = document.querySelector("#profile-card");
const profileMenu = document.querySelector("#profile-menu");

// Function to toggle the profile menu
profileCard.addEventListener("click", () => {
	profileMenu.classList.toggle("flex");
});

// close the profile menu on clicking anywhere in screen
document.addEventListener("click", (event) => {
	if (!profileCard.contains(event.target) && !profileMenu.contains(event.target)) {
		profileMenu.classList.remove("flex");
	}
});