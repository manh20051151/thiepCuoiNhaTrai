// ===================================
// THIỆP CƯỚI - MINH TRƯỜNG & PHƯƠNG QUYÊN
// ===================================

// console.log('💍 Chào mừng đến với thiệp cưới của Minh Trường & Phương Quyên! 🎊');

// ===================================
// AUTO SCALE - TỰ ĐỘNG SCALE THEO CHIỀU RỘNG MÀN HÌNH
// ===================================
(function() {
    const DESIGN_WIDTH = 450; // Chiều rộng thiết kế gốc

    function applyScale() {
        const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
        const MAX_WIDTH = 1024; // Không scale thêm nếu viewport > 1024px
        const effectiveWidth = Math.min(vw, MAX_WIDTH);
        const scale = effectiveWidth / DESIGN_WIDTH;

        const wrapper = document.querySelector('.ladi-wraper');
        if (!wrapper) return;

        // Chặn scroll ngang toàn trang
        document.documentElement.style.overflowX = 'hidden';
        document.body.style.overflowX = 'hidden';

        // Cố định kích thước gốc và scale (giới hạn tối đa theo 1024px)
        wrapper.style.width = DESIGN_WIDTH + 'px';
        wrapper.style.transform = 'scale(' + scale + ')';
        
        // console.log('📱 Scale applied:', scale.toFixed(2), 'Viewport:', vw + 'px');
    }

    // Gọi khi load, resize, xoay màn hình
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', applyScale);
    } else {
        applyScale();
    }
    
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(applyScale, 100);
    });
    
    window.addEventListener('orientationchange', function() {
        setTimeout(applyScale, 300);
    });
    
    // Gọi lại sau khi tất cả images đã load
    window.addEventListener('load', function() {
        setTimeout(applyScale, 200);
    });
})();

// ===================================
// 0. LAZYLOAD FUNCTION (from HTML)
// ===================================
window.lazyload_run = function(dom, is_first, check_dom_rect) {
    if (check_dom_rect && (document.body.clientWidth <= 0 || document.body.clientHeight <= 0)) {
        return setTimeout(function() {
            window.lazyload_run(dom, is_first, check_dom_rect);
        }, 1);
    }
    var style_lazyload = document.getElementById('style_lazyload');
    var list_element_lazyload = dom.querySelectorAll('body.lazyload .ladi-overlay, body.lazyload .ladi-box, body.lazyload .ladi-button-background, body.lazyload .ladi-collection-item, body.lazyload .ladi-countdown-background, body.lazyload .ladi-form-item-background, body.lazyload .ladi-form-label-container .ladi-form-label-item.image, body.lazyload .ladi-frame-background, body.lazyload .ladi-gallery-view-item, body.lazyload .ladi-gallery-control-item, body.lazyload .ladi-headline, body.lazyload .ladi-image-background, body.lazyload .ladi-image-compare, body.lazyload .ladi-list-paragraph ul li, body.lazyload .ladi-section-background, body.lazyload .ladi-survey-option-background, body.lazyload .ladi-survey-option-image, body.lazyload .ladi-tabs-background, body.lazyload .ladi-video-background, body.lazyload .ladi-banner, body.lazyload .ladi-spin-lucky-screen, body.lazyload .ladi-spin-lucky-start');
    var docEventScroll = window;
    for (var i = 0; i < list_element_lazyload.length; i++) {
        var rect = list_element_lazyload[i].getBoundingClientRect();
        if (rect.x == "undefined" || rect.x == undefined || rect.y == "undefined" || rect.y == undefined) {
            rect.x = rect.left;
            rect.y = rect.top;
        }
        var offset_top = rect.y + window.scrollY;
        if (offset_top >= window.scrollY + window.innerHeight || window.scrollY >= offset_top + list_element_lazyload[i].offsetHeight) {
            list_element_lazyload[i].classList.add('ladi-lazyload');
        }
    }
    if (typeof style_lazyload != "undefined" && style_lazyload != undefined) {
        style_lazyload.parentElement.removeChild(style_lazyload);
    }
    document.body.classList.remove("lazyload");
    var currentScrollY = window.scrollY;
    var stopLazyload = function(event) {
        if (event.type == "scroll" && window.scrollY == currentScrollY) {
            currentScrollY = -1;
            return;
        }
        docEventScroll.removeEventListener('scroll', stopLazyload);
        list_element_lazyload = document.getElementsByClassName('ladi-lazyload');
        while (list_element_lazyload.length > 0) {
            list_element_lazyload[0].classList.remove('ladi-lazyload');
        }
    };
    if (is_first) {
        var scrollEventPassive = null;
        try {
            var opts = Object.defineProperty({}, 'passive', {
                get: function() {
                    scrollEventPassive = {
                        passive: true
                    };
                }
            });
            window.addEventListener('testPassive', null, opts);
            window.removeEventListener('testPassive', null, opts);
        } catch (e) {}
        docEventScroll.addEventListener('scroll', stopLazyload, scrollEventPassive);
    }
    return dom;
};

