import AbstractComponent from "./AbstractComponent.js";

export default class extends AbstractComponent {
	constructor() {
		super();
	}

	async getHtml() {
		return `
		<nav class="navbar navbar-expand sticky-top" style="background-color: #e3f2fd;">
			<div class="container-fluid">
				<a class="navbar-brand" href="/" data-href="/">TITLE</a>
				<div class="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
					<div class="navbar-nav">
						<a class="nav-link" href="/mypage" data-href="/mypage">MyPage</a>
						<a class="nav-link" href="/friend" data-href="/friend">Friend</a>
					</div>
				</div>
			</div>
		</nav>
		`;
	}
}

/* <h1 data-href="/">TITLE</h1>
	<button class="btn" data-href="/mypage">mypage</button>
	<button class="btn" data-href="/friend">friend</button> */