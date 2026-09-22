// ===================================
// TRYLOG - Initial Setup (Onboarding with Material Design 3)
// ===================================
// appState is accessed lazily via window.__trylog._getAppState() to avoid circular imports
import { topicCategories } from '../data/sample.js';
import { getIconSvg } from '../utils/icons.js';

let setupStep = 0;
let setupData = {
  name: '',
  username: '',
  avatarColor: '#4F8EF7',
  avatarInitial: '葵',
  selectedCategory: 'コンテスト・大会',
  selectedTopic: '音楽',
  bio: '',
  bioVisibility: 'public',
  ageGroup: '20代',
  ageGroupVisibility: 'public',
};

function initSetupData() {
  const user = window.__trylog?._getAppState?.()?.user || {};
  setupData = {
    name: user.name || '',
    username: user.username ? user.username.replace('@', '') : '',
    avatarColor: user.avatarColor || '#4F8EF7',
    avatarInitial: user.avatarInitial || '葵',
    selectedCategory: user.topicCategory || 'コンテスト・大会',
    selectedTopic: user.topic || '音楽',
    bio: user.bio || '',
    bioVisibility: user.bioVisibility || 'public',
    ageGroup: user.ageGroup || '20代',
    ageGroupVisibility: user.ageGroupVisibility || 'public',
  };
}


const avatarColors = [
  '#4F8EF7', '#1954C0', '#C0432A', '#3B7D3E',
  '#FFB347', '#7B6FF0', '#4DD0B3', '#D46BE8',
];

const ageOptions = ['中学生', '高校生', '大学生・専門生', '20代', '30代', '40代', '50代以上'];

