// ===================================
// TRYLOG - Home Page (Material Design 3)
// ===================================
import {
  users, currentUser, getUserById, getAvatarStyle, getStoryByUserId,
  getRecommendedFeedPosts, addCommentToPost
} from '../data/sample.js';

function renderAvatarCircle(user, size = 'md') {
  const sizes = { sm: 36, md: 40, lg: 56 };
  const px = sizes[size] || 40;
  return `<div class="avatar-placeholder" style="${getAvatarStyle(user)};width:${px}px;height:${px}px;font-size:${Math.round(px * 0.42)}px;border-radius:50%;box-shadow:var(--md-sys-elevation-level1);">
    ${user.avatarInitial || '葵'}
  </div>`;
}

function renderPostBadge(post) {
  if (post.type === 'failure') {
    return post.retryIntent 
      ? `<span class="md-chip md-chip-filter active" style="font-size:11px;padding:2px 10px;height:24px;background:var(--md-sys-color-secondary-container);color:var(--md-sys-color-on-secondary-container);border:none;">💪 再挑戦宣言</span>`
      : `<span class="md-chip" style="font-size:11px;padding:2px 10px;height:24px;background:var(--md-sys-color-surface-container-high);color:var(--md-sys-color-on-surface-variant);border:none;">😔 失敗記録</span>`;
  }
  if (post.type === 'goal') {
    return `<span class="md-chip" style="font-size:11px;padding:2px 10px;height:24px;background:var(--md-sys-color-primary-container);color:var(--md-sys-color-on-primary-container);border:none;font-weight:700;">🎯 目標宣言</span>`;
  }
  if (post.type === 'process') {
    return `<span class="md-chip" style="font-size:11px;padding:2px 10px;height:24px;background:var(--md-sys-color-tertiary-container);color:var(--md-sys-color-on-tertiary-container);border:none;font-weight:700;">📈 挑戦過程</span>`;
  }
  if (post.type === 'result') {
    return `<span class="md-chip" style="font-size:11px;padding:2px 10px;height:24px;background:linear-gradient(135deg,#FFE082,#FFD54F);color:#5D4037;border:none;font-weight:800;">🎉 リトライ結果</span>`;
  }
  return '';
}

