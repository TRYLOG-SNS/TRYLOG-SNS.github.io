// ===================================
// TRYLOG - Post Goal Form (Material Design 3)
// ===================================

export function renderPostGoal() {
  const defaultDate = new Date();
  defaultDate.setMonth(defaultDate.getMonth() + 3);
  const dateStr = defaultDate.toISOString().split('T')[0];

  return `
  <!-- M3 Top App Bar -->
  <header class="md-top-app-bar" style="position:sticky;top:0;z-index:50;background:var(--md-sys-color-surface);border-bottom:1px solid var(--md-sys-color-outline-variant);">
    <button data-action="back" class="icon-btn" aria-label="閉じる" style="background:transparent;border:none;color:var(--md-sys-color-on-surface);cursor:pointer;padding:8px;border-radius:50%;display:flex;align-items:center;">
      <span class="material-symbols-rounded">close</span>
    </button>
    <div style="flex:1;">
      <h2 class="md-typescale-title-medium" style="color:var(--md-sys-color-on-surface);margin:0;">目標を立てる</h2>
      <p class="md-typescale-body-small" style="color:var(--md-sys-color-outline);margin:0;">次の挑戦への第一歩を宣言しよう</p>
    </div>
    <button id="submit-goal" class="md-btn md-btn-filled" style="background:var(--md-sys-color-primary);color:var(--md-sys-color-on-primary);border-radius:var(--md-sys-shape-corner-full);padding:0 20px;height:40px;">
      宣言
    </button>
  </header>

  <!-- Hero Card Banner -->
  <div style="margin:16px 16px 0;padding:20px;border-radius:var(--md-sys-shape-corner-large);background:var(--md-sys-color-primary-container);color:var(--md-sys-color-on-primary-container);display:flex;align-items:center;gap:14px;box-shadow:var(--md-sys-elevation-level1);">
    <div style="width:48px;height:48px;border-radius:var(--md-sys-shape-corner-medium);background:var(--md-sys-color-primary);display:flex;align-items:center;justify-content:center;color:var(--md-sys-color-on-primary);flex-shrink:0;">
      <span class="material-symbols-rounded" style="font-size:26px;font-variation-settings:'FILL' 1;">flag</span>
    </div>
    <div>
      <h3 class="md-typescale-title-medium" style="color:var(--md-sys-color-on-primary-container);margin-bottom:2px;">目標を宣言して実現へ引き寄せる</h3>
      <p class="md-typescale-body-small" style="color:var(--md-sys-color-on-primary-container);opacity:0.85;">仲間があなたの宣言を見守っています</p>
    </div>
  </div>

  <!-- Form Content -->
  <div style="padding:20px 16px 40px;display:flex;flex-direction:column;gap:20px;">

    <!-- Goal Title -->
    <div class="form-group">
      <label class="form-label" for="field-goal-title">
        <span class="material-symbols-rounded" style="font-size:18px;color:var(--md-sys-color-primary);">flag</span>
        次の目標
        <span class="form-label-required">必須</span>
      </label>
      <div class="input-container has-icon">
        <span class="material-symbols-rounded input-icon">flag</span>
        <input id="field-goal-title" class="form-input" type="text" placeholder="例：来年の全日本コンクールで予選通過" maxlength="100" required />
      </div>
      <span class="form-hint">具体的で測定できる目標を設定しましょう</span>
    </div>

    <!-- Deadline -->
    <div class="form-group">
      <label class="form-label" for="field-deadline">
        <span class="material-symbols-rounded" style="font-size:18px;color:var(--md-sys-color-primary);">calendar_month</span>
        達成期限
        <span class="form-label-required">必須</span>
      </label>
      <div class="input-container has-icon">
        <span class="material-symbols-rounded input-icon">event</span>
        <input id="field-deadline" class="form-input" type="date" value="${dateStr}" min="${new Date().toISOString().split('T')[0]}" required />
      </div>
      <span class="form-hint" style="color:var(--md-sys-color-primary);font-weight:600;" id="deadline-display"></span>
    </div>

    <!-- Action List -->
    <div class="form-group">
      <label class="form-label">
        <span class="material-symbols-rounded" style="font-size:18px;color:var(--md-sys-color-primary);">checklist</span>
        目標達成のために行う具体的なアクション
        <span class="form-label-required">必須</span>
      </label>
      <div id="actions-list" style="display:flex;flex-direction:column;gap:10px;margin-bottom:6px;">
        ${[0,1,2].map(i => `
        <div class="action-item" style="display:flex;align-items:center;gap:8px;">
          <div style="width:28px;height:28px;border-radius:50%;background:var(--md-sys-color-primary-container);color:var(--md-sys-color-on-primary-container);display:flex;align-items:center;justify-content:center;font-weight:700;font-size:12px;flex-shrink:0;">
            ${i+1}
          </div>
          <div style="flex:1;">
            <input class="form-input action-input" type="text" placeholder="${['例：毎日3時間の自主練習', '例：週2回のコーチ指導', 'やることを追加…'][i]}" value="${['毎日3時間の自主練習', '週2回のコーチ指導', ''][i]}" />
          </div>
        </div>`).join('')}
      </div>
      <button id="add-action" class="md-btn md-btn-outlined" style="border-radius:var(--md-sys-shape-corner-medium);width:100%;height:44px;display:flex;align-items:center;justify-content:center;gap:6px;">
        <span class="material-symbols-rounded" style="font-size:18px;">add</span>
        アクション項目を追加
      </button>
    </div>

    <!-- Other Thoughts -->
    <div class="form-group">
      <label class="form-label" for="field-goal-other">
        <span class="material-symbols-rounded" style="font-size:18px;color:var(--md-sys-color-outline);">edit_note</span>
        想い・意気込み
        <span class="form-label-optional">任意</span>
      </label>
      <textarea id="field-goal-other" class="form-textarea" placeholder="目標に向けての想いや意気込みを自由に書いてください" rows="3" maxlength="300"></textarea>
    </div>

    <!-- Goal Live Preview Card -->
    <div id="goal-preview" class="md-card md-card-filled" style="padding:16px;background:var(--md-sys-color-surface-container-high);display:none;border-left:4px solid var(--md-sys-color-primary);">
      <div style="display:flex;align-items:center;gap:6px;margin-bottom:6px;">
        <span class="material-symbols-rounded" style="font-size:18px;color:var(--md-sys-color-primary);">preview</span>
        <span class="md-typescale-label-medium" style="color:var(--md-sys-color-primary);font-weight:700;">宣言カードのプレビュー</span>
      </div>
      <p id="preview-title" class="md-typescale-title-medium" style="color:var(--md-sys-color-on-surface);margin-bottom:4px;"></p>
      <p id="preview-deadline" class="md-typescale-body-small" style="color:var(--md-sys-color-primary);font-weight:600;"></p>
    </div>

    <!-- Bottom Submit Button -->
    <button id="submit-goal-bottom" class="md-btn md-btn-filled" style="height:52px;border-radius:var(--md-sys-shape-corner-full);background:var(--md-sys-color-primary);color:var(--md-sys-color-on-primary);font-size:16px;margin-top:8px;">
      🎯 目標を宣言する
    </button>
  </div>`;
}

