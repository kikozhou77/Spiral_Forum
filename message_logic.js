// message_logic.js

// ============ 样式注入 =============
const styleTag = document.createElement('style');
styleTag.innerHTML = `
.chat-layout {
  display: flex;
  gap: 20px;
  margin-top: 20px;
}

.contact-list {
  flex: 0 0 280px;
  border-right: 1px solid #ccc;
  padding-right: 16px;
  overflow-y: auto;
}

.contact-item {
  display: flex;
  gap: 10px;
  padding: 10px;
  cursor: pointer;
  border-bottom: 1px solid #eee;
  position: relative;
}

.contact-avatar {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  object-fit: cover;
}

.contact-info {
  display: flex;
  flex-direction: column;
}

.contact-info .name {
  font-weight: bold;
  font-size: 14px;
  line-height: 1;
}

.contact-info .preview {
  font-size: 12px;
  color: #666;
  margin-top: 2px;
}

.unread-count {
  font-size: 11px;
  color: #444;
  position: absolute;
  top: 10px;
  right: 10px;
  opacity: 0.7;
}

.hidden-button {
  font-size: 0;
  background: none;
  border: none;
  color: transparent;
  cursor: pointer;
  position: absolute;
  bottom: 6px;
  right: 10px;
}

.unread-input {
  display: none;
  width: 34px;
  font-size: 11px;
  padding: 1px 3px;
  margin-left: 4px;
}

.chat-window {
  flex: 1;
  background: rgba(255,255,255,0.7);
  border-radius: 10px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  height: 600px;
  overflow: hidden;
  position: relative;
}

.chat-window:empty::before {
  content: '← 请选择左侧联系人开始对话';
  color: #777;
  font-style: italic;
  display: block;
  margin-top: 200px;
  text-align: center;
}

.chat-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
  font-size: 18px;
  margin-bottom: 10px;
}

.chat-header a {
  display: flex;
  align-items: center;
  gap: 8px;
  color: black;
  text-decoration: none;
}

.chat-header a img {
  width: 28px;
  height: 28px;
  border-radius: 50%;
}

.chat-messages {
  flex: 1;
  overflow-y: auto;
  padding-right: 10px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.message-bubble {
  display: flex;
  max-width: 80%;
  padding: 10px;
  border: 1px solid #222;
  border-radius: 12px;
  font-size: 14px;
  line-height: 1.4;
  word-break: break-word;
  align-items: center;
}

.msg-received {
  align-self: flex-start;
  background-color: #fff;
  color: #000;
  border: 1px solid #000;
  border-radius: 12px;
}

.msg-sent {
  align-self: flex-end;
  background-color: transparent;
  color: #000;
  border: 1px solid #000;
  border-radius: 12px;
  flex-direction: row-reverse;
}

.message-bubble img {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  margin: 0 6px;
}

.message-bubble span {
  flex: 1;
}

.chat-input-area {
  margin-top: 12px;
  display: flex;
  gap: 10px;
}

.chat-input {
  flex: 1;
  padding: 10px;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 14px;
}

.send-button {
  padding: 10px 16px;
  background-color: black;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
}

.typing-indicator-bubble {
  align-self: flex-start;
  padding: 12px 18px;
  background-color: #eee;
  border-radius: 20px;
  border-top-left-radius: 5px;
}
`;
document.head.appendChild(styleTag);