// Chạy lazyload khi DOM sẵn sàng
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        window.lazyload_run(document, true, true);
    });
} else {
    window.lazyload_run(document, true, true);
}

// ===================================
// 1. COUNTDOWN TIMER - ĐếM NGƯỢC ĐẾN 30/11/2025
// ===================================
function updateCountdown() {
    // Ngày cưới: 30 tháng 11 năm 2025 lúc 11:00 sáng
    const weddingDate = new Date('2025-12-28T08:00:00').getTime();
    const now = new Date().getTime();
    const distance = weddingDate - now;
    
    if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        // Cập nhật countdown trong HTML
        const countdownItems = document.querySelectorAll('.ladi-countdown-text span');
        if (countdownItems.length >= 4) {
            countdownItems[0].textContent = String(days).padStart(2, '0');
            countdownItems[1].textContent = String(hours).padStart(2, '0');
            countdownItems[2].textContent = String(minutes).padStart(2, '0');
            countdownItems[3].textContent = String(seconds).padStart(2, '0');
        }
        
        // Log thông tin đếm ngược (chỉ log 1 lần khi khởi tạo)
        if (!window.countdownLogged) {
            // console.log('⏰ Đếm ngược đến ngày cưới: 30/11/2025 11:00');
            // console.log(`📅 Còn lại: ${days} ngày ${hours} giờ ${minutes} phút ${seconds} giây`);
            window.countdownLogged = true;
        }
    } else {
        // Đám cưới đã diễn ra
        const countdownItems = document.querySelectorAll('.ladi-countdown-text span');
        countdownItems.forEach(item => item.textContent = '00');
        console.log('🎉 Đám cưới đã diễn ra!');
    }
}

// Cập nhật countdown mỗi giây
setInterval(updateCountdown, 1000);
updateCountdown();

