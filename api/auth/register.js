// 文件: /api/auth/register.js
import { MongoClient } from 'mongodb';

// 从Vercel的环境变量中读取数据库连接字符串
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    try {
        await client.connect();
        const database = client.db('spiral_forum'); // 数据库名，可以自定义
        const users = database.collection('users'); // 表名，可以自定义

        const { username, password } = req.body;

        // 检查用户名是否已存在
        const existingUser = await users.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        // 【重要】在真实项目中，密码必须加密！这里为了简化，暂时存储明文
        const result = await users.insertOne({
            username,
            password, // 真实项目需要加密： const hashedPassword = await bcrypt.hash(password, 10);
            createdAt: new Date(),
        });

        res.status(201).json({ message: 'User created successfully', userId: result.insertedId });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    } finally {
        await client.close();
    }
}