// ===================================
// TRYLOG - Sample Data
// ===================================

export const currentUser = {
  id: 'user_me',
  name: '田中　秀虎',
  username: '@hidetora_tanaka',
  avatar: null,
  avatarColor: '#4F8EF7',
  avatarInitial: '秀',
  topicCategory: 'コンテスト・大会',
  topic: 'ビジネス・起業',
  bio: 'ビジネスコンテストを頑張っている高校生です。よろしくお願いします！',
  bioVisibility: 'public', // 'public' | 'friends' | 'none'
  ageGroup: '高校生',
  ageGroupVisibility: 'public', // 'public' | 'friends' | 'private'
  joinDate: '2026年9月',
  followersCount: 0,
  followingCount: 0,
  postsCount: 2,
  isSetupDone: false,
  isNewUser: true,
};
// ===================================
// TRYLOG - Sample Data
// ===================================

export const topicCategories = [
  {
    name: 'コンテスト・大会',
    icon: '🏆',
    topics: [
      '文芸',
      '美術/デザイン/建築',
      '音楽',
      '学術/研究',
      '弁論',
      'プログラミング/IT',
      'ビジネス・起業',
      'その他（コンテスト・大会）'
    ]
  },
  {
    name: '試合・スポーツ',
    icon: '⚽',
    topics: [
      '陸上/水泳/体操系',
      '球技(団体)',
      '球技(個人)',
      '武道/格闘技',
      'ウィンタースポーツ/アウトドア系',
      'eスポーツ',
      '将棋/囲碁/クイズ系'
    ]
  },
  {
    name: '資格・検定',
    icon: '📝',
    topics: [
      '語学検定',
      '情報/IT系検定',
      'ビジネス/専門/キャリア系検定',
      'その他学力系検定'
    ]
  },
  {
    name: 'その他・活動',
    icon: '🌟',
    topics: [
      'ボランティア/社会貢献活動',
      'その他'
    ]
  }
];

export const users = [
  {
    id: 'user_01',
    name: '森川 湊',
    username: '@ren_idea',
    avatar: null,
    avatarColor: '#6BCB77',
    avatarInitial: '蓮',
    bio: '高校生起業家志望。地域課題を解決するサービスを考えています。',
    bioVisibility: 'public',
    ageGroup: '高校生',
    ageGroupVisibility: 'public',
    followersCount: 512,
    followingCount: 201,
    postsCount: 24,
    isFollowing: true,
    isNewUser: false,
  },
  {
    id: 'user_02',
    name: '小川 ひより',
    username: '@sakura_edtech',
    avatar: null,
    avatarColor: '#FF6B6B',
    avatarInitial: '桜',
    bio: '教育系ビジネスコンテストに挑戦中。3度目の正直！',
    bioVisibility: 'public',
    ageGroup: '高校生',
    ageGroupVisibility: 'public',
    followersCount: 340,
    followingCount: 155,
    postsCount: 18,
    isFollowing: true,
    isNewUser: true,
  },
  {
    id: 'user_03',
    name: '藤原 恒一',
    username: '@riku_fintech',
    avatar: null,
    avatarColor: '#FFB347',
    avatarInitial: '陸',
    bio: '金融×テクノロジーのアイデアを研究中。全国大会出場が目標。',
    bioVisibility: 'public',
    ageGroup: '大学生',
    ageGroupVisibility: 'friends',
    followersCount: 892,
    followingCount: 340,
    postsCount: 35,
    isFollowing: false,
    isNewUser: false,
  },
  {
    id: 'user_04',
    name: '白石 凛',
    username: '@hina_social',
    avatar: null,
    avatarColor: '#7B6FF0',
    avatarInitial: 'ひ',
    bio: '社会課題を解決するソーシャルビジネスに挑戦中。',
    bioVisibility: 'public',
    ageGroup: '大学生',
    ageGroupVisibility: 'public',
    followersCount: 1203,
    followingCount: 280,
    postsCount: 41,
    isFollowing: true,
    isNewUser: false,
  },
  {
    id: 'user_05',
    name: '西村 直人',
    username: '@kenta_app',
    avatar: null,
    avatarColor: '#4DD0B3',
    avatarInitial: '健',
    bio: 'アプリ開発中。ユーザーの声をもとにサービスを改善しています。',
    bioVisibility: 'public',
    ageGroup: '高校生',
    ageGroupVisibility: 'private',
    followersCount: 267,
    followingCount: 198,
    postsCount: 15,
    isFollowing: true,
    isNewUser: true,
  },
];