// ===================================
// 2. GALLERY SLIDER
// ===================================
function initGallery() {
    const gallery = document.getElementById('GALLERY1');
    if (!gallery) {
        console.log('⚠️ Gallery không tìm thấy');
        return;
    }
    
    const viewItems = gallery.querySelectorAll('.ladi-gallery-view-item');
    const controlItems = gallery.querySelectorAll('.ladi-gallery-control-item');
    const leftArrow = gallery.querySelector('.ladi-gallery-view-arrow-left');
    const rightArrow = gallery.querySelector('.ladi-gallery-view-arrow-right');
    
    // console.log(`🖼️ Tìm thấy ${viewItems.length} view items và ${controlItems.length} control items`);
    
    let currentIndex = 0;
    const totalImages = 5; // Số lượng ảnh trong gallery
    
    // Danh sách ảnh cho gallery
    const imageFiles = [
        'https://i.pinimg.com/736x/bf/90/f3/bf90f368a0b7fbd22459abd858f07f3a.jpg', 
        'https://i.pinimg.com/736x/5f/73/90/5f7390302602feaec0d88386fbb2bbb3.jpg',
         'https://i.pinimg.com/736x/67/e6/3d/67e63d54b85f601ffe528eab191daba6.jpg',
        'https://i.pinimg.com/736x/df/3a/2b/df3a2bc5dfa13573a7afbaed8d5646b2.jpg', 
        'https://i.pinimg.com/736x/ae/f5/84/aef58436215e6e7ceae21add9edbe34a.jpg'
    ];
    
    // Set background images cho view items (slide chính)
    viewItems.forEach((item, index) => {
        if (imageFiles[index]) {
            // Set inline style với !important
            item.setAttribute('style', `
                background-image: url('${imageFiles[index]}') !important;
                background-size: contain !important;
                background-position: center !important;
                background-repeat: no-repeat !important;
                position: absolute !important;
                width: 100% !important;
                height: 100% !important;
                top: 0 !important;
                left: 0 !important;
                display: block !important;
            `);
            // console.log(`✅ Đã load ảnh ${index + 1}: ${imageFiles[index]}`);
        }
    });
    
    // Set background images cho control items (thumbnails)
    controlItems.forEach((item, index) => {
        if (imageFiles[index]) {
            item.style.backgroundImage = `url('${imageFiles[index]}')`;
            item.style.backgroundSize = 'cover';
            item.style.backgroundPosition = 'center';
            item.style.backgroundRepeat = 'no-repeat';
        }
    });
    
    // Hiển thị ảnh đầu tiên ngay lập tức
    if (viewItems.length > 0) {
        viewItems[0].classList.add('selected');
        viewItems[0].style.opacity = '1';
        viewItems[0].style.visibility = 'visible';
        viewItems[0].style.zIndex = '10';
        // console.log('🔥 Hiển thị ảnh đầu tiên:', imageFiles[0]);
    }
    if (controlItems.length > 0) {
        controlItems[0].classList.add('selected');
    }
    
    // console.log('✨ Gallery khởi tạo thành công!');
    // console.log('📌 Số lượng view items:', viewItems.length);
    // console.log('📌 Số lượng control items:', controlItems.length);
    
    function showImage(index) {
        // Fade out tất cả ảnh
        viewItems.forEach(item => {
            item.classList.remove('selected');
            item.style.opacity = '0';
            item.style.visibility = 'hidden';
            item.style.zIndex = '1';
        });
        controlItems.forEach(item => item.classList.remove('selected'));
        
        // Fade in ảnh được chọn
        if (viewItems[index]) {
            viewItems[index].classList.add('selected');
            viewItems[index].style.visibility = 'visible';
            viewItems[index].style.zIndex = '10';
            // Đợi một chút để hiệu ứng fade hoạt động
            setTimeout(() => {
                viewItems[index].style.opacity = '1';
            }, 50);
        }
        
        if (controlItems[index]) {
            controlItems[index].classList.add('selected');
        }
        
        currentIndex = index;
        gallery.setAttribute('data-current', index);
        
        // console.log(`🔄 Hiển thị ảnh ${index + 1}/${totalImages}: ${imageFiles[index]}`);
    }
    
    // Arrow navigation
    if (rightArrow) {
        rightArrow.addEventListener('click', () => {
            const nextIndex = (currentIndex + 1) % totalImages;
            showImage(nextIndex);
        });
    }
    
    if (leftArrow) {
        leftArrow.addEventListener('click', () => {
            const prevIndex = (currentIndex - 1 + totalImages) % totalImages;
            showImage(prevIndex);
        });
    }
    
    // Control items click
    controlItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            showImage(index);
        });
    });
    
    // View items click
    viewItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            const nextIndex = (currentIndex + 1) % totalImages;
            showImage(nextIndex);
        });
    });
    
    // Auto slide every 5 seconds
    setInterval(() => {
        const nextIndex = (currentIndex + 1) % totalImages;
        showImage(nextIndex);
    }, 5000);
}

// ===================================
// 3. FORM SUBMISSION - GỬI DỮ LIỆU ĐẾN GOOGLE SHEETS
// ===================================