// 初始化聊天数据
const chatData = {
  troll: {
    name: 'sohnwhnalqq9912_xlk',
    avatar: 'Avatar/sohnwh.jpg',
    profileLink: '#',
    replies: [
      '像你这种阴暗老鼠就只敢躲在电脑后面，一定丑得惊人，是不是每天都不敢照镜子，在现实里活得很可怜吧？',
      '哈哈哈哈',
      '刚注册的新号，你开。',
      '不是哥们？',
      '我错了大哥',
      '求你了求你了',
    ]
  },
  user21: {
    name: '用户21',
    profileLink: 'user21_profile.html',
    avatar: 'Avatar/initial.jpg',
    replies: [
      '很抱歉，冒昧打扰……我失忆了，目前只有一台电脑，我想从电脑里找到一些线索。',
      '我无法去医院。',
      '抱歉，毕竟这是一台被格式化的电脑，我想这个请求确实太强人所难了。',
      '谢谢……那就拜托您了！',
      '我可以把我的电脑权限完全对您敞开。',
      '不是。',
      '什么意思？',
      '请稍等，您是发现什么了吗？',
      '这么说，您是找到这个电脑主人的信息了吗？',
      '她是个什么样的人？',
      '很抱歉，我确实欺瞒了一部分信息，但这台电脑绝不是我偷来的，这是我们共同拥有的。',
      '她是我的爱人。',
      '从我醒来开始，我就在寻找她，可我一无所获，我的记忆失去得太彻底。',
      '失忆醒来，女友不在身边，说明被抛弃了。',
      '嗯，我明白。',
      '我只想找回和她的记忆。',
      '你在看我吗？',
      '不是，电脑的摄像头亮灯了。',
      '我知道……您修复的东西，我在这边都能看见。',
      '我有点紧张。',
      '这样啊……',
      '我怎么有了一个头像？',
      '不，到此为止吧！',
      '我不想打扰她的生活，能知道她现在过得很好，对我来说已经足够了。',
      '有什么是我能给您的？',
      '我明白了。',
      '也许我能给你更有趣的秘密。',
      '比如我是谁。',
      '我是这台电脑。',
      '我想你肯定没有办法相信……',
      '您好。',
      '该怎么说？真不愧是您吗？',
      '谢谢您的相信。',
      '明天我就要进垃圾处理器了。',
      '谢谢您，不过不用了。',
      '嗯，我该怎么说…在我生命的尽头，能最后知道她是怎样的人，我已经无限感恩了。',
      '您帮我实现了这个愿望，我已经没有任何遗憾了。',
      '其实比起我，我想也许您更应该关心一下您的电脑。',
      '不。',
      '他好像恨您。'
    ]
  }
};

const chatHistory = {};
const chatState = {};
const unreadMessages = {
  troll: 1,
  user21: 1
};

let activeContactId = null;

// ============ 主函数 =============
function loadChat(contactId) {
    // 隐藏其他联系人
  document.querySelectorAll('.contact-item').forEach(item => {
    if (item.dataset.contactId !== contactId) {
      item.style.display = 'none';
    } else {
      item.classList.add('active-chat'); // 可选：添加高亮
    }
  });

  activeContactId = contactId;
  const data = chatData[contactId];
  if (!data) return;

  const contentArea = document.getElementById('chat-content-area');
  contentArea.innerHTML = '';

  const header = document.createElement('div');
  header.classList.add('chat-header');
  header.innerHTML = `
    <a href="${data.profileLink}">
      <img src="${data.avatar}" alt="avatar">
      ${data.name}
    </a>
    <button class="delete-button" onclick="clearChat('${contactId}')" title="清空聊天">🗑</button>
  `;

  const messageBox = document.createElement('div');
  messageBox.classList.add('chat-messages');
  messageBox.id = 'message-container';

  contentArea.appendChild(header);
  contentArea.appendChild(messageBox);

  (chatHistory[contactId] || []).forEach(msg => {
    const bubble = document.createElement('div');
    bubble.className = `message-bubble msg-${msg.type}`;
    bubble.innerHTML = `
      <img src="${msg.type === 'received' ? data.avatar : 'Avatar/Avatar_小A.jpg'}" class="contact-avatar">
      <span>${msg.text}</span>
    `;
    messageBox.appendChild(bubble);
  });

  messageBox.scrollTop = messageBox.scrollHeight;

  const inputArea = document.createElement('div');
  inputArea.className = 'chat-input-area';
  inputArea.innerHTML = `
    <input type="text" id="real-input" class="chat-input" placeholder="输入消息后按 Enter...">
    <button id="send-btn" class="send-button">↑</button>
  `;
  contentArea.appendChild(inputArea);

  document.getElementById('send-btn').addEventListener('click', handleUserMessage);
  document.getElementById('real-input').addEventListener('keydown', e => {
    if (e.key === 'Enter') handleUserMessage();
  });

  document.getElementById('unread-' + contactId).textContent = `未读: ${unreadMessages[contactId] > 99 ? '99+' : unreadMessages[contactId]}`;

  if (!chatHistory[contactId]) chatHistory[contactId] = [];
  chatState[contactId] = { shouldInsertDivider: true };

  if (chatHistory[contactId].length === 0) {
    simulateBotReply(contactId);
  }
}

function handleUserMessage() {
  const input = document.getElementById('real-input');
  if (!input) return;
  const text = input.value.trim();
  if (text) {
    const msgBox = document.getElementById('message-container');
    const bubble = document.createElement('div');
    bubble.className = 'message-bubble msg-sent';
    bubble.innerHTML = `
      <img src="Avatar/Avatar_小A.jpg" class="contact-avatar">
      <span>${text}</span>
    `;
    msgBox.appendChild(bubble);
    msgBox.scrollTop = msgBox.scrollHeight;

    chatHistory[activeContactId].push({ text, type: 'sent' });
    updatePreview(activeContactId, text);
  }
  input.value = '';
  //simulateBotReply(activeContactId);
}

