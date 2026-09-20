// ===================================
// TRYLOG - Home Page (Material Design 3)
// ===================================
import { failurePosts, users, currentUser, getUserById, getAvatarStyle } from '../data/sample.js';

function renderAvatarCircle(user, size = 'md') {
  const sizes = { sm: 36, md: 40, lg: 56 };
  const px = sizes[size] || 40;
  return `<div class="avatar-placeholder" style="${getAvatarStyle(user)};width:${px}px;height:${px}px;font-size:${Math.round(px * 0.42)}px;border-radius:50%;box-shadow:var(--md-sys-elevation-level1);">
    ${user.avatarInitial}
  </div>`;
}

function renderFailureCard(post) {
  const user = getUserById(post.userId);
  if (!user) return '';

  const liked = post.isLiked;
  return `
  <article class="md-card md-card-outlined failure-card" data-post-id="${post.id}" data-story-id="${post.storyId}" style="margin-bottom:16px;">
    <!-- Header -->
    <div style="padding:16px 16px 8px;display:flex;align-items:center;gap:12px;">
      ${renderAvatarCircle(user, 'md')}
      <div style="flex:1;min-width:0;">
        <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
          <span class="md-typescale-title-medium" style="color:var(--md-sys-color-on-surface);">${user.name}</span>
          ${post.retryIntent ? `<span class="md-chip md-chip-filter active" style="font-size:11px;padding:2px 10px;height:24px;background:var(--md-sys-color-secondary-container);color:var(--md-sys-color-on-secondary-container);border:none;">💪 再挑戦宣言</span>` : ''}
        </div>
        <span class="md-typescale-body-small" style="color:var(--md-sys-color-outline);">${post.postedAt}</span>
      </div>
      <button class="icon-btn" aria-label="詳細" style="background:transparent;border:none;color:var(--md-sys-color-outline);cursor:pointer;padding:4px;border-radius:50%;">
        <span class="material-symbols-rounded">more_vert</span>
      </button>
    </div>

    <!-- Failure Info Box (Tonal Card Container) -->
    <div style="margin:8px 16px;padding:16px;background:var(--md-sys-color-secondary-container);border-radius:var(--md-sys-shape-corner-medium);color:var(--md-sys-color-on-secondary-container);">
      <div style="display:flex;align-items:center;gap:6px;margin-bottom:6px;">
        <span class="material-symbols-rounded" style="font-size:20px;color:var(--md-sys-color-secondary);font-variation-settings:'FILL' 1;">sentiment_dissatisfied</span>
        <span class="md-typescale-label-medium" style="color:var(--md-sys-color-secondary);letter-spacing:0.05em;font-weight:700;">失敗の記録</span>
      </div>
      <h3 class="md-typescale-title-large" style="color:var(--md-sys-color-on-secondary-container);margin-bottom:4px;">${post.contestName}</h3>
      <p class="md-typescale-body-medium" style="color:var(--md-sys-color-on-secondary-container);opacity:0.9;">
        <strong style="font-weight:600;">結果：</strong>${post.result}
        <span style="margin-left:8px;font-size:12px;opacity:0.8;">(${post.experience})</span>
      </p>
    </div>

    <!-- Emotion + Comment -->
    <div style="padding:8px 16px 0;">
      <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px;">
        <span style="font-size:22px;">${post.emotionEmoji}</span>
        <span class="md-chip" style="background:var(--md-sys-color-surface-container-high);color:var(--md-sys-color-on-surface-variant);border:none;font-weight:600;">
          心情：${post.emotion}
        </span>
      </div>
      <p class="md-typescale-body-medium" style="line-height:1.6;color:var(--md-sys-color-on-surface);">${post.comment}</p>
    </div>

    <!-- Cause Container -->
    <div style="margin:12px 16px 0;padding:12px 14px;background:var(--md-sys-color-surface-container-low);border-radius:var(--md-sys-shape-corner-small);border-left:3px solid var(--md-sys-color-secondary);">
      <p class="md-typescale-label-medium" style="color:var(--md-sys-color-secondary);margin-bottom:4px;font-weight:700;">失敗の原因分析</p>
      <p class="md-typescale-body-medium" style="color:var(--md-sys-color-on-surface-variant);line-height:1.5;">${post.cause}</p>
    </div>

    <!-- Card Actions -->
    <div style="padding:12px 16px 14px;display:flex;align-items:center;gap:8px;">
      <button class="md-btn ${liked ? 'md-btn-tonal' : 'md-btn-outlined'} like-btn" data-post-id="${post.id}" style="border-radius:var(--md-sys-shape-corner-full);${liked ? 'background:var(--md-sys-color-secondary-container);color:var(--md-sys-color-on-secondary-container);border:none;' : ''}">
        <span class="material-symbols-rounded like-icon" style="font-size:18px;font-variation-settings:'FILL' ${liked ? 1 : 0}">${liked ? 'favorite' : 'favorite'}</span>
        <span class="like-count">${post.likes}</span>
      </button>

      <button class="md-btn md-btn-outlined comment-btn" data-post-id="${post.id}" style="border-radius:var(--md-sys-shape-corner-full);">
        <span class="material-symbols-rounded" style="font-size:18px;">chat_bubble</span>
        <span>${post.comments}</span>
      </button>

      <button class="md-btn md-btn-filled story-btn" data-story-id="${post.storyId}" style="margin-left:auto;border-radius:var(--md-sys-shape-corner-full);background:var(--md-sys-color-primary);color:var(--md-sys-color-on-primary);">
        <span class="material-symbols-rounded" style="font-size:18px;">auto_stories</span>
        ストーリー
      </button>
    </div>
  </article>`;
}