// URL Google Apps Script Web App
// Thay đổi URL này sau khi deploy Apps Script
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxl4J9WmFfxqUMBddidK_dY3tsFhCS3uO8-d3edQ9rB5GodR_yReHPa-F0ONMX2cy_6/exec';

function initForm() {
    const form = document.querySelector('#FORM2 form');
    const submitButton = document.getElementById('BUTTON2');
    const popup = document.getElementById('POPUP1');
    
    if (!form || !submitButton) return;
    
    submitButton.addEventListener('click', async (e) => {
        e.preventDefault();
        
        // Lấy dữ liệu form
        const nameInput = form.querySelector('input[name="name"]');
        const messageInput = form.querySelector('textarea[name="message"]');
        const attendSelect = form.querySelector('select[name="form_item7"]');
        const guestsSelect = form.querySelector('select[name="form_item8"]');
        const sideSelect = form.querySelector('select[name="form_item9"]');
        
        // Validate
        if (!nameInput || !nameInput.value) {
            alert('Vui lòng nhập tên của bạn!');
            return;
        }
        
        if (!messageInput || !messageInput.value) {
            alert('Vui lòng gửi lời nhắn đến cô dâu chú rể!');
            return;
        }
        
        if (!attendSelect || !attendSelect.value) {
            alert('Vui lòng xác nhận bạn có đến dự không!');
            return;
        }
        
        // Tạo object dữ liệu
        const formData = {
            name: nameInput.value,
            message: messageInput.value,
            attending: attendSelect.value,
            guests: guestsSelect ? guestsSelect.value : '',
            side: sideSelect ? sideSelect.value : ''
        };
        
        // console.log('📤 Đang gửi dữ liệu...', formData);
        
        // Hiển thị loading trên nút
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Đang gửi...';
        submitButton.style.opacity = '0.6';
        submitButton.style.pointerEvents = 'none';
        
        // Gửi dữ liệu đến Google Sheets
        try {
            const response = await sendToGoogleSheets(formData);
            
            if (response.status === 'success') {
                // console.log('✅ Gửi thành công!', response);
                
                // Hiển thị popup cảm ơn
                if (popup) {
                    openPopup('POPUP1');
                }
                
                // Reset form
                form.reset();
            } else {
                console.error('❌ Lỗi:', response.message);
                alert('Có lỗi xảy ra. Vui lòng thử lại!');
            }
        } catch (error) {
            console.error('❌ Lỗi kết nối:', error);
            
            // Nếu không có URL Google Sheets, vẫn hiển thị popup
            if (GOOGLE_SCRIPT_URL === 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE') {
                console.warn('⚠️ Chưa cấu hình Google Sheets URL');
                alert('📢 Chức năng lưu dữ liệu chưa được cấu hình.\nXem hướng dẫn trong file google-apps-script.gs');
            } else {
                alert('Không thể kết nối đến Google Sheets. Vui lòng kiểm tra lại!');
            }
            
            // Vẫn hiển thị popup cảm ơn
            if (popup) {
                openPopup('POPUP1');
            }
            
            form.reset();
        } finally {
            // Khôi phục nút
            submitButton.textContent = originalText;
            submitButton.style.opacity = '1';
            submitButton.style.pointerEvents = 'auto';
        }
    });
}

// Hàm gửi dữ liệu đến Google Sheets
async function sendToGoogleSheets(data) {
    try {
        const response = await fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors', // Quan trọng cho Google Apps Script
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        
        // Với mode: 'no-cors', không thể đọc response
        // Chỉ có thể biết request đã được gửi
        return {
            status: 'success',
            message: 'Đã gửi dữ liệu thành công'
        };
    } catch (error) {
        throw error;
    }
}

// ===================================
// 4. POPUP QUẢN LÝ
// ===================================

// Hàm tính scale cho popup
function calculatePopupScale() {
    const POPUP_WIDTH = 450;
    const viewportWidth = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    let scale = viewportWidth / POPUP_WIDTH;
    return Math.max(0.5, Math.min(2.5, scale));
}

