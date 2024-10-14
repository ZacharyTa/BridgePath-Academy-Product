export const initializeBubblyEffect = () => {
  const animateCheckbox = (e) => {
    e.preventDefault();
    const target = e.target;
    if (!target.classList.contains("animate")) {
      target.classList.add("animate");
      setTimeout(() => {
        target.classList.remove("animate");
      }, 700);
    }
  };

  const bubblyCheckboxes = document.getElementsByClassName("bubbly-checkbox");

  for (let i = 0; i < bubblyCheckboxes.length; i++) {
    const checkbox = bubblyCheckboxes[i];
    if (!checkbox.dataset.listenerAdded) {
      checkbox.addEventListener(
        "change",
        (e) => {
          const target = e.target;
          if (target.checked) {
            // Changed this line
            animateCheckbox(e);
          }
        },
        false,
      );
      checkbox.dataset.listenerAdded = "true";
    }
  }
};
