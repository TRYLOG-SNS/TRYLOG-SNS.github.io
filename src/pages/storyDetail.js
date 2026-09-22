// ===================================
// TRYLOG - Story Detail Page (Material Design 3)
// ===================================
import { getStoryById, getUserById, getStoryPosts, getAvatarStyle } from '../data/sample.js';

let activeTab = 'goal';
const tabsList = ['goal', 'process', 'result'];

function renderPostCard(post, type) {
  if (!post) return '';

  const isGoal = type === 'goal';
  const isProcess = type === 'process';
  const isResult = type === 'result';

  if (isGoal) {
    return `
    <article class="md-card md-card-outlined" style="margin-bottom:16px;">
      <div style="padding:16px;">
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:12px;">
          <div style="width:36px;height:36px;border-radius:var(--md-sys-shape-corner-medium);background:var(--md-sys-color-primary-container);color:var(--md-sys-color-on-primary-container);display:flex;align-items:center;justify-content:center;">
            <span class="material-symbols-rounded" style="font-size:20px;font-variation-settings:'FILL' 1;">flag</span>
          </div>
          <span class="md-typescale-title-medium" style="color:var(--md-sys-color-primary);">目標宣言</span>
        </div>
        <h3 class="md-typescale-title-large" style="color:var(--md-sys-color-on-surface);margin-bottom:12px;line-height:1.4;">${post.title}</h3>
        
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:14px;padding:10px 14px;background:var(--md-sys-color-surface-container-low);border-radius:var(--md-sys-shape-corner-small);">
          <span class="material-symbols-rounded" style="font-size:18px;color:var(--md-sys-color-primary);">calendar_month</span>
          <span class="md-typescale-body-medium" style="color:var(--md-sys-color-on-surface-variant);">達成期限：<strong style="color:var(--md-sys-color-primary);">${post.deadline}</strong></span>
        </div>

        <p class="md-typescale-label-medium" style="color:var(--md-sys-color-outline);margin-bottom:8px;letter-spacing:0.04em;">実行するアクション</p>
        <div style="display:flex;flex-direction:column;gap:8px;">
          ${(post.actions || []).map(a => `
          <div style="display:flex;align-items:flex-start;gap:10px;">
            <div style="width:20px;height:20px;border-radius:50%;background:var(--md-sys-color-primary-container);color:var(--md-sys-color-on-primary-container);display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:1px;">
              <span class="material-symbols-rounded" style="font-size:14px;font-weight:700;">check</span>
            </div>
            <span class="md-typescale-body-medium" style="color:var(--md-sys-color-on-surface);line-height:1.5;">${a}</span>
          </div>`).join('')}
        </div>
        ${post.comment ? `<p class="md-typescale-body-medium" style="margin-top:14px;color:var(--md-sys-color-on-surface-variant);line-height:1.6;padding-top:12px;border-top:1px solid var(--md-sys-color-outline-variant);">"${post.comment}"</p>` : ''}
      </div>
      <div style="padding:12px 16px;background:var(--md-sys-color-surface-container-lowest);border-top:1px solid var(--md-sys-color-outline-variant);display:flex;align-items:center;justify-content:space-between;">
        <span class="md-typescale-body-small" style="color:var(--md-sys-color-outline);">${post.postedAt}</span>
        <button class="md-btn md-btn-tonal" style="border-radius:var(--md-sys-shape-corner-full);height:36px;padding:0 14px;">
          <span class="material-symbols-rounded" style="font-size:18px;">favorite</span>
          ${post.likes || 0}
        </button>
      </div>
    </article>`;
  }

  if (isProcess) {
    return `
    <article class="md-card md-card-outlined" style="margin-bottom:16px;">
      <div style="padding:16px;">
        <div style="display:flex;align-items:center;gap:10px;margin-bottom:10px;">
          <div style="width:36px;height:36px;border-radius:var(--md-sys-shape-corner-medium);background:var(--md-sys-color-tertiary-container);color:var(--md-sys-color-on-tertiary-container);display:flex;align-items:center;justify-content:center;">
            <span class="material-symbols-rounded" style="font-size:20px;font-variation-settings:'FILL' 1;">trending_up</span>
          </div>
          <div>
            <span class="md-typescale-title-medium" style="color:var(--md-sys-color-tertiary);">努力過程の記録</span>
            <p class="md-typescale-body-small" style="color:var(--md-sys-color-outline);margin:0;">${post.postedAt}</p>
          </div>
        </div>
        <h4 class="md-typescale-title-medium" style="color:var(--md-sys-color-on-surface);margin-bottom:8px;">${post.title}</h4>
        <p class="md-typescale-body-medium" style="line-height:1.6;color:var(--md-sys-color-on-surface-variant);">${post.content}</p>
      </div>
      <div style="padding:10px 16px;background:var(--md-sys-color-surface-container-lowest);border-top:1px solid var(--md-sys-color-outline-variant);display:flex;align-items:center;justify-content:flex-end;">
        <button class="md-btn ${post.isLiked ? 'md-btn-tonal' : 'md-btn-outlined'}" style="border-radius:var(--md-sys-shape-corner-full);height:36px;padding:0 14px;">
          <span class="material-symbols-rounded" style="font-size:18px;font-variation-settings:'FILL' ${post.isLiked ? 1 : 0}">favorite</span>
          ${post.likes || 0}
        </button>
      </div>
    </article>`;
  }

  if (isResult) {
    return `
    <article class="md-card md-card-elevated" style="margin-bottom:16px;background:${post.isSuccess ? 'var(--md-sys-color-tertiary-container)' : 'var(--md-sys-color-secondary-container)'};color:${post.isSuccess ? 'var(--md-sys-color-on-tertiary-container)' : 'var(--md-sys-color-on-secondary-container)'};">
      <div style="padding:16px;">
        <div style="display:flex;align-items:center;gap:10px;margin-bottom:10px;">
          <div style="width:40px;height:40px;border-radius:var(--md-sys-shape-corner-medium);background:${post.isSuccess ? 'var(--md-sys-color-tertiary)' : 'var(--md-sys-color-secondary)'};color:white;display:flex;align-items:center;justify-content:center;">
            <span class="material-symbols-rounded" style="font-size:22px;font-variation-settings:'FILL' 1;">emoji_events</span>
          </div>
          <div>
            <span class="md-typescale-title-large" style="font-weight:700;">${post.isSuccess ? '🎉 目標達成！' : '結果報告'}</span>
            <p class="md-typescale-body-small" style="opacity:0.85;margin:0;">${post.postedAt}</p>
          </div>
        </div>
        <h4 class="md-typescale-title-medium" style="margin-bottom:8px;">${post.title}</h4>
        <p class="md-typescale-body-medium" style="line-height:1.6;opacity:0.95;">${post.content}</p>
        
        <div style="margin-top:14px;display:flex;align-items:center;justify-content:flex-end;">
          <button class="md-btn md-btn-filled" style="border-radius:var(--md-sys-shape-corner-full);background:${post.isSuccess ? 'var(--md-sys-color-tertiary)' : 'var(--md-sys-color-secondary)'};color:white;">
            <span class="material-symbols-rounded" style="font-size:18px;">favorite</span>
            ${post.likes || 0}
          </button>
        </div>
      </div>
    </article>`;
  }

  return '';
}

