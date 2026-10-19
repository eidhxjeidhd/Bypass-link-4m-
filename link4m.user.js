// ==UserScript==
// @name         Bypass Link4m Pro Panel
// @namespace    http://tampermonkey.net/
// @version      3.5
// @description  Bảng điều khiển tự động vượt link Link4m giao diện xịn sò
// @author       AI Collaborator
// @match        https://link4m.com/*
// @match        https://*.link4m.co/*
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';

    // Tránh bị lặp khung giao diện nếu trang tải lại
    if (document.getElementById('link4m-vip-panel')) return;

    // Tạo bảng giao diện nổi
    const panel = document.createElement('div');
    panel.id = 'link4m-vip-panel';
    panel.innerHTML = `
        <div style="position: fixed; bottom: 20px; right: 20px; z-index: 999999; background: #0f172a; color: #fff; padding: 14px; border-radius: 14px; border: 1.5px solid #38bdf8; box-shadow: 0 8px 30px rgba(0,0,0,0.7); font-family: sans-serif; font-size: 13px; width: 280px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                <span style="font-weight: bold; color: #38bdf8; font-size: 14px;">⚡ Link4M Cuttay (VNBP)</span>
                <span id="vip-timer" style="background: #1e293b; color: #facc15; padding: 2px 8px; border-radius: 10px; font-size: 12px; border: 1px solid #334155;">60s</span>
            </div>
            
            <div style="background: #1e293b; padding: 8px; border-radius: 8px; margin-bottom: 8px; font-size: 12px; color: #cbd5e1; word-break: break-all;">
                <span id="vip-status" style="color: #38bdf8;">Đang khởi tạo hệ thống...</span>
            </div>

            <div style="margin-bottom: 8px;">
                <input type="text" id="vip-key-input" placeholder="URL / Link ảnh / Từ khóa" style="width: 100%; background: #1e293b; border: 1px solid #334155; color: #fff; padding: 6px 8px; border-radius: 6px; font-size: 11px; margin-bottom: 4px;" />
                <div style="display: flex; justify-content: space-between;">
                    <select style="background: #1e293b; color: #fff; border: 1px solid #334155; padding: 4px; border-radius: 4px; font-size: 11px; width: 48%;">
                        <option>service-v3.js</option>
                    </select>
                    <input type="text" id="vip-key-val" value="Key..." style="background: #1e293b; border: 1px solid #334155; color: #facc15; padding: 4px 8px; border-radius: 4px; font-size: 11px; width: 48%; text-align: center;" readonly />
                </div>
            </div>

            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px; font-size: 12px;">
                <label style="display: flex; align-items: center; cursor: pointer;">
                    <input type="checkbox" id="vip-auto-run" checked style="margin-right: 5px;" /> Tự động chạy
                </label>
                <button id="vip-btn-toggle" style="background: #dc2626; color: white; border: none; padding: 6px 14px; border-radius: 6px; font-weight: bold; cursor: pointer; font-size: 12px;">Dừng lại</button>
            </div>

            <button style="width: 100%; background: #4f46e5; color: white; border: none; padding: 8px; border-radius: 8px; font-weight: bold; cursor: pointer; font-size: 12px;">Join Discord nhận bản cập nhật</button>
        </div>
    `;
    document.body.appendChild(panel);

    // Kịch bản xử lý tự động đếm giờ và quét
    let timeLeft = 60;
    const timerEl = document.getElementById('vip-timer');
    const statusEl = document.getElementById('vip-status');
    const autoRunCheckbox = document.getElementById('vip-auto-run');
    const toggleBtn = document.getElementById('vip-btn-toggle');
    let isRunning = true;

    // Nút bật/tắt trạng thái chạy
    toggleBtn.addEventListener('click', () => {
        isRunning = !isRunning;
        if (isRunning) {
            toggleBtn.textContent = "Dừng lại";
            toggleBtn.style.background = "#dc2626";
            statusEl.textContent = "Đã tiếp tục chạy tự động...";
        } else {
            toggleBtn.textContent = "Chạy tiếp";
            toggleBtn.style.background = "#16a34a";
            statusEl.textContent = "Đã tạm dừng.";
        }
    });

    // Vòng lặp đếm ngược và tự động tương tác nút
    const mainInterval = setInterval(() => {
        if (!isRunning || !autoRunCheckbox.checked) return;

        if (timeLeft > 0) {
            timeLeft--;
            timerEl.textContent = timeLeft + "s";
        }

        // Tự động tìm và bấm nút tiếp tục khi xuất hiện
        const continueBtn = document.querySelector('button, .btn, .btn-success');
        if (continueBtn && !continueBtn.disabled) {
            statusEl.textContent = "Đang tự động bấm tiếp tục...";
            continueBtn.click();
        }

        // Tự động quét link đích cuối cùng
        const links = document.querySelectorAll('a[href]');
        links.forEach(a => {
            if (a.href && !a.href.includes("link4m") && !a.href.startsWith("javascript") && !a.href.startsWith("#")) {
                statusEl.textContent = "Đã tìm thấy link đích!";
                clearInterval(mainInterval);
                window.location.href = a.href;
            }
        });
    }, 1000);
})();
