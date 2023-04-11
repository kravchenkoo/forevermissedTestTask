<template>
  <PrimaryButton v-if="!finalData" @click="isOpen = true">Open Popup</PrimaryButton>
  <KeepAlive>
    <Popup v-if="isOpen" :isOpen="isOpen" :toSuccess="toSuccess" @closePopup="closePopup">
      <template v-slot:body></template>
    </Popup>
  </KeepAlive>
  <div class="final-data" v-if="finalData">
    <span>Success! Refresh the page to use popup once more.</span>
    <span>message:</span>
    <div>{{finalData.message}}</div>
    <span>users:</span>
    <div v-for="user in finalData.users">{{ user }}</div>
  </div>
</template>

<script setup>
import {ref} from 'vue'
import PrimaryButton from './components/PrimaryButton.vue'
import Popup from './components/Popup.vue'
const isOpen = ref(false);
const closePopup = () => isOpen.value = false
let finalData = null
const toSuccess = (data) => {
  isOpen.value = false
  finalData = data
}
</script>

<style lang="scss" scoped>
.final-data {
  span {
    display: block;
    margin-top: 24px;
    font-size: 2rem;
    font-weight: 600;
  }
}
</style>
