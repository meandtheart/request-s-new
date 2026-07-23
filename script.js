// =========================================================================
// 1. INTERACTIVE WHEEL ROTATION CONTROL
// =========================================================================
const container = document.getElementById('wheelContainer');
const wheel = document.getElementById('spinningWheel');
let currentRotation = 0;
let lastTouchY = 0;

function applyWheelRotation() {
    if (!wheel) return;
    wheel.style.transform = `rotate(${currentRotation}deg)`;
    wheel.style.setProperty('--rotation', `${currentRotation}deg`);
}

if (container && wheel) {
    // Desktop mouse wheel scroll rotation
    container.addEventListener('wheel', (e) => {
        e.preventDefault();
        currentRotation += e.deltaY * 0.2;
        applyWheelRotation();
    }, { passive: false });

    // Mobile touch controls start track
    container.addEventListener('touchstart', (e) => {
        lastTouchY = e.touches[0].clientY;
    }, { passive: true });

    // Mobile drag swipe rotation logic with scroll prevention
    container.addEventListener('touchmove', (e) => {
        if (e.cancelable) {
            e.preventDefault();
        }
        const currentTouchY = e.touches[0].clientY;
        const deltaY = lastTouchY - currentTouchY;
        currentRotation += deltaY * 0.5;
        applyWheelRotation();
        lastTouchY = currentTouchY;
    }, { passive: false });
}

// =========================================================================
// 2. SHOPPING CART LIVE QUANTITY TRACKER
// =========================================================================
function updateCartBadge() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    const totalItems = cart.reduce((sum, item) => {
        return sum + (item.quantity || 1);
    }, 0);

    const badge = document.getElementById('cartCount');

    if (!badge) return;

    if (totalItems > 0) {
        badge.textContent = totalItems;
        badge.style.display = 'flex';
        badge.style.opacity = '1';
    } else {
        badge.textContent = '';
        badge.style.display = 'none';
        badge.style.opacity = '0';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    updateCartBadge();
});
