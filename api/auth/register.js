// 文件: /api/auth/register.js
import clientPromise from '../../lib/mongodb'; // 【关键修改】导入我们自己的连接器

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    try {
        // 【关键修改】直接从连接池获取客户端和数据库实例
        const client = await clientPromise;
        const db = client.db('spiral_forum');
        const users = db.collection('users');

        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: 'Username and password are required' });
        }

        const existingUser = await users.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        // 【重要】在真实项目中，密码必须加密！
        // 为了安全，我们来安装并使用bcryptjs
        // const bcrypt = require('bcryptjs');
        // const hashedPassword = await bcrypt.hash(password, 10);
        
        const result = await users.insertOne({
            username,
            password, // 在这里使用 hashedPassword
            createdAt: new Date(),
        });

        res.status(201).json({ message: 'User created successfully', userId: result.insertedId });

    } catch (error) {
        console.error('API Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
    // 【注意】在这里我们不再手动关闭连接，因为/lib/mongodb.js会管理它
}