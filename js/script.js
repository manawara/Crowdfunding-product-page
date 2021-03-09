const hamburger = document.querySelector(".hamburger");
const body = document.querySelector("body");
const nav = document.querySelector(".hero-nav");
const buttonProject = document.getElementById("button-project");
const modal = document.querySelector(".modal");
const modalClose = document.querySelector(".modal-close");
const sections = document.querySelectorAll("section");
const modalContent = document.querySelector("#modal-content");
const totalBacked = document.querySelector(".backed-total");
const totalValue = document.querySelector(".backed-value");
const progresBar = document.querySelector(".backed-bar-progress");
const support = document.querySelector(".support");
const buttonSupport = document.querySelector("#button-support");
const buttonReward = document.querySelectorAll("#button-reward");
const bookedButton = document.querySelector(".master svg");

const data = [
  {
    id: 0,
    name: "basic",
    title: "Pledge with no reward",
    pledge: "",
    desciption:
      "Choose to support us without a reward if you simply believe in our project. As a backer, you will be signed up to receive  product updates via email",
    left: "",
  },
  {
    id: 1,
    name: "bamboo",
    title: "Bamboo Stand",
    pledge: "$Pledge $25 or moremboo Stand",
    desciption:
      "You get an ergonomic stand made of natural bamboo. You've helped us launch our promotional campaign, and you’ll be added to a special Backer member list.",
    left: 101,
    value: 25,
  },
  {
    id: 2,
    name: "black",
    title: "Black Edition Stand",
    pledge: "Pledge $75 or more",
    desciption:
      "You get a Black Special Edition computer stand and a personal thank you. You’ll be added to our Backer member list. Shipping is included.",
    left: 64,
    value: 75,
  },

  {
    id: 3,
    name: "mahogany",
    title: "Mahogany Special Edition",
    pledge: "Pledge $200 or more",
    desciption:
      "Mahogany stands, a Backer T-Shirt, and a personal thank you. You’ll be added to our Backer member list. Shipping is included.",
    left: 0,
    value: 200,
  },
];

total = {
  backed: 89914,
  backers: 5007,
  day: 56,
};

// set data website
const setData = (index = "") => {
  const value = total.backed.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  const count = total.backers.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  totalBacked.textContent = count;
  totalValue.textContent = "$" + value;
};

// booked

bookedButton.addEventListener("click", (e) => {
  colorBooked = document.querySelector(".logo-booked");
  if (colorBooked.classList.contains("logo-booked-color")) {
    colorBooked.classList.remove("logo-booked-color");
  } else {
    colorBooked.classList.add("logo-booked-color");
  }
});

// bar set progress
const barProgress = () => {
  const totalCurrent = total.backed;
  const finish = 100000;
  let result = (totalCurrent / finish) * 100;
  result > 100 ? (result = 100) : result;
  progresBar.style.transform = `translateX(${result}%)`;
};

// show & hidden menu mobile version

hamburger.addEventListener("click", (e) => {
  nav.classList.toggle("nav-active");
  hamburger.classList.toggle("hamburger-active");
});

// select reward

const selectReward = (id, e) => {
  const label = document.querySelectorAll("input[type='radio']");
  label[id + 1].checked = true;
  modal.classList.toggle("modal-active");
  modal.scrollIntoView(true);
  sections.forEach((element) => element.classList.toggle("blur"));
};

// show modal

buttonProject.addEventListener("click", (e) => {
  modal.classList.toggle("modal-active");
  sections.forEach((element) => element.classList.toggle("blur"));
});

// choose card in modal

const getButton = () => {
  const button = document.querySelectorAll(".modal-button");
  button.forEach((btn) =>
    btn.addEventListener("click", (e) => addItem(e.target.name))
  );
};

// add items with modal

const addItem = (name) => {
  const input = document.querySelector(`input[name="${name}"]`);
  if (input !== null) {
    const value = input.value;
    total.backed += parseInt(value);
    barProgress();
  }
  support.classList.add("support-active");
  total.backers++;
  setData();
  updateAboutLeft(name);
};

//update
const updateAboutLeft = (name) => {
  const element = data.find((el) => el.name === name);

  if (element.left > 0 && element.left !== null) {
    element.left--;
    const modalLeft = document.querySelectorAll("#modal-left");
    modalLeft[element.id].textContent = element.left;
    const tempElement = element.id - 1;
    const aboutLeft = document.querySelectorAll("#about-left");
    aboutLeft[tempElement].textContent = element.left;
  }
};

//hidden modal

modalClose.addEventListener("click", (e) => {
  modal.classList.toggle("modal-active");
  sections.forEach((element) => element.classList.toggle("blur"));
});

// hidden support

buttonSupport.addEventListener("click", () =>
  support.classList.remove("support-active")
);

// create modal

const createModal = (el, index) => {
  const label = document.createElement("label");
  label.innerHTML = `
  <input type="radio" name="radio" />
  <div class="card grid-2 bc-gray mx-0">
    <div class="head">
      <span class="checkbox">
        <span class="checkbox-circle"></span>
      </span>
      <div>
        <h3>${el.title}</h3>
        <span class="text-green text-bold">${el.pledge}</span>
      </div>
    </div>
    <p class="modal-text my-2">${el.desciption}</p>
    <div class="about-left"  >
      <span class="xl text-bold text-black" id="modal-left">${el.left}</span>
      <span>${index > 0 ? "left" : ""} </span>
    </div>
    <div class="pledge flex my-2">
       <p class="my-2">${index > 0 ? "Enter your pledge" : ""}</p>
       <div>
        ${
          index > 0
            ? `<input type="number" value=${el.value} class="pledge-input btn-outline" name=${el.name}  />`
            : ""
        }
        <button  class="btn modal-button" name="${el.name}" 
        ${el.left === 0 ? "disabled='disabled'" : ""}>Continue</button>
      </div>
    </div>
  </div>
    `;

  modalContent.appendChild(label);
};

const init = () => {
  // initial
  data.forEach((el, index) => createModal(el, index));
  buttonReward.forEach((el, index) =>
    el.addEventListener("click", (e) => selectReward(index, e))
  );
  getButton();
  setData();
  barProgress();
};

init();
