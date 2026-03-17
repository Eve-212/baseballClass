import axios from 'axios'

const CHANNEL_ACCESS_TOKEN =
  'ZnUmRYC6lGzLWlh/QwoFeJD9VZ044Oi7Gtoo6sN1IQTWH1Ad7RQfB1aQ52Zgd1+w69PlOIk6cFPkzavvrg7kCEOL1uWH4TpeJ4oFz8vFW7N+vIHNqFUPY0zcyJ8gLCg5U2qdrfvtTyBa+ATHWk9OFQdB04t89/1O/w1cDnyilFU='

export const getRichMenuId = async (): Promise<string | null> => {
  try {
    const response = await axios.get('/line-api/v2/bot/user/all/richmenu', {
      headers: {
        Authorization: `Bearer ${CHANNEL_ACCESS_TOKEN}`,
      },
    })
    console.log('目前的預設選單 ID 是:', response.data.richMenuId)
    return response.data.richMenuId
  } catch (error: any) {
    if (error.response?.status === 404) {
      console.log('目前沒有設定任何預設選單。')
    } else {
      console.error('查詢失敗:', error.response?.data || error.message)
    }
    return null
  }
}

export const createRichMenu = async (): Promise<string | null> => {
  const richMenuData = {
    size: {
      width: 2500,
      height: 1686,
    },
    selected: true,
    name: 'DoubleButtonMenu',
    chatBarText: '點我開啟選單',
    areas: [
      {
        bounds: { x: 0, y: 0, width: 1250, height: 1686 },
        action: {
          type: 'postback',
          data: 'action=program',
        },
      },
      {
        bounds: { x: 1250, y: 0, width: 1250, height: 1686 },
        action: {
          type: 'postback',
          data: 'action=signup',
          displayText:
            '🎉太棒了！請先提供以下資訊，我們將協助完成報名：\n▪︎ 課程名稱（社區班/ 個人班）\n▪︎ 上課人數\n▪︎ 上課時間',
        },
      },
    ],
  }

  try {
    const response = await axios.post('/line-api/v2/bot/richmenu', richMenuData, {
      headers: {
        Authorization: `Bearer ${CHANNEL_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
    })
    console.log('--- 成功建立 Rich Menu ---')
    console.log('你的 Rich Menu ID 是:', response.data.richMenuId)
    return response.data.richMenuId
  } catch (error: any) {
    console.error('建立失敗:', error.response?.data || error.message)
    return null
  }
}

export const uploadRichMenuImage = async (richMenuId: string, imageBlob: Blob) => {
  try {
    await axios.post(`/line-data-api/v2/bot/richmenu/${richMenuId}/content`, imageBlob, {
      headers: {
        Authorization: `Bearer ${CHANNEL_ACCESS_TOKEN}`,
        'Content-Type': 'image/png',
      },
    })
    console.log('圖片上傳成功！')

    await axios.post(`/line-api/v2/bot/user/all/richmenu/${richMenuId}`, undefined, {
      headers: {
        Authorization: `Bearer ${CHANNEL_ACCESS_TOKEN}`,
      },
    })
    console.log('圖片預設成功！')
  } catch (error: any) {
    console.error('上傳失敗:', error.response?.data || error.message)
  }
}

export const deleteRichMenu = async (richMenuId: string): Promise<void> => {
  try {
    await axios.delete(`/line-api/v2/bot/richmenu/${richMenuId}`, {
      headers: {
        Authorization: `Bearer ${CHANNEL_ACCESS_TOKEN}`,
      },
    })
    console.log('Rich Menu 刪除成功！')
  } catch (error: any) {
    console.error('刪除失敗:', error.response?.data || error.message)
  }
}
