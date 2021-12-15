let dataFetched = [];

const inputFirstName = document.getElementById("firstName");
const inputLastName = document.getElementById("lastName");
const inputEmail = document.getElementById("email");
const inputPassword = document.getElementById("password");
const inputConfirmPassword = document.getElementById("rptPassword");
const inputDiscord = document.getElementById("discord");

const submitBtn = document.getElementById("submit");
const cancelBtn = document.getElementById("cancel");

// --- FETCH GET DATA USERS ---
const fetchGetRecettes = async () => {
    await fetch("http://localhost:3555/get-users")
        .then((res) => res.json())
        .then((res) => (dataFetched = [...res]));
    console.log(dataFetched);
};

// SUBMIT BTN : FETCH POST REGISTER
submitBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    console.log("submit btn clicked");
    if (inputFirstName.value !== "" && inputLastName.value !== "" && inputEmail.value !== "" && inputPassword.value !== "" && inputConfirmPassword.value !== "" && inputDiscord.value !== "") {
        await fetch(`http://localhost:3555/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "email": inputEmail.value,
                "password": inputPassword.value,
                "first_name": inputFirstName.value,
                "last_name": inputLastName.value,
                "account_type": "Apprenant",
                "discord": inputDiscord.value,
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