function renderFriendStories() {
  const friends = users.filter(u => u.isFollowing);
  return `
  <div style="padding:0 16px 8px;">
    <p class="md-typescale-title-small" style="color:var(--md-sys-color-on-surface-variant);margin-bottom:12px;letter-spacing:0.04em;">フレンドの最新挑戦</p>
    <div style="display:flex;gap:14px;overflow-x:auto;padding-bottom:6px;scrollbar-width:none;">
      ${[currentUser, ...friends].map((user, i) => {
        const isMe = i === 0;
        return `
        <div style="display:flex;flex-direction:column;align-items:center;gap:6px;cursor:pointer;flex-shrink:0;">
          <div style="position:relative;">
            <div style="
              width:62px;height:62px;border-radius:50%;
              padding:3px;
              background:${isMe ? 'linear-gradient(135deg,var(--md-sys-color-secondary),#FF8E53)' : 'linear-gradient(135deg,var(--md-sys-color-primary),var(--md-sys-color-tertiary))'};
              box-shadow:var(--md-sys-elevation-level1);
            ">
              <div style="
                width:100%;height:100%;border-radius:50%;
                background:var(--md-sys-color-surface);
                display:flex;align-items:center;justify-content:center;
              ">
                <div style="
                  width:50px;height:50px;border-radius:50%;
                  background:${user.avatarColor || 'var(--md-sys-color-primary)'};
                  display:flex;align-items:center;justify-content:center;
                  font-size:19px;font-weight:700;color:white;
                ">${user.avatarInitial}</div>
              </div>
            </div>
            ${isMe ? `<div style="
              position:absolute;bottom:0;right:0;
              width:20px;height:20px;border-radius:50%;
              background:var(--md-sys-color-primary);
              display:flex;align-items:center;justify-content:center;
              border:2px solid var(--md-sys-color-surface);
            "><span class="material-symbols-rounded" style="font-size:13px;color:white;font-weight:700;">add</span></div>` : ''}
          </div>
          <span class="md-typescale-label-medium" style="color:var(--md-sys-color-on-surface);max-width:62px;text-align:center;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">
            ${isMe ? 'あなた' : user.name.split(' ')[1] || user.name}
          </span>
        </div>`;
      }).join('')}
    </div>
  </div>`;
}

