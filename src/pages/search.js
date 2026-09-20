// ===================================
// TRYLOG - Search Page (Material Design 3)
// ===================================
import { users, failurePosts, getUserById } from '../data/sample.js';

const trendingCategories = [
  { icon: '🎹', label: '音楽', count: 234 },
  { icon: '🏊', label: '水泳', count: 189 },
  { icon: '🏃', label: '陸上', count: 156 },
  { icon: '💃', label: 'ダンス', count: 143 },
  { icon: '⚽', label: 'スポーツ', count: 310 },
  { icon: '📝', label: '資格・試験', count: 98 },
];

export function renderSearch() {
  return `
  <!-- Top Search Bar Container -->
  <header style="
    position:sticky;top:0;z-index:50;
    padding:12px 16px;
    background:var(--md-sys-color-surface);
    border-bottom:1px solid var(--md-sys-color-outline-variant);
  ">
    <div style="position:relative;">
      <span class="material-symbols-rounded" style="
        position:absolute;left:16px;top:50%;transform:translateY(-50%);
        font-size:22px;color:var(--md-sys-color-on-surface-variant);
      ">search</span>
      <input id="search-input" type="text" placeholder="キーワード・ユーザー・挑戦を検索..." style="
        width:100%;padding:14px 16px 14px 48px;
        border-radius:var(--md-sys-shape-corner-full);border:none;
        background:var(--md-sys-color-surface-container-high);
        font-size:15px;color:var(--md-sys-color-on-surface);
        outline:none;
      " />
    </div>
  </header>

  <div style="padding:16px;">
    <!-- Category Chips Grid -->
    <h3 class="md-typescale-title-medium" style="color:var(--md-sys-color-on-surface);margin-bottom:12px;">人気カテゴリー</h3>
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-bottom:24px;">
      ${trendingCategories.map(cat => `
      <button class="md-card md-card-outlined category-search-btn" data-label="${cat.label}" style="
        padding:14px 8px;border-radius:var(--md-sys-shape-corner-medium);
        background:var(--md-sys-color-surface);cursor:pointer;
        display:flex;flex-direction:column;align-items:center;gap:6px;
        text-align:center;
      ">
        <span style="font-size:28px;">${cat.icon}</span>
        <span class="md-typescale-label-large" style="color:var(--md-sys-color-on-surface);">${cat.label}</span>
        <span class="md-typescale-body-small" style="color:var(--md-sys-color-outline);">${cat.count}件</span>
      </button>`).join('')}
    </div>

    <!-- Suggested Users List -->
    <h3 class="md-typescale-title-medium" style="color:var(--md-sys-color-on-surface);margin-bottom:12px;">おすすめのチャレンジャー</h3>
    <div style="display:flex;flex-direction:column;gap:10px;margin-bottom:24px;">
      ${users.slice(0,4).map(user => `
      <div class="md-card md-card-outlined" style="padding:14px 16px;display:flex;align-items:center;gap:14px;">
        <div style="
          width:44px;height:44px;border-radius:50%;
          background:${user.avatarColor};
          display:flex;align-items:center;justify-content:center;
          font-size:18px;font-weight:700;color:white;flex-shrink:0;
        ">${user.avatarInitial}</div>
        
        <div style="flex:1;min-width:0;">
          <h4 class="md-typescale-title-medium" style="color:var(--md-sys-color-on-surface);margin-bottom:2px;">${user.name}</h4>
          <p class="md-typescale-body-small" style="color:var(--md-sys-color-outline);margin:0;">${user.username} · ${user.followersCount}フォロワー</p>
          <p class="md-typescale-body-medium" style="color:var(--md-sys-color-on-surface-variant);margin-top:2px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${user.bio}</p>
        </div>

        <button class="md-btn ${user.isFollowing ? 'md-btn-outlined' : 'md-btn-filled'} follow-btn" data-user-id="${user.id}" style="
          border-radius:var(--md-sys-shape-corner-full);height:36px;padding:0 14px;font-size:12px;
          ${user.isFollowing ? '' : 'background:var(--md-sys-color-primary);color:var(--md-sys-color-on-primary);'}
        ">${user.isFollowing ? 'フォロー中' : 'フォロー'}</button>
      </div>`).join('')}
    </div>

    <!-- Featured Failure Posts -->
    <h3 class="md-typescale-title-medium" style="color:var(--md-sys-color-on-surface);margin-bottom:12px;">注目の挑戦記録</h3>
    <div style="display:flex;flex-direction:column;gap:10px;">
      ${failurePosts.slice(0,3).map(post => {
        const user = getUserById(post.userId);
        return `
        <div class="md-card md-card-outlined" style="padding:14px 16px;">
          <div style="display:flex;align-items:center;gap:10px;margin-bottom:8px;">
            <div style="
              width:32px;height:32px;border-radius:50%;
              background:${user?.avatarColor || 'var(--md-sys-color-primary)'};
              display:flex;align-items:center;justify-content:center;
              font-size:13px;font-weight:700;color:white;
            ">${user?.avatarInitial || '?'}</div>
            <span class="md-typescale-title-medium" style="color:var(--md-sys-color-on-surface);">${user?.name}</span>
            <span class="md-typescale-body-small" style="color:var(--md-sys-color-outline);margin-left:auto;">${post.postedAt}</span>
          </div>
          <h4 class="md-typescale-title-medium" style="color:var(--md-sys-color-on-surface);margin-bottom:4px;">${post.contestName}</h4>
          <p class="md-typescale-body-medium" style="color:var(--md-sys-color-on-surface-variant);margin:0;">結果：${post.result}</p>
        </div>`;
      }).join('')}
    </div>
  </div>`;
}

export function attachEvents() {
  document.querySelectorAll('.follow-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const userId = btn.dataset.userId;
      const user = users.find(u => u.id === userId);
      if (!user) return;
      user.isFollowing = !user.isFollowing;
      if (user.isFollowing) {
        user.followersCount++;
        btn.textContent = 'フォロー中';
        btn.className = 'md-btn md-btn-outlined follow-btn';
        btn.style.background = 'transparent';
        btn.style.color = 'var(--md-sys-color-on-surface-variant)';
        const { showToast } = window.__trylog || {};
        if (showToast) showToast(`${user.name}さんをフォローしました`, 'person_add');
      } else {
        user.followersCount--;
        btn.textContent = 'フォロー';
        btn.className = 'md-btn md-btn-filled follow-btn';
        btn.style.background = 'var(--md-sys-color-primary)';
        btn.style.color = 'var(--md-sys-color-on-primary)';
      }
    });
  });

  document.querySelectorAll('.category-search-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const { showToast } = window.__trylog || {};
      if (showToast) showToast(`「${btn.dataset.label}」カテゴリの検索結果を表示`, 'search');
    });
  });
}
