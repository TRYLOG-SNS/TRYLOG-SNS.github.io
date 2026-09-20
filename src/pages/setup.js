// ===================================
// TRYLOG - Initial Setup (Onboarding with Material Design 3)
// ===================================
import { appState } from '../main.js';
import { getIconSvg } from '../utils/icons.js';

let setupStep = 0;
let setupData = {
  name: '',
  username: '',
  avatarColor: 'var(--md-sys-color-primary)',
  avatarInitial: '',
  bio: '',
  categories: [],
};

const avatarColors = [
  '#1954C0', '#C0432A', '#3B7D3E', '#FFB347',
  '#7B6FF0', '#4DD0B3', '#F78C4F', '#D46BE8',
];

const categoryOptions = [
  { icon: '🎹', label: '音楽' },
  { icon: '🏊', label: '水泳' },
  { icon: '🏃', label: '陸上' },
  { icon: '💃', label: 'ダンス' },
  { icon: '🎸', label: 'バンド' },
  { icon: '⚽', label: 'サッカー' },
  { icon: '🏋️', label: '筋トレ' },
  { icon: '🎨', label: 'アート' },
  { icon: '📝', label: '資格・試験' },
  { icon: '🍳', label: '料理' },
  { icon: '💻', label: 'IT・開発' },
  { icon: '🌸', label: 'その他' },
];

function renderStepIndicator() {
  return `
  <div style="display:flex;align-items:center;justify-content:center;gap:8px;margin-bottom:16px;">
    ${[0,1,2,3].map(i => `
    <div style="
      height:6px;border-radius:var(--md-sys-shape-corner-full);
      transition:all 300ms var(--md-sys-motion-easing-standard);
      background:${i <= setupStep ? 'var(--md-sys-color-primary)' : 'var(--md-sys-color-surface-container-highest)'};
      width:${i === setupStep ? '32px' : '12px'};
    "></div>`).join('')}
  </div>`;
}

function renderStep0() {
  return `
  <div style="flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:0 24px;">
    <!-- Brand Hero Logo -->
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

    <!-- Highlights -->
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

function renderStep1() {
  return `
  <div style="padding:0 20px;flex:1;display:flex;flex-direction:column;gap:20px;">
    <div>
      <h2 class="md-typescale-headline-small" style="font-weight:700;color:var(--md-sys-color-on-surface);margin-bottom:4px;">プロフィール設定</h2>
      <p class="md-typescale-body-medium" style="color:var(--md-sys-color-outline);margin:0;">まずはあなたのことを教えてください</p>
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
      ">${setupData.avatarInitial || '?'}</div>
      
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

    <!-- Form Inputs with Icons & Clear Labels -->
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
        <input id="setup-username" class="form-input" type="text" placeholder="aoi_tanaka" maxlength="20" value="${setupData.username.replace('@','')}" required />
      </div>
      <span class="form-hint">※半角英数字・アンダースコアのみ</span>
    </div>

    <div class="form-group">
      <label class="form-label" for="setup-bio">
        <span class="material-symbols-rounded" style="font-size:18px;color:var(--md-sys-color-on-surface-variant);">edit_note</span>
        自己紹介
        <span class="form-label-optional">任意</span>
      </label>
      <textarea id="setup-bio" class="form-textarea" placeholder="あなたの挑戦していることや意気込みを教えてください" rows="3" maxlength="150">${setupData.bio}</textarea>
    </div>
  </div>`;
}

function renderStep2() {
  return `
  <div style="padding:0 20px;flex:1;">
    <h2 class="md-typescale-headline-small" style="font-weight:700;color:var(--md-sys-color-on-surface);margin-bottom:4px;">挑戦のジャンル</h2>
    <p class="md-typescale-body-medium" style="color:var(--md-sys-color-outline);margin-bottom:20px;">挑戦する・興味のあるジャンルを選択してください</p>

    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px;">
      ${categoryOptions.map(cat => {
        const isSelected = setupData.categories.includes(cat.label);
        return `
        <button class="md-card md-card-outlined category-btn" data-label="${cat.label}" style="
          padding:16px 8px;border-radius:var(--md-sys-shape-corner-medium);
          border:2px solid ${isSelected ? 'var(--md-sys-color-primary)' : 'var(--md-sys-color-outline-variant)'};
          background:${isSelected ? 'var(--md-sys-color-primary-container)' : 'var(--md-sys-color-surface)'};
          color:${isSelected ? 'var(--md-sys-color-on-primary-container)' : 'var(--md-sys-color-on-surface)'};
          cursor:pointer;
          display:flex;flex-direction:column;align-items:center;gap:6px;
          transition:all 200ms;
        ">
          <span style="font-size:26px;">${cat.icon}</span>
          <span class="md-typescale-label-large" style="font-weight:${isSelected ? '700' : '500'};">${cat.label}</span>
        </button>`;
      }).join('')}
    </div>
  </div>`;
}

function renderStep3() {
  const name = setupData.name || 'ユーザー';
  return `
  <div style="flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:0 24px;text-align:center;">
    <div style="margin-bottom:16px;">
      ${getIconSvg('sparkles', { size: 64, color: 'var(--md-sys-color-primary)', strokeWidth: 1.8, className: 'setup-celebration-icon', style: 'display:block;margin:0 auto;' })}
    </div>
    <h2 class="md-typescale-headline-medium" style="font-weight:900;color:var(--md-sys-color-on-surface);margin-bottom:8px;">
      ${name}さん、<br>初期設定が完了しました！
    </h2>
    <p class="md-typescale-body-medium" style="color:var(--md-sys-color-on-surface-variant);line-height:1.6;margin-bottom:24px;">
      TRYLOGへようこそ！<br>さあ、あなたの最初の挑戦を記録しましょう。
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
  return buildSetupHTML();
}

function buildSetupHTML() {
  const steps = [renderStep0, renderStep1, renderStep2, renderStep3];
  const btnLabels = ['はじめる', '次へ', '次へ', 'TRYLOGを開始する'];

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
      setupData.bio = document.getElementById('setup-bio')?.value.trim();
      setupData.avatarInitial = name.charAt(0);
    }

    if (setupStep < 3) {
      setupStep++;
    } else {
      appState.user.isSetupDone = true;
      appState.user.name = setupData.name || appState.user.name;
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

  document.querySelectorAll('.category-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const label = btn.dataset.label;
      const idx = setupData.categories.indexOf(label);
      if (idx >= 0) {
        setupData.categories.splice(idx, 1);
      } else {
        setupData.categories.push(label);
      }
      const isSelected = setupData.categories.includes(label);
      btn.style.borderColor = isSelected ? 'var(--md-sys-color-primary)' : 'var(--md-sys-color-outline-variant)';
      btn.style.background = isSelected ? 'var(--md-sys-color-primary-container)' : 'var(--md-sys-color-surface)';
      btn.style.color = isSelected ? 'var(--md-sys-color-on-primary-container)' : 'var(--md-sys-color-on-surface)';
    });
  });
}
