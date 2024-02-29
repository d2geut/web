import AbstractComponent from "./AbstractComponent.js";

export default class extends AbstractComponent {
	constructor() {
		super();
		this.setTitle("Friend");
	}

	async getHtml() {
		return `
		<h1>Friend Page</h1>
		<p>This is Friend page.</p>
		`;
	}
}