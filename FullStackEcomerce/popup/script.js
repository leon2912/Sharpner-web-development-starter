const openbtn = document.getElementById("open");
const closebtn = document.getElementById("close");
const container = document.getElementById("container");

openbtn.addEventListener("click", () => {
    container.classList.toggle('active');
});

closebtn.addEventListener("click", () => {
    container.classList.toggle('active');
});

