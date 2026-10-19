// ==UserScript==
// @name         Menu Bypass Link4m Auto
// @namespace    http://tampermonkey.net/
// @version      2.0
// @description  Menu hỗ trợ tương tác trang Link4m
// @author       AI Collaborator
// @match        https://link4m.com/*
// @match        https://*.link4m.co/*
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';

    // Tạo menu giao diện nổi trên màn hình
    const menu = document.createElement('div');
    menu.innerHTML = `
        <div id="link4m-menu" style="position: fixed; top: 70px; right: 10px; z-index: 999999; background: #0f172a; color: #fff; padding: 12px; border-radius: 12px; border: 1px solid #38bdf8; box-shadow: 0 4px 20px rgba(0,0,0,0.5); font-family: sans-serif; font-size: 13px; width: 180px;">
            <div style="font-weight: bold; margin-bottom: 8px; color: #38bdf8; text-align: center;">Menu Link4m</div>
            <button id="btn-auto-click" style="background: #3b82f6; color: white; border: none; padding: 8px; border-radius: 6px; width: 100%; cursor: pointer; font-weight: bold; margin-bottom: 6px;">Tự động Click</button>
            <button id="btn-scroll-bottom" style="background: #10b981; color: white; border: none; padding: 8px; border-radius: 6px; width: 100%; cursor: pointer; font-weight: bold;">Cuộn xuống mã</button>
        </div>
    `;
    document.body.appendChild(menu);

    // Tính năng tự động tìm nút "Click vào đây để tiếp tục" hoặc nút xanh lá
    document.getElementById('btn-auto-click').addEventListener('click', () => {
        const targetBtn = document.querySelector('#landing-cnt button, #landing-cnt .btn, button, .btn-success');
        if (targetBtn) {
            targetBtn.click();
            alert("Đã bấm nút tiếp tục!");
        } else {
            alert("Chưa tìm thấy nút hoặc chưa hoàn thành Captcha!");
        }
    });

    // Tính năng cuộn nhanh xuống phần lấy mã / hướng dẫn
    document.getElementById('btn-scroll-bottom').addEventListener('click', () => {
        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: 'smooth'
        });
    });
})();
