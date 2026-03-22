import axios from 'axios'

// const SITE_URL = 'https://baseball-class.vercel.app'
// const communityImg = `${SITE_URL}/com.png`
// const personalImg = `${SITE_URL}/per.png`

export const messageMap = {
  community: [
    {
      type: 'text',
      text: `🌟社區棒球班
\n▪︎福岡軟銀鷹官方授權，亞洲區球探李杜軒教練親自帶領，讓小朋友體驗棒球魅力，學習團隊合作
\n▪︎前職棒明星教練團指導
\n▪︎配備軟銀同款球衣與練習衣
\n▪︎優先報名寒暑假限定活動：赴日友誼賽、觀賞一軍賽事、參觀訓練設施
\n▪︎優秀學員可獲現役球員球具
      `
    },
    {
      type: 'text',
      text: `📍上課時間地點
\n▪︎「訓練日」：週日上午 9:00-12:00，北市萬華區龍山國小或天母棒球場（視中職賽程安排）
\n▪︎「比賽或友誼賽」：配合比賽時間及地點
      `
    },
    {
      type: 'text',
      text: `💰費用
\n▪︎一期$4,000，共4堂課
\n▪︎「訓練日」：每堂3小時
\n▪︎「比賽或友誼賽」：視比賽時長
\n▪︎超值包含：球衣、球褲、球帽、練習衣、帽T，以及訓練時的飲用水
      `
    },
    // { type: 'image', originalContentUrl: communityImg, previewImageUrl: communityImg}
  ],
  personal: [
    {
      type: 'text',
      text: `🌟個人菁鷹班，課程特色
\n▪︎福岡軟銀鷹官方授權，亞洲區球探李杜軒教練親自帶領，培育台灣棒球未來之星
\n▪︎導入軟銀鷹一軍訓練菜單，現役教練即時調整內容與強度
\n▪︎升學、赴日與職棒發展規劃
\n▪︎全方位棒球訓練：打擊｜跑壘｜守備｜投球｜體能｜重訓｜棒球觀念
      `
    },
    {
      type: 'text',
      text: `📍上課時間地點
\n▪︎每日 08:00-22:00，新北蘆洲 LBC 棒球訓練基地（可再商議）
      `
    },
    {
      type: 'text',
      text: `💰費用
\n▪︎一堂$2,500，（含場地費）
\n▪︎一次報名多堂優惠：10-20堂每堂$2,300，20堂以上每堂$2,000
      `
    },
    // { type: 'image', originalContentUrl: personalImg, previewImageUrl: personalImg}
  ],
  signup: [
    // {
    //   type: 'text',
    //   text: '更多內容，敬請期待！'
    // }
  ],
  faq: [
    {
      type: 'text',
      text: `更多內容，敬請期待！`
    }
  ]
}

        // \n問：目前有哪些教練？
        // \n答：
        // \n▪︎軟銀亞洲區球探—李杜軒教練
        // \n▪︎前味全龍首席教練—林瑋恩教練
        // \n▪︎每堂課程皆配置 1–2 位專業助理教練，
        // \n▪︎並規劃每兩個月邀請日本職棒退役球星來台指導，
        // \n▪︎另有前旅美投手教練洽談中，陣容持續升級，敬請期待！
        // \n
        // \n
        // \n問：需自備什麼裝備？
        // \n答：
        // \n
        // \n
        // \n問：有事無法上課，該怎麼辦？
        // \n答：請主動透過 LINE 請假，課程皆可順延使用喔！
        
const CHANNEL_ACCESS_TOKEN =
  'ZnUmRYC6lGzLWlh/QwoFeJD9VZ044Oi7Gtoo6sN1IQTWH1Ad7RQfB1aQ52Zgd1+w69PlOIk6cFPkzavvrg7kCEOL1uWH4TpeJ4oFz8vFW7N+vIHNqFUPY0zcyJ8gLCg5U2qdrfvtTyBa+ATHWk9OFQdB04t89/1O/w1cDnyilFU='

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(200).send('OK')
  }

  const events = req.body.events

  // 如果沒有事件則直接返回
  if (!events || !Array.isArray(events)) {
    return res.status(200).send('OK')
  }

  try {
    const tasks = events.map(async (event) => {
      if (event.type === 'postback' && messageMap[event.postback.data]) {
        return axios.post('https://api.line.me/v2/bot/message/reply',
          {
            replyToken: event.replyToken,
            messages: messageMap[event.postback.data]
          },
          {
            headers: {
              Authorization: `Bearer ${CHANNEL_ACCESS_TOKEN}`,
              'Content-Type': 'application/json',
            }
          }
        )
      }
    })
    await Promise.all(tasks)

  } catch (error) {
    console.error('LINE API Error:', error.response?.data || error.message)
  }

  res.status(200).send('OK')
}
