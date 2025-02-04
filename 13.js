document.addEventListener("mousemove", (event) => {
	const cube = document.querySelector(".cube");
	const { innerWidth: width } = window;
	const mouseX = event.clientX;
	const maxAngle = 10; // Maximum rotation angle
	const rotationY = Math.max(
		-maxAngle,
		Math.min(maxAngle, ((mouseX / width) * 2 - 1) * maxAngle)
	);
	cube.style.transform = `rotateY(${rotationY}deg)`;
});

const rangeSlider = document.getElementById("zRange");
const zValueText = document.getElementById("zValue");
const body = document.querySelector("body");
let zTranslation = Number(rangeSlider.value);

function updateCubeZ() {
	const numericValue = zTranslation * 12745 + 10000000;
	const formattedValue = new Intl.NumberFormat("en-US").format(numericValue);
	zValueText.textContent = `-${formattedValue} Years`;

	if (numericValue < 20000000 || numericValue > 550000000) {
		zValueText.classList.remove("visible");
		zValueText.classList.add("hidden");
	} else {
		zValueText.classList.remove("hidden");
		zValueText.classList.add("visible");
	}
	body.style.setProperty("--variable-length", `${zTranslation}px`);
}

window.addEventListener("wheel", (e) => {
	zTranslation += e.deltaY * 5;
	zTranslation = Math.max(0, Math.min(50500, zTranslation));
	updateCubeZ();
	isRotating = false;
});

updateCubeZ();

let isRotating = true;
let rotationYValue = 0;

function rotateCube() {
	if (isRotating) {
		const time = Date.now() * 0.001;
		rotationYValue = Math.sin(time * 0.5) * 5;
		const cube = document.querySelector(".cube");
		cube.style.transform = `rotateY(${rotationYValue}deg)`;
		requestAnimationFrame(rotateCube);
	}
}

rotateCube();

document.addEventListener("DOMContentLoaded", () => {
	const frontMain = document.querySelector(".front.main");

	setTimeout(() => {
		frontMain.classList.add("hidden");
	}, 100);
});

const bottom = document.querySelector(".bottom");
const length = 55000;
const tileSize = 800;
const numTiles = Math.ceil(length / tileSize);

for (let i = 0; i < numTiles; i++) {
	const tile = document.createElement("div");
	tile.className = "tile";
	tile.style.top = `${i * tileSize}px`;
	bottom.appendChild(tile);
}
