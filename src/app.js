const generateBtn = document.querySelector(".generate-btn");
const playgroundArea = document.querySelector(".playground");
const inputFloor = document.querySelector("#input-floors");
const inputLift = document.querySelector("#input-lifts");
const formCollectingContainer = document.querySelector(".main-container");
const allInputs = document.querySelectorAll(".input");
const errorMessage = document.querySelector(".error");

allInputs.forEach((input) => {
  input.addEventListener("keyup", () => {
    if (inputFloor.value <= 15 && inputLift.value <= 15) {
      generateBtn.disabled = false;
    } else {
      generateBtn.disabled = true;
      errorMessage.innerHTML = `<p>Enter the number of floors between 1 to 15<br></br>
    Enter the number of lifts between 1 to 15</p>`;
      errorMessage.style.color = "red";
    }
  });
});

const generateLiftsAndFloors = (e) => {
  e.preventDefault();
  if (inputFloor.value && inputLift.value) {
    formCollectingContainer.style.display = "none";
    generateFloors();
    generateLifts();
  }
};

const generateLifts = () => {
  let totalLift = Number(inputLift.value);
  for (let i = 0; i < totalLift; i++) {
    const liftsBoxEl = document.createElement("div");
    liftsBoxEl.classList.add("lift");
    liftsBoxEl.setAttribute("data-status", "free");
    liftsBoxEl.setAttribute("data-current", "0");
    const liftLeftDoor = document.createElement("div");
    liftLeftDoor.classList.add("left-door");
    const liftRightDoor = document.createElement("div");
    liftRightDoor.classList.add("right-door");
    liftsBoxEl.appendChild(liftLeftDoor);
    liftsBoxEl.appendChild(liftRightDoor);
    const lifts = document.querySelector("#floor-1");
    lifts.append(liftsBoxEl);
  }
};
const lifts = document.createElement("div");
lifts.className = "liftBox";
const generateFloors = () => {
  let totalFloor = Number(inputFloor.value);
  for (let i = totalFloor; i >= 1; i--) {
    const divEl = document.createElement("div");
    divEl.classList.add("floor");
    const divFlexSides = document.createElement("div");
    divFlexSides.classList.add("flex-sides");
    divEl.appendChild(divFlexSides);
    const divElBtns = document.createElement("div");
    divElBtns.classList.add("btns");
    const btnUp = document.createElement("button");
    btnUp.setAttribute("class", `btn btn-up bttns-up-${i}`);
    btnUp.innerHTML = `<i class="fa-sharp fa-solid fa-caret-up"></i>`;
    btnUp.addEventListener("click", () => {
      handleLifts(i - 1);
    });
    const btnDown = document.createElement("button");
    btnDown.setAttribute("class", `btn btn-down bttns-down-${i}`);
    btnDown.innerHTML = `<i class="fa-sharp fa-solid fa-caret-down"></i>`;
    btnDown.addEventListener("click", () => {
      handleLifts(i - 1);
    });
    divElBtns.appendChild(btnUp);
    divElBtns.appendChild(btnDown);
    divFlexSides.appendChild(divElBtns);

    const floorNumber = document.createElement("h3");
    floorNumber.classList.add("floor-number");
    floorNumber.innerText = `Floor ${i}`;
    divFlexSides.appendChild(floorNumber);

    const lifts = document.createElement("div");
    lifts.setAttribute("class", "liftBox");
    lifts.setAttribute("id", `floor-${i}`);
    divEl.appendChild(lifts);
    playgroundArea.appendChild(divEl);
  }
};

generateBtn.addEventListener("click", generateLiftsAndFloors);

const handleLifts = (position) => {
  const liftsTarget = Array.from(document.querySelectorAll(".lift"));
  if (liftsTarget.find((lift) => lift.dataset.status === "free")) {
    moveLiftsInOrder(position);
  }
};

const moveLiftsInOrder = (pos) => {
  const liftsTarget = Array.from(document.querySelectorAll(".lift"));
  const getLifts = liftsTarget.find((lift) => lift.dataset.status === "free");
  if (Number(getLifts.dataset.current) === pos) {
    doorsOpening(getLifts, pos);
  } else {
    liftMovement(getLifts, pos);
  }
};

const liftMovement = (lift, pos) => {
  lift.setAttribute("data-status", "busy");

  const distance = Math.abs(Number(lift.dataset.current) - pos);

  lift.style.transform = `translateY(-${12.5 * pos}rem)`;
  lift.style.transition = `all ${distance * 2}s linear`;
  doorsOpening(lift, pos);
};

const doorsOpening = (lift, pos) => {
  lift.setAttribute("data-status", "busy");
  const distance = Math.abs(Number(lift.dataset.current) - pos);

  setTimeout(() => {
    lift.childNodes[0].classList.add("left-door--animation");
    lift.children[1].classList.add("right-door--animation");
  }, distance * 2000 + 1000);

  setTimeout(() => {
    lift.childNodes[0].classList.remove("left-door--animation");
    lift.children[1].classList.remove("right-door--animation");
    lift.setAttribute("data-status", "free");
    lift.setAttribute("data-current", pos);
  }, distance * 2000 + 4800);
};