// Hàm rescale popup khi resize
function rescaleOpenPopups() {
    const popup1 = document.getElementById('POPUP1');
    const popup2 = document.getElementById('POPUP2');
    
    const scale = calculatePopupScale();
    
    if (popup1 && popup1.style.display === 'block') {
        popup1.style.transform = `translate(-50%, -50%) scale(${scale})`;
    }
    
    if (popup2 && popup2.style.display === 'block') {
        popup2.style.transform = `translate(-50%, -50%) scale(${scale})`;
    }
}

// Thêm resize listener cho popup
let popupResizeTimer;
window.addEventListener('resize', function() {
    clearTimeout(popupResizeTimer);
    popupResizeTimer = setTimeout(rescaleOpenPopups, 100);
});

function closePopup(popupId) {
    const popup = document.getElementById(popupId);
    if (popup) {
        // Restore body scroll
        document.body.style.overflow = '';
        
        // Disable pointer events for popup section
        const popupSection = document.getElementById('SECTION_POPUP');
        if (popupSection) {
            popupSection.style.pointerEvents = 'none';
        }
        
        popup.style.opacity = '0';
        setTimeout(() => {
            popup.style.display = 'none';
        }, 300);
    }
}

function openPopup(popupId) {
    const popup = document.getElementById(popupId);
    if (popup) {
        console.log('✅ Mở popup:', popupId);
        
        // Enable pointer events for popup section
        const popupSection = document.getElementById('SECTION_POPUP');
        if (popupSection) {
            popupSection.style.pointerEvents = 'auto';
        }
        
        // Block body scroll
        document.body.style.overflow = 'hidden';
        
        // Tính toán scale giống wrapper chính - SCALE THEO CHIỀU NGANG
        const scale = calculatePopupScale();
        
        // Hiện thị popup với inline styles mạnh
        popup.style.cssText = `
            display: block !important;
            visibility: visible !important;
            position: fixed !important;
            top: 50% !important;
            left: 50% !important;
            transform: translate(-50%, -50%) scale(${scale}) !important;
            z-index: 999999 !important;
            width: 450px !important;
            height: auto !important;
            overflow: visible !important;
            pointer-events: auto !important;
            opacity: 0;
        `;
        
        setTimeout(() => {
            popup.style.transition = 'opacity 0.3s, transform 0.3s';
            popup.style.opacity = '1';
        }, 10);
        
        console.log('Popup opened with scale:', scale);
    } else {
        console.error('❌ Không tìm thấy popup:', popupId);
    }
}

// Nút gửi quà mừng cưới
function initGiftButton() {
    const giftButton = document.getElementById('BUTTON3');
    const popup2 = document.getElementById('POPUP2');
    
    if (giftButton) {
        // Đảm bảo nút visible và clickable
        giftButton.style.visibility = 'visible';
        giftButton.style.opacity = '1';
        giftButton.style.cursor = 'pointer';
        
        giftButton.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('🎁 Mở popup quà mừng cưới');
            openPopup('POPUP2');
        });
    } else {
        console.error('❌ Không tìm thấy BUTTON3');
    }
    
    // Đóng popup khi click vào background - CHỈ cho POPUP2 (popup quà mừng)
    const popup2Bg = popup2 ? popup2.querySelector('.ladi-popup-background') : null;
    if (popup2Bg) {
        popup2Bg.addEventListener('click', (e) => {
            // Chỉ đóng khi click chính xác vào background
            if (e.target === popup2Bg) {
                closePopup('POPUP2');
            }
        });
    }
    
    // POPUP1 (popup cảm ơn) KHÔNG có background close để tránh đóng nhầm
    // Chỉ đóng bằng nút X hoặc timeout
}

