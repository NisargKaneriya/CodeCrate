// Grab the elements from DOM
const loginForm = document.querySelector("#login-form");

// Add the event to handle the Login form submission
loginForm.addEventListener("submit", async (e) => {
	// avoid default refresh behavior
	e.preventDefault();

	// Get the user credentials
	const userData = {
		email: loginForm.email.value,
		password: loginForm.password.value,
	};

	// Validate the credentials before signing up
	const isValid = validateLoginCredentials(userData);
	if (!isValid) {
		return;
	}

	// perform the Login operation
	try {
		await handleLogin(userData);
	} catch (err) {
		console.error("Login failed.\n", err.message);
	}
});

// function to handle the Login operation
const handleLogin = async (userData) => {
	try {
		// get a response from server
		const res = await fetch("/api/auth/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(userData),
		});

		// convert the data from server into JSON format
		const data = await res.json();

		// Check if the response is a limit error
		if (res.status === 429) {
			createToast("error", "Too many requests.", "Wait before trying again.");
			return;
		}

		// Check if the response is not ok (or have errors)
		if (data && data.success === false) {
			createToast("warning", data.message, data.description);
			return;
		}

		// Store the data in localStorage
		localStorage.setItem("userData", JSON.stringify(data));
		// Store the toast message in localStorage
		localStorage.setItem(
			"toastMessage",
			JSON.stringify({
				type: "success",
				title: "Login successful",
				text: `Logged in as ${data && data.fullName}.`,
			})
		);

		// If the response is successful
		window.location.href = "/";
	} catch (err) {
		console.error("Error : ", err.message);
	}
};

// Function to validate the user credentials before Signup operation
const validateLoginCredentials = (userData) => {
	if (!userData.email || !userData.password) {
		createToast("warning", "All fields are required.", "No fields can be empty.");
		return false;
	}

	return true;
};
