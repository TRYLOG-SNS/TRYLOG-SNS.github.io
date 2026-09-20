// ===================================
// TRYLOG - Notifications Page (Material Design 3)
// ===================================
import { notifications, getUserById } from '../data/sample.js';

const notifIcons = {
  like: { icon: 'favorite', color: 'var(--md-sys-color-secondary)', bg: 'var(--md-sys-color-secondary-container)' },
  comment: { icon: 'chat_bubble', color: 'var(--md-sys-color-primary)', bg: 'var(--md-sys-color-primary-container)' },
  follow: { icon: 'person_add', color: 'var(--md-sys-color-tertiary)', bg: 'var(--md-sys-color-tertiary-container)' },
  result: { icon: 'emoji_events', color: 'var(--md-sys-color-primary)', bg: 'var(--md-sys-color-primary-container)' },
};

export function renderNotifications() {
  const unreadCount = notifications.filter(n => !n.read).length;

  return `
  <!-- M3 Top App Bar -->
  <header class="md-top-app-bar" style="position:sticky;top:0;z-index:50;background:var(--md-sys-color-surface);border-bottom:1px solid var(--md-sys-color-outline-variant);">
    <div>
      <h1 class="md-typescale-title-large" style="color:var(--md-sys-color-on-surface);margin:0;">通知</h1>
      ${unreadCount > 0 ? `<p class="md-typescale-body-small" style="color:var(--md-sys-color-secondary);margin:0;font-weight:700;">${unreadCount}件の未読通知</p>` : ''}
    </div>
    <button id="mark-all-read" class="md-btn md-btn-text" style="color:var(--md-sys-color-primary);">
      すべて既読
    </button>
  </header>

  <!-- Notifications List -->
  <div style="padding:8px 0;">
    ${notifications.map(notif => {
      const user = getUserById(notif.userId);
      const config = notifIcons[notif.type] || notifIcons.like;
      return `
      <div class="notif-item" data-id="${notif.id}" style="
        display:flex;align-items:center;gap:14px;
        padding:16px;
        background:${notif.read ? 'var(--md-sys-color-surface)' : 'var(--md-sys-color-surface-container-low)'};
        border-bottom:1px solid var(--md-sys-color-outline-variant);
        cursor:pointer;transition:background 200ms;
        position:relative;
      ">
        ${!notif.read ? `<div style="
          position:absolute;left:6px;top:50%;transform:translateY(-50%);
          width:6px;height:6px;border-radius:50%;
          background:var(--md-sys-color-primary);
        "></div>` : ''}

        <!-- User Avatar & Badge -->
        <div style="position:relative;flex-shrink:0;">
          <div style="
            width:46px;height:46px;border-radius:50%;
            background:${user?.avatarColor || 'var(--md-sys-color-primary)'};
            display:flex;align-items:center;justify-content:center;
            font-size:18px;font-weight:700;color:white;
          ">${user?.avatarInitial || '?'}</div>
          
          <div style="
            position:absolute;bottom:-2px;right:-2px;
            width:22px;height:22px;border-radius:50%;
            background:${config.bg};
            border:2px solid var(--md-sys-color-surface);
            display:flex;align-items:center;justify-content:center;
          ">
            <span class="material-symbols-rounded" style="font-size:14px;color:${config.color};font-variation-settings:'FILL' 1;">${config.icon}</span>
          </div>
        </div>

        <!-- Notification Message Content -->
        <div style="flex:1;min-width:0;">
          <p class="md-typescale-body-medium" style="color:var(--md-sys-color-on-surface);line-height:1.4;margin-bottom:2px;">
            <strong style="font-weight:700;">${user?.name}</strong>さんが${notif.message}
          </p>
          <p class="md-typescale-body-small" style="color:var(--md-sys-color-outline);margin:0;">${notif.time}</p>
        </div>
      </div>`;
    }).join('')}
  </div>

  <div style="padding:24px;text-align:center;">
    <p class="md-typescale-body-small" style="color:var(--md-sys-color-outline);">過去7日間の通知が表示されています</p>
  </div>`;
}

export function attachEvents() {
  document.getElementById('mark-all-read')?.addEventListener('click', () => {
    notifications.forEach(n => n.read = true);
    document.querySelectorAll('.notif-item').forEach(el => {
      el.style.background = 'var(--md-sys-color-surface)';
      el.querySelector('div[style*="width:6px"]')?.remove();
    });
    const { showToast } = window.__trylog || {};
    if (showToast) showToast('すべての通知を既読にしました', 'done_all');
  });

  document.querySelectorAll('.notif-item').forEach(el => {
    el.addEventListener('click', () => {
      const id = el.dataset.id;
      const notif = notifications.find(n => n.id === id);
      if (notif) notif.read = true;
      el.style.background = 'var(--md-sys-color-surface)';
      el.querySelector('div[style*="width:6px"]')?.remove();
    });
  });
}
