// ===================================
// TRYLOG - Router & App Shell
// ===================================
import './styles/main.css';
import { currentUser } from './data/sample.js';
import { renderHome, attachEvents as homeEvents } from './pages/home.js';
import { renderSetup, attachEvents as setupEvents } from './pages/setup.js';
import { renderProfile, attachEvents as profileEvents } from './pages/profile.js';
import { renderStoryDetail, attachEvents as storyEvents } from './pages/storyDetail.js';
import { renderPostFailure, attachEvents as postFailureEvents } from './pages/postFailure.js';
import { renderPostGoal, attachEvents as postGoalEvents } from './pages/postGoal.js';
import { renderSearch, attachEvents as searchEvents } from './pages/search.js';
import { renderNotifications, attachEvents as notifEvents } from './pages/notifications.js';

// ===================================
// State
// ===================================
export const appState = {
  currentPage: 'home',
  pageParams: {},
  user: { ...currentUser },
};

// ===================================
// Navigation
// ===================================
const navItems = [
  { id: 'home', icon: 'home', label: 'ホーム' },
  { id: 'search', icon: 'search', label: '探す' },
  { id: 'post', icon: 'add', label: null, isAction: true },
  { id: 'notifications', icon: 'notifications', label: '通知' },
  { id: 'profile', icon: 'person', label: 'マイページ' },
];

function renderBottomNav() {
  const nav = document.getElementById('bottom-nav');
  if (!nav) return;

  nav.innerHTML = navItems.map(item => {
    if (item.isAction) {
      return `<div class="nav-item-post" id="nav-post" role="button" aria-label="投稿する">
        <span class="material-symbols-rounded">add</span>
      </div>`;
    }
    const isActive = appState.currentPage === item.id;
    return `<div class="nav-item ${isActive ? 'active' : ''}" data-page="${item.id}" role="button" aria-label="${item.label}">
      <span class="material-symbols-rounded nav-icon">${item.icon}</span>
      <span class="nav-label">${item.label}</span>
    </div>`;
  }).join('');

  // Events
  nav.querySelectorAll('.nav-item[data-page]').forEach(el => {
    el.addEventListener('click', () => navigate(el.dataset.page));
  });

  nav.querySelector('#nav-post')?.addEventListener('click', () => {
    showPostMenu();
  });
}

// ===================================
// Post Type Menu (bottom sheet)
// ===================================
function showPostMenu() {
  const existing = document.getElementById('post-menu-overlay');
  if (existing) existing.remove();

  const overlay = document.createElement('div');
  overlay.id = 'post-menu-overlay';
  overlay.style.cssText = `
    position: fixed; inset: 0; z-index: 250;
    background: rgba(0,0,0,0.4);
    display: flex; align-items: flex-end; justify-content: center;
    animation: fadeInOverlay 200ms ease forwards;
  `;

  overlay.innerHTML = `
    <div style="
      background: white;
      border-radius: 24px 24px 0 0;
      padding: 8px 20px 36px;
      width: 100%;
      max-width: 430px;
      animation: slideUpSheet 300ms cubic-bezier(0.34,1.56,0.64,1) forwards;
    ">
      <div style="width:40px;height:4px;background:#E5E7EB;border-radius:4px;margin:0 auto 20px;"></div>
      <p style="font-size:11px;font-weight:700;color:#9CA3AF;letter-spacing:0.08em;text-transform:uppercase;margin-bottom:12px;">投稿タイプを選択</p>
      <div style="display:flex;flex-direction:column;gap:10px;">
        <button id="menu-failure" style="
          display:flex;align-items:center;gap:14px;
          padding:16px;border-radius:16px;
          background:linear-gradient(135deg,#FFF0F0,#FFE0E0);
          border:none;cursor:pointer;text-align:left;
          transition:transform 150ms;
        ">
          <div style="width:44px;height:44px;border-radius:12px;background:linear-gradient(135deg,#FF6B6B,#FF8E53);display:flex;align-items:center;justify-content:center;flex-shrink:0;">
            <span class="material-symbols-rounded" style="color:white;font-size:22px;font-variation-settings:'FILL' 1,'wght' 600,'GRAD' 0,'opsz' 24">sentiment_dissatisfied</span>
          </div>
          <div style="flex:1;">
            <p style="font-size:15px;font-weight:700;color:#1A1A2E;margin-bottom:2px;">失敗を記録する</p>
            <p style="font-size:12px;color:#6B7280;">コンクール・大会の結果を共有</p>
          </div>
          <span class="material-symbols-rounded" style="color:#9CA3AF;flex-shrink:0;">chevron_right</span>
        </button>
        <button id="menu-goal" style="
          display:flex;align-items:center;gap:14px;
          padding:16px;border-radius:16px;
          background:linear-gradient(135deg,#F0F4FF,#E0EAFF);
          border:none;cursor:pointer;text-align:left;
          transition:transform 150ms;
        ">
          <div style="width:44px;height:44px;border-radius:12px;background:linear-gradient(135deg,#4F8EF7,#7B6FF0);display:flex;align-items:center;justify-content:center;flex-shrink:0;">
            <span class="material-symbols-rounded" style="color:white;font-size:22px;font-variation-settings:'FILL' 1,'wght' 600,'GRAD' 0,'opsz' 24">flag</span>
          </div>
          <div style="flex:1;">
            <p style="font-size:15px;font-weight:700;color:#1A1A2E;margin-bottom:2px;">目標を立てる</p>
            <p style="font-size:12px;color:#6B7280;">次の挑戦への目標を宣言</p>
          </div>
          <span class="material-symbols-rounded" style="color:#9CA3AF;flex-shrink:0;">chevron_right</span>
        </button>
      </div>
    </div>
    <style>
      @keyframes fadeInOverlay { from{opacity:0} to{opacity:1} }
      @keyframes slideUpSheet { from{transform:translateY(100%)} to{transform:translateY(0)} }
    </style>
  `;

  overlay.addEventListener('click', e => {
    if (e.target === overlay) overlay.remove();
  });

  overlay.querySelector('#menu-failure').addEventListener('click', () => {
    overlay.remove();
    navigate('post-failure');
  });

  overlay.querySelector('#menu-goal').addEventListener('click', () => {
    overlay.remove();
    navigate('post-goal');
  });

  document.body.appendChild(overlay);
}

