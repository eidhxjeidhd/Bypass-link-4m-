// ==UserScript==
// @name         Bypass Link4m Auto
// @namespace    http://tampermonkey.net/
// @version      1.2
// @description  Tự động vượt qua link rút gọn Link4m để lấy link gốc
// @author       AI Collaborator
// @match        https://link4m.com/*
// @match        https://*.link4m.co/*
// @grant        GM_addStyle
// @grant        unsafeWindow
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';

    // Tạo giao diện bảng điều khiển nhỏ trên trang
    const panel = document.createElement('div');
    panel.id = 'bypass-control-panel';
    panel.innerHTML = `
        <div style="position: fixed; bottom: 20px; right: 20px; z-index: 999999; background: #1e293b; color: #fff; padding: 12px 16px; border-radius: 10px; box-shadow: 0 4px 15px rgba(0,0,0,0.4); font-family: sans-serif; font-size: 14px;">
            <div style="font-weight: bold; margin-bottom: 8px; color: #38bdf8;">Bypass Link4m Tool</div>
            <div id="bypass-status" style="margin-bottom: 8px; color: #cbd5e1;">Đang chờ kích hoạt...</div>
            <button id="btn-run-bypass" style="background: #3b82f6; color: white; border: none; padding: 6px 12px; border-radius: 6px; cursor: pointer; font-weight: bold;">Chạy Bypass</button>
        </div>
    `;
    document.body.appendChild(panel);

    document.getElementById('btn-run-bypass').addEventListener('click', () => {
        const statusEl = document.getElementById('bypass-status');
        statusEl.textContent = "Đang xử lý vượt link...";

        // Tự động tìm và click các nút tiếp tục / lấy link
        const interval = setInterval(() => {
            const buttons = document.querySelectorAll('button, a.btn, input[type="button"], .get-link');
            buttons.forEach(btn => {
                const text = btn.innerText || btn.value || "";
                if (text.includes("Get Link") || text.includes("Lấy Link") || text.includes("Click Here") || text.includes("Tiếp tục")) {
                    if (!btn.disabled) {
                        btn.click();
                    }
                }
            });

            // Lọc ra link đích cuối cùng không thuộc tên miền link4m
            const links = document.querySelectorAll('a[href]');
            links.forEach(a => {
                if (a.href && !a.href.includes("link4m") && !a.href.startsWith("javascript") && !a.href.startsWith("#")) {
                    statusEl.textContent = "Đã tìm thấy link đích!";
                    clearInterval(interval);
                    // Tự động chuyển hướng đến link gốc
                    window.location.href = a.href;
                }
            });
        }, 1500);
    });
})();
