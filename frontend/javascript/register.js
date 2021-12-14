const inputFirstName = document.getElementById("firstName");
const inputLastName = document.getElementById("lastName");
const inputEmail = document.getElementById("email");
const inputPassword = document.getElementById("password");
const inputConfirmPassword = document.getElementById("rptPassword");
const inputDiscord = document.getElementById("discord");

const submitBtn = document.getElementById("submit");
const cancelBtn = document.getElementById("cancel");



// SUBMIT BTN : FETCH POST REGISTER
submitBtn.addEventListener("click", async (e) => {
    e.preventDefault();

    if (inputFirstName.value !== "" && inputLastName.value !== "" && inputEmail.value !== "" && inputPassword.value !== "" && inputConfirmPassword.value !== "" && inputDiscord.value !== "") {
        await fetch(`https://localhost:3555/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                firstName: inputFirstName.value,
                lastName: inputLastName.value,
                email: inputEmail.value,
                password: inputPassword.value,
                discord: inputDiscord.value,
            }),
        })
            .then(() => {
                console.log("data envoyée au Router avec succes: POST register");
            })
            .catch((err) => console.log(err));
    } else {
        alert("Please complete all fields");
    }
});