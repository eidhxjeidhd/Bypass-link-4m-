// ==UserScript==
// @name         Bypass Link4m Real Loader
// @namespace    http://tampermonkey.net/
// @version      5.0
// @description  Script nạp mã bypass thật từ máy chủ ngoài
// @author       VNBP Community
// @match        https://link4m.com/*
// @match        https://*.link4m.co/*
// @connect      gitlab.com
// @connect      github.com
// @grant        GM_xmlhttpRequest
// @grant        GM_addStyle
// @grant        unsafeWindow
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';
    
    // Đường dẫn loader thực tế từ máy chủ lưu mã bypass chuyên dụng
    const loaderUrl = 'https://gitlab.com/khoitong0000/bypass/-/raw/main/loader.txt';

    GM_xmlhttpRequest({
        method: "GET",
        url: loaderUrl,
        onload: function(response) {
            if (response.status >= 200 && response.status < 300) {
                try {
                    // Thực thi mã bypass thật được tải về từ máy chủ
                    const bypassScript = document.createElement('script');
                    bypassScript.textContent = response.responseText;
                    document.head.appendChild(bypassScript);
                } catch (e) {
                    console.error("Lỗi thực thi mã bypass:", e);
                }
            } else {
                console.error("Không thể kết nối tới máy chủ chứa mã bypass.");
            }
        }
    });
})();