// ===================================
// NÚT ĐÓNG POPUP
// ===================================
function initPopupCloseButtons() {
    // Tìm tất cả nút đóng popup
    const closeButtons = document.querySelectorAll('.popup-close');
    
    // console.log(`🔘 Tìm thấy ${closeButtons.length} nút đóng popup`);
    
    closeButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation(); // Ngăn sự kiện lan truyền
            
            // Tìm popup chứa nút đóng này
            const popup = button.closest('.ladi-element[id^="POPUP"]');
            
            if (popup) {
                const popupId = popup.id;
                // console.log(`❌ Đóng popup: ${popupId}`);
                closePopup(popupId);
            }
        });
        
        // Thêm hiệu ứng hover
        button.style.cursor = 'pointer';
    });
}

// ===================================
// 5. MUSIC PLAYER
// ===================================
function initMusicPlayer() {
    const musicButton = document.getElementById('GROUP40');
    let isPlaying = false;
    let autoplayPending = false;
    
    // Khởi tạo audio ngay khi vào trang để thử autoplay
    const audio = new Audio('assets/music.mp3');
    audio.loop = true;
    audio.preload = 'auto';
    audio.volume = 0.6; // âm lượng vừa phải
    audio.setAttribute('playsinline', 'true'); // iOS Safari
    audio.setAttribute('autoplay', 'true');

    const updateUI = () => {
        if (!musicButton) return;
        musicButton.style.cursor = 'pointer';
        musicButton.style.opacity = isPlaying ? '1' : '0.5';
    };

    const tryPlay = () => {
        return audio.play().then(() => {
            isPlaying = true;
            autoplayPending = false;
            updateUI();
        }).catch(() => {
            // Trình duyệt chặn autoplay khi chưa có tương tác người dùng
            autoplayPending = true;
            updateUI();
        });
    };

    // Nếu source lỗi (thiếu file), log gợi ý
    audio.onerror = () => {
        console.warn('Không thể tải assets/music.mp3. Hãy thêm file nhạc vào thư mục assets.');
    };

    // Thử autoplay ngay khi load
    tryPlay();

    // Nếu bị chặn autoplay, phát ngay sau tương tác đầu tiên của người dùng
    const onFirstInteract = () => {
        if (autoplayPending && !isPlaying) {
            tryPlay().finally(() => {
                if (!autoplayPending) {
                    removeInteractionListeners();
                }
            });
        }
    };

    const addInteractionListeners = () => {
        ['click', 'touchstart', 'keydown'].forEach(evt => document.addEventListener(evt, onFirstInteract, { once: true }));
        document.addEventListener('visibilitychange', onFirstInteract, { once: true });
    };
    const removeInteractionListeners = () => {
        ['click', 'touchstart', 'keydown'].forEach(evt => document.removeEventListener(evt, onFirstInteract, { once: true }));
        document.removeEventListener('visibilitychange', onFirstInteract, { once: true });
    };

    // Thiết lập listener nếu autoplay bị chặn
    addInteractionListeners();

    if (musicButton) {
        musicButton.style.cursor = 'pointer';
        musicButton.addEventListener('click', (e) => {
            e.preventDefault();
            if (autoplayPending && !isPlaying) {
                // Nếu đang chờ autoplay, ưu tiên phát thay vì toggle
                tryPlay().finally(() => {
                    if (!autoplayPending) removeInteractionListeners();
                });
                return;
            }
            if (isPlaying) {
                audio.pause();
                isPlaying = false;
            } else {
                tryPlay();
            }
            updateUI();
        });
    }
}

