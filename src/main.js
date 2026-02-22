let toggled = false;

// нажатие на ссылку
const toggleBtn = document.getElementById("pressme");
const svgCircle = document.getElementById("svgCircle");

toggleBtn.addEventListener("click", (e) => {
  toggled = !toggled;
  if (toggled) svgCircle.classList.add("active");
  else svgCircle.classList.remove("active");
});