export const failurePosts = [
  {
    id: 'post_f01',
    userId: 'user_02',
    type: 'failure',
    contestName: '第13回 高校生ビジネスプラン・グランプリ',
    result: '書類審査で落選',
    experience: '3年目の挑戦',
    cause: '課題設定が広すぎて、誰のどんな困りごとを解決するのかが伝わりませんでした。ユーザー調査の不足を痛感しました。',
    emotion: '悔しい',
    emotionEmoji: '😔',
    emotionColor: '#FF6B6B',
    retryIntent: true,
    comment: '本当に悔しいです。でも、次は実際に利用者へ話を聞いて、もっと具体的なプランに磨き上げます！',
    imageUrl: null,
    likes: 48,
    comments: 2,
    commentsList: [
      { id: 'c1', userId: 'user_01', text: '課題を具体化する視点は大切ですね。次の挑戦も応援しています！', postedAt: '1時間前' },
      { id: 'c2', userId: 'user_04', text: '調査からやり直す姿勢が素晴らしいです。', postedAt: '30分前' }
    ],
    isLiked: false,
    postedAt: '2時間前',
    storyId: 'story_01',
  },
  {
    id: 'post_f02',
    userId: 'user_01',
    type: 'failure',
    contestName: '全国高校生ビジネスアイデアコンテスト',
    result: '最終審査進出ならず',
    experience: '5回目の挑戦',
    cause: 'プレゼンで市場規模と収益モデルの説明に時間を使いすぎ、サービスの価値を十分に伝えられませんでした。',
    emotion: '前向き',
    emotionEmoji: '💪',
    emotionColor: '#4F8EF7',
    retryIntent: true,
    comment: '伝えたいことを絞る難しさを学びました。次回は短時間でも価値が伝わる構成に改善します。',
    imageUrl: null,
    likes: 93,
    comments: 1,
    commentsList: [
      { id: 'c3', userId: 'user_03', text: 'プレゼンの改善点が明確ですね。次回も頑張ってください！', postedAt: '3時間前' }
    ],
    isLiked: true,
    postedAt: '5時間前',
    storyId: 'story_02',
  },
  {
    id: 'post_f03',
    userId: 'user_04',
    type: 'failure',
    contestName: 'ソーシャルビジネス・チャレンジ2026',
    result: '奨励賞（入賞を目指していた）',
    experience: '7か月目の挑戦',
    cause: '社会的な意義は評価されたものの、継続的な運営費をどう確保するかという事業計画が弱いと指摘されました。',
    emotion: '複雑',
    emotionEmoji: '🤔',
    emotionColor: '#7B6FF0',
    retryIntent: true,
    comment: '理念だけでなく、事業として続けられる仕組みが必要だと学びました。収支計画を練り直します。',
    imageUrl: null,
    likes: 127,
    comments: 0,
    commentsList: [],
    isLiked: false,
    postedAt: '1日前',
    storyId: 'story_03',
  },
  {
    id: 'post_f04',
    userId: 'user_03',
    type: 'failure',
    contestName: '大学生アントレプレナーシップ・カップ',
    result: '予選敗退',
    experience: '2回目の挑戦',
    cause: '競合サービスとの差別化が不十分で、顧客がなぜ自分たちのサービスを選ぶのか説明しきれませんでした。',
    emotion: '悔しい',
    emotionEmoji: '😤',
    emotionColor: '#FFB347',
    retryIntent: true,
    comment: '競合分析をやり直し、独自の強みを明確にして次の大会に挑みます！',
    imageUrl: null,
    likes: 76,
    comments: 0,
    commentsList: [],
    isLiked: false,
    postedAt: '2日前',
    storyId: 'story_04',
  },
  {
    id: 'post_f05',
    userId: 'user_05',
    type: 'failure',
    contestName: '高校生アプリ開発ビジネスコンテスト',
    result: '二次審査落ち',
    experience: '2年目',
    cause: 'アイデア自体は評価されたものの、試作品の完成度とユーザーテストの実績が足りませんでした。',
    emotion: '落ち込み',
    emotionEmoji: '😞',
    emotionColor: '#4DD0B3',
    retryIntent: false,
    comment: '今は少し休みつつ、実際に使ってもらえるプロトタイプを作り直したいと思います。',
    imageUrl: null,
    likes: 41,
    comments: 0,
    commentsList: [],
    isLiked: false,
    postedAt: '3日前',
    storyId: 'story_05',
  },
];

