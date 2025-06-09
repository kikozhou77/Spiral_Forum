// === 配置区域 ===
const REPO_NAME = 'kikozhou77/Spiral_Forum'; // 替换成你的 仓库名
const POST_LIST_ELEMENT_ID = 'post-list'; // 帖子列表容器的ID
const COMMENTS_ELEMENT_ID = 'comments-section'; // Giscus 容器的ID

// === 功能实现 ===

// 函数：加载帖子列表（即 GitHub Issues）
async function loadPosts() {
    const postListEl = document.getElementById(POST_LIST_ELEMENT_ID);
    if (!postListEl) return;

    try {
        // 使用 GitHub API 获取 issues
        const response = await fetch(`https://api.github.com/repos/${REPO_NAME}/issues?state=open&sort=created&direction=desc`);
        if (!response.ok) {
            throw new Error(`网络请求错误: ${response.status}`);
        }
        const issues = await response.json();

        // 如果没有帖子
        if (issues.length === 0) {
            postListEl.innerHTML = '<p>还没有人发帖，点击右上角的“我要发帖”成为第一个吧！</p>';
            return;
        }

        // 清空"加载中"提示
        postListEl.innerHTML = '';

        // 遍历 issues 并生成 HTML
        issues.forEach(issue => {
            // 我们不展示 Giscus 创建的 issue
            if (issue.title.startsWith('[Giscus]')) {
                return;
            }
            
            const postItem = document.createElement('div');
            postItem.className = 'post-list-item';
            
            const postDate = new Date(issue.created_at).toLocaleString();

            postItem.innerHTML = `
                <a href="${issue.html_url}" target="_blank" class="post-title">${issue.title}</a>
                <div class="post-meta">
                    <span>#${issue.number}</span> by 
                    <a href="${issue.user.html_url}" target="_blank">${issue.user.login}</a> 
                    • 创建于 ${postDate} • ${issue.comments} 条回复
                </div>
            `;
            postListEl.appendChild(postItem);
        });

    } catch (error) {
        console.error('加载帖子失败:', error);
        postListEl.innerHTML = '<p>糟糕，加载帖子列表失败了。请检查网络或稍后重试。</p>';
    }
}

// 函数：加载 Giscus 评论系统
function loadGiscus() {
    const commentsEl = document.getElementById(COMMENTS_ELEMENT_ID);
    if (!commentsEl) return;

    const script = document.createElement('script');
    script.src = 'https://giscus.app/client.js';
    script.async = true;
    script.crossOrigin = 'anonymous';

    // 从 Giscus 官网获取的属性
    script.setAttribute('data-repo', REPO_NAME);
    script.setAttribute('data-repo-id', 'R_kgDOO4fDZQ'); // ***** 重要：替换成你的 Repo ID *****
    script.setAttribute('data-category', 'Announcements');
    script.setAttribute('data-category-id', 'DIC_kwDOO4fDZc4CrOW6'); // ***** 重要：替换成你的 Category ID *****
    script.setAttribute('data-mapping', 'title');
    script.setAttribute('data-strict', '0');
    script.setAttribute('data-reactions-enabled', '1');
    script.setAttribute('data-emit-metadata', '0');
    script.setAttribute('data-input-position', 'top');
    script.setAttribute('data-theme', 'light');
    script.setAttribute('data-lang', 'zh-CN');

    commentsEl.appendChild(script);
}

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', () => {
    loadPosts();
    loadGiscus();
});
