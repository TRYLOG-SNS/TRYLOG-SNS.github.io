// ===================================
// TRYLOG - Profile Page (Material Design 3)
// ===================================
import { currentUser, failurePosts, goalPosts } from '../data/sample.js';

let activeProfileTab = 'all';

function renderStatBox(label, value) {
  return `
  <div style="text-align:center;flex:1;">
    <p class="md-typescale-headline-small" style="font-weight:800;color:var(--md-sys-color-on-surface);margin:0;">${value}</p>
    <p class="md-typescale-label-medium" style="color:var(--md-sys-color-outline);margin:2px 0 0;">${label}</p>
  </div>`;
}

export function renderProfile() {
  const user = currentUser;
  const tabs = [
    { id: 'all', label: 'すべて' },
    { id: 'failure', label: '失敗' },
    { id: 'goal', label: '目標' },
  ];

  return `
  <!-- Profile Hero (Tonal Surface Container) -->
  <div style="
    background:var(--md-sys-color-surface-container-high);
    padding:20px 16px 16px;
    border-bottom:1px solid var(--md-sys-color-outline-variant);
  ">
    <!-- Top Action Row -->
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;">
      <h1 class="md-typescale-title-large" style="color:var(--md-sys-color-on-surface);margin:0;">マイページ</h1>
      <button id="settings-btn" class="icon-btn" aria-label="設定" style="background:var(--md-sys-color-surface-container-highest);border:none;color:var(--md-sys-color-on-surface);cursor:pointer;padding:8px;border-radius:50%;display:flex;align-items:center;">
        <span class="material-symbols-rounded">settings</span>
      </button>
    </div>

    <!-- User Header Info -->
    <div style="display:flex;align-items:center;gap:16px;margin-bottom:16px;">
      <div style="position:relative;">
        <div style="
          width:76px;height:76px;border-radius:50%;
          background:${user.avatarColor};
          display:flex;align-items:center;justify-content:center;
          font-size:30px;font-weight:700;color:white;
          box-shadow:var(--md-sys-elevation-level2);
        ">${user.avatarInitial}</div>
        <div style="
          position:absolute;bottom:0;right:0;
          width:22px;height:22px;border-radius:50%;
          background:var(--md-sys-color-tertiary);
          border:2px solid var(--md-sys-color-surface-container-high);
          display:flex;align-items:center;justify-content:center;
          color:white;
        ">
          <span class="material-symbols-rounded" style="font-size:13px;font-weight:700;">check</span>
        </div>
      </div>
      
      <div style="flex:1;min-width:0;">
        <h2 class="md-typescale-title-large" style="color:var(--md-sys-color-on-surface);margin-bottom:2px;">${user.name}</h2>
        <p class="md-typescale-body-medium" style="color:var(--md-sys-color-outline);margin:0;">${user.username}</p>
      </div>

      <button id="edit-profile-btn" class="md-btn md-btn-outlined" style="border-radius:var(--md-sys-shape-corner-full);height:36px;padding:0 16px;">
        編集
      </button>
    </div>

    <!-- Bio -->
    <p class="md-typescale-body-medium" style="color:var(--md-sys-color-on-surface-variant);line-height:1.5;margin-bottom:14px;">${user.bio}</p>

    <!-- Meta Chips -->
    <div style="display:flex;gap:12px;margin-bottom:16px;flex-wrap:wrap;">
      <span class="md-typescale-body-small" style="color:var(--md-sys-color-outline);display:flex;align-items:center;gap:4px;">
        <span class="material-symbols-rounded" style="font-size:16px;">location_on</span>
        ${user.location}
      </span>
      <span class="md-typescale-body-small" style="color:var(--md-sys-color-outline);display:flex;align-items:center;gap:4px;">
        <span class="material-symbols-rounded" style="font-size:16px;">calendar_today</span>
        ${user.joinDate} から
      </span>
    </div>

    <!-- Stats Card -->
    <div class="md-card md-card-outlined" style="padding:16px 8px;display:flex;background:var(--md-sys-color-surface);">
      ${renderStatBox('投稿', user.postsCount)}
      <div style="width:1px;background:var(--md-sys-color-outline-variant);"></div>
      ${renderStatBox('フォロワー', user.followersCount)}
      <div style="width:1px;background:var(--md-sys-color-outline-variant);"></div>
      ${renderStatBox('フォロー中', user.followingCount)}
    </div>
  </div>

  <!-- Challenge Summary Cards Grid -->
  <div style="padding:16px;background:var(--md-sys-color-surface);">
    <h3 class="md-typescale-title-medium" style="color:var(--md-sys-color-on-surface);margin-bottom:12px;">挑戦サマリー</h3>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">
      <div class="md-card md-card-filled" style="padding:12px;background:var(--md-sys-color-secondary-container);color:var(--md-sys-color-on-secondary-container);display:flex;align-items:center;gap:10px;">
        <span style="font-size:26px;">😤</span>
        <div>
          <p class="md-typescale-title-large" style="font-weight:800;margin:0;">5回</p>
          <p class="md-typescale-label-medium" style="margin:0;opacity:0.85;">記録した失敗</p>
        </div>
      </div>
      <div class="md-card md-card-filled" style="padding:12px;background:var(--md-sys-color-primary-container);color:var(--md-sys-color-on-primary-container);display:flex;align-items:center;gap:10px;">
        <span style="font-size:26px;">🎯</span>
        <div>
          <p class="md-typescale-title-large" style="font-weight:800;margin:0;">3回</p>
          <p class="md-typescale-label-medium" style="margin:0;opacity:0.85;">宣言した目標</p>
        </div>
      </div>
    </div>
  </div>

  <!-- Profile Tabs -->
  <div class="md-tab-bar" style="background:var(--md-sys-color-surface);border-bottom:1px solid var(--md-sys-color-outline-variant);">
    ${tabs.map(tab => `
      <button class="md-tab profile-tab ${activeProfileTab === tab.id ? 'active' : ''}" data-tab="${tab.id}">
        <span>${tab.label}</span>
      </button>
    `).join('')}
  </div>

  <!-- Profile Posts Container -->
  <div id="profile-posts" style="padding:16px;">
    ${renderProfilePosts(activeProfileTab)}
  </div>`;
}

