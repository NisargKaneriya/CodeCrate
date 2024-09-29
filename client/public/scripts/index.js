// grab the elements from DOM
const indexMainCont = document.querySelector(".main-cont");

// get user data from localStorage
const userData = JSON.parse(localStorage.getItem("userData")); 
if (userData && userData.fullName) {
	indexMainCont.innerHTML = `<h1>Hello, ${userData.fullName}</h1>`;
} else {
	indexMainCont.innerHTML = `<h1>Hello, User</h1>`;
}
