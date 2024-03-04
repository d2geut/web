import AbstractComponent from "./AbstractComponent.js";

const GAMEROOM_KEY = "gameroom";

let gameRooms = [];

export default class extends AbstractComponent {
	constructor() {
		super();
		this.setTitle("Lobby");
	}

	async getHtml() {
		return `
		<!-- Modal -->
		<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<h1 class="modal-title fs-5" id="exampleModalLabel">방 만들기</h1>
						<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
					</div>
					<div class="modal-body">
						<form>
							<div class="mb-3">
								<label for="title-name" class="col-form-label">TITLE</label>
								<input type="text" class="form-control" id="title-name" placeholder="방 타이틀을 입력하세요.">
							</div>
							<div class="row">
								<div class="col">
										<div class="form-check">
											<input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" checked>
											<label class="form-check-label" for="flexRadioDefault1">
												EASY
											</label>
										</div>
										<div class="form-check">
											<input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2">
											<label class="form-check-label" for="flexRadioDefault2">
												NORMAL
											</label>
										</div>
										<div class="form-check">
											<input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault3">
											<label class="form-check-label" for="flexRadioDefault3">
												HARD
											</label>
										</div>
								</div>
								<div class="col">
										<div class="form-check">
											<input class="form-check-input" type="radio" name="flexRadioHC" id="flexRadioHC1" checked>
											<label class="form-check-label" for="flexRadioHC1">
												1:1
											</label>
										</div>
										<div class="form-check">
											<input class="form-check-input" type="radio" name="flexRadioHC" id="flexRadioHC2">
											<label class="form-check-label" for="flexRadioHC2">
												4인 토너먼트
											</label>
										</div>
								</div>
							</div>
						</form>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-primary" data-bs-dismiss="modal" id="gameroom-save">Save changes</button>
					</div>
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col">
				<button type="button" class="btn btn-outline-dark" id="tab-reload">
					<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-arrow-clockwise" viewBox="0 0 16 16">
					<path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z"/>
					<path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466"/>
					</svg>
				</button>
				<div class="list-group" id="list-tab" role="tablist">
					<!-- list item example -->
					<a class="list-group-item list-group-item-action" id="list-home-list" data-bs-toggle="list" href="#list-home" role="tab" aria-controls="list-home">Home</a>
					<a class="list-group-item list-group-item-action" id="list-profile-list" data-bs-toggle="list" href="#list-profile" role="tab" aria-controls="list-profile">Profile</a>
					<a class="list-group-item list-group-item-action" id="list-messages-list" data-bs-toggle="list" href="#list-messages" role="tab" aria-controls="list-messages">Messages</a>
					<a class="list-group-item list-group-item-action" id="list-settings-list" data-bs-toggle="list" href="#list-settings" role="tab" aria-controls="list-settings">Settings</a>
				</div>
			</div>
			<div class="col">
				<div class="tab-content" id="nav-tabContent">
					<!-- list item example -->
					<div class="tab-pane fade" id="list-home" role="tabpanel" aria-labelledby="list-home-list">homehomehome</div>
					<div class="tab-pane fade" id="list-profile" role="tabpanel" aria-labelledby="list-profile-list">profileprofileprofile</div>
					<div class="tab-pane fade" id="list-messages" role="tabpanel" aria-labelledby="list-messages-list">messagesmessagesmessages</div>
					<div class="tab-pane fade" id="list-settings" role="tabpanel" aria-labelledby="list-settings-list">settingssettingssettings</div>
				</div>
				<button type="button" class="btn btn-outline-dark" id="gameroom-enter">방 참가</button>
				<button type="button" class="btn btn-outline-dark" id="gameroom-open" data-bs-toggle="modal" data-bs-target="#exampleModal">방 만들기</button>
			</div>
		</div>
		`;
	}

	/* gameroom {
		id: Date.now();
		name:
		content:
	} */

	setTabList(tabContent) {
		const tabID = tabContent.id;

		const tabItem = document.createElement("a");
		tabItem.setAttribute("class", "list-group-item list-group-item-action");
		tabItem.setAttribute("id", `list-${tabID}-list`);
		tabItem.setAttribute("data-bs-toggle", "list");
		tabItem.setAttribute("href", `#list-${tabID}`);
		tabItem.setAttribute("role", "tab");
		tabItem.setAttribute("aria-controls", `list-${tabID}`);
		tabItem.innerText = tabContent.name;
		const tabPane = document.createElement("div");
		tabPane.setAttribute("class", "tab-pane fade");
		tabPane.setAttribute("id", `list-${tabID}`);
		tabPane.setAttribute("role", "tabpanel");
		tabPane.setAttribute("aria-labelledby", `list-${tabID}-list`);
		tabPane.innerText = tabContent.content;

		document.querySelector('#list-tab').appendChild(tabItem);
		document.querySelector('#nav-tabContent').appendChild(tabPane);
	}

	reloadTabList() {
		document.querySelector('#list-tab').innerHTML = "";
		document.querySelector('#nav-tabContent').innerHTML = "";
		
		const saveTabList = localStorage.getItem(GAMEROOM_KEY);
		
		if (saveTabList !== null) {
			const parsedTabList = JSON.parse(saveTabList);
			parsedTabList.forEach(this.setTabList);
		}
	}

	handleRoute() {
		console.log("lobby handle");
		this.reloadTabList();

		const tabReloadBtn = document.querySelector("#tab-reload");
		tabReloadBtn.addEventListener("click", event => {
			this.reloadTabList();
			console.log("reload btn click");
		})

		const gameRoomEnterBtn = document.querySelector("#gameroom-enter");
		gameRoomEnterBtn.addEventListener("click", event => {
			const selectGameRoom = document.querySelector("[aria-selected='true']");
			console.log(selectGameRoom);
		})

		const gameRoomSaveBtn = document.querySelector("#gameroom-save");
		gameRoomEnterBtn.addEventListener("click", event => {
			const selectGameRoom = document.querySelector("[aria-selected='true']");

			// document.querySelector('#title-name').value
		})
	}
}