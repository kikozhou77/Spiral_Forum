// 文件: /api/hello.js
// 这段代码将在Vercel的服务器上运行

export default function handler(req, res) {
    // req: 代表前端发来的请求 (request)
    // res: 代表我们要发回给前端的响应 (response)
  
    // 我们发送一个JSON格式的响应回去
    res.status(200).json({ 
      message: 'Hello from the Spiral Forum API!',
      timestamp: new Date().toISOString() 
    });
  }