export function renderHome() {
  return `
  <!-- M3 Top App Bar -->
  <header class="md-top-app-bar" style="position:sticky;top:0;z-index:50;background:var(--md-sys-color-surface);border-bottom:1px solid var(--md-sys-color-outline-variant);">
    <div style="display:flex;align-items:center;gap:12px;">
      <div style="width:36px;height:36px;border-radius:var(--md-sys-shape-corner-medium);background:var(--md-sys-color-primary);display:flex;align-items:center;justify-content:center;color:var(--md-sys-color-on-primary);font-weight:900;font-size:18px;">T</div>
      <div>
        <h1 class="md-typescale-title-large" style="font-weight:800;color:var(--md-sys-color-primary);letter-spacing:-0.5px;margin:0;">TRYLOG</h1>
      </div>
    </div>

    <div style="display:flex;align-items:center;gap:4px;">
      <button id="notif-btn" aria-label="通知" style="
        width:40px;height:40px;border-radius:50%;
        background:var(--md-sys-color-surface-container-high);
        display:flex;align-items:center;justify-content:center;
        cursor:pointer;position:relative;border:none;
        color:var(--md-sys-color-on-surface-variant);
      ">
        <span class="material-symbols-rounded" style="font-size:22px;">notifications</span>
        <span style="position:absolute;top:8px;right:8px;width:8px;height:8px;border-radius:50%;background:var(--md-sys-color-error);"></span>
      </button>
    </div>
  </header>

  <!-- Main Feed Content -->
  <div style="padding:16px 0 24px;">
    
    <!-- Friend Stories -->
    ${renderFriendStories()}

    <!-- Section Header -->
    <div style="padding:16px 16px 10px;display:flex;align-items:center;justify-content:space-between;">
      <h2 class="md-typescale-title-medium" style="color:var(--md-sys-color-on-surface);display:flex;align-items:center;gap:6px;">
        <span class="material-symbols-rounded" style="color:var(--md-sys-color-secondary);font-variation-settings:'FILL' 1;">report</span>
        失敗記録フィード
      </h2>
      <button class="md-chip md-chip-filter" style="font-size:12px;height:32px;">
        新着順
        <span class="material-symbols-rounded" style="font-size:16px;">arrow_drop_down</span>
      </button>
    </div>

    <!-- Posts Feed -->
    <div style="padding:0 16px;" id="feed-container">
      ${failurePosts.map(post => renderFailureCard(post)).join('')}
    </div>

  </div>`;
}

export function attachEvents() {
  // Like buttons
  document.querySelectorAll('.like-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const postId = btn.dataset.postId;
      const post = failurePosts.find(p => p.id === postId);
      if (!post) return;

      post.isLiked = !post.isLiked;
      post.likes += post.isLiked ? 1 : -1;

      const icon = btn.querySelector('.like-icon');
      const count = btn.querySelector('.like-count');

      if (post.isLiked) {
        btn.style.background = 'var(--md-sys-color-secondary-container)';
        btn.style.color = 'var(--md-sys-color-on-secondary-container)';
        btn.style.border = 'none';
        icon.style.fontVariationSettings = "'FILL' 1";
        icon.classList.add('like-pop');
        setTimeout(() => icon.classList.remove('like-pop'), 400);
      } else {
        btn.style.background = 'transparent';
        btn.style.color = 'var(--md-sys-color-on-surface)';
        btn.style.border = '1px solid var(--md-sys-color-outline)';
        icon.style.fontVariationSettings = "'FILL' 0";
      }
      count.textContent = post.likes;
    });
  });

  // Story buttons
  document.querySelectorAll('.story-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const { navigate } = window.__trylog || {};
      if (navigate) navigate('story', { storyId: btn.dataset.storyId, from: 'home' });
    });
  });

  // Notification button
  document.getElementById('notif-btn')?.addEventListener('click', () => {
    const { navigate } = window.__trylog || {};
    if (navigate) navigate('notifications');
  });
}