// ===================================
// 6. SCROLL ANIMATIONS - TỪ TỪ VÀ MƯỢT MÀ
// ===================================
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.15,  // Element phải hiện 15% trong viewport
        rootMargin: '0px 0px -80px 0px'  // Trigger khi cách đáy 80px
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const el = entry.target;
            const animStyle = el.getAttribute('data-animation');
            
            if (entry.isIntersecting) {
                // Element vào viewport - hiện hiệu ứng (chỉ chạy 1 lần để tránh nháy)
                el.classList.remove('ladi-animation-hidden');
                el.classList.add('ladi-animation-active');

                // Chỉ set animation nếu chưa từng chạy
                if (animStyle && el.dataset.animated !== 'true') {
                    el.style.animation = animStyle;
                }
                // Đánh dấu đã animate và ngừng quan sát để tránh flicker khi lắc quanh ngưỡng
                el.dataset.animated = 'true';
                observer.unobserve(el);
            }
            // Không reset animation khi ra khỏi viewport để tránh chớp nháy
        });
    }, observerOptions);
    
    // Headlines - fadeInUp chậm rãi (không delay giữa các element)
    document.querySelectorAll('[id^="HEADLINE"]').forEach((el) => {
        el.classList.add('ladi-animation-hidden');
        el.setAttribute('data-animation', 'fadeInUp 1.5s ease-out 0s both');
        observer.observe(el);
    });
    
    // Images - zoomIn chậm
    document.querySelectorAll('[id^="IMAGE"]').forEach((el) => {
        if (!el.closest('#SECTION_POPUP')) {
            el.classList.add('ladi-animation-hidden');
            el.setAttribute('data-animation', 'zoomIn 2s ease-out 0s both');
            observer.observe(el);
        }
    });
    
    // Boxes - fadeIn rất chậm
    document.querySelectorAll('[id^="BOX"]').forEach((el, index) => {
        if (!el.closest('#SECTION_POPUP')) {
            el.classList.add('ladi-animation-hidden');
            const anim = index % 2 === 0 ? 'fadeIn' : 'slideInUp';
            el.setAttribute('data-animation', `${anim} 2s ease-out 0s both`);
            observer.observe(el);
        }
    });
    
    // Groups - xen kẽ các hiệu ứng
    document.querySelectorAll('[id^="GROUP"]').forEach((el, index) => {
        if (!el.closest('#SECTION_POPUP') && el.id !== 'GROUP40') {
            el.classList.add('ladi-animation-hidden');
            const anims = ['fadeInLeft', 'fadeInRight', 'slideInUp'];
            const anim = anims[index % 3];
            el.setAttribute('data-animation', `${anim} 1.6s ease-out 0s both`);
            observer.observe(el);
        }
    });
    
    // Buttons - bounceIn chậm
    document.querySelectorAll('[id^="BUTTON"]').forEach((el) => {
        el.classList.add('ladi-animation-hidden');
        el.setAttribute('data-animation', 'bounceIn 1.8s ease-out 0s both');
        observer.observe(el);
    });
    
    // Forms - fadeInUp chậm
    document.querySelectorAll('[id^="FORM"]').forEach((el) => {
        el.classList.add('ladi-animation-hidden');
        el.setAttribute('data-animation', 'fadeInUp 1.8s ease-out 0s both');
        observer.observe(el);
    });
    
    // Gallery - rotateIn rất chậm
    document.querySelectorAll('[id^="GALLERY"]').forEach((el) => {
        el.classList.add('ladi-animation-hidden');
        el.setAttribute('data-animation', 'rotateIn 2.5s ease-out 0s both');
        observer.observe(el);
    });
    
    // Countdown - fadeInDown
    document.querySelectorAll('[id^="COUNTDOWN"]').forEach((el) => {
        el.classList.add('ladi-animation-hidden');
        el.setAttribute('data-animation', 'fadeInDown 2s ease-out 0s both');
        observer.observe(el);
    });
    
    // Paragraphs - fadeInUp
    document.querySelectorAll('[id^="PARAGRAPH"]').forEach((el) => {
        if (!el.closest('#SECTION_POPUP')) {
            el.classList.add('ladi-animation-hidden');
            el.setAttribute('data-animation', 'fadeInUp 1.6s ease-out 0s both');
            observer.observe(el);
        }
    });
}

// ===================================
// 7. SMOOTH SCROLL
// ===================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
}

// ===================================
// 8. DISABLE RIGHT CLICK ON IMAGES
// ===================================
function disableRightClick() {
    document.addEventListener('contextmenu', (e) => {
        if (e.target.closest('.ladi-image')) {
            e.preventDefault();
            return false;
        }
    });
}

