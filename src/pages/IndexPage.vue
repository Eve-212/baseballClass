<template>
  <q-page class="q-pa-md">
    <div class="q-mb-md">
      <q-btn icon="upload" label="建立MENU" @click="handleCreateRichMenu" />
    </div>

    <div class="q-mb-md">
      <q-btn icon="upload" label="上傳" @click="handleUploadRichMenuImage" />
    </div>

    <div class="q-mb-md">
      <q-btn color="negative" icon="delete" label="刪除" @click="deleteRichMenu(richMenuId)" />
    </div>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import menuImg from 'assets/menu.png'
import { createRichMenu, deleteRichMenu, uploadRichMenuImage } from 'src/api'

const richMenuId = ref('richmenu-e156c7bf5d6c1426bc99debae9a0d56b')

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
