// ===================================
// TRYLOG - Post Failure Form (Material Design 3)
// ===================================

let formData = {
  contestName: '',
  result: '',
  experience: '',
  cause: '',
  emotion: '',
  retryIntent: null,
  other: '',
  images: [],
};

const emotionOptions = [
  { emoji: '😔', label: '悔しい' },
  { emoji: '😤', label: '怒り' },
  { emoji: '😞', label: '落ち込み' },
  { emoji: '😢', label: '泣きたい' },
  { emoji: '🤔', label: '複雑' },
  { emoji: '💪', label: '前向き' },
  { emoji: '😅', label: 'しょうがない' },
  { emoji: '🔥', label: 'やってやる' },
];

export function renderPostFailure() {
  return `
  <!-- M3 Top App Bar -->
  <header class="md-top-app-bar" style="position:sticky;top:0;z-index:50;background:var(--md-sys-color-surface);border-bottom:1px solid var(--md-sys-color-outline-variant);">
    <button data-action="back" class="icon-btn" aria-label="閉じる" style="background:transparent;border:none;color:var(--md-sys-color-on-surface);cursor:pointer;padding:8px;border-radius:50%;display:flex;align-items:center;">
      <span class="material-symbols-rounded">close</span>
    </button>
    <div style="flex:1;">
      <h2 class="md-typescale-title-medium" style="color:var(--md-sys-color-on-surface);margin:0;">失敗を記録する</h2>
      <p class="md-typescale-body-small" style="color:var(--md-sys-color-outline);margin:0;">この経験が次の挑戦への一歩になる</p>
    </div>
    <button id="submit-failure" class="md-btn md-btn-filled" style="background:var(--md-sys-color-secondary);color:var(--md-sys-color-on-secondary);border-radius:var(--md-sys-shape-corner-full);padding:0 20px;height:40px;">
      投稿
    </button>
  </header>

  <!-- Hero Card Banner -->
  <div style="margin:16px 16px 0;padding:20px;border-radius:var(--md-sys-shape-corner-large);background:var(--md-sys-color-secondary-container);color:var(--md-sys-color-on-secondary-container);display:flex;align-items:center;gap:14px;box-shadow:var(--md-sys-elevation-level1);">
    <div style="width:48px;height:48px;border-radius:var(--md-sys-shape-corner-medium);background:var(--md-sys-color-secondary);display:flex;align-items:center;justify-content:center;color:var(--md-sys-color-on-secondary);flex-shrink:0;">
      <span class="material-symbols-rounded" style="font-size:26px;font-variation-settings:'FILL' 1;">sentiment_dissatisfied</span>
    </div>
    <div>
      <h3 class="md-typescale-title-medium" style="color:var(--md-sys-color-on-secondary-container);margin-bottom:2px;">失敗は次の挑戦の始まり</h3>
      <p class="md-typescale-body-small" style="color:var(--md-sys-color-on-secondary-container);opacity:0.85;">正直に記録することで仲間に伝わります</p>
    </div>
  </div>

  <!-- Form Content -->
  <div style="padding:20px 16px 40px;display:flex;flex-direction:column;gap:20px;">

    <!-- Contest Name -->
    <div class="form-group">
      <label class="form-label" for="field-contest">
        <span class="material-symbols-rounded" style="font-size:18px;color:var(--md-sys-color-secondary);">emoji_events</span>
        コンクール・大会名
        <span class="form-label-required">必須</span>
      </label>
      <div class="input-container has-icon">
        <span class="material-symbols-rounded input-icon">emoji_events</span>
        <input id="field-contest" class="form-input" type="text" placeholder="例：第47回 全日本学生ピアノコンクール" maxlength="80" required />
      </div>
    </div>

    <!-- Result -->
    <div class="form-group">
      <label class="form-label" for="field-result">
        <span class="material-symbols-rounded" style="font-size:18px;color:var(--md-sys-color-secondary);">assignment</span>
        結果
        <span class="form-label-required">必須</span>
      </label>
      <div class="input-container has-icon">
        <span class="material-symbols-rounded input-icon">assignment</span>
        <input id="field-result" class="form-input" type="text" placeholder="例：予選落ち（1次審査）、2位、タイム 3:24:10" maxlength="100" required />
      </div>
    </div>

    <!-- Experience -->
    <div class="form-group">
      <label class="form-label" for="field-experience">
        <span class="material-symbols-rounded" style="font-size:18px;color:var(--md-sys-color-outline);">history</span>
        挑戦歴
        <span class="form-label-optional">任意</span>
      </label>
      <div class="input-container has-icon">
        <span class="material-symbols-rounded input-icon">history</span>
        <input id="field-experience" class="form-input" type="text" placeholder="例：3年目の挑戦、初出場" maxlength="50" />
      </div>
    </div>

    <!-- Cause -->
    <div class="form-group">
      <label class="form-label" for="field-cause">
        <span class="material-symbols-rounded" style="font-size:18px;color:var(--md-sys-color-secondary);">search_insights</span>
        失敗の原因分析
        <span class="form-label-required">必須</span>
      </label>
      <textarea id="field-cause" class="form-textarea" placeholder="何が原因だったかを正直に振り返ってみましょう" rows="4" maxlength="500" required></textarea>
      <div class="form-hint">
        <span>客観的に振り返ることが成長につながります</span>
        <span id="cause-counter">0 / 500文字</span>
      </div>
    </div>

    <!-- Emotion Selection Chips -->
    <div class="form-group">
      <label class="form-label">
        <span class="material-symbols-rounded" style="font-size:18px;color:var(--md-sys-color-primary);">mood</span>
        現在の気持ち・心情
      </label>
      <div style="display:flex;flex-wrap:wrap;gap:8px;" id="emotion-group">
        ${emotionOptions.map((opt) => `
          <button class="md-chip md-chip-filter emotion-chip" data-label="${opt.label}" style="height:36px;border-radius:var(--md-sys-shape-corner-small);">
            <span style="font-size:18px;">${opt.emoji}</span>
            <span>${opt.label}</span>
          </button>
        `).join('')}
      </div>
    </div>

    <!-- Retry Intent -->
    <div class="form-group">
      <label class="form-label">
        <span class="material-symbols-rounded" style="font-size:18px;color:var(--md-sys-color-tertiary);">refresh</span>
        再挑戦の意思
      </label>
      <div style="display:flex;gap:12px;">
        <button class="md-btn md-btn-outlined retry-btn" data-value="yes" style="flex:1;height:48px;border-radius:var(--md-sys-shape-corner-medium);">
          <span style="font-size:20px;">💪</span> する！
        </button>
        <button class="md-btn md-btn-outlined retry-btn" data-value="no" style="flex:1;height:48px;border-radius:var(--md-sys-shape-corner-medium);">
          <span style="font-size:20px;">🌿</span> 考え中
        </button>
      </div>
    </div>

    <!-- Other Thoughts -->
    <div class="form-group">
      <label class="form-label" for="field-other">
        <span class="material-symbols-rounded" style="font-size:18px;color:var(--md-sys-color-outline);">edit_note</span>
        ひとこと
        <span class="form-label-optional">任意</span>
      </label>
      <textarea id="field-other" class="form-textarea" placeholder="今の正直な気持ちや仲間に伝えたいことを自由に書いてください" rows="3" maxlength="300"></textarea>
    </div>

    <!-- Image Upload Area -->
    <div class="form-group">
      <label class="form-label">
        <span class="material-symbols-rounded" style="font-size:18px;color:var(--md-sys-color-outline);">photo_library</span>
        画像・動画の添付
        <span class="form-label-optional">任意</span>
      </label>
      <div id="upload-area" style="
        border:2px dashed var(--md-sys-color-outline-variant);
        border-radius:var(--md-sys-shape-corner-medium);
        padding:28px 16px;
        text-align:center;
        cursor:pointer;
        background:var(--md-sys-color-surface-container-low);
      ">
        <span class="material-symbols-rounded" style="font-size:40px;color:var(--md-sys-color-outline);margin-bottom:8px;">add_photo_alternate</span>
        <p class="md-typescale-body-medium" style="color:var(--md-sys-color-on-surface);margin-bottom:2px;font-weight:600;">タップしてファイルを選択</p>
        <p class="md-typescale-body-small" style="color:var(--md-sys-color-outline);">JPEG, PNG, MP4（最大50MB）</p>
        <input type="file" id="file-input" accept="image/*,video/*" multiple style="display:none" />
      </div>
      <div id="preview-container" style="display:flex;gap:10px;flex-wrap:wrap;margin-top:10px;"></div>
    </div>

    <!-- Bottom Submit Button -->
    <button id="submit-failure-bottom" class="md-btn md-btn-filled" style="height:52px;border-radius:var(--md-sys-shape-corner-full);background:var(--md-sys-color-secondary);color:var(--md-sys-color-on-secondary);font-size:16px;margin-top:8px;">
      💪 失敗を記録して共有する
    </button>
  </div>`;
}

