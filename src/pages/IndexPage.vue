<template>
  <q-page class="q-pa-md">
    <div class="q-mb-md">
      <q-input v-model="richMenuId" label="Rich Menu ID" />
    </div>

    <div class="q-mb-md">
      <q-btn icon="star" label="取得MENU ID" @click="handleGetRichMenuId" />
    </div>

    <div class="q-mb-md">
      <q-btn icon="add" label="建立MENU" @click="handleCreateRichMenu" />
    </div>

    <div class="q-mb-md">
      <q-btn icon="upload" label="上傳MENU照片" @click="handleUploadRichMenuImage" />
    </div>

    <div class="q-mb-md">
      <q-btn color="negative" icon="delete" label="刪除MENU" @click="deleteRichMenu(richMenuId)" />
    </div>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import menuImg from 'assets/menu.png'
import { createRichMenu, getRichMenuId, deleteRichMenu, uploadRichMenuImage } from 'src/api'

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
