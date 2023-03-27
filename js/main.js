const createButtonElement = () => {
  let buttonElement = document.createElement("button");
  buttonElement.className = "btn";
  return buttonElement;
};

const handleURL = () => {
  const url = new URLSearchParams(window.location.search);

  return url.get("page");
};
const handleDisabledElement = (
  value,
  prevSelector,
  limitPrev,
  nextSelector,
  limitNext
) => {
  const prevElement = document.querySelector(prevSelector);
  if (!prevElement) return;

  const nextElement = document.querySelector(nextSelector);
  if (!nextElement) return;
  if (value == limitPrev) {
    prevElement.classList.add("disabled");
  } else {
    prevElement.classList.remove("disabled");
  }
  if (value == limitNext) {
    nextElement.classList.add("disabled");
  } else {
    nextElement.classList.remove("disabled");
  }
};

const handleDataPaginate = ({ event }) => {
  const mainElement = event.target;

  let pageValue = handleURL();
  if (pageValue <= 1 && mainElement.dataset.type == "prev") return;
  if (pageValue >= 10 && mainElement.dataset.type == "next") return;

  if (mainElement.dataset.type == "number") {
    history.pushState({}, "", `?page=${mainElement.textContent}`);
  } else {
    pageValue = handleURL();
    if (mainElement.dataset.type == "prev") {
      history.pushState({}, "", `?page=${+pageValue - 1}`);
    } else {
      history.pushState({}, "", `?page=${+pageValue + 1}`);
    }
  }

  pageValue = handleURL();
  handleDisabledElement(pageValue, "#prev", 1, "#next", 10);
  if (pageValue >= 8) {
    handleUpdateData(".number", [8, 9, 10]);
  } else {
    handleUpdateData(".number", [+pageValue, +pageValue + 1, +pageValue + 2]);
  }
};
const handleUpdateData = (selector, dataList) => {
  const listElement = document.querySelectorAll(selector);
  if (!listElement) return;

  listElement.forEach((e, i) => {
    e.textContent = dataList[i];
  });
};

const handleButtonClick = (selector) => {
  const boxElement = document.getElementById(selector);
  if (!boxElement) return;

  boxElement.addEventListener("click", (event) => {
    if (!event.target.matches(".btn") && !event.target.matches(".navigate")) {
      return;
    }
    handleDataPaginate({ event });
  });
};
(() => {
  const pageValue = handleURL();
  if (!pageValue || pageValue < 1 || pageValue > 10) {
    history.pushState({}, "", "?page=1");
  }

  handleDisabledElement(pageValue, "#prev", 1, "#next", 10);
  if (pageValue >= 8) {
    handleUpdateData(".number", [8, 9, 10]);
  } else {
    handleUpdateData(".number", [+pageValue, +pageValue + 1, +pageValue + 2]);
  }
  handleButtonClick("box");
})();
