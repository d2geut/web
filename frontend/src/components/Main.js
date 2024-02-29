import AbstractComponent from "./AbstractComponent.js";

export default class extends AbstractComponent {
	constructor() {
		super();
		this.setTitle("Main");
	}

	async getHtml() {
		return `
		<h1>Welcome!</h1>
		<p>This is Main page.</p>
		<button class="btn" data-href="/local">LOCAL</button>
		<button class="btn" data-href="/lobby">ONLINE</button>
		`;
	}
}