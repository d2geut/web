import Main from "./components/Main.js";
import MyPage from "./components/Mypage.js";
import Friend from "./components/Friend.js";
import NotFound from "./components/NotFound.js";

const routes = [
	{ path: "/", component: Main},
	{ path: "/mypage", component: MyPage},
	{ path: "/friend", component: Friend},
	{ path: "/404", component: NotFound},
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

	const component = new match.route.component();
	document.querySelector("#app").innerHTML = await component.getHtml();
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