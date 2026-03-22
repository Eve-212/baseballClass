<template>
  <q-page class="q-pa-md">
    <div class="q-mb-md">
      <q-input v-model="richMenuId" label="Rich Menu ID" />
    </div>

    <div class="q-mb-md">
      <q-btn color="primary" label="取當下MENU ID" @click="handleGetRichMenuId" />
    </div>

    <div class="q-mb-md">
      <q-btn color="negative" label="刪MENU" @click="deleteRichMenu(richMenuId)" />
    </div>

    <div class="q-mb-md">
      <q-btn color="teal" label="建新MENU" @click="handleCreateRichMenu" />
    </div>

    <div class="q-mb-md">
      <q-btn color="purple" label="上傳新MENU" @click="handleUploadRichMenuImage" />
    </div>

    <div>
      <div v-for="type in Object.keys(messageMap)" :key="type">
        <div class="text-red">
          <div v-if="type === 'community'">社區棒球</div>
          <div v-else-if="type === 'personal'">菁鷹班</div>
        </div>
        <div v-for="(each, idx) in messageMap[type]" :key="idx">
          <template v-if="each.text">
            <div 
              class="q-mb-sm"
              v-html="each.text.split('\n')
              .filter(line => line.trim())
              .join('<br>')">
            </div>
          </template>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import menuImg from 'assets/menu.png'
import { createRichMenu, getRichMenuId, deleteRichMenu, uploadRichMenuImage } from 'src/api'
import { messageMap } from '../../api/webhook'

const richMenuId = ref('')

const handleGetRichMenuId = async () => {
  try {
    const id = await getRichMenuId()
    richMenuId.value = id
  } catch (error) {
    console.error('取得失敗:', error)
  }
}

const handleCreateRichMenu = async () => {
  try {
    const id = await createRichMenu()
    richMenuId.value = id
  } catch (error) {
    console.error('建立失敗:', error)
  }
}

const handleUploadRichMenuImage = async () => {
  try {
    const response = await fetch(menuImg)
    const blob = await response.blob()

    await uploadRichMenuImage(richMenuId.value, blob)
  } catch (error) {
    console.error('上傳失敗:', error)
  }
}
</script>
