// ==UserScript==
// @name         Bloxflip Auto Rain
// @namespace    http://tampermonkey.net/
// @version      1.0.0
// @description  Auto join rain i guesss
// @author       Valentineuh
// @match        https://bloxflip.com/*
// @icon         https://bloxflip.com/favicon.ico
// @license      MIT
// @grant        GM_xmlhttpRequest
// ==/UserScript==

window.addEventListener('load', () => {
    console.log("Script loaded.");

    let raining = false;

    setInterval(async () => {
        let data = await (await fetch('https://api.bloxflip.com/chat/history')).json();
        if (data.rain.active && !raining) {
            console.log("Rain detected!");
            raining = true;
            setTimeout(() => {
                document.querySelector(".chat_chatBannerJoinButton__avNuN").click();
            }, 5000);

        } else if (!data.rain.active && raining) {
            console.log("Rain event ended.");
            raining = false;
        }
    }, 5000);

    setInterval(async () => {
        console.log("Checking balance...");
        const userBalance = document.querySelector('.header_headerUserBalance__mNiaf');
        if (userBalance) {
            const balance = userBalance.querySelector('span').textContent;
            console.log("Balance:", balance);
        } else {
            console.log("User balance element not found.");
        }
    }, 600000);
});
