// Grab the elements from DOM
const signUpForm = document.querySelector("#signup-form");

// Add the event to handle the Signup form submission
signUpForm.addEventListener("submit", async (e) => {
	// avoid default refresh behavior
	e.preventDefault();

	// Get the user credentials
	const userData = {
		fullName: signUpForm.fullName.value,
		email: signUpForm.email.value,
		password: signUpForm.password.value,
		cnfmPassword: signUpForm.cnfmPassword.value,
	};

	// Validate the credentials before signing up
	const isValid = validateSignupCredentials(userData);
	if (!isValid) {
		return;
	}

	// perform the Signup operation
	try {
		await handleSignup(userData);
	} catch (err) {
		createToast("error", "Internal error", "Please try again later.");
		console.error("Signup failed : ", err.message);
	}
});

// Fucntion to handle the Logging of the user
const handleSignup = async (userData) => {
	try {
		// get a response from server
		const res = await fetch("/api/auth/signup", {
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
			createToast("error", "Too many requests", "Wait before trying again.");
			return;
		}

		// Check if the response is not ok (or have errors)
		if (data && data.success === false) {
			createToast("warning", data.message, data.description);
			return;
		}

		// Store the toast message in localStorage
		localStorage.setItem(
			"toastMessage",
			JSON.stringify({
				type: "success",
				title: "Signup successful",
				text: "Please Log in to verify.",
			})
		);
		// Redirect to home page
		window.location.href = "/api/auth/login";
	} catch (err) {
		console.error("Error : ", err.message);
	}
};


// Function to validate the user credentials before Signup operation
const validateSignupCredentials = (userData) => {
	if (
		!userData.fullName ||
		!userData.email ||
		!userData.password ||
		!userData.cnfmPassword
	) {
		createToast("warning", "All fields are required.", "No fields can be empty.");
		return false;
	}

	if (userData.password != userData.cnfmPassword) {
		createToast("warning", "Password mismatch", "Both passwords must be same.");
		return false;
	}

	return true;
};
