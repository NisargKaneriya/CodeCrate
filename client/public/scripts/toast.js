let notifications = document.querySelector(".notifications");

function createToast(type, title, text) {
	let newToast = document.createElement("div");

	// Creating and setting the toast icon dynamically based on the type
	let icon = "";
	if (type === "success") icon = "bx bx-check-circle";
	if (type === "error") icon = "bx bxs-error";
	if (type === "warning") icon = "bx bx-error";
	if (type === "info") icon = "bx bx-info-circle";

	newToast.innerHTML = `
        <div class="toast ${type}">
            <i class="${icon}"></i>
            <div class="content">
                <div class="title">${title}</div>
                <span>${text}</span>
            </div>
        </div>`;

	notifications.appendChild(newToast);

	// Automatically remove the toast after it exits (matching animation duration)
	setTimeout(() => {
		newToast.remove();
	}, 5000); // Toast is shown and exits after 5 seconds
}

window.addEventListener("load", () => {
	// Check if there's a toast message in localStorage
	const toastMessage = JSON.parse(localStorage.getItem("toastMessage"));
	if (toastMessage) {
		createToast(toastMessage.type, toastMessage.title, toastMessage.text);
		// Remove the toast message from localStorage after showing it
		localStorage.removeItem("toastMessage");
	}
});