function renderPostCard(post) {
  const user = getUserById(post.userId) || currentUser;
  const liked = post.isLiked;

  let bodyHTML = '';
  if (post.type === 'failure') {
    bodyHTML = `
    <!-- Failure Info Box -->
    <div style="margin:8px 16px;padding:16px;background:var(--md-sys-color-secondary-container);border-radius:var(--md-sys-shape-corner-medium);color:var(--md-sys-color-on-secondary-container);">
      <div style="display:flex;align-items:center;gap:6px;margin-bottom:6px;">
        <span class="material-symbols-rounded" style="font-size:20px;color:var(--md-sys-color-secondary);font-variation-settings:'FILL' 1;">sentiment_dissatisfied</span>
        <span class="md-typescale-label-medium" style="color:var(--md-sys-color-secondary);letter-spacing:0.05em;font-weight:700;">失敗の記録</span>
      </div>
      <h3 class="md-typescale-title-large" style="color:var(--md-sys-color-on-secondary-container);margin-bottom:4px;">${post.contestName}</h3>
      <p class="md-typescale-body-medium" style="color:var(--md-sys-color-on-secondary-container);opacity:0.9;">
        <strong style="font-weight:600;">結果：</strong>${post.result}
        <span style="margin-left:8px;font-size:12px;opacity:0.8;">(${post.experience || '初挑戦'})</span>
      </p>
    </div>

    <!-- Emotion + Comment -->
    <div style="padding:8px 16px 0;">
      <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px;">
        <span style="font-size:22px;">${post.emotionEmoji || '😔'}</span>
        <span class="md-chip" style="background:var(--md-sys-color-surface-container-high);color:var(--md-sys-color-on-surface-variant);border:none;font-weight:600;">
          心情：${post.emotion}
        </span>
      </div>
      <p class="md-typescale-body-medium" style="line-height:1.6;color:var(--md-sys-color-on-surface);">${post.comment || ''}</p>
    </div>

    <!-- Cause Container -->
    <div style="margin:12px 16px 0;padding:12px 14px;background:var(--md-sys-color-surface-container-low);border-radius:var(--md-sys-shape-corner-small);border-left:3px solid var(--md-sys-color-secondary);">
      <p class="md-typescale-label-medium" style="color:var(--md-sys-color-secondary);margin-bottom:4px;font-weight:700;">失敗の原因分析</p>
      <p class="md-typescale-body-medium" style="color:var(--md-sys-color-on-surface-variant);line-height:1.5;">${post.cause}</p>
    </div>`;
  } else if (post.type === 'goal') {
    bodyHTML = `
    <div style="margin:8px 16px;padding:16px;background:var(--md-sys-color-primary-container);border-radius:var(--md-sys-shape-corner-medium);color:var(--md-sys-color-on-primary-container);">
      <div style="display:flex;align-items:center;gap:6px;margin-bottom:6px;">
        <span class="material-symbols-rounded" style="font-size:20px;color:var(--md-sys-color-primary);font-variation-settings:'FILL' 1;">flag</span>
        <span class="md-typescale-label-medium" style="color:var(--md-sys-color-primary);letter-spacing:0.05em;font-weight:700;">宣言した目標</span>
      </div>
      <h3 class="md-typescale-title-large" style="margin-bottom:6px;">${post.title}</h3>
      <p class="md-typescale-body-small" style="color:var(--md-sys-color-primary);font-weight:700;margin-bottom:8px;">📅 達成期日：${post.deadline}</p>
      ${post.comment ? `<p class="md-typescale-body-medium" style="line-height:1.5;opacity:0.9;">"${post.comment}"</p>` : ''}
    </div>`;
  } else if (post.type === 'process') {
    bodyHTML = `
    <div style="margin:8px 16px;padding:16px;background:var(--md-sys-color-tertiary-container);border-radius:var(--md-sys-shape-corner-medium);color:var(--md-sys-color-on-tertiary-container);">
      <div style="display:flex;align-items:center;gap:6px;margin-bottom:6px;">
        <span class="material-symbols-rounded" style="font-size:20px;color:var(--md-sys-color-tertiary);font-variation-settings:'FILL' 1;">trending_up</span>
        <span class="md-typescale-label-medium" style="color:var(--md-sys-color-tertiary);letter-spacing:0.05em;font-weight:700;">努力の過程</span>
      </div>
      <h3 class="md-typescale-title-large" style="margin-bottom:6px;">${post.title}</h3>
      <p class="md-typescale-body-medium" style="line-height:1.5;">${post.content}</p>
    </div>`;
  } else if (post.type === 'result') {
    bodyHTML = `
    <div style="margin:8px 16px;padding:16px;background:linear-gradient(135deg,#FFF9C4,#FFF176);border-radius:var(--md-sys-shape-corner-medium);color:#5D4037;">
      <div style="display:flex;align-items:center;gap:6px;margin-bottom:6px;">
        <span class="material-symbols-rounded" style="font-size:20px;color:#F57F17;font-variation-settings:'FILL' 1;">emoji_events</span>
        <span class="md-typescale-label-medium" style="color:#F57F17;letter-spacing:0.05em;font-weight:800;">リトライ結果報告</span>
      </div>
      <h3 class="md-typescale-title-large" style="margin-bottom:6px;">${post.title}</h3>
      <p class="md-typescale-body-medium" style="line-height:1.5;">${post.content}</p>
    </div>`;
  }

  return `
  <article class="md-card md-card-outlined feed-post-card" data-post-id="${post.id}" data-story-id="${post.storyId || 'story_01'}" style="margin-bottom:16px;position:relative;overflow:hidden;">
    <!-- Swipe hint banner -->
    <div style="background:var(--md-sys-color-surface-container);padding:4px 12px;font-size:10px;color:var(--md-sys-color-outline);display:flex;align-items:center;justify-content:space-between;">
      <span>👈 左右スワイプでストーリーを閲覧</span>
      <span class="material-symbols-rounded" style="font-size:12px;">swipe</span>
    </div>

    <!-- Header -->
    <div style="padding:14px 16px 4px;display:flex;align-items:center;gap:12px;">
      ${renderAvatarCircle(user, 'md')}
      <div style="flex:1;min-width:0;">
        <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
          <span class="md-typescale-title-medium" style="color:var(--md-sys-color-on-surface);">${user.name}</span>
          ${renderPostBadge(post)}
        </div>
        <span class="md-typescale-body-small" style="color:var(--md-sys-color-outline);">${post.postedAt}</span>
      </div>
      <button class="icon-btn" aria-label="詳細" style="background:transparent;border:none;color:var(--md-sys-color-outline);cursor:pointer;padding:4px;border-radius:50%;">
        <span class="material-symbols-rounded">more_vert</span>
      </button>
    </div>

    ${bodyHTML}

    <!-- Card Actions -->
    <div style="padding:12px 16px 14px;display:flex;align-items:center;gap:8px;">
      <button class="md-btn ${liked ? 'md-btn-tonal' : 'md-btn-outlined'} like-btn" data-post-id="${post.id}" style="border-radius:var(--md-sys-shape-corner-full);${liked ? 'background:var(--md-sys-color-secondary-container);color:var(--md-sys-color-on-secondary-container);border:none;' : ''}">
        <span class="material-symbols-rounded like-icon" style="font-size:18px;font-variation-settings:'FILL' ${liked ? 1 : 0}">${liked ? 'favorite' : 'favorite'}</span>
        <span class="like-count">${post.likes || 0}</span>
      </button>

      <button class="md-btn md-btn-outlined comment-btn" data-post-id="${post.id}" style="border-radius:var(--md-sys-shape-corner-full);">
        <span class="material-symbols-rounded" style="font-size:18px;">chat_bubble</span>
        <span class="comment-count">${post.comments || (post.commentsList ? post.commentsList.length : 0)}</span>
      </button>

      <button class="md-btn md-btn-filled story-btn" data-story-id="${post.storyId || 'story_01'}" style="margin-left:auto;border-radius:var(--md-sys-shape-corner-full);background:var(--md-sys-color-primary);color:var(--md-sys-color-on-primary);">
        <span class="material-symbols-rounded" style="font-size:18px;">auto_stories</span>
        ストーリー
      </button>
    </div>
  </article>`;
}