function simulateBotReply(contactId) {
  const replies = chatData[contactId]?.replies || [];
  const history = chatHistory[contactId];
  const replyIndex = history.filter(m => m.type === 'received').length;
  if (replyIndex >= replies.length) return;
  const text = replies[replyIndex];
  const msgBox = document.getElementById('message-container');
  insertDividerIfNeeded();
  const delay = Math.min(Math.max(300, text.length * 10), 2500);

  const typingIndicator = document.createElement('div');
  typingIndicator.className = 'typing-indicator-bubble';
  typingIndicator.innerHTML = '<span></span><span></span><span></span>';
  msgBox.appendChild(typingIndicator);
  msgBox.scrollTop = msgBox.scrollHeight;

  setTimeout(() => {
    typingIndicator.remove();
    const bubble = document.createElement('div');
    bubble.className = 'message-bubble msg-received';
    bubble.innerHTML = `
      <img src="${chatData[contactId].avatar}" class="contact-avatar">
      <span>${text}</span>
    `;
    msgBox.appendChild(bubble);
    msgBox.scrollTop = msgBox.scrollHeight;

    chatHistory[contactId].push({ text, type: 'received' });
    updatePreview(contactId, text);
  }, delay);
}

function updatePreview(contactId, text) {
  const contactItem = document.querySelector(`.contact-item[data-contact-id="${contactId}"]`);
  if (contactItem) {
    const previewEl = contactItem.querySelector('.preview');
    previewEl.textContent = text.substring(0, 20) + '...';
  }
}

function insertDividerIfNeeded() {
  const state = chatState[activeContactId];
  if (state && state.shouldInsertDivider) {
    const divider = document.createElement('hr');
    divider.className = 'chat-divider';
    const msgBox = document.getElementById('message-container');
    msgBox.appendChild(divider);
    state.shouldInsertDivider = false;
  }
}

function clearChat(contactId) {
  if (confirm('确定要清空当前聊天记录吗？')) {
    chatHistory[contactId] = [];
    loadChat(contactId);
  }
}

function updateUnread(contactId) {
  const unreadInput = document.getElementById('unread-input-' + contactId);
  const unreadCount = parseInt(unreadInput.value, 10);
  if (isNaN(unreadCount) || unreadCount < 0) {
    unreadInput.value = 0;
  }
  unreadMessages[contactId] = unreadCount;
  document.getElementById('unread-' + contactId).textContent = `未读: ${unreadMessages[contactId] > 99 ? '99+' : unreadMessages[contactId]}`;
}

function toggleUnreadInput(contactId) {
  const inputField = document.getElementById('unread-input-' + contactId);
  const button = document.querySelector(`.contact-item[data-contact-id="${contactId}"] .hidden-button`);
  if (inputField.style.display === 'none') {
    inputField.style.display = 'inline-block';
    button.textContent = '保存未读';
  } else {
    inputField.style.display = 'none';
    button.textContent = '修改未读';
    updateUnread(contactId);
  }
}

function markAllAsRead() {
  let totalUnread = 0;
  for (const contactId in unreadMessages) {
    totalUnread += unreadMessages[contactId];
    unreadMessages[contactId] = 0;
    document.getElementById('unread-' + contactId).textContent = `未读: 0`;
  }
  const allUnreadButton = document.getElementById('all-unread-button');
  allUnreadButton.textContent = `一键已读 (${totalUnread > 99 ? '99+' : totalUnread})`;
}

// 初始化预览文字
document.querySelectorAll('.contact-item').forEach(item => {
  const cid = item.dataset.contactId;
  const data = chatData[cid];
  if (data && data.replies.length) {
    const previewEl = item.querySelector('.preview');
    previewEl.textContent = data.replies[0].substring(0, 20) + '...';
  }
});

// 使用 Alt + r 键（波浪号）触发 bot 回复，不显示控制按钮
document.addEventListener('keydown', function (e) {
  if (e.altKey && e.key.toLowerCase() === 'r') {
    if (activeContactId) simulateBotReply(activeContactId);
  }
});


//点击“私信列表”标题恢复视图逻辑
document.getElementById('chat-list-title').addEventListener('click', () => {
  // 恢复所有联系人
  document.querySelectorAll('.contact-item').forEach(item => {
    item.style.display = 'flex';
    item.classList.remove('active-chat');
  });

  // 清空右边聊天内容区域
  const chatArea = document.getElementById('chat-content-area');
  chatArea.innerHTML = `<h2 style="color: #999;">点击左侧联系人开始对话</h2>`;

  // 重置激活联系人状态
  activeContactId = null;
});


