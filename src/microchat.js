import { api } from "./api.js";

api.entities.self.get()
.then(response => response.json())
.then(({response: selfInfo, error: error}) => {
    if (response) {
        fillSelfInfo(selfInfo);
    } else {
        showLoginPopup();
    }
})

function fillSelfInfo({title: title, avatar: avatar, ...info}) {
    localStorage.setItem("self_title", {})
}

function showLoginPopup() {
    document.getElementById("login-popup").hidden = false;
}

const state = {}
