# Ruijie Captive Portal Voucher Brute-Force Tool

## Overview

Welcome to the **Ruijie Captive Portal Voucher Brute-Force Tool** project! This tool helps security researchers and network administrators test the strength of voucher-based authentication on Ruijie captive portals.

> **Note:** This project is intended for ethical use only. Always obtain proper authorization before testing any network.

---

This project is a Tampermonkey userscript designed to automate brute-force attacks against the voucher login page of the Ruijie captive portal (`portal-as.ruijienetworks.com`). The Ruijie captive portal is commonly used in public Wi-Fi environments (such as schools, hotels, and cafes) to restrict internet access until a valid voucher code is entered.

## How It Works

- The script systematically attempts all possible 6-digit voucher codes.
- It uses browser `localStorage` to remember the last code tried, allowing it to resume after reloads or interruptions.
- If a valid code is found, the script alerts the user.
- The script can detect session timeouts and automatically reload the page to continue the attack.

## Usage

1. **Install Tampermonkey** in your browser.
2. **Copy the script** from `brute-force.user.js` into a new Tampermonkey script.
3. **Navigate to the Ruijie captive portal login page**.
4. The script will begin brute-forcing voucher codes automatically.

## About Ruijie Captive Portal

Ruijie Networks provides network equipment and solutions, including captive portal systems for Wi-Fi authentication. The captive portal typically requires users to enter a voucher code to gain internet access. Weak or predictable voucher codes can be vulnerable to brute-force attacks if there are no rate limits or additional security measures.

## Disclaimer

This tool is for educational and authorized penetration testing purposes only. Unauthorized use against networks you do not own or have explicit permission to test is illegal and unethical.

## Files

- `brute-force.user.js` — Main Tampermonkey userscript.
- `README.md` — Project documentation.