function renderStepIndicator() {
  return `
  <div style="display:flex;align-items:center;justify-content:center;gap:8px;margin-bottom:16px;">
    ${[0,1,2,3,4].map(i => `
    <div style="
      height:6px;border-radius:var(--md-sys-shape-corner-full);
      transition:all 300ms var(--md-sys-motion-easing-standard);
      background:${i <= setupStep ? 'var(--md-sys-color-primary)' : 'var(--md-sys-color-surface-container-highest)'};
      width:${i === setupStep ? '32px' : '12px'};
    "></div>`).join('')}
  </div>`;
}

// Step 0: Welcome
function renderStep0() {
  return `
  <div style="flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:0 24px;">
    <div style="
      width:96px;height:96px;border-radius:var(--md-sys-shape-corner-extra-large);
      background:var(--md-sys-color-primary);
      color:var(--md-sys-color-on-primary);
      display:flex;align-items:center;justify-content:center;
      margin-bottom:24px;
      box-shadow:var(--md-sys-elevation-level3);
    ">
      <span style="font-size:48px;font-weight:900;letter-spacing:-2px;">T</span>
    </div>

    <h1 class="md-typescale-headline-large" style="font-weight:900;color:var(--md-sys-color-on-surface);margin-bottom:12px;letter-spacing:-0.5px;">
      TRYLOGへようこそ
    </h1>
    <p class="md-typescale-body-large" style="color:var(--md-sys-color-on-surface-variant);line-height:1.6;margin-bottom:8px;">
      失敗から再挑戦まで、<br>あなたの挑戦の過程を記録・共有する場所。
    </p>
    <p class="md-typescale-body-medium" style="color:var(--md-sys-color-outline);line-height:1.5;">
      同じ目標を持つ仲間と支え合いながら成長しよう。
    </p>

    <div style="margin-top:32px;display:flex;flex-direction:column;gap:12px;width:100%;max-width:300px;">
      ${[
        { icon: 'sentiment_dissatisfied', color: 'var(--md-sys-color-secondary)', bg: 'var(--md-sys-color-secondary-container)', label: '失敗を正直に記録する' },
        { icon: 'flag', color: 'var(--md-sys-color-primary)', bg: 'var(--md-sys-color-primary-container)', label: '次の目標を宣言する' },
        { icon: 'trending_up', color: 'var(--md-sys-color-tertiary)', bg: 'var(--md-sys-color-tertiary-container)', label: '努力の過程をログに残す' },
        { icon: 'emoji_events', color: 'var(--md-sys-color-primary)', bg: 'var(--md-sys-color-primary-container)', label: '達成・結果を共有する' },
      ].map(f => `
      <div class="md-card md-card-outlined" style="display:flex;align-items:center;gap:14px;padding:12px 16px;">
        <div style="width:36px;height:36px;border-radius:var(--md-sys-shape-corner-medium);background:${f.bg};color:${f.color};display:flex;align-items:center;justify-content:center;">
          <span class="material-symbols-rounded" style="font-size:20px;font-variation-settings:'FILL' 1;">${f.icon}</span>
        </div>
        <p class="md-typescale-label-large" style="color:var(--md-sys-color-on-surface);margin:0;">${f.label}</p>
      </div>`).join('')}
    </div>
  </div>`;
}

// Step 1: Basic Profile (Name, ID, Avatar Color)
function renderStep1() {
  return `
  <div style="padding:0 20px;flex:1;display:flex;flex-direction:column;gap:20px;">
    <div>
      <h2 class="md-typescale-headline-small" style="font-weight:700;color:var(--md-sys-color-on-surface);margin-bottom:4px;">1. プロフィール設定</h2>
      <p class="md-typescale-body-medium" style="color:var(--md-sys-color-outline);margin:0;">名前・アイコンを設定してください</p>
    </div>

    <!-- Avatar Picker -->
    <div style="display:flex;flex-direction:column;align-items:center;margin-bottom:4px;">
      <div id="avatar-preview" style="
        width:84px;height:84px;border-radius:50%;
        background:${setupData.avatarColor};
        display:flex;align-items:center;justify-content:center;
        font-size:36px;font-weight:700;color:white;
        margin-bottom:14px;
        box-shadow:var(--md-sys-elevation-level2);
        transition:all 300ms;
      ">${setupData.avatarInitial || '葵'}</div>
      
      <p class="md-typescale-label-medium" style="color:var(--md-sys-color-outline);margin-bottom:10px;">テーマカラーを選択</p>
      <div style="display:flex;gap:10px;flex-wrap:wrap;justify-content:center;">
        ${avatarColors.map(color => `
        <button class="color-option" data-color="${color}" style="
          width:32px;height:32px;border-radius:50%;
          background:${color};border:none;cursor:pointer;
          box-shadow:${setupData.avatarColor === color ? `0 0 0 3px var(--md-sys-color-surface), 0 0 0 5px ${color}` : 'none'};
          transition:all 200ms;transform:${setupData.avatarColor === color ? 'scale(1.15)' : 'scale(1)'};
        "></button>`).join('')}
      </div>
    </div>

    <div class="form-group">
      <label class="form-label" for="setup-name">
        <span class="material-symbols-rounded" style="font-size:18px;color:var(--md-sys-color-primary);">badge</span>
        お名前
        <span class="form-label-required">必須</span>
      </label>
      <div class="input-container has-icon">
        <span class="material-symbols-rounded input-icon">person</span>
        <input id="setup-name" class="form-input" type="text" placeholder="例：田中 葵" maxlength="30" value="${setupData.name}" required />
      </div>
    </div>

    <div class="form-group">
      <label class="form-label" for="setup-username">
        <span class="material-symbols-rounded" style="font-size:18px;color:var(--md-sys-color-primary);">alternate_email</span>
        ユーザーID
        <span class="form-label-required">必須</span>
      </label>
      <div class="input-container has-icon">
        <span class="material-symbols-rounded input-icon">alternate_email</span>
        <input id="setup-username" class="form-input" type="text" placeholder="aoi_tanaka" maxlength="20" value="${setupData.username}" required />
      </div>
      <span class="form-hint">※半角英数字・アンダースコアのみ</span>
    </div>
  </div>`;
}

// Step 2: Topic Selection (Hierarchical: Category -> Single Topic Choice)
function renderStep2() {
  const currentCategoryObj = topicCategories.find(c => c.name === setupData.selectedCategory) || topicCategories[0];

  return `
  <div style="padding:0 20px;flex:1;display:flex;flex-direction:column;gap:16px;">
    <div>
      <h2 class="md-typescale-headline-small" style="font-weight:700;color:var(--md-sys-color-on-surface);margin-bottom:4px;">2. トピックの選択</h2>
      <p class="md-typescale-body-medium" style="color:var(--md-sys-color-outline);margin:0;">大分類を選んでから詳細トピックを1つ選択してください</p>
    </div>

    <!-- Category Selector Tabs -->
    <div style="display:flex;gap:8px;overflow-x:auto;padding-bottom:4px;scrollbar-width:none;">
      ${topicCategories.map(cat => {
        const isCatActive = cat.name === setupData.selectedCategory;
        return `
        <button class="cat-tab-btn" data-cat="${cat.name}" style="
          padding:8px 14px;border-radius:var(--md-sys-shape-corner-full);
          border:1.5px solid ${isCatActive ? 'var(--md-sys-color-primary)' : 'var(--md-sys-color-outline-variant)'};
          background:${isCatActive ? 'var(--md-sys-color-primary-container)' : 'var(--md-sys-color-surface)'};
          color:${isCatActive ? 'var(--md-sys-color-on-primary-container)' : 'var(--md-sys-color-on-surface)'};
          font-weight:${isCatActive ? '700' : '500'};
          font-size:13px;white-space:nowrap;cursor:pointer;
          display:flex;align-items:center;gap:6px;
        ">
          <span>${cat.icon}</span>
          <span>${cat.name}</span>
        </button>`;
      }).join('')}
    </div>

    <!-- Topic Single-Selection Options Grid -->
    <div style="margin-top:4px;">
      <p class="md-typescale-label-medium" style="color:var(--md-sys-color-outline);margin-bottom:10px;">
        「${currentCategoryObj.name}」の選択可能トピック（単一選択）
      </p>
      <div style="display:grid;grid-template-columns:1fr;gap:10px;" id="topic-options-grid">
        ${currentCategoryObj.topics.map(t => {
          const isTopicSelected = setupData.selectedTopic === t;
          return `
          <button class="topic-btn" data-topic="${t}" style="
            padding:14px 16px;border-radius:var(--md-sys-shape-corner-medium);
            border:2px solid ${isTopicSelected ? 'var(--md-sys-color-primary)' : 'var(--md-sys-color-outline-variant)'};
            background:${isTopicSelected ? 'var(--md-sys-color-primary-container)' : 'var(--md-sys-color-surface)'};
            color:${isTopicSelected ? 'var(--md-sys-color-on-primary-container)' : 'var(--md-sys-color-on-surface)'};
            cursor:pointer;
            display:flex;align-items:center;gap:12px;text-align:left;
            transition:all 200ms;
          ">
            <span class="material-symbols-rounded" style="
              font-size:22px;
              color:${isTopicSelected ? 'var(--md-sys-color-primary)' : 'var(--md-sys-color-outline)'};
            ">${isTopicSelected ? 'radio_button_checked' : 'radio_button_unchecked'}</span>
            <span class="md-typescale-label-large" style="font-weight:${isTopicSelected ? '700' : '500'};font-size:15px;">${t}</span>
          </button>`;
        }).join('')}
      </div>
    </div>
  </div>`;
}

// Step 3: Bio & Age Group with Privacy Settings
function renderStep3() {
  return `
  <div style="padding:0 20px;flex:1;display:flex;flex-direction:column;gap:20px;">
    <div>
      <h2 class="md-typescale-headline-small" style="font-weight:700;color:var(--md-sys-color-on-surface);margin-bottom:4px;">3. 自己紹介・年代設定</h2>
      <p class="md-typescale-body-medium" style="color:var(--md-sys-color-outline);margin:0;">公開範囲を選択してプロフィールを設定します</p>
    </div>

    <!-- Bio Field & Privacy -->
    <div class="form-group">
      <label class="form-label" for="setup-bio">
        <span class="material-symbols-rounded" style="font-size:18px;color:var(--md-sys-color-primary);">edit_note</span>
        自己紹介
      </label>
      <textarea id="setup-bio" class="form-textarea" placeholder="あなたの挑戦していることや意気込みを教えてください" rows="3" maxlength="150">${setupData.bio}</textarea>

      <div style="margin-top:10px;">
        <span class="md-typescale-label-medium" style="color:var(--md-sys-color-outline);display:block;margin-bottom:6px;">自己紹介の公開範囲</span>
        <div style="display:flex;gap:8px;">
          ${[
            { id: 'public', label: '🌐 公開' },
            { id: 'friends', label: '👥 フレンドのみ' },
            { id: 'none', label: '🚫 作成しない' },
          ].map(opt => `
            <button class="bio-vis-btn md-btn ${setupData.bioVisibility === opt.id ? 'md-btn-filled' : 'md-btn-outlined'}" data-vis="${opt.id}" style="
              flex:1;height:36px;padding:0 8px;font-size:12px;border-radius:var(--md-sys-shape-corner-full);
              ${setupData.bioVisibility === opt.id ? 'background:var(--md-sys-color-primary);color:white;border:none;' : ''}
            ">
              ${opt.label}
            </button>
          `).join('')}
        </div>
      </div>
    </div>

    <!-- Age Group & Privacy -->
    <div class="form-group">
      <label class="form-label" for="setup-age">
        <span class="material-symbols-rounded" style="font-size:18px;color:var(--md-sys-color-primary);">cake</span>
        年代・学年
      </label>
      <select id="setup-age" class="form-input" style="height:48px;">
        ${ageOptions.map(age => `
          <option value="${age}" ${setupData.ageGroup === age ? 'selected' : ''}>${age}</option>
        `).join('')}
      </select>

      <div style="margin-top:10px;">
        <span class="md-typescale-label-medium" style="color:var(--md-sys-color-outline);display:block;margin-bottom:6px;">年代の公開範囲</span>
        <div style="display:flex;gap:8px;">
          ${[
            { id: 'public', label: '🌐 公開' },
            { id: 'friends', label: '👥 フレンドのみ' },
            { id: 'private', label: '🔒 非公開' },
          ].map(opt => `
            <button class="age-vis-btn md-btn ${setupData.ageGroupVisibility === opt.id ? 'md-btn-filled' : 'md-btn-outlined'}" data-vis="${opt.id}" style="
              flex:1;height:36px;padding:0 8px;font-size:12px;border-radius:var(--md-sys-shape-corner-full);
              ${setupData.ageGroupVisibility === opt.id ? 'background:var(--md-sys-color-primary);color:white;border:none;' : ''}
            ">
              ${opt.label}
            </button>
          `).join('')}
        </div>
      </div>
    </div>
  </div>`;
}

// Step 4: Completion
function renderStep4() {
  const name = setupData.name || 'ユーザー';
  return `
  <div style="flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:0 24px;text-align:center;">
    <div style="margin-bottom:16px;">
      ${getIconSvg('sparkles', { size: 64, color: 'var(--md-sys-color-primary)', strokeWidth: 1.8, className: 'setup-celebration-icon', style: 'display:block;margin:0 auto;' })}
    </div>
    <h2 class="md-typescale-headline-medium" style="font-weight:900;color:var(--md-sys-color-on-surface);margin-bottom:8px;">
      ${name}さん、<br>初期設定が完了しました！
    </h2>
    <p class="md-typescale-body-medium" style="color:var(--md-sys-color-on-surface-variant);line-height:1.6;margin-bottom:20px;">
      選択したトピック：<strong style="color:var(--md-sys-color-primary);">${setupData.selectedTopic}</strong> (${setupData.selectedCategory})
    </p>

    <div class="md-card md-card-filled" style="padding:20px;background:var(--md-sys-color-surface-container-high);width:100%;text-align:left;">
      <p class="md-typescale-label-medium" style="color:var(--md-sys-color-outline);margin-bottom:12px;letter-spacing:0.04em;">最初のアクション</p>
      ${[
        { icon: 'edit-2', text: '失敗の経験を正直に書き出してみる' },
        { icon: 'target', text: '達成したい目標を一つ宣言する' },
        { icon: 'users', text: '同じジャンルの挑戦者を検索・フォロー' },
      ].map(item => `
      <div style="display:flex;align-items:center;gap:12px;padding:10px 0;border-bottom:1px solid var(--md-sys-color-outline-variant);">
        <span style="width:28px;height:28px;display:inline-flex;align-items:center;justify-content:center;">${getIconSvg(item.icon, { size:22, color: 'var(--md-sys-color-on-surface)' })}</span>
        <span class="md-typescale-body-medium" style="color:var(--md-sys-color-on-surface);">${item.text}</span>
      </div>`).join('')}
    </div>
  </div>`;
}

export function renderSetup() {
  setupStep = 0;
  initSetupData();
  return buildSetupHTML();
}

function buildSetupHTML() {
  const steps = [renderStep0, renderStep1, renderStep2, renderStep3, renderStep4];
  const btnLabels = ['はじめる', '次へ', '次へ', '設定内容の確認', 'TRYLOGを開始する'];

  return `
  <div style="
    min-height:100dvh;
    display:flex;flex-direction:column;
    background:var(--md-sys-color-surface);
    padding:16px 0 32px;
  ">
    <!-- Top Bar -->
    <div style="display:flex;align-items:center;padding:8px 16px 0;">
      ${setupStep > 0 ? `
      <button id="setup-back" class="icon-btn" aria-label="戻る" style="background:transparent;border:none;color:var(--md-sys-color-on-surface);cursor:pointer;padding:8px;border-radius:50%;display:flex;align-items:center;">
        <span class="material-symbols-rounded">arrow_back</span>
      </button>` : '<div style="width:40px;"></div>'}
      
      <div style="flex:1;padding:0 12px;">
        ${renderStepIndicator()}
      </div>

      <div style="width:40px;"></div>
    </div>

    <!-- Step View -->
    <div style="flex:1;display:flex;flex-direction:column;padding-top:16px;">
      ${steps[setupStep]()}
    </div>

    <!-- Bottom Action Button -->
    <div style="padding:16px 20px 0;">
      <button id="setup-next" class="md-btn md-btn-filled" style="
        width:100%;height:52px;border-radius:var(--md-sys-shape-corner-full);
        background:var(--md-sys-color-primary);color:var(--md-sys-color-on-primary);
        font-size:16px;
      ">${btnLabels[setupStep]}</button>
    </div>
  </div>`;
}

export function attachEvents(params) {
  document.getElementById('setup-next')?.addEventListener('click', () => {
    if (setupStep === 1) {
      const name = document.getElementById('setup-name')?.value.trim();
      const username = document.getElementById('setup-username')?.value.trim();
      if (!name || !username) {
        const { showToast } = window.__trylog || {};
        if (showToast) showToast('お名前とユーザーIDを入力してください', 'error', 2500);
        return;
      }
      setupData.name = name;
      setupData.username = '@' + username;
      setupData.avatarInitial = name.charAt(0);
    }

    if (setupStep === 3) {
      setupData.bio = document.getElementById('setup-bio')?.value.trim();
      setupData.ageGroup = document.getElementById('setup-age')?.value || setupData.ageGroup;
    }

    if (setupStep < 4) {
      setupStep++;
    } else {
      // Save all 5 items + privacy directly to appState.user via global accessor
      const appState = window.__trylog?._getAppState?.();
      if (appState) {
        appState.user.isSetupDone = true;
        appState.user.name = setupData.name || appState.user.name;
        appState.user.username = setupData.username.startsWith('@') ? setupData.username : '@' + setupData.username;
        appState.user.avatarColor = setupData.avatarColor;
        appState.user.avatarInitial = setupData.avatarInitial;
        appState.user.topicCategory = setupData.selectedCategory;
        appState.user.topic = setupData.selectedTopic;
        appState.user.bio = setupData.bio;
        appState.user.bioVisibility = setupData.bioVisibility;
        appState.user.ageGroup = setupData.ageGroup;
        appState.user.ageGroupVisibility = setupData.ageGroupVisibility;
      }

      const { navigate, showToast } = window.__trylog || {};
      if (showToast) showToast('設定が完了しました！ようこそ 🎉', 'check_circle');
      if (navigate) navigate('home');
      return;
    }

    const container = document.getElementById('page-container');
    if (container) {
      container.innerHTML = buildSetupHTML();
      attachEvents(params);
    }
  });

  document.getElementById('setup-back')?.addEventListener('click', () => {
    if (setupStep > 0) {
      setupStep--;
      const container = document.getElementById('page-container');
      if (container) {
        container.innerHTML = buildSetupHTML();
        attachEvents(params);
      }
    }
  });

  // Step 1: Color options
  document.querySelectorAll('.color-option').forEach(btn => {
    btn.addEventListener('click', () => {
      setupData.avatarColor = btn.dataset.color;
      document.querySelectorAll('.color-option').forEach(b => {
        const isSelected = b.dataset.color === setupData.avatarColor;
        b.style.boxShadow = isSelected ? `0 0 0 3px var(--md-sys-color-surface), 0 0 0 5px ${b.dataset.color}` : 'none';
        b.style.transform = isSelected ? 'scale(1.15)' : 'scale(1)';
      });
      const preview = document.getElementById('avatar-preview');
      if (preview) preview.style.background = setupData.avatarColor;
    });
  });

  document.getElementById('setup-name')?.addEventListener('input', (e) => {
    const val = e.target.value.trim();
    setupData.avatarInitial = val.charAt(0) || '?';
    const preview = document.getElementById('avatar-preview');
    if (preview) preview.textContent = setupData.avatarInitial;
  });

  // Step 2: Category Tabs & Single Topic selection
  document.querySelectorAll('.cat-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      setupData.selectedCategory = btn.dataset.cat;
      const catObj = topicCategories.find(c => c.name === setupData.selectedCategory);
      if (catObj && catObj.topics.length > 0) {
        setupData.selectedTopic = catObj.topics[0];
      }
      const container = document.getElementById('page-container');
      if (container) {
        container.innerHTML = buildSetupHTML();
        attachEvents(params);
      }
    });
  });

  document.querySelectorAll('.topic-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      setupData.selectedTopic = btn.dataset.topic;
      document.querySelectorAll('.topic-btn').forEach(b => {
        const isSelected = b.dataset.topic === setupData.selectedTopic;
        b.style.borderColor = isSelected ? 'var(--md-sys-color-primary)' : 'var(--md-sys-color-outline-variant)';
        b.style.background = isSelected ? 'var(--md-sys-color-primary-container)' : 'var(--md-sys-color-surface)';
        b.style.color = isSelected ? 'var(--md-sys-color-on-primary-container)' : 'var(--md-sys-color-on-surface)';
        const icon = b.querySelector('.material-symbols-rounded');
        if (icon) {
          icon.textContent = isSelected ? 'radio_button_checked' : 'radio_button_unchecked';
          icon.style.color = isSelected ? 'var(--md-sys-color-primary)' : 'var(--md-sys-color-outline)';
        }
      });
    });
  });

  // Step 3: Privacy toggles
  document.querySelectorAll('.bio-vis-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      setupData.bioVisibility = btn.dataset.vis;
      document.querySelectorAll('.bio-vis-btn').forEach(b => {
        const isSel = b.dataset.vis === setupData.bioVisibility;
        b.className = `bio-vis-btn md-btn ${isSel ? 'md-btn-filled' : 'md-btn-outlined'}`;
        b.style.background = isSel ? 'var(--md-sys-color-primary)' : 'transparent';
        b.style.color = isSel ? 'white' : 'var(--md-sys-color-on-surface)';
        b.style.border = isSel ? 'none' : '1px solid var(--md-sys-color-outline)';
      });
    });
  });

  document.querySelectorAll('.age-vis-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      setupData.ageGroupVisibility = btn.dataset.vis;
      document.querySelectorAll('.age-vis-btn').forEach(b => {
        const isSel = b.dataset.vis === setupData.ageGroupVisibility;
        b.className = `age-vis-btn md-btn ${isSel ? 'md-btn-filled' : 'md-btn-outlined'}`;
        b.style.background = isSel ? 'var(--md-sys-color-primary)' : 'transparent';
        b.style.color = isSel ? 'white' : 'var(--md-sys-color-on-surface)';
        b.style.border = isSel ? 'none' : '1px solid var(--md-sys-color-outline)';
      });
    });
  });
}
