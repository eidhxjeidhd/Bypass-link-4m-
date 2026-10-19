const puppeteer = require('puppeteer');

async function bypassLink4m(targetUrl) {
    // Khởi động trình duyệt ảo trên server
    const browser = await puppeteer.launch({
        headless: true, // Chạy ẩn không hiện giao diện trên server
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    
    // Đặt User-Agent giả lập trình duyệt thật trên điện thoại hoặc máy tính
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');

    try {
        console.log(`Đang truy cập vào: ${targetUrl}`);
        await page.goto(targetUrl, { waitUntil: 'networkidle2' });

        // Chờ thời gian đếm ngược hoặc chờ nút tiếp tục xuất hiện
        console.log('Đang chờ bộ đếm thời gian và xử lý trang...');
        
        // Đoạn này trên server sẽ tự động chờ và tìm nút chuyển tiếp
        await page.waitForSelector('button, .btn, #landing-cnt', { timeout: 60000 });

        // Tự động click vào nút tiếp tục nếu có thể tương tác
        // Lưu ý: Nếu gặp reCAPTCHA yêu cầu chọn hình ảnh, server cần tích hợp dịch vụ giải captcha bên thứ 3.
        
        console.log('Đang lấy link đích cuối cùng...');
        
        // Lấy URL đích sau khi hoàn thành các bước
        const finalUrl = await page.evaluate(() => {
            // Logic tìm link gốc cuối cùng không thuộc trang rút gọn
            const links = Array.from(document.querySelectorAll('a'));
            const cleanLink = links.find(a => a.href && !a.href.includes('link4m') && !a.href.includes('google'));
            return cleanLink ? cleanLink.href : null;
        });

        console.log(`Đã lấy thành công link đích: ${finalUrl}`);
        await browser.close();
        return finalUrl;

    } catch (error) {
        console.error('Lỗi trong quá trình xử lý bypass:', error);
        await browser.close();
        return null;
    }
}

// Chạy thử nghiệm hàm với một link cụ thể
bypassLink4m('https://link4m.com/example');
