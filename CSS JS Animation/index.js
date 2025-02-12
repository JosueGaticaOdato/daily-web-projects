let container = document.querySelector(".container")
for (let i = 1; i <= 60; i++){
  let dot = document.createElement("div")
  dot.classList.add("dot")
  dot.style.setProperty("--i",i)
  container.appendChild(dot);
}