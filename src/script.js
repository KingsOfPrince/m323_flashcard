const container = document.querySelector('.container');
const addQuestionCard = document.getElementById('add-question-card');
const cardButton = document.getElementById('save-btn');
const question = document.getElementById('question');
const answer = document.getElementById('answer');
const errorMessage = document.getElementById('error');
const addQuestion = document.getElementById('add-flashcard');
const closeBtn = document.getElementById('close-btn');
let editBool = false;

// Show Create flashcard Card when user clicks 'Add Flashcard' button
addQuestion.addEventListener('click', () => {
  container.classList.add('hide');
  question.value = '';
  answer.value = '';
  addQuestionCard.classList.remove('hide');
});

// Hide Create flashcard Card
closeBtn.addEventListener('click', (hideQuestion = () => {
  container.classList.remove('hide');
  addQuestionCard.classList.add('hide');
  if (editBool) {
    editBool = false;
    submitQuestion();
  }
}));

//Submit Question
cardButton.addEventListener('click', (submitQuestion = () => {
  editBool = false;
  tempQuestion = question.value.trim();
  tempAnswer = answer.value.trim();
  if (!tempQuestion || !tempAnswer) {
    errorMessage.classList.remove('hide');
  } else {
    container.classList.remove('hide');
    errorMessage.classList.add('hide');
    viewlist();
    question.value = '';
    answer.value = '';
  }
}));


//Card Generate
function viewlist() {
  const listCard = document.getElementsByClassName("card-list-container");

  // Create the card container
  const div = document.createElement("div");
  div.classList.add("card");

  // Question
  const questionDiv = document.createElement("p");
  questionDiv.classList.add("question-div");
  questionDiv.innerText = question.value;

  // Answer
  const answerDiv = document.createElement("p");
  answerDiv.classList.add("answer-div", "hide");
  answerDiv.innerText = answer.value;

  // Link to show/hide answer
  const link = document.createElement("a");
  link.setAttribute("href", "#");
  link.setAttribute("class", "show-hide-btn");
  link.innerHTML = "Show/Close";
  link.addEventListener("click", () => {
    answerDiv.classList.toggle("hide");
  });

  // Append everything to the card container
  div.appendChild(questionDiv);
  div.appendChild(link);
  div.appendChild(answerDiv);

  // Add the card to the card list
  listCard[0].appendChild(div);

//Edit button
const buttonsCon = document.createElement("div");
buttonsCon.classList.add("buttons-con");
const editButton = document.createElement("button");
editButton.setAttribute("class", "edit");
editButton.innerHTML = `<i class="fa-solid fa-pen-to-square"></i>`;
editButton.addEventListener("click", () => {
  editBool = true;
  modifyElement(editButton, true);
  addQuestionCard.classList.remove("hide");
});
buttonsCon.appendChild(editButton);

//Delete Button
const deleteButton = document.createElement("button");
deleteButton.setAttribute("class", "delete");
deleteButton.innerHTML = `<i class="fa-solid fa-trash-can"></i>`;
deleteButton.addEventListener("click", () => {
  modifyElement(deleteButton);
});
buttonsCon.appendChild(deleteButton);

// Append buttons to the card container
div.appendChild(buttonsCon);

// Add the card to the card list
listCard[0].appendChild(div);

// Hide the question input
hideQuestion();
}
//Modify Elements
const modifyElement = (element, edit = false) => {
  const parentDiv = element.parentElement.parentElement;
  const parentQuestion = parentDiv.querySelector(".question-div").innerText;
  if (edit) {
    const parentAns = parentDiv.querySelector(".answer-div").innerText;
    answer.value = parentAns;
    question.value = parentQuestion;
    disableButtons(true);
  }
  parentDiv.remove();
};

//Disable edit and delete buttons
const disableButtons = (value) => {
  const editButtons = document.getElementsByClassName("edit");
  Array.from(editButtons).forEach((element) => {
    element.disabled = value;
  });
};
