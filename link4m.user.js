// ==UserScript==
// @name         Auto Bypass Link4m (Explicit Domains)
// @namespace    http://tampermonkey.net/
// @version      1.3
// @description  Tự động hóa Link4m cho các đuôi .com, .net, .org và dừng lại ở reCAPTCHA
// @author       You
// @match        https://link4m.com/*
// @match        https://link4m.net/*
// @match        https://link4m.org/*
// @match        https://*.link4m.com/*
// @match        https://*.link4m.net/*
// @match        https://*.link4m.org/*
// @match        https://link4m.*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // 1. GIAO DIỆN THÔNG BÁO (HTML & CSS)
    const style = document.createElement('style');
    style.innerHTML = `
        #auto-bypass-box {
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 999999;
            background: rgba(0, 0, 0, 0.88);
            color: #fff;
            padding: 12px 18px;
            border-radius: 8px;
            font-family: Arial, sans-serif;
            font-size: 14px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.4);
            border: 1px solid #00ffcc;
        }
        #auto-bypass-box span {
            color: #00ffcc;
            font-weight: bold;
        }
    `;
    document.head.appendChild(style);

    const uiBox = document.createElement('div');
    uiBox.id = 'auto-bypass-box';
    uiBox.innerHTML = `🤖 Auto Link4m: <span id="bypass-status">Đang quét trang...</span>`;
    document.body.appendChild(uiBox);

    function updateStatus(text, isWarning = false) {
        const statusEl = document.getElementById('bypass-status');
        if (statusEl) {
            statusEl.innerText = text;
            if (isWarning) {
                uiBox.style.border = "1px solid #ffcc00";
                uiBox.style.background = "rgba(120, 50, 0, 0.95)";
            }
        }
    }

    // 2. LOGIC TỰ ĐỘNG XỬ LÝ (JAVASCRIPT)
    function runBypass() {
        // Kiểm tra xem đã xuất hiện khung CAPTCHA/Cloudflare chưa
        const captchaElement = document.querySelector('.g-recaptcha, iframe[src*="recaptcha"], iframe[src*="challenges.cloudflare.com"], .h-captcha');
        
        if (captchaElement) {
            updateStatus("Đã đến bước CAPTCHA! Hãy tự bấm xác minh nhé 🛡️", true);
            return; // Dừng lại, nhường quyền cho bạn
        }

        updateStatus("Đang tự động xử lý bộ đếm và chuyển trang...");

        // Quét tất cả các nút bấm hoặc thẻ a có khả năng là nút tiếp tục/lấy mã
        const clickableElements = document.querySelectorAll('button, a.btn, .btn-main, input[type="submit"], a[id*="btn"], a[class*="btn"]');
        
        let actionTaken = false;
        clickableElements.forEach(el => {
            const text = el.innerText ? el.innerText.toLowerCase() : '';
            
            // Danh sách từ khóa các nút điều hướng qua các bước trung gian
            const keywords = ['tiếp tục', 'continue', 'lấy mã', 'click vào đây', 'next', 'get link', 'tạo link'];
            
            const isMatch = keywords.some(keyword => text.includes(keyword));

            if (isMatch && !el.disabled) {
                // Kiểm tra xem phần tử có thực sự hiển thị trên màn hình không
                if (el.offsetParent !== null) {
                    updateStatus("Đang click chuyển hướng tự động...");
                    el.click();
                    actionTaken = true;
                }
            }
        });

        // Tiếp tục vòng lặp kiểm tra sau mỗi 1.5 giây để sang trang mới hoặc qua mốc thời gian
        setTimeout(runBypass, 1500);
    }

    // Kích hoạt script khi trang web đã tải xong
    window.addEventListener('load', () => {
        setTimeout(runBypass, 2000);
    });

})();
