import About from "./components/About.js";
import Home from "./components/Home.js";

const $app = document.querySelector(".App"); // $ 는 아이디나 태그 값같이 단일한 변수를 표현할때 사용

const routes = {
	"/": Home,
	"/about": About,
};

$app.innerHTML = routes["/"].template();

export const changeUrl = (requestdUrl) => {
	history.pushState(null, null, requestdUrl);
	$app.innerHTML = routes[requestdUrl].template();
};

window.addEventListener("click", (e) => {
	if (e.target.classList.contains("moveToAboutPageBtn")) {
		changeUrl("/about");
	} else if (e.target.classList.contains("moveToHomePageBtn")) {
		changeUrl("/");
	}
});

window.addEventListener("popstate", () => {
	changeUrl(window.location.pathname);
})