function renderEmptyState(label) {
  return `
  <div style="text-align:center;padding:48px 24px;color:var(--md-sys-color-outline);">
    <span class="material-symbols-rounded" style="font-size:56px;margin-bottom:12px;opacity:0.6;">inbox</span>
    <p class="md-typescale-title-medium" style="color:var(--md-sys-color-on-surface-variant);margin-bottom:4px;">「${label}」の投稿はまだありません</p>
    <p class="md-typescale-body-small">挑戦の過程が更新されるとここに表示されます</p>
  </div>`;
}

export function renderStoryDetail(params = {}) {
  const storyId = params.storyId || 'story_01';
  const story = getStoryById(storyId);

  if (!story) {
    return `<div style="padding:32px;text-align:center;"><p>ストーリーが見つかりません</p></div>`;
  }

  const user = getUserById(story.userId);
  const storyPosts = getStoryPosts(storyId);
  const failurePost = storyPosts.failure;

  window.__storyData = { storyId, storyPosts, story, from: params.from || 'home' };

  return `
  <!-- Top App Bar -->
  <header class="md-top-app-bar" style="position:sticky;top:0;z-index:50;background:var(--md-sys-color-surface);border-bottom:1px solid var(--md-sys-color-outline-variant);">
    <button data-action="back" class="icon-btn" aria-label="戻る" style="background:transparent;border:none;color:var(--md-sys-color-on-surface);cursor:pointer;padding:8px;border-radius:50%;display:flex;align-items:center;">
      <span class="material-symbols-rounded">arrow_back</span>
    </button>
    <div style="flex:1;min-width:0;">
      <h2 class="md-typescale-title-medium" style="color:var(--md-sys-color-on-surface);margin:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${story.title}</h2>
      <p class="md-typescale-body-small" style="color:var(--md-sys-color-outline);margin:0;">${user?.name || ''}</p>
    </div>
  </header>

  <!-- M3 Segmented Button / Tabs -->
  <div class="md-tab-bar" style="position:sticky;top:var(--top-app-bar-height);z-index:40;background:var(--md-sys-color-surface);border-bottom:1px solid var(--md-sys-color-outline-variant);">
    <button class="md-tab ${activeTab === 'goal' ? 'active' : ''}" data-tab="goal">
      <span class="material-symbols-rounded" style="font-variation-settings:'FILL' ${activeTab === 'goal' ? 1 : 0};">flag</span>
      <span>目標</span>
    </button>
    <button class="md-tab ${activeTab === 'process' ? 'active' : ''}" data-tab="process">
      <span class="material-symbols-rounded" style="font-variation-settings:'FILL' ${activeTab === 'process' ? 1 : 0};">trending_up</span>
      <span>努力過程</span>
    </button>
    <button class="md-tab ${activeTab === 'result' ? 'active' : ''}" data-tab="result">
      <span class="material-symbols-rounded" style="font-variation-settings:'FILL' ${activeTab === 'result' ? 1 : 0};">emoji_events</span>
      <span>結果</span>
    </button>
  </div>

  <!-- Swipe guidance header -->
  <div style="background:var(--md-sys-color-surface-container-low);padding:6px 16px;text-align:center;font-size:11px;color:var(--md-sys-color-outline);display:flex;align-items:center;justify-content:center;gap:6px;">
    <span class="material-symbols-rounded" style="font-size:14px;">swipe</span>
    <span>左右にスワイプして「目標」「努力過程」「結果」を切り替え</span>
  </div>

  <!-- Failure Origin Container -->
  ${failurePost ? `
  <div style="padding:16px 16px 0;">
    <div class="md-card md-card-filled" style="padding:16px;background:var(--md-sys-color-secondary-container);color:var(--md-sys-color-on-secondary-container);">
      <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px;">
        <span class="material-symbols-rounded" style="font-size:20px;color:var(--md-sys-color-secondary);font-variation-settings:'FILL' 1;">report</span>
        <span class="md-typescale-label-medium" style="color:var(--md-sys-color-secondary);font-weight:700;">原点となった失敗</span>
      </div>
      <h3 class="md-typescale-title-large" style="margin-bottom:4px;">${failurePost.contestName}</h3>
      <p class="md-typescale-body-medium">結果：${failurePost.result}</p>
    </div>
  </div>` : ''}

  <!-- Tab Content Area with Touch Swipe -->
  <div id="story-tab-content" style="padding:16px;min-height:300px;touch-action:pan-y;">
    ${renderTabContent(activeTab, storyPosts)}
  </div>`;
}

