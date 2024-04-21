// ==UserScript==
// @name         Bloxflip Auto Rain
// @namespace    http://tampermonkey.net/
// @version      1.0.0
// @description  Notifies about rain and join i guesssss
// @author       Valentineuh
// @match        https://bloxflip.com/*
// @icon         https://bloxflip.com/favicon.ico
// @license      MIT
// @grant        GM_xmlhttpRequest
// ==/UserScript==

window.addEventListener('load', () => {
    console.log(Notification.permission);
    if (Notification.permission !== "granted" && Notification.permission !== "denied") {
        alert("Enable notifications for Bloxflip to get rain alerts.");
        Notification.requestPermission().then(console.log);
    }

    const notify = (title, msg) => {
        new Notification(title, { body: msg });
    };

    let raining = false;

    setInterval(async () => {
        let data = await (await fetch('https://api.bloxflip.com/chat/history')).json();
        if (data.rain.active && !raining) {
            notify("Bloxflip Rain", "A rain event is happening now!");
            raining = true;
            setTimeout(() => {
                document.querySelector(".chat_chatBannerJoinButton__avNuN").click();
            }, 5000);
        } else if (!data.rain.active && raining) {
            raining = false;
        }
    }, 5000);
});