export function attachEvents(params) {
  document.querySelector('[data-action="back"]')?.addEventListener('click', () => {
    const { navigate } = window.__trylog || {};
    if (navigate) navigate('home');
  });

  const deadlineField = document.getElementById('field-deadline');
  const deadlineDisplay = document.getElementById('deadline-display');
  
  function updateDeadlineDisplay() {
    if (!deadlineField?.value) return;
    const d = new Date(deadlineField.value);
    const now = new Date();
    const diff = Math.ceil((d - now) / (1000 * 60 * 60 * 24));
    if (deadlineDisplay) {
      deadlineDisplay.textContent = `達成予定日まで あと ${diff} 日`;
    }
  }
  
  deadlineField?.addEventListener('change', updateDeadlineDisplay);
  updateDeadlineDisplay();

  let actionCount = 3;
  document.getElementById('add-action')?.addEventListener('click', () => {
    if (actionCount >= 8) return;
    actionCount++;
    const list = document.getElementById('actions-list');
    const item = document.createElement('div');
    item.className = 'action-item';
    item.style.cssText = 'display:flex;align-items:center;gap:8px;';
    item.innerHTML = `
      <div style="width:28px;height:28px;border-radius:50%;background:var(--md-sys-color-primary-container);color:var(--md-sys-color-on-primary-container);display:flex;align-items:center;justify-content:center;font-weight:700;font-size:12px;flex-shrink:0;">
        ${actionCount}
      </div>
      <div style="flex:1;">
        <input class="form-input action-input" type="text" placeholder="アクションを入力…" />
      </div>
      <button class="icon-btn remove-action" style="background:transparent;border:none;color:var(--md-sys-color-outline);cursor:pointer;">
        <span class="material-symbols-rounded">close</span>
      </button>`;
    list?.appendChild(item);

    item.querySelector('.remove-action')?.addEventListener('click', () => {
      item.remove();
      actionCount--;
    });
  });

  const titleField = document.getElementById('field-goal-title');
  const preview = document.getElementById('goal-preview');
  const previewTitle = document.getElementById('preview-title');
  const previewDeadline = document.getElementById('preview-deadline');

  function updatePreview() {
    const title = titleField?.value.trim();
    if (title && preview) {
      preview.style.display = 'block';
      if (previewTitle) previewTitle.textContent = title;
      if (previewDeadline && deadlineField?.value) {
        const d = new Date(deadlineField.value);
        previewDeadline.textContent = `📅 達成期日：${d.getFullYear()}年${d.getMonth()+1}月${d.getDate()}日`;
      }
    } else if (preview) {
      preview.style.display = 'none';
    }
  }

  titleField?.addEventListener('input', updatePreview);
  deadlineField?.addEventListener('change', updatePreview);

  const handleSubmit = () => {
    const title = document.getElementById('field-goal-title')?.value.trim();
    const deadline = document.getElementById('field-deadline')?.value;
    const actions = Array.from(document.querySelectorAll('.action-input'))
      .map(i => i.value.trim()).filter(Boolean);

    if (!title || !deadline || actions.length === 0) {
      const { showToast } = window.__trylog || {};
      if (showToast) showToast('必須項目をすべて入力してください', 'error', 2500);
      return;
    }

    const { navigate, showToast } = window.__trylog || {};
    if (showToast) showToast('新しい目標を宣言しました！🎯', 'check_circle');
    if (navigate) setTimeout(() => navigate('home'), 500);
  };

  document.getElementById('submit-goal')?.addEventListener('click', handleSubmit);
  document.getElementById('submit-goal-bottom')?.addEventListener('click', handleSubmit);
}