function renderTabContent(tab, storyPosts) {
  if (tab === 'goal') {
    return storyPosts.goal ? renderPostCard(storyPosts.goal, 'goal') : renderEmptyState('目標');
  }
  if (tab === 'process') {
    if (!storyPosts.process || storyPosts.process.length === 0) return renderEmptyState('努力過程');
    return storyPosts.process.map(p => renderPostCard(p, 'process')).join('');
  }
  if (tab === 'result') {
    return storyPosts.result ? renderPostCard(storyPosts.result, 'result') : renderEmptyState('結果');
  }
  return '';
}

export function attachEvents(params) {
  document.querySelector('[data-action="back"]')?.addEventListener('click', () => {
    const { navigate } = window.__trylog || {};
    const data = window.__storyData;
    if (navigate) navigate(data?.from || 'home');
  });

  const updateTab = (newTab) => {
    activeTab = newTab;
    const data = window.__storyData;
    if (!data) return;

    document.querySelectorAll('.md-tab').forEach(b => {
      b.classList.toggle('active', b.dataset.tab === activeTab);
      const icon = b.querySelector('.material-symbols-rounded');
      if (icon) icon.style.fontVariationSettings = `'FILL' ${b.dataset.tab === activeTab ? 1 : 0}`;
    });

    const content = document.getElementById('story-tab-content');
    if (content) {
      content.innerHTML = renderTabContent(activeTab, data.storyPosts);
    }
  };

  document.querySelectorAll('.md-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      updateTab(btn.dataset.tab);
    });
  });

  // Touch Swipe for Story Details Tab Navigation
  const contentArea = document.getElementById('story-tab-content');
  if (contentArea) {
    let touchStartX = 0;
    let touchStartY = 0;

    contentArea.addEventListener('touchstart', (e) => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    }, { passive: true });

    contentArea.addEventListener('touchend', (e) => {
      const diffX = e.changedTouches[0].clientX - touchStartX;
      const diffY = e.changedTouches[0].clientY - touchStartY;

      if (Math.abs(diffX) > 50 && Math.abs(diffY) < 40) {
        const currIdx = tabsList.indexOf(activeTab);
        if (diffX < 0 && currIdx < tabsList.length - 1) {
          // Swipe Left -> Next Tab
          updateTab(tabsList[currIdx + 1]);
        } else if (diffX > 0 && currIdx > 0) {
          // Swipe Right -> Prev Tab
          updateTab(tabsList[currIdx - 1]);
        }
      }
    }, { passive: true });
  }
}
