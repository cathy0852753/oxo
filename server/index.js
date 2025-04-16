require('dotenv').config();
const express = require('express');
const multer = require('multer');
const { sql } = require('@vercel/postgres');
const { put } = require('@vercel/blob');
const cors = require('cors');

const app = express();
const upload = multer(); // 使用 memoryStorage
app.use(cors());
app.use(express.json());

app.post('/upload', upload.single('file'), async (req, res) => {
  const file = req.file;

  if (!file) return res.status(400).json({ error: 'No file uploaded' });

  // 上傳到 Vercel Blob
  const blob = await put(file.originalname, file.buffer, { access: 'public' });

  // 儲存到資料庫
  await sql`
    INSERT INTO images (name, url)
    VALUES (${file.originalname}, ${blob.url})
  `;

  res.json({ url: blob.url });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
