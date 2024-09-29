// Get the elements from the DOM
const profileCard = document.querySelector("#profile-card");
const profileMenu = document.querySelector("#profile-menu");
const signUpBtn = document.querySelector("#signup-btn");
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

// Hide the Signup btn when the user is logged in
// get user data from localStorage and change styling accordingly
if(localStorage.getItem("userData")){
	signUpBtn.style.display = "none";
} else {
	signUpBtn.style.display = "flex";
}