function renderProfilePosts(tab) {
  const posts = tab === 'goal'
    ? goalPosts
    : tab === 'failure'
    ? failurePosts.slice(0, 3)
    : [...failurePosts.slice(0, 2), ...goalPosts.slice(0, 1)];

  if (posts.length === 0) {
    return `<div style="text-align:center;padding:32px;color:var(--md-sys-color-outline);">
      <span class="material-symbols-rounded" style="font-size:48px;">article</span>
      <p>投稿はまだありません</p>
    </div>`;
  }

  return posts.map(post => {
    const isGoal = post.type === 'goal';

    return `
    <article class="md-card md-card-outlined" style="margin-bottom:12px;">
      <div style="padding:16px;">
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px;">
          <span class="md-chip" style="font-size:11px;height:24px;background:${isGoal ? 'var(--md-sys-color-primary-container)' : 'var(--md-sys-color-secondary-container)'};color:${isGoal ? 'var(--md-sys-color-on-primary-container)' : 'var(--md-sys-color-on-secondary-container)'};border:none;font-weight:700;">
            ${isGoal ? '目標' : '失敗'}
          </span>
          <span class="md-typescale-body-small" style="color:var(--md-sys-color-outline);">${post.postedAt}</span>
        </div>
        <h4 class="md-typescale-title-medium" style="color:var(--md-sys-color-on-surface);margin-bottom:6px;">
          ${isGoal ? post.title : post.contestName}
        </h4>
        <p class="md-typescale-body-medium" style="color:var(--md-sys-color-on-surface-variant);line-height:1.5;">
          ${post.comment}
        </p>
        <div style="margin-top:12px;display:flex;align-items:center;gap:12px;">
          <span class="md-typescale-body-small" style="color:var(--md-sys-color-outline);display:flex;align-items:center;gap:4px;">
            <span class="material-symbols-rounded" style="font-size:16px;color:var(--md-sys-color-secondary);font-variation-settings:'FILL' 1;">favorite</span>
            ${post.likes}
          </span>
          <button class="md-btn md-btn-tonal story-btn" data-story-id="${post.storyId}" style="margin-left:auto;height:32px;border-radius:var(--md-sys-shape-corner-full);font-size:12px;">
            ストーリーを見る
          </button>
        </div>
      </div>
    </article>`;
  }).join('');
}

export function attachEvents() {
  document.getElementById('settings-btn')?.addEventListener('click', () => {
    const { navigate } = window.__trylog || {};
    if (navigate) navigate('setup');
  });

  document.getElementById('edit-profile-btn')?.addEventListener('click', () => {
    const { showToast } = window.__trylog || {};
    if (showToast) showToast('プロフィール編集モーダル', 'edit');
  });

  document.querySelectorAll('.profile-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      activeProfileTab = btn.dataset.tab;
      document.querySelectorAll('.profile-tab').forEach(b => {
        b.classList.toggle('active', b.dataset.tab === activeProfileTab);
      });
      const container = document.getElementById('profile-posts');
      if (container) {
        container.innerHTML = renderProfilePosts(activeProfileTab);
        attachStoryBtns();
      }
    });
  });

  attachStoryBtns();
}

function attachStoryBtns() {
  document.querySelectorAll('.story-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const { navigate } = window.__trylog || {};
      if (navigate) navigate('story', { storyId: btn.dataset.storyId, from: 'profile' });
    });
  });
}
