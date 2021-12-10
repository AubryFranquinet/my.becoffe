const submitBtn = document.querySelector("#submitBtn");

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const inputTopic = document.querySelector("#inputTopic").value;
  const inputLearner = document.querySelector("#inputLearner").value;
  const inputDate = document.querySelector("#inputDate").value;

  if (inputDate !== "" && inputLearner !== "" && inputTopic !== "") {
    console.log(inputTopic, inputLearner, inputDate);

    fetch(`http://localhost:5000/add-recette`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        learnerName: inputLearner,
        topicName: inputTopic,
        recetteDate: inputDate,
      }),
    })
      .then(() => {
        console.log("data envoyée: POST add-recette");
      })
      .catch((err) => console.log(err));
  }
});