// ===================================
// Page Renderers + Event Attachers map
// ===================================
const pageMap = {
  home: { render: renderHome, events: homeEvents },
  search: { render: renderSearch, events: searchEvents },
  notifications: { render: renderNotifications, events: notifEvents },
  profile: { render: renderProfile, events: profileEvents },
  setup: { render: renderSetup, events: setupEvents },
  'post-failure': { render: renderPostFailure, events: postFailureEvents },
  'post-goal': { render: renderPostGoal, events: postGoalEvents },
  story: { render: renderStoryDetail, events: storyEvents },
};

const noNavPages = ['setup', 'post-failure', 'post-goal'];

// ===================================
// Navigate
// ===================================
export function navigate(page, params = {}) {
  appState.currentPage = page;
  appState.pageParams = params;

  // Scroll to top
  const container = document.getElementById('page-container');
  if (container) container.scrollTop = 0;

  // Nav visibility
  const nav = document.getElementById('bottom-nav');
  if (nav) {
    nav.style.display = noNavPages.includes(page) ? 'none' : 'flex';
  }

  // Re-render nav active state
  if (!noNavPages.includes(page)) {
    renderBottomNav();
  }

  // Render page
  const entry = pageMap[page];
  if (entry && container) {
    container.innerHTML = entry.render(params);
    container.classList.remove('page-enter');
    void container.offsetWidth;
    container.classList.add('page-enter');

    // Attach events
    if (entry.events) {
      entry.events(params);
    }
  }
}

// ===================================
// Toast
// ===================================
export function showToast(message, icon = 'check_circle', duration = 3000) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const iconColor = icon === 'error' ? '#FF6B6B' : '#6BCB77';
  const displayIcon = icon === 'error' ? 'error' : icon;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<span class="material-symbols-rounded" style="font-size:18px;color:${iconColor};font-variation-settings:'FILL' 1,'wght' 500,'GRAD' 0,'opsz' 20">${displayIcon}</span>${message}`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('fade-out');
    setTimeout(() => toast.remove(), 300);
  }, duration);
}

// ===================================
// Expose globals for page modules
// ===================================
window.__trylog = { navigate, showToast, _getAppState: () => appState };

// ===================================
// Init
// ===================================
function init() {
  renderBottomNav();

  // Always show setup for new users, home otherwise
  if (!appState.user.isSetupDone) {
    navigate('setup');
  } else {
    navigate('home');
  }
}

init();
