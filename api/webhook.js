import axios from 'axios'
// import communityImg from 'assets/community.png'
// import personalImg from 'assets/personal.png'

const SITE_URL = 'https://baseball-class.vercel.app'
const communityImg = `${SITE_URL}/community.png`
const personalImg = `${SITE_URL}/personal.png`

// --- 配置區：請替換成你的實際資料 ---
const CHANNEL_ACCESS_TOKEN =
  'ZnUmRYC6lGzLWlh/QwoFeJD9VZ044Oi7Gtoo6sN1IQTWH1Ad7RQfB1aQ52Zgd1+w69PlOIk6cFPkzavvrg7kCEOL1uWH4TpeJ4oFz8vFW7N+vIHNqFUPY0zcyJ8gLCg5U2qdrfvtTyBa+ATHWk9OFQdB04t89/1O/w1cDnyilFU='

export default async function handler(req, res) {
  // 1. 檢查方法 (LINE Webhook 均為 POST)
  if (req.method !== 'POST') {
    return res.status(200).send('OK')
  }

  const events = req.body.events

  // 如果沒有事件則直接返回
  if (!events || !Array.isArray(events)) {
    return res.status(200).send('OK')
  }

  try {
    // 2. 處理所有進入的事件
    const tasks = events.map(async (event) => {
      // 3. 判斷是否為你設定的 Rich Menu Postback 事件
      if (event.type === 'postback' && event.postback.data === 'action=program') {
        const replyToken = event.replyToken

        // 4. 呼叫 LINE Reply API (發送多重訊息)
        return axios.post(
          'https://api.line.me/v2/bot/message/reply',
          {
            replyToken: replyToken,
            messages: [
              {
                type: 'image',
                originalContentUrl: communityImg,
                previewImageUrl: communityImg,
              },
              {
                type: 'image',
                originalContentUrl: personalImg,
                previewImageUrl: personalImg,
              },
              {
                type: 'text',
                text: '😄想先了解適合哪個班嗎？您可以告訴我們年齡和棒球經驗，我們會給出建議！',
              },
              {
                type: 'text',
                text: '😄想加入課程嗎？請告訴我們：\n▪︎ 課程名稱（社區班/ 個人班）\n▪︎ 上課人數\n▪︎ 上課時間，我們將快速幫您完成報名！',
              },
            ],
          },
          {
            headers: {
              Authorization: `Bearer ${CHANNEL_ACCESS_TOKEN}`,
              'Content-Type': 'application/json',
            },
          },
        )
      }
    })

    // 等待所有回覆任務完成
    await Promise.all(tasks)
  } catch (error) {
    // 錯誤處理：記錄 LINE 回傳的錯誤訊息
    console.error('LINE API Error:', error.response?.data || error.message)
  }

  // 5. 無論如何都要回傳 200，告訴 LINE 伺服器已成功接收
  res.status(200).send('OK')
}