export function attachEvents(params) {
  document.querySelector('[data-action="back"]')?.addEventListener('click', () => {
    const { navigate } = window.__trylog || {};
    if (navigate) navigate('home');
  });

  const causeField = document.getElementById('field-cause');
  const causeCounter = document.getElementById('cause-counter');
  causeField?.addEventListener('input', () => {
    if (causeCounter) causeCounter.textContent = `${causeField.value.length} / 500文字`;
  });

  document.querySelectorAll('.emotion-chip').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.emotion-chip').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      formData.emotion = btn.dataset.label;
    });
  });

  document.querySelectorAll('.retry-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.retry-btn').forEach(b => {
        b.style.background = 'transparent';
        b.style.borderColor = 'var(--md-sys-color-outline)';
        b.style.color = 'var(--md-sys-color-on-surface-variant)';
      });
      btn.style.background = 'var(--md-sys-color-secondary-container)';
      btn.style.borderColor = 'var(--md-sys-color-secondary)';
      btn.style.color = 'var(--md-sys-color-on-secondary-container)';
      formData.retryIntent = btn.dataset.value === 'yes';
    });
  });

  const uploadArea = document.getElementById('upload-area');
  const fileInput = document.getElementById('file-input');
  const previewContainer = document.getElementById('preview-container');

  uploadArea?.addEventListener('click', () => fileInput?.click());

  fileInput?.addEventListener('change', (e) => {
    const files = Array.from(e.target.files);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (ev) => {
        const preview = document.createElement('div');
        preview.style.cssText = 'position:relative;width:84px;height:84px;border-radius:12px;overflow:hidden;border:1px solid var(--md-sys-color-outline-variant);';
        
        if (file.type.startsWith('image/')) {
          preview.innerHTML = `<img src="${ev.target.result}" style="width:100%;height:100%;object-fit:cover;" />`;
        } else {
          preview.innerHTML = `<div style="width:100%;height:100%;background:var(--md-sys-color-surface-container);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;">
            <span class="material-symbols-rounded" style="font-size:24px;color:var(--md-sys-color-on-surface-variant)">videocam</span>
            <span style="font-size:10px;color:var(--md-sys-color-outline)">動画</span>
          </div>`;
        }

        preview.innerHTML += `<button style="position:absolute;top:4px;right:4px;width:22px;height:22px;border-radius:50%;background:rgba(0,0,0,0.6);border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;" onclick="this.parentElement.remove()">
          <span class="material-symbols-rounded" style="font-size:14px;color:white;">close</span>
        </button>`;
        
        previewContainer.appendChild(preview);
      };
      reader.readAsDataURL(file);
    });
  });

  const handleSubmit = () => {
    const contestName = document.getElementById('field-contest')?.value.trim();
    const result = document.getElementById('field-result')?.value.trim();
    const cause = document.getElementById('field-cause')?.value.trim();

    if (!contestName || !result || !cause) {
      const { showToast } = window.__trylog || {};
      if (showToast) showToast('必須項目をすべて入力してください', 'error', 2500);
      return;
    }

    const { navigate, showToast } = window.__trylog || {};
    if (showToast) showToast('失敗の記録を公開しました！💪', 'check_circle');
    if (navigate) setTimeout(() => navigate('home'), 500);
  };

  document.getElementById('submit-failure')?.addEventListener('click', handleSubmit);
  document.getElementById('submit-failure-bottom')?.addEventListener('click', handleSubmit);
}
