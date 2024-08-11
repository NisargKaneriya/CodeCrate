// Get the elements from the DOM
const toggleBtn = document.querySelector("#toggle-theme");

// Function to toggle theme
toggleBtn.addEventListener("click", () => {
	// Toggle theme
	document.body.classList.toggle("dark");

	// Change icon after a short delay to ensure the animation is visible
	toggleBtn.firstElementChild.setAttribute(
		"name",
		document.body.classList.contains("dark") ? "moon" : "sun"
	);
});
