import axios from 'axios'

// const SITE_URL = 'https://baseball-class.vercel.app'
// const communityImg = `${SITE_URL}/com.png`
// const personalImg = `${SITE_URL}/per.png`

export const messageMap = {
  community: [
    {
      type: 'text',
      text: `✍️社區棒球班，課程特色\n▪️福岡軟銀鷹官方授權，由亞洲區球探李杜軒教練親自帶領\n▪️前職棒明星教練團專業指導\n▪️帶領小朋友體驗棒球樂趣，培養團隊合作\n▪️提供軟銀同款球衣與練習裝\n▪️優先報名寒暑假限定活動 (赴日交流、觀賽、參訪訓練設施)\n▪️表現優異者，有機會獲得現役球員球具
      \n📍上課時間/地點\n▪️訓練日: 週日 9:00-12:00 
(萬華龍山國小/天母棒球場，視中職賽程調整)\n▪️比賽日: 配合比賽時間及地點
      \n💰課程費用\n▪️單期: $4,000 (4堂)\n▪️優惠價: 3個月 $3,800/6個月 $3,600 (每期)\n▪️超值包含: 球衣、球褲、球帽、練習衣、帽T、訓練時飲用水`
    },
    // { type: 'image', originalContentUrl: communityImg, previewImageUrl: communityImg}
  ],
  personal: [
    {
      type: 'text',
      text: `✍️個人菁鷹班，課程特色\n▪️福岡軟銀鷹官方授權，亞洲區球探李杜軒教練親自指導\n▪️導入日職一軍訓練系統，依學員狀況客製調整\n▪️提供升學、赴日與職棒發展規劃\n▪️全方位訓練: 打擊｜守備｜跑壘｜投球｜體能｜重訓｜棒球觀念
        \n📍上課時間/地點\n▪️08:00–22:00 (彈性安排)\n▪️新北蘆洲 LBC 棒球訓練基地 (可商議)
        \n💰課程費用\n▪️單堂: $2,500/hr (含場地費)\n▪️10–20堂: $2,300/堂\n▪️20堂以上: $2,000/堂\n▪️雙人同行: 每堂再折$200`
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
      text: `
        `
    }
  ]
}
// \n❓目前有哪些教練？
//         \n▪️軟銀亞洲區球探—李杜軒教練
//         \n▪️前職棒球星
//         \n▪️每堂課程皆配置 1–2 位專業助理教練
//         \n▪️並規劃每兩個月邀請日本職棒退役球星來台指導
//         \n▪️另有前旅美投手教練洽談中，陣容持續升級，敬請期待！
//         \n❓有事無法上課，該怎麼辦？
//         \n請主動透過 LINE 請假，課程皆可順延使用喔！
// \n問:需自備什麼裝備？
// \n答:
        
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