export const goalPosts = [
  {
    id: 'post_g01',
    userId: 'user_02',
    type: 'goal',
    title: '教育格差を解消する学習支援サービスで最終審査進出',
    deadline: '2026年12月15日',
    actions: ['高校生・大学生20人へのユーザーインタビュー', 'MVPのプロトタイプ作成', '月2回のメンタリング参加', '収支計画と事業モデルの改善'],
    comment: '利用者の声を起点にサービスを磨き、今度こそ最終審査まで進みたいです！',
    storyId: 'story_01',
    postedAt: '2時間前',
    likes: 36,
    comments: 0,
    commentsList: [],
    isLiked: false,
  },
  {
    id: 'post_g02',
    userId: 'user_01',
    type: 'goal',
    title: '全国大会出場とビジネスモデルの実証',
    deadline: '2027年3月1日',
    actions: ['競合サービスを10件調査', '顧客候補へのヒアリングを週3回実施', '収益モデルを3案比較', '5分間のピッチ練習を毎日行う'],
    comment: 'サービスの価値と収益性を両立させ、全国大会出場を目指します。',
    storyId: 'story_02',
    postedAt: '5時間前',
    likes: 71,
    comments: 0,
    commentsList: [],
    isLiked: false,
  },
];

export const processPosts = [
  {
    id: 'post_p01',
    userId: 'user_02',
    type: 'process',
    title: 'ユーザーインタビュー10人目',
    content: '学習に困難を感じている高校生10人に話を聞きました。想定していた課題と実際のニーズに違いがあり、サービスの方向性を見直しています。',
    storyId: 'story_01',
    postedAt: '1日前',
    likes: 52,
    comments: 0,
    commentsList: [],
    isLiked: false,
  },
  {
    id: 'post_p02',
    userId: 'user_02',
    type: 'process',
    title: 'プロトタイプの初版が完成',
    content: '最低限の機能を実装したプロトタイプが完成！友人3人に試してもらい、使いにくい部分を洗い出しました。次は改善版を作ります。',
    storyId: 'story_01',
    postedAt: '3日前',
    likes: 44,
    comments: 0,
    commentsList: [],
    isLiked: false,
  },
  {
    id: 'post_p03',
    userId: 'user_01',
    type: 'process',
    title: '競合分析とピッチ練習',
    content: '競合サービスを8件比較し、自分たちの強みを整理しました。ピッチ練習では説明が長くなりがちなので、要点を3つに絞って改善中です。',
    storyId: 'story_02',
    postedAt: '2日前',
    likes: 88,
    comments: 0,
    commentsList: [],
    isLiked: true,
  },
];

export const resultPosts = [
  {
    id: 'post_r01',
    userId: 'user_01',
    type: 'result',
    title: '校内ビジネスプラン発表会 結果報告',
    content: '優秀賞を受賞しました！ユーザーインタビューをもとに提案内容を改善したことが評価されました。次は外部コンテストへの出場を目指します。',
    isSuccess: true,
    storyId: 'story_02',
    postedAt: '5日前',
    likes: 201,
    comments: 0,
    commentsList: [],
    isLiked: true,
  },
];

export const stories = [
  {
    id: 'story_01',
    userId: 'user_02',
    title: '教育格差解消サービスへの挑戦',
    category: 'ビジネス・起業',
    failurePostId: 'post_f01',
    goalPostId: 'post_g01',
    processPostIds: ['post_p01', 'post_p02'],
    resultPostId: null,
  },
  {
    id: 'story_02',
    userId: 'user_01',
    title: '地域課題解決サービスへの挑戦',
    category: 'ビジネス・起業',
    failurePostId: 'post_f02',
    goalPostId: 'post_g02',
    processPostIds: ['post_p03'],
    resultPostId: 'post_r01',
  },
  {
    id: 'story_03',
    userId: 'user_04',
    title: 'ソーシャルビジネスへの挑戦',
    category: 'ビジネス・起業',
    failurePostId: 'post_f03',
    goalPostId: null,
    processPostIds: [],
    resultPostId: null,
  },
  {
    id: 'story_04',
    userId: 'user_03',
    title: 'フィンテック事業への挑戦',
    category: 'ビジネス・起業',
    failurePostId: 'post_f04',
    goalPostId: null,
    processPostIds: [],
    resultPostId: null,
  },
  {
    id: 'story_05',
    userId: 'user_05',
    title: 'アプリサービス開発への挑戦',
    category: 'ビジネス・起業',
    failurePostId: 'post_f05',
    goalPostId: null,
    processPostIds: [],
    resultPostId: null,
  },
];

export const notifications = [
  { id: 'notif_01', type: 'like', userId: 'user_01', message: 'あなたの投稿に「いいね」しました', time: '3分前', read: false },
  { id: 'notif_02', type: 'comment', userId: 'user_04', message: 'コメントしました：「頑張ってください！応援しています」', time: '1時間前', read: false },
  { id: 'notif_03', type: 'follow', userId: 'user_03', message: 'あなたをフォローしました', time: '2時間前', read: true },
  { id: 'notif_04', type: 'like', userId: 'user_02', message: 'あなたの投稿に「いいね」しました', time: '昨日', read: true },
];

