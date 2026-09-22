// ===================================
// TRYLOG - Profile Page (Material Design 3)
// ===================================
import { currentUser, failurePosts, goalPosts, processPosts, resultPosts, getStoryByUserId } from '../data/sample.js';

let activeProfileTab = 'all';

function renderStatBox(label, value) {
  return `
  <div style="text-align:center;flex:1;">
    <p class="md-typescale-headline-small" style="font-weight:800;color:var(--md-sys-color-on-surface);margin:0;">${value}</p>
    <p class="md-typescale-label-medium" style="color:var(--md-sys-color-outline);margin:2px 0 0;">${label}</p>
  </div>`;
}

function getVisibilityLabel(vis, type) {
  if (type === 'bio') {
    if (vis === 'public') return '🌐 全体公開';
    if (vis === 'friends') return '👥 フレンドのみ';
    return '🚫 非公開（自己紹介なし）';
  }
  if (type === 'age') {
    if (vis === 'public') return '🌐 全体公開';
    if (vis === 'friends') return '👥 フレンドのみ';
    return '🔒 非公開';
  }
  return '';
}

export function renderProfile() {
  const user = currentUser;
  const tabs = [
    { id: 'all', label: 'すべて' },
    { id: 'failure', label: '失敗' },
    { id: 'goal', label: '目標' },
  ];

  // User posts count
  const myFailures = failurePosts.filter(p => p.userId === user.id);
  const myGoals = goalPosts.filter(p => p.userId === user.id);
  const totalMyPosts = myFailures.length + myGoals.length;

  return `
  <!-- Profile Hero Container -->
  <div style="
    background:var(--md-sys-color-surface-container-high);
    padding:20px 16px 16px;
    border-bottom:1px solid var(--md-sys-color-outline-variant);
  ">
    <!-- Top Action Row -->
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;">
      <h1 class="md-typescale-title-large" style="color:var(--md-sys-color-on-surface);margin:0;">マイページ</h1>
      <button id="settings-btn" class="icon-btn" aria-label="初期設定変更" style="background:var(--md-sys-color-surface-container-highest);border:none;color:var(--md-sys-color-on-surface);cursor:pointer;padding:8px;border-radius:50%;display:flex;align-items:center;">
        <span class="material-symbols-rounded">settings</span>
      </button>
    </div>

    <!-- User Header Info (Icon, Name, Username) -->
    <div style="display:flex;align-items:center;gap:16px;margin-bottom:16px;">
      <div style="position:relative;">
        <div style="
          width:76px;height:76px;border-radius:50%;
          background:${user.avatarColor || '#4F8EF7'};
          display:flex;align-items:center;justify-content:center;
          font-size:32px;font-weight:700;color:white;
          box-shadow:var(--md-sys-elevation-level2);
        ">${user.avatarInitial || '葵'}</div>
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
        
        <!-- Topic Badge -->
        <div style="margin-top:4px;">
          <span class="md-chip" style="font-size:11px;padding:2px 10px;height:22px;background:var(--md-sys-color-primary-container);color:var(--md-sys-color-on-primary-container);border:none;font-weight:700;">
            🎯 ${user.topic || '音楽'}
          </span>
        </div>
      </div>

      <button id="edit-profile-btn" class="md-btn md-btn-outlined" style="border-radius:var(--md-sys-shape-corner-full);height:36px;padding:0 16px;">
        編集
      </button>
    </div>

    <!-- Bio (With Privacy Tag) -->
    ${user.bioVisibility !== 'none' && user.bio ? `
    <div style="margin-bottom:12px;">
      <p class="md-typescale-body-medium" style="color:var(--md-sys-color-on-surface-variant);line-height:1.5;margin-bottom:4px;">${user.bio}</p>
      <span style="font-size:10px;color:var(--md-sys-color-outline);">${getVisibilityLabel(user.bioVisibility, 'bio')}</span>
    </div>` : `
    <p class="md-typescale-body-small" style="color:var(--md-sys-color-outline);font-style:italic;margin-bottom:12px;">※自己紹介未設定（非公開）</p>`}

    <!-- Meta Chips (Age Group, Topic Category, Join Date - NO fake location) -->
    <div style="display:flex;gap:10px;margin-bottom:16px;flex-wrap:wrap;align-items:center;">
      <span class="md-typescale-body-small" style="color:var(--md-sys-color-outline);display:flex;align-items:center;gap:4px;">
        <span class="material-symbols-rounded" style="font-size:16px;">cake</span>
        ${user.ageGroup || '20代'} (${getVisibilityLabel(user.ageGroupVisibility, 'age')})
      </span>
      <span class="md-typescale-body-small" style="color:var(--md-sys-color-outline);display:flex;align-items:center;gap:4px;">
        <span class="material-symbols-rounded" style="font-size:16px;">calendar_today</span>
        ${user.joinDate || '2024年3月'} から利用
      </span>
    </div>

    <!-- Stats Card -->
    <div class="md-card md-card-outlined" style="padding:16px 8px;display:flex;background:var(--md-sys-color-surface);">
      ${renderStatBox('投稿', totalMyPosts || user.postsCount)}
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
          <p class="md-typescale-title-large" style="font-weight:800;margin:0;">${myFailures.length}回</p>
          <p class="md-typescale-label-medium" style="margin:0;opacity:0.85;">記録した失敗</p>
        </div>
      </div>
      <div class="md-card md-card-filled" style="padding:12px;background:var(--md-sys-color-primary-container);color:var(--md-sys-color-on-primary-container);display:flex;align-items:center;gap:10px;">
        <span style="font-size:26px;">🎯</span>
        <div>
          <p class="md-typescale-title-large" style="font-weight:800;margin:0;">${myGoals.length}回</p>
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
  const user = currentUser;
  const myFailures = failurePosts.filter(p => p.userId === user.id);
  const myGoals = goalPosts.filter(p => p.userId === user.id);

  let posts = [];
  if (tab === 'goal') {
    posts = myGoals;
  } else if (tab === 'failure') {
    posts = myFailures;
  } else {
    posts = [...myFailures, ...myGoals];
  }

  // Fallback to sample posts if user has no specific posts yet
  if (posts.length === 0) {
    if (tab === 'goal') posts = goalPosts.slice(0, 1);
    else if (tab === 'failure') posts = failurePosts.slice(0, 1);
    else posts = [...failurePosts.slice(0, 1), ...goalPosts.slice(0, 1)];
  }

  if (posts.length === 0) {
    return `<div style="text-align:center;padding:32px;color:var(--md-sys-color-outline);">
      <span class="material-symbols-rounded" style="font-size:48px;">article</span>
      <p>投稿はまだありません</p>
    </div>`;
  }

  return posts.map(post => {
    const isGoal = post.type === 'goal';
    const storyId = post.storyId || 'story_01';

    return `
    <article class="md-card md-card-outlined" style="margin-bottom:12px;">
      <div style="padding:16px;">
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px;">
          <span class="md-chip" style="font-size:11px;height:24px;background:${isGoal ? 'var(--md-sys-color-primary-container)' : 'var(--md-sys-color-secondary-container)'};color:${isGoal ? 'var(--md-sys-color-on-primary-container)' : 'var(--md-sys-color-on-secondary-container)'};border:none;font-weight:700;">
            ${isGoal ? '🎯 目標宣言' : '💪 失敗の記録'}
          </span>
          <span class="md-typescale-body-small" style="color:var(--md-sys-color-outline);">${post.postedAt}</span>
        </div>
        <h4 class="md-typescale-title-medium" style="color:var(--md-sys-color-on-surface);margin-bottom:6px;">
          ${isGoal ? post.title : post.contestName}
        </h4>
        <p class="md-typescale-body-medium" style="color:var(--md-sys-color-on-surface-variant);line-height:1.5;">
          ${post.comment || post.cause || ''}
        </p>
        <div style="margin-top:12px;display:flex;align-items:center;gap:12px;">
          <span class="md-typescale-body-small" style="color:var(--md-sys-color-outline);display:flex;align-items:center;gap:4px;">
            <span class="material-symbols-rounded" style="font-size:16px;color:var(--md-sys-color-secondary);font-variation-settings:'FILL' 1;">favorite</span>
            ${post.likes || 0}
          </span>
          <button class="md-btn md-btn-tonal story-btn" data-story-id="${storyId}" style="margin-left:auto;height:32px;border-radius:var(--md-sys-shape-corner-full);font-size:12px;">
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
    const { navigate } = window.__trylog || {};
    if (navigate) navigate('setup');
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