function renderFriendStories() {
  const friends = users.filter(u => u.isFollowing);
  const storyUsers = [currentUser, ...friends];

  return `
  <div style="padding:0 16px 8px;">
    <p class="md-typescale-title-small" style="color:var(--md-sys-color-on-surface-variant);margin-bottom:12px;letter-spacing:0.04em;">フレンドの最新挑戦（タップでストーリー閲覧）</p>
    <div style="display:flex;gap:14px;overflow-x:auto;padding-bottom:6px;scrollbar-width:none;">
      ${storyUsers.map((user, i) => {
        const isMe = i === 0;
        return `
        <div class="friend-story-item" data-user-id="${user.id}" style="display:flex;flex-direction:column;align-items:center;gap:6px;cursor:pointer;flex-shrink:0;">
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
                ">${user.avatarInitial || '葵'}</div>
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
  const recommendedPosts = getRecommendedFeedPosts();

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
    
    <!-- Friend Stories Carousel -->
    ${renderFriendStories()}

    <!-- Section Header (NO '新着順' drop down per requirement) -->
    <div style="padding:16px 16px 10px;display:flex;align-items:center;justify-space-between;">
      <h2 class="md-typescale-title-medium" style="color:var(--md-sys-color-on-surface);display:flex;align-items:center;gap:6px;">
        <span class="material-symbols-rounded" style="color:var(--md-sys-color-secondary);font-variation-settings:'FILL' 1;">sparkles</span>
        おすすめの挑戦フィード
      </h2>
    </div>

    <!-- Posts Feed -->
    <div style="padding:0 16px;" id="feed-container">
      ${recommendedPosts.map(post => renderPostCard(post)).join('')}
    </div>

  </div>`;
}

export function attachEvents() {
  const recommendedPosts = getRecommendedFeedPosts();

  // Friend story header click event (Point 2)
  document.querySelectorAll('.friend-story-item').forEach(el => {
    el.addEventListener('click', () => {
      const userId = el.dataset.userId;
      const story = getStoryByUserId(userId);
      const storyId = story ? story.id : 'story_01';
      const { navigate } = window.__trylog || {};
      if (navigate) navigate('story', { storyId, from: 'home' });
    });
  });

  // Like buttons
  document.querySelectorAll('.like-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const postId = btn.dataset.postId;
      const post = recommendedPosts.find(p => p.id === postId);
      if (!post) return;

      post.isLiked = !post.isLiked;
      post.likes = (post.likes || 0) + (post.isLiked ? 1 : -1);

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
      if (count) count.textContent = post.likes;
    });
  });

  // Comment buttons (Point 4: Reply / Comment Modal)
  document.querySelectorAll('.comment-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const postId = btn.dataset.postId;
      showCommentModal(postId);
    });
  });

  // Story buttons
  document.querySelectorAll('.story-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const { navigate } = window.__trylog || {};
      if (navigate) navigate('story', { storyId: btn.dataset.storyId, from: 'home' });
    });
  });

  // Notification button
  document.getElementById('notif-btn')?.addEventListener('click', () => {
    const { navigate } = window.__trylog || {};
    if (navigate) navigate('notifications');
  });

  // Swipe Gesture for feed cards (Point 5)
  document.querySelectorAll('.feed-post-card').forEach(card => {
    let startX = 0;
    let startY = 0;

    card.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    }, { passive: true });

    card.addEventListener('touchend', (e) => {
      const diffX = e.changedTouches[0].clientX - startX;
      const diffY = e.changedTouches[0].clientY - startY;

      // Check horizontal swipe
      if (Math.abs(diffX) > 60 && Math.abs(diffY) < 40) {
        const storyId = card.dataset.storyId;
        const { navigate } = window.__trylog || {};
        if (navigate) navigate('story', { storyId, from: 'home' });
      }
    }, { passive: true });
  });
}

// Point 4: Reply / Comment Bottom Sheet Modal
function showCommentModal(postId) {
  const recommendedPosts = getRecommendedFeedPosts();
  const post = recommendedPosts.find(p => p.id === postId);
  if (!post) return;

  const existing = document.getElementById('comment-modal-overlay');
  if (existing) existing.remove();

  const overlay = document.createElement('div');
  overlay.id = 'comment-modal-overlay';
  overlay.style.cssText = `
    position: fixed; inset: 0; z-index: 300;
    background: rgba(0,0,0,0.4);
    display: flex; align-items: flex-end; justify-content: center;
  `;

  function renderModalContent() {
    const commentsList = post.commentsList || [];
    return `
    <div style="
      background: white; border-radius: 24px 24px 0 0;
      padding: 16px 20px 24px; width: 100%; max-width: 430px;
      max-height: 80vh; display: flex; flex-direction: column;
      animation: slideUpSheet 300ms cubic-bezier(0.34,1.56,0.64,1) forwards;
    ">
      <div style="width:40px;height:4px;background:#E5E7EB;border-radius:4px;margin:0 auto 12px;"></div>
      
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;">
        <h3 class="md-typescale-title-medium" style="margin:0;color:var(--md-sys-color-on-surface);">
          💬 返信・コメント (${commentsList.length}件)
        </h3>
        <button id="close-comment-modal" class="icon-btn" style="border:none;background:transparent;cursor:pointer;">
          <span class="material-symbols-rounded">close</span>
        </button>
      </div>

      <!-- Comments List -->
      <div id="comments-list-container" style="flex:1;overflow-y:auto;margin-bottom:12px;display:flex;flex-direction:column;gap:12px;">
        ${commentsList.length === 0 ? `
          <p class="md-typescale-body-medium" style="color:var(--md-sys-color-outline);text-align:center;padding:24px 0;">
            まだコメントはありません。<br>応援やメッセージを送りましょう！
          </p>
        ` : commentsList.map(c => {
          const u = getUserById(c.userId) || currentUser;
          return `
          <div style="display:flex;gap:10px;padding:8px;background:var(--md-sys-color-surface-container-low);border-radius:12px;">
            <div style="width:32px;height:32px;border-radius:50%;background:${u.avatarColor || '#4F8EF7'};display:flex;align-items:center;justify-content:center;color:white;font-weight:700;font-size:13px;flex-shrink:0;">
              ${u.avatarInitial || '葵'}
            </div>
            <div style="flex:1;">
              <div style="display:flex;align-items:center;gap:6px;margin-bottom:2px;">
                <span class="md-typescale-label-large" style="font-weight:700;color:var(--md-sys-color-on-surface);">${u.name}</span>
                <span style="font-size:10px;color:var(--md-sys-color-outline);">${c.postedAt}</span>
              </div>
              <p class="md-typescale-body-medium" style="margin:0;color:var(--md-sys-color-on-surface-variant);line-height:1.4;">${c.text}</p>
            </div>
          </div>`;
        }).join('')}
      </div>

      <!-- Add Comment Form -->
      <div style="display:flex;gap:8px;align-items:center;padding-top:8px;border-top:1px solid var(--md-sys-color-outline-variant);">
        <input id="new-comment-input" class="form-input" type="text" placeholder="温かいコメントやアドバイスを返信..." style="flex:1;height:44px;border-radius:var(--md-sys-shape-corner-full);" />
        <button id="send-comment-btn" class="md-btn md-btn-filled" style="height:44px;border-radius:var(--md-sys-shape-corner-full);padding:0 16px;background:var(--md-sys-color-primary);">
          送信
        </button>
      </div>
    </div>`;
  }

  overlay.innerHTML = renderModalContent();
  document.body.appendChild(overlay);

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) overlay.remove();
  });
  overlay.querySelector('#close-comment-modal')?.addEventListener('click', () => overlay.remove());

  overlay.querySelector('#send-comment-btn')?.addEventListener('click', () => {
    const input = overlay.querySelector('#new-comment-input');
    const text = input?.value.trim();
    if (!text) return;

    addCommentToPost(postId, text);
    overlay.innerHTML = renderModalContent();
    const { showToast } = window.__trylog || {};
    if (showToast) showToast('コメントを送信しました！', 'chat');

    // Update comment counter in feed
    const card = document.querySelector(`.feed-post-card[data-post-id="${postId}"]`);
    if (card) {
      const countEl = card.querySelector('.comment-count');
      if (countEl) countEl.textContent = post.commentsList ? post.commentsList.length : 0;
    }
  });
}