// Helper functions
export function getUserById(id) {
  if (id === 'user_me') return currentUser;
  return users.find(u => u.id === id) || null;
}

export function getStoryById(id) {
  return stories.find(s => s.id === id) || null;
}

export function getStoryByUserId(userId) {
  if (userId === 'user_me') {
    return stories.find(s => s.userId === 'user_me') || null;
  }
  return stories.find(s => s.userId === userId) || null;
}

export function getPostById(id) {
  return [
    ...failurePosts,
    ...goalPosts,
    ...processPosts,
    ...resultPosts,
  ].find(p => p.id === id) || null;
}

export function getStoryPosts(storyId) {
  const story = getStoryById(storyId);
  if (!story) return { failure: null, goal: null, process: [], result: null };

  return {
    failure: story.failurePostId ? getPostById(story.failurePostId) : null,
    goal: story.goalPostId ? getPostById(story.goalPostId) : null,
    process: story.processPostIds.map(id => getPostById(id)).filter(Boolean),
    result: story.resultPostId ? getPostById(story.resultPostId) : null,
  };
}

export function getAvatarStyle(user) {
  return `background: ${user.avatarColor || '#4F8EF7'};`;
}

// Get recommended posts algorithm (Likes + New User boost)
export function getRecommendedFeedPosts() {
  const allPosts = [
    ...failurePosts,
    ...goalPosts,
    ...processPosts,
    ...resultPosts,
  ];

  return allPosts.sort((a, b) => {
    const userA = getUserById(a.userId) || {};
    const userB = getUserById(b.userId) || {};

    const scoreA = (a.likes || 0) + (userA.isNewUser ? 50 : 0);
    const scoreB = (b.likes || 0) + (userB.isNewUser ? 50 : 0);

    return scoreB - scoreA;
  });
}

// Add new failure post
export function addFailurePost(postData) {
  const newPost = {
    id: `post_f_${Date.now()}`,
    userId: currentUser.id,
    type: 'failure',
    contestName: postData.contestName,
    result: postData.result,
    experience: postData.experience || '初挑戦',
    cause: postData.cause,
    emotion: postData.emotion || '前向き',
    emotionEmoji: postData.emotionEmoji || '💪',
    emotionColor: '#FF6B6B',
    retryIntent: postData.retryIntent ?? true,
    comment: postData.comment || '',
    imageUrl: postData.imageUrl || null,
    likes: 0,
    comments: 0,
    commentsList: [],
    isLiked: false,
    postedAt: 'たった今',
    storyId: `story_me_${Date.now()}`,
  };

  failurePosts.unshift(newPost);
  currentUser.postsCount++;

  // Create or attach to current user story
  let userStory = stories.find(s => s.userId === currentUser.id);
  if (!userStory) {
    userStory = {
      id: newPost.storyId,
      userId: currentUser.id,
      title: `${postData.contestName}への挑戦`,
      category: currentUser.topic || '挑戦',
      failurePostId: newPost.id,
      goalPostId: null,
      processPostIds: [],
      resultPostId: null,
    };
    stories.unshift(userStory);
  } else {
    userStory.failurePostId = newPost.id;
  }

  return newPost;
}

// Add new goal post
export function addGoalPost(postData) {
  const newPost = {
    id: `post_g_${Date.now()}`,
    userId: currentUser.id,
    type: 'goal',
    title: postData.title,
    deadline: postData.deadline,
    actions: postData.actions || [],
    comment: postData.comment || '',
    storyId: `story_me_${Date.now()}`,
    postedAt: 'たった今',
    likes: 0,
    comments: 0,
    commentsList: [],
    isLiked: false,
  };

  goalPosts.unshift(newPost);
  currentUser.postsCount++;

  let userStory = stories.find(s => s.userId === currentUser.id);
  if (!userStory) {
    userStory = {
      id: newPost.storyId,
      userId: currentUser.id,
      title: `${postData.title}への目標`,
      category: currentUser.topic || '目標',
      failurePostId: null,
      goalPostId: newPost.id,
      processPostIds: [],
      resultPostId: null,
    };
    stories.unshift(userStory);
  } else {
    userStory.goalPostId = newPost.id;
  }

  return newPost;
}

// Add comment to any post
export function addCommentToPost(postId, text) {
  const post = getPostById(postId);
  if (!post) return false;

  if (!post.commentsList) post.commentsList = [];
  const newComment = {
    id: `comment_${Date.now()}`,
    userId: currentUser.id,
    text: text,
    postedAt: 'たった今',
  };

  post.commentsList.push(newComment);
  post.comments = post.commentsList.length;
  return newComment;
}

