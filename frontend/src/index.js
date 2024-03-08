import Navbar from "./components/Navbar.js";
import Main from "./components/Main.js";
import Login from "./components/Login.js";
import MyPage from "./components/Mypage.js";
import Users from "./components/Users.js";
import Lobby from "./components/Lobby.js";
import NotFound from "./components/NotFound.js";

const ROUTE_PARAMETER_REGEX = "/:(\w+)/g";
const URL_FRAGMENT_REGEX = '([^\\/]+)';

const routes = [
	{ path: "/", component: [Main, Navbar]},
	{ path: "/login", component: [Login]},
	{ path: "/mypage", component: [MyPage, Navbar]},
	{ path: "/users/:username", component: [Users, Navbar]},
	{ path: "/lobby", component: [Lobby, Navbar]},
	{ path: "/404", component: [NotFound]},
];

const router = async () => {
	const potentialMatches = routes.map(route => {
		return {
			route: route,
			isMatch: location.pathname === route.path,
			result: location.pathname.match(pathToRegex(route.path)),
		};
	});

	let matchresult = potentialMatches.find(potentialMatches => potentialMatches.result);
	console.log(matchresult);

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
		{
			document.querySelector("#nav").innerHTML = await navbar.getHtml();
			navbar.handleRoute();
		}
	}
	else {
		document.querySelector("#nav").innerHTML = await ``;
	}
	console.log("load router");
	component.handleRoute();
}

const navigateTo = url => {
	history.pushState(null, null, url);
	router();
};

const pathToRegex = (path) => {
	new RegExp('^' + path.replace(/\//g, '\\/').replace(/:\w+/g,'(.+)') + '$');
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