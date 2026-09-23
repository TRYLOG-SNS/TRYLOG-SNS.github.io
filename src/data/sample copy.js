// ===================================
// TRYLOG - Sample Data
// ===================================

export const currentUser = {
  id: 'user_me',
  name: '山田 太郎',
  username: '@taro_yamada',
  avatar: null,
  avatarColor: '#4F8EF7',
  avatarInitial: '太',
  topicCategory: 'コンテスト・大会',
  topic: '音楽',
  bio: 'ビジネスコンテストを頑張っている高校生です。よろしくお願いします！',
  bioVisibility: 'public', // 'public' | 'friends' | 'none'
  ageGroup: '20代',
  ageGroupVisibility: 'public', // 'public' | 'friends' | 'private'
  joinDate: '2026年9月',
  followersCount: 0,
  followingCount: 0,
  postsCount: 12,
  isSetupDone: false,
  isNewUser: true,
};

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
    name: '鈴木 蓮',
    username: '@ren_swim',
    avatar: null,
    avatarColor: '#6BCB77',
    avatarInitial: '蓮',
    bio: '水泳選手。オリンピックを目指して練習中。',
    bioVisibility: 'public',
    ageGroup: '20代',
    ageGroupVisibility: 'public',
    followersCount: 512,
    followingCount: 201,
    postsCount: 24,
    isFollowing: true,
    isNewUser: false,
  },
  {
    id: 'user_02',
    name: '中村 さくら',
    username: '@sakura_piano',
    avatar: null,
    avatarColor: '#FF6B6B',
    avatarInitial: '桜',
    bio: 'ピアノコンクール挑戦中🎹 3度目の正直！',
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
    name: '伊藤 陸',
    username: '@riku_runner',
    avatar: null,
    avatarColor: '#FFB347',
    avatarInitial: '陸',
    bio: 'マラソンランナー志望。サブ3を目指す。',
    bioVisibility: 'public',
    ageGroup: '30代',
    ageGroupVisibility: 'friends',
    followersCount: 892,
    followingCount: 340,
    postsCount: 35,
    isFollowing: false,
    isNewUser: false,
  },
  {
    id: 'user_04',
    name: '佐藤 ひな',
    username: '@hina_dance',
    avatar: null,
    avatarColor: '#7B6FF0',
    avatarInitial: 'ひ',
    bio: 'バレエダンサー。全国大会への道。',
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
    name: '山田 健太',
    username: '@kenta_music',
    avatar: null,
    avatarColor: '#4DD0B3',
    avatarInitial: '健',
    bio: 'ギタリスト。音楽コンクールに向けて毎日練習。',
    bioVisibility: 'public',
    ageGroup: '20代',
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
    contestName: '第47回 全日本学生ピアノコンクール',
    result: '予選落ち（1次審査）',
    experience: '3年目の挑戦',
    cause: '本番での緊張から、練習では完璧だったカデンツァで指が止まってしまいました。メンタル面の弱さを痛感しました。',
    emotion: '悔しい',
    emotionEmoji: '😔',
    emotionColor: '#FF6B6B',
    retryIntent: true,
    comment: '本当に悔しいです。でも、この経験があるから強くなれる。次こそは絶対に突破します！',
    imageUrl: null,
    likes: 48,
    comments: 2,
    commentsList: [
      { id: 'c1', userId: 'user_01', text: '緊張感は誰にでもあります！次に向けて頑張りましょう💪', postedAt: '1時間前' },
      { id: 'c2', userId: 'user_04', text: '素晴らしい挑戦です。陰ながら応援しています！', postedAt: '30分前' }
    ],
    isLiked: false,
    postedAt: '2時間前',
    storyId: 'story_01',
  },
  {
    id: 'post_f02',
    userId: 'user_01',
    type: 'failure',
    contestName: '東京都水泳選手権大会',
    result: '4位（入賞ならず）',
    experience: '5年目',
    cause: 'スタートのタイミングが0.2秒遅れた。調子は良かっただけに悔しい。',
    emotion: '前向き',
    emotionEmoji: '💪',
    emotionColor: '#4F8EF7',
    retryIntent: true,
    comment: 'あと0.2秒。それが全てでした。次の大会までにスタートを徹底的に練習します。',
    imageUrl: null,
    likes: 93,
    comments: 1,
    commentsList: [
      { id: 'c3', userId: 'user_03', text: '0.2秒の差は次で必ず埋まります！ファイト！', postedAt: '3時間前' }
    ],
    isLiked: true,
    postedAt: '5時間前',
    storyId: 'story_02',
  },
  {
    id: 'post_f03',
    userId: 'user_04',
    type: 'failure',
    contestName: '第12回 全国バレエフェスティバル',
    result: '奨励賞（上位3位以内を狙っていた）',
    experience: '7年目の挑戦',
    cause: '右足首の古傷が本番直前に痛み出し、本来の演技ができませんでした。体調管理の大切さを改めて感じました。',
    emotion: '複雑',
    emotionEmoji: '🤔',
    emotionColor: '#7B6FF0',
    retryIntent: true,
    comment: '悔しいけど、ケガをしながらも舞台に立てたことは誇りです。完全回復してから再挑戦します。',
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
    contestName: '大阪マラソン2024',
    result: 'タイム：3時間24分（目標：3時間）',
    experience: '2回目の挑戦',
    cause: '30km地点でペース配分を誤り、失速。後半のトレーニングが不足していました。',
    emotion: '悔しい',
    emotionEmoji: '😤',
    emotionColor: '#FFB347',
    retryIntent: true,
    comment: '24分の壁。これを越えなければ始まらない。次の神戸マラソンで必ずサブ3を達成します！',
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
    contestName: '軽井沢ミュージックコンクール ギター部門',
    result: '2次審査落ち',
    experience: '2年目',
    cause: '選曲のミスだったかもしれません。演奏技術より表現力の審査比重が高いと後から知りました。',
    emotion: '落ち込み',
    emotionEmoji: '😞',
    emotionColor: '#4DD0B3',
    retryIntent: false,
    comment: '今は少し休んで、また立て直したいと思います。来年再挑戦するかはまだ未定。',
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
    title: '来年の全日本学生ピアノコンクール 予選通過',
    deadline: '2025年6月15日',
    actions: ['毎日3時間の練習（朝2h・夜1h）', '月2回のレッスン受講', '本番を想定した模擬演奏会への参加', 'メンタルトレーニングの導入'],
    comment: '今度こそ絶対に通過する。ショパンのバラード1番で勝負します！',
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
    title: '次の都大会で入賞（3位以内）& タイムを0.3秒縮める',
    deadline: '2025年3月1日',
    actions: ['スタート練習を週3回追加', 'フォーム改善のため映像分析', '栄養管理の徹底', 'メンタルトレーニング'],
    comment: 'スタートさえ直せば絶対に表彰台に立てる。',
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
    title: '練習3週間目の記録',
    content: '今日でショパンのバラードの暗譜が完了！カデンツァも10回連続でミスなしで弾けました。スランプを乗り越えた気がします。',
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
    title: '模擬演奏会に参加',
    content: '本番を想定した模擬演奏会に初参加。100人の前で演奏して、まだ緊張してしまった。でも、失敗を恐れずに最後まで弾き切れた。前進してる！',
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
    title: 'スタート練習 2週間経過',
    content: '反応速度が平均0.12秒改善！コーチにも「確実に良くなってる」と言ってもらえた。このまま続ける。',
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
    title: '春季都大会 結果報告',
    content: '2位入賞！タイムも0.4秒更新できました🎉 スタートの改善が直接結果に繋がって、本当に嬉しいです。次は優勝を目指します！',
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
    title: 'ピアノコンクール挑戦記',
    category: 'ピアノ',
    failurePostId: 'post_f01',
    goalPostId: 'post_g01',
    processPostIds: ['post_p01', 'post_p02'],
    resultPostId: null,
  },
  {
    id: 'story_02',
    userId: 'user_01',
    title: '水泳都大会への道',
    category: '水泳',
    failurePostId: 'post_f02',
    goalPostId: 'post_g02',
    processPostIds: ['post_p03'],
    resultPostId: 'post_r01',
  },
  {
    id: 'story_03',
    userId: 'user_04',
    title: 'バレエフェスティバルへの挑戦',
    category: 'バレエ',
    failurePostId: 'post_f03',
    goalPostId: null,
    processPostIds: [],
    resultPostId: null,
  },
  {
    id: 'story_04',
    userId: 'user_03',
    title: 'サブ3への挑戦',
    category: 'マラソン',
    failurePostId: 'post_f04',
    goalPostId: null,
    processPostIds: [],
    resultPostId: null,
  },
  {
    id: 'story_05',
    userId: 'user_05',
    title: 'ギターコンクール挑戦記',
    category: 'ギター',
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

