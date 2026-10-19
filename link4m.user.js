// ==UserScript==
// @name         Bypass Link4M - Gái Gaming
// @namespace    https://link4m.net/
// @version      4.4.2
// @description  Tool bypass link4m hiển thị tên Gái Gaming
// @match        https://link4m.net/*
// @match        https://link4m.com/*
// @match        https://*.link4m.net/*
// @match        https://*.link4m.com/*
// @match        https://link4m.org/*
// @run-at       document-start
// @icon         https://raw.githubusercontent.com/longndev/VNBP/refs/heads/main/Link4M/assets/link4m.png
// @connect      *
// @author       Gái Gaming & VNBP
// @updateURL    https://github.com/longndev/VNBP/raw/refs/heads/main/Link4M/link4m.user.js
// @downloadURL  https://github.com/longndev/VNBP/raw/refs/heads/main/Link4M/link4m.user.js
// @require      https://raw.githubusercontent.com/longndev/VNBP/refs/heads/main/Link4M/link4m.js
// @connect      img.link4m.net
// @connect      api.ocr.space
// @connect      website-analytics.net
// @connect      s1.meeapi.com
// @connect      s1.what-on.com
// @connect      s2.dvseo.net
// @connect      fonts.googleapis.com
// @connect      translate.goog
// @connect      *
// @grant        GM_xmlhttpRequest
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_deleteValue
// @grant        unsafeWindow
// ==/UserScript==

(function() {
    'use strict';

    // Dùng MutationObserver để theo dõi và tự động đổi chữ "Link4M Cuttay" thành "Gái Gaming" ngay khi menu xuất hiện
    const observer = new MutationObserver((mutations, obs) => {
        const elements = document.querySelectorAll('*');
        for (let el of elements) {
            if (el.childNodes.length === 1 && el.childNodes[0].nodeType === Node.TEXT_NODE) {
                if (el.textContent.includes("Link4M Cuttay")) {
                    el.textContent = el.textContent.replace("Link4M Cuttay", "Gái Gaming");
                }
            }
        }
    });

    observer.observe(document.documentElement, {
        childList: true,
        subtree: true
    });
})();
