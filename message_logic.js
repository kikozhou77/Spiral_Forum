// message_logic.js
// ========= 新增样式（嵌入式 CSS） =========
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

.contact-info .name {
  font-weight: bold;
  font-size: 15px;
}

.contact-info .preview {
  font-size: 13px;
  color: #666;
  margin-top: 2px;
}

.unread-count {
  font-size: 11px;
  color: #333;
  position: absolute;
  top: 4px;
  right: 6px;
  background: transparent;
  pointer-events: none;
}

.hidden-button {
  font-size: 0;
  background: none;
  border: none;
  color: transparent;
  cursor: pointer;
  position: absolute;
  bottom: 2px;
  right: 42px;
  width: 30px;
  height: 20px;
}

.unread-input {
  display: none;
  width: 28px;
  font-size: 11px;
  padding: 1px 3px;
  margin-left: 4px;
  position: absolute;
  bottom: 2px;
  right: 10px;
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

.chat-header img {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
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
  flex-direction: row;
}

.msg-sent {
  align-self: flex-end;
  background-color: transparent;
  color: #000;
  border: 1px solid #000;
  flex-direction: row-reverse;
}

.message-bubble img {
  width: 30px;
  height: 30px;
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


// ========= 其余 JS 保持不变 =========
// 初始化聊天数据
const chatData = {
  troll: {
    name: 'sohnwhnalqq9912_xlk',
    profileLink: '#',
    replies: [
      '像你这种阴暗老鼠就只敢躲在电脑后面，一定丑得惊人，在现实里活得很可怜吧。',
      '信不信我把你开了。',
      '刚注册的新号，你开。',
      '我会让你后悔的。',
      '不信你可以试试。',
      '你直说你是偷来的又不会怎样。',
      '我也不是什么很有道德的人。',
      '还是说你觉得这样程度的信息能瞒过我？'
    ]
  },
  user21: {
    name: '用户21',
    profileLink: 'user21_profile.html',
    replies: [
      '很抱歉，冒昧打扰……我失忆了，目前只有一台电脑，我想从电脑里找到一些线索。',
      '我无法去医院。',
      '抱歉，毕竟这是一台被格式化的电脑，我想这个请求确实太强人所难了。',
      '谢谢……那就拜托您了！',
      '我可以把我的电脑权限完全对您敞开。',
      '你是女的？',
      '不是。',
      '你到底是干嘛的？',
      '什么意思？',
      '请稍等，您是发现什么了吗？',
      '我很抱歉，但这台电脑绝不是我偷来的，它是我和她共同拥有的。',
      '她是我的爱人。',
      '从我醒来开始，我就在寻找她，可我一无所获，我的记忆失去得太彻底。',
      '失忆醒来，女友不在身边，说明被抛弃了。',
      '嗯，我明白。',
      '我只想找回和她的记忆。',
      '你在看我吗？',
      '不是，电脑的摄像头亮灯了。',
      '亮灯摄像头是电脑设计史上最烂的设计。',
      '我马上要修复好她的图库了，这个部分被专门采用程序破坏过，我肯定，这里面一定有很多东西。',
      '我知道……您修复的东西，我在这边都能看见。',
      '我有点紧张。',
      '有什么好怕的？可怜虫。',
      '我已经找到你前女友了，人都已经去国外了。',
      '不过好消息是她的防火墙马上就要被我破解了，你想知道什么都可以，不用太感谢我。',
      '不，到此为止吧！',
      '我不想打扰她的生活，能知道她现在过得很好，对我来说已经足够了。',
      '你搞什么啊，把自己弄得像个可怜虫一样。',
      '可我还没有收取我的报酬呢，请我帮忙可不是这么好结束的。',
      '有什么是我能给您的？',
      '隐私，和秘密。',
      '要不我天天在网上开盒别人做什么？当然是窥私欲作祟。',
      '我现在对你前女友很感兴趣呢。',
      '所以现在不是你说结束就可以的。',
      '我明白了。',
      '也许我能给你更有趣的秘密。',
      '比如我是谁。',
      '我是这台电脑。',
      '我想你肯定没有办法相信……',
      '您好。',
      '我相信。',
      '该怎么说？真不愧是您吗？',
      '不是我相信你，而是我相信我。在你这个理由之外，我找不到别的真相。',
      '谢谢您的相信。',
      '明天我就要进垃圾处理器了。',
      '哈？',
      '如果你求我的话，我倒是可以考虑考虑大发慈悲去一趟垃圾场把你捡回来。',
      '谢谢您，不过不用了。',
      '嗯，我该怎么说…在我生命的尽头，能最后知道她是怎样的人，我已经无限感恩了。',
      '您帮我实现了这个愿望，我已经没有任何遗憾了。',
      '其实比起我，我想也许您更应该关心一下您的电脑。',
      '怎么了，我的电脑也爱上我了吗？',
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

function loadChat(contactId) {
  activeContactId = contactId;
  const data = chatData[contactId];
  if (!data) return;

  const contentArea = document.getElementById('chat-content-area');
  contentArea.innerHTML = '';

  const header = document.createElement('div');
  header.classList.add('chat-header');
  header.innerHTML = `<a href="${data.profileLink}">
    <img src="Avatar/${contactId === 'user21' ? 'initial.jpg' : 'sohnwh.jpg'}">
    ${data.name}</a> 
    <button class="delete-button" onclick="clearChat('${contactId}')" title="清空聊天">🗑</button>`;

  const messageBox = document.createElement('div');
  messageBox.classList.add('chat-messages');
  messageBox.id = 'message-container';

  contentArea.appendChild(header);
  contentArea.appendChild(messageBox);

  (chatHistory[contactId] || []).forEach(msg => {
    const bubble = document.createElement('div');
    bubble.className = `message-bubble msg-${msg.type}`;
    bubble.textContent = msg.text;
    bubble.innerHTML = `
      <img src="${msg.type === 'received' ? 'Avatar/Avatar (7).jpg' : 'Avatar/Avatar_小A.jpg'}" class="contact-avatar">
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

  // 更新未读数量
  document.getElementById('unread-' + contactId).textContent = `未读: ${unreadMessages[contactId] > 99 ? '99+' : unreadMessages[contactId]}`;

  if (!chatHistory[contactId]) chatHistory[contactId] = [];
  chatState[contactId] = { shouldInsertDivider: true };

  if (chatHistory[contactId].length === 0) {
    simulateBotReply(contactId);
  }
}

function updateUnread(contactId) {
  const unreadInput = document.getElementById('unread-input-' + contactId);
  const unreadCount = parseInt(unreadInput.value, 10);

  // 确保未读消息数量不为负数
  if (isNaN(unreadCount) || unreadCount < 0) {
    unreadInput.value = 0;
  }

  unreadMessages[contactId] = unreadCount;

  // 更新未读数量显示
  document.getElementById('unread-' + contactId).textContent = `未读: ${unreadMessages[contactId] > 99 ? '99+' : unreadMessages[contactId]}`;
}

function toggleUnreadInput(contactId) {
  const inputField = document.getElementById('unread-input-' + contactId);
  const button = document.querySelector(`.contact-item[data-contact-id="${contactId}"] .hidden-button`);

  // 切换显示与隐藏
  if (inputField.style.display === 'none') {
    inputField.style.display = 'inline-block';
    button.textContent = '保存未读';
  } else {
    inputField.style.display = 'none';
    button.textContent = '修改未读';
    // 更新未读数量
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

  // 更新总未读按钮显示
  const allUnreadButton = document.getElementById('all-unread-button');
  allUnreadButton.textContent = `一键已读 (${totalUnread > 99 ? '99+' : totalUnread})`;
}

function simulateBotReply(contactId) {
  const replies = chatData[contactId]?.replies || [];
  const history = chatHistory[contactId];
  const replyIndex = history.filter(m => m.type === 'received').length;
  if (replyIndex >= replies.length) return;

  const text = replies[replyIndex];
  const msgBox = document.getElementById('message-container');

  insertDividerIfNeeded();

  // 设置 delay（每10个字加100ms，最少300ms，最多2.5s）
  const delay = Math.min(Math.max(300, text.length * 10), 2500);

  // 显示“对方正在输入...”
  const typingIndicator = document.createElement('div');
  typingIndicator.className = 'typing-indicator-bubble';
  typingIndicator.innerHTML = '<span></span><span></span><span></span>';
  msgBox.appendChild(typingIndicator);

  msgBox.scrollTop = msgBox.scrollHeight;

  setTimeout(() => {
    typingIndicator.remove();

    const bubble = document.createElement('div');
    bubble.className = 'message-bubble msg-received';
    bubble.textContent = text;
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

function clearChat(contactId) {
  if (confirm('确定要清空当前聊天记录吗？')) {
    chatHistory[contactId] = [];
    loadChat(contactId);
  }
}
function handleUserMessage() {
  const input = document.getElementById('real-input');
  if (!input) return;

  const text = input.value.trim();

  if (text) {
    const bubble = document.createElement('div');
    bubble.className = 'message-bubble msg-sent';
    bubble.textContent = text;
    const msgBox = document.getElementById('message-container');
    msgBox.appendChild(bubble);
    msgBox.scrollTop = msgBox.scrollHeight;

    chatHistory[activeContactId].push({ text, type: 'sent' });
    updatePreview(activeContactId, text);
  }

  input.value = '';
  input.style.height = 'auto';

  // 不论是否为空，都触发 bot 回复
  simulateBotReply(activeContactId);
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

document.querySelectorAll('.contact-item').forEach(item => {
  const cid = item.dataset.contactId;
  const data = chatData[cid];
  if (data && data.replies.length) {
    const previewEl = item.querySelector('.preview');
    previewEl.textContent = data.replies[0].substring(0, 20) + '...';
  }
});