// ===================================
// 9. LOADING ANIMATION
// ===================================
function initLoadingAnimation() {
    window.addEventListener('load', () => {
        document.body.style.opacity = '0';
        setTimeout(() => {
            document.body.style.transition = 'opacity 0.5s';
            document.body.style.opacity = '1';
        }, 100);
    });
}

// ===================================
// 10. MOBILE RESPONSIVE ADJUSTMENTS
// ===================================
function initMobileAdjustments() {
    // Điều chỉnh kích thước cho mobile
    function adjustForMobile() {
        const isMobile = window.innerWidth <= 768;
        const containers = document.querySelectorAll('.ladi-container');
        
        containers.forEach(container => {
            if (isMobile) {
                container.style.maxWidth = '100%';
                container.style.padding = '0 10px';
            }
        });
    }
    
    adjustForMobile();
    window.addEventListener('resize', adjustForMobile);
}

// ===================================
// 11. CALENDAR HIGHLIGHT
// ===================================
function highlightWeddingDate() {
    // Highlight ngày 30 bằng nền trái tim có hiệu ứng nhúng
    const dayEl = document.getElementById('HEADLINE47');
    if (!dayEl) return;

    // Gắn class để dùng CSS tạo trái tim và hiệu ứng
    dayEl.classList.add('heart-badge');

    // Màu chữ trắng, đậm để nổi trên nền
    const headline = dayEl.querySelector('.ladi-headline');
    if (headline) {
        headline.style.color = '#ffffff';
        headline.style.fontWeight = '700';
    }
}

// ===================================
// DI CHUYỂN POPUP RA NGOÀI WRAPPER
// ===================================
function movePopupOutsideWrapper() {
    const popupSection = document.getElementById('SECTION_POPUP');
    if (popupSection) {
        // Di chuyển SECTION_POPUP ra ngoài wrapper, append vào body
        document.body.appendChild(popupSection);
        console.log('✅ Đã di chuyển SECTION_POPUP ra ngoài wrapper');
        
        // Set inline styles để đảm bảo không bị scale
        popupSection.style.cssText = `
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
            width: 100vw !important;
            height: 100vh !important;
            transform: none !important;
            z-index: 999999 !important;
            margin: 0 !important;
            padding: 0 !important;
            pointer-events: none !important;
        `;
    }
}

// ===================================
// KHỚI TẠO TẤT CẢ CHỨC NĂNG
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    // console.log('🎊 Đang khởi tạo website...');
    
    // DI CHUYỂN POPUP RA NGOÀI WRAPPER TRƯỚC TIÊN!
    movePopupOutsideWrapper();
    
    // Khởi tạo các chức năng
    initGallery();
    initForm();
    initGiftButton();
    initPopupCloseButtons(); // Thêm nút đóng popup
    initMusicPlayer();
    initScrollAnimations();
    initSmoothScroll();
    disableRightClick();
    initLoadingAnimation();
    initMobileAdjustments();
    highlightWeddingDate();
    
    // console.log('✅ Website đã sẵn sàng!');
    // console.log('💝 Chúc mừng Minh Trường & Phương Quyên!');
});

// ===================================
// UTILITY FUNCTIONS
// ===================================

// Copy text to clipboard
function copyToClipboard(text) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
            alert('Đã copy: ' + text);
        });
    } else {
        // Fallback cho trình duyệt cũ
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        alert('Đã copy: ' + text);
    }
}

// Thêm sự kiện copy cho số tài khoản
document.addEventListener('DOMContentLoaded', () => {
    const accountNumbers = document.querySelectorAll('#HEADLINE132, #HEADLINE135');
    accountNumbers.forEach(el => {
        el.style.cursor = 'pointer';
        el.title = 'Click để copy số tài khoản';
        el.addEventListener('click', () => {
            const accountNumber = el.textContent.trim();
            copyToClipboard(accountNumber);
        });
    });
});

