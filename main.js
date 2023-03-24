import LinearEquation from "./linearEquation.js";

const submitBtn = document.querySelector("#submitBtn");
const clearBtn = document.querySelector("#clearBtn");
const questionInput = document.querySelector("#question");
const responsesContainer = document.querySelector("#responses");

submitBtn.addEventListener("click", (e) => {
    e.preventDefault();

    try {
        const question = questionInput.value;
        responsesContainer.innerHTML = "";
        const solver = new LinearEquation(
            question.toLowerCase(),
            responsesContainer
        );
        solver.solve(question);
    } catch (error) {
        console.log("Error:", error);
        displayError(error.message, responsesContainer);
    }
});

clearBtn.addEventListener("click", (e) => {
    e.preventDefault();
    questionInput.value = "";
    responsesContainer.innerHTML =
        "<li class='step'>Type an equation in the box above...</li>";
});

function displayError(message, errorMessages) {
    const error = document.createElement("li");
    error.className = "step error";
    error.textContent = message;

    errorMessages.appendChild(error);
}

export default LinearEquation;
