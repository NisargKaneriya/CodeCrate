// Grab the elements from DOM
const logoutBtns = document.querySelectorAll(".logout-btn");

// Add the event to handle the login
logoutBtns.forEach((logoutBtn) => {
	logoutBtn.addEventListener("click", async (e) => {
		try {
			// get a response from server
			const res = await fetch("/api/auth/logout", {
				method: "POST",
			});

			// convert the data from server into JSON format
			const data = await res.json();

			// Check if the response is a limit error
			if (res.status === 429) {
				createToast("error", "Too many requests", "Wait before trying again.");
				return;
			}

			// Check if the response is not ok (or have errors)
			if (!res.ok) {
				createToast("warning", data.message, "Please try again later.");
				return;
			} else if (res.ok) {
				// clear the local localStorage
				localStorage.removeItem("userData");
				// Store the toast message in localStorage
				localStorage.setItem(
					"toastMessage",
					JSON.stringify({
						type: "success",
						title: "Logout successful",
						text: "You are logged out.",
					})
				);
				// Redirect to home page
				window.location.href = "/";
			}
		} catch (error) {
			console.error("Logout failed: ", error.message);
		}
	});
});
