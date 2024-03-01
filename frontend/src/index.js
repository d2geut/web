import Navbar from "./components/Navbar.js";
import Main from "./components/Main.js";
import Login from "./components/Login.js";
import MyPage from "./components/Mypage.js";
import Friend from "./components/Friend.js";
import NotFound from "./components/NotFound.js";

const routes = [
	{ path: "/", component: [Main, Navbar]},
	{ path: "/login", component: [Login]},
	{ path: "/mypage", component: [MyPage, Navbar]},
	{ path: "/friend", component: [Friend, Navbar]},
	{ path: "/404", component: [NotFound]},
];

const navigateTo = url => {
	history.pushState(null, null, url);
	router();
};

const router = async () => {
	const potentialMatches = routes.map(route => {
		return {
			route: route,
			isMatch: location.pathname === route.path
		};
	});

	let match = potentialMatches.find(potentialMatches => potentialMatches.isMatch);

	if (!match) {
		match = {
			route: routes[routes.length - 1],
			isMatch: true
		}
	}

	const component = new match.route.component[0]();
	document.querySelector("#app").innerHTML = await component.getHtml();
	if (match.route.component[1]) {
		const navbar = new match.route.component[1]();
		if (navbar)
			document.querySelector("#nav").innerHTML = await navbar.getHtml();
	}
	else {
		document.querySelector("#nav").innerHTML = await ``;
	}
}

window.addEventListener("popstate", router);

document.addEventListener("DOMContentLoaded", () => {
	document.body.addEventListener("click", e => {
		if (e.target.dataset.href) {
			e.preventDefault();
			navigateTo(e.target.dataset.href);
		}
	});
});

router();