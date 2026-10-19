// ==UserScript==
// @name         Link4m Quick Panel By Pass
// @namespace    http://tampermonkey.net/
// @version      6.0
// @description  Tạo bảng menu nổi hiển thị tốc độ và trạng thái thao tác nhanh
// @author       AI Collaborator
// @match        https://link4m.com/*
// @match        https://*.link4m.co/*
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';

    if (document.getElementById('link4m-quick-panel')) return;

    // Tạo phần tử giao diện menu nổi phong cách "VIP"
    const panel = document.createElement('div');
    panel.id = 'link4m-quick-panel';
    panel.innerHTML = `
        <div style="position: fixed; bottom: 20px; right: 20px; z-index: 999999; background: #0f172a; color: #fff; padding: 14px; border-radius: 14px; border: 1.5px solid #38bdf8; box-shadow: 0 8px 30px rgba(0,0,0,0.7); font-family: sans-serif; font-size: 13px; width: 270px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                <span style="font-weight: bold; color: #38bdf8; font-size: 14px;">⚡ Link4M Tool</span>
                <span id="qp-timer" style="background: #1e293b; color: #facc15; padding: 2px 8px; border-radius: 10px; font-size: 12px; border: 1px solid #334155;">60s</span>
            </div>
            
            <div style="background: #1e293b; padding: 8px; border-radius: 8px; margin-bottom: 8px; font-size: 12px; color: #cbd5e1; word-break: break-all;">
                <span id="qp-status" style="color: #38bdf8;">Đang xử lý tốc độ cao...</span>
            </div>

            <div style="margin-bottom: 8px;">
                <input type="text" id="qp-key-input" placeholder="Nhập mã hoặc từ khóa..." style="width: 100%; background: #1e293b; border: 1px solid #334155; color: #fff; padding: 6px 8px; border-radius: 6px; font-size: 11px;" />
            </div>

            <button id="qp-btn-action" style="width: 100%; background: #3b82f6; color: white; border: none; padding: 8px; border-radius: 8px; font-weight: bold; cursor: pointer; font-size: 12px;">Bấm Tiếp Tục</button>
        </div>
    `;
    document.body.appendChild(panel);

    // Xử lý bộ đếm thời gian và trạng thái trực tiếp trên giao diện
    let timeLeft = 60;
    const timerEl = document.getElementById('qp-timer');
    const statusEl = document.getElementById('qp-status');
    const actionBtn = document.getElementById('qp-btn-action');

    const countdownInterval = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            timerEl.textContent = timeLeft + "s";
        } else {
            statusEl.textContent = "Đã sẵn sàng thao tác!";
        }
    }, 1000);

    actionBtn.addEventListener('click', () => {
        const continueBtn = document.querySelector('button, .btn, .btn-success');
        if (continueBtn) {
            continueBtn.click();
            statusEl.textContent = "Đã kích hoạt nút tiếp tục!";
        } else {
            statusEl.textContent = "Chưa tìm thấy nút tương tác.";
        }
    });
})();
