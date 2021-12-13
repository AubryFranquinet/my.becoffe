let monthIndex = 0;
let dataFetched = [];
let dateToPost = "";

const calendar = document.getElementById("calendar");
const spanMonth = document.getElementById("spanMonth");
const spanYear = document.getElementById("spanYear");
const prevMonthBtn = document.getElementById("prevMonthBtn");
const nextMonthBtn = document.getElementById("nextMonthBtn");

const inputTopic = document.querySelector("#inputTopic");
const inputLearner = document.querySelector("#inputLearner");
const dateUI = document.getElementById("dateUI");
const submitBtn = document.querySelector("#submitBtn");
const cancelBtn = document.querySelector("#cancelBtn");

// ------------ FUNCTIONS ------------
// --- FETCH GET DATA RECETTES ---
const fetchGetRecettes = async () => {
  await fetch("http://localhost:3555/get-all-recettes")
    .then((res) => res.json())
    .then((res) => (dataFetched = [...res]));
  console.log(dataFetched);
};

// --- CREATE CALENDAR ---
const createCalendar = () => {
  calendar.innerHTML = "";

  const currentDate = new Date();
  // console.log(currentDate);
  currentDate.setMonth(currentDate.getMonth() + monthIndex);
  // console.log(currentDate);
  const day = currentDate.getDate();
  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();
  // console.log(day, month, year);

  // SPANS MONTH & YEAR
  spanYear.textContent = year;
  spanMonth.textContent = currentDate.toLocaleDateString("en-us", {
    month: "long",
  });

  // LAST MONTH DAYS DIVS
  let firstDayInMonthIndex = new Date(year, month, 1).getDay();
  if (firstDayInMonthIndex === 0) firstDayInMonthIndex = 7;
  // console.log(firstDayInMonthIndex);
  for (let i = 1; i < firstDayInMonthIndex; i += 1) {
    calendar.innerHTML += `<div></div>`;
  }

  // CURRENT MONTH DAYS DIVS
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  // console.log(daysInMonth);
  for (let i = 1; i <= daysInMonth; i += 1) {
    const dateRecette = dataFetched.find(
      (recette) =>
        new Date(recette.date).getTime() === new Date(year, month, i).getTime()
    );
    // console.log(dateRecette);
    if (dateRecette !== undefined) {
      calendar.innerHTML += `<div class="calendarTile">${i} <br> ${dateRecette.topic} <br> ${dateRecette.learner} </div>`;
    } else {
      calendar.innerHTML += `<div class="calendarTile">${i}</div>`;
    }
  }

  // CLICK-EVENT ON CURRENT MONTH DAYS DIVS
  document.querySelectorAll(".calendarTile").forEach((day) => {
    day.addEventListener("click", (e) => {
      if (e.target.textContent.length > 2) {
        console.log("Affiche fenetre avec les infos de cette recette");
      } else {
        dateToPost = `${year}-${month + 1}-${e.target.textContent}`;
        dateUI.textContent = `${e.target.textContent}/${month + 1}/${year}`;
        document.getElementById("postRecetteForm").classList.remove("hidden");
      }
    });
  });
};

// --- INITIALISATION FETCH & CALENDAR ---
const initialisation = async () => {
  await fetchGetRecettes();
  createCalendar();
};
initialisation();

// ------------ EVENTS LISTENERS ------------
// MONTHS NAV BTNS
prevMonthBtn.addEventListener("click", () => {
  monthIndex -= 1;
  createCalendar();
});
nextMonthBtn.addEventListener("click", () => {
  monthIndex += 1;
  createCalendar();
});

// SUBMIT BTN : FETCH POST RECETTE
submitBtn.addEventListener("click", async (e) => {
  e.preventDefault();

  if (inputLearner.value !== "" && inputTopic.value !== "") {
    await fetch(`http://localhost:3555/add-recette`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        learnerName: inputLearner.value,
        topicName: inputTopic.value,
        recetteDate: dateToPost,
      }),
    })
      .then(() => {
        console.log("data envoyée au Router avec succes: POST add-recette");
      })
      .catch((err) => console.log(err));

    initialisation();
    document.getElementById("postRecetteForm").classList.add("hidden");
    inputLearner.value = "";
    inputTopic.value = "";
  } else {
    alert("Please complete all fields");
  }
});

// CANCEL BTN
cancelBtn.addEventListener("click", (e) => {
  e.preventDefault();
  document.getElementById("postRecetteForm").classList.add("hidden");
  inputLearner.value = "";
  inputTopic.value = "";
});
