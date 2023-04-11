<template>
  <div class="recipient" v-if="userName.results">
    <div class="recipient__info">
      <div class="recipient__name-email">
        <span class="recipient__name">
          {{userName.results[0].name.title}}
          {{userName.results[0].name.first}}
          {{userName.results[0].name.last}}
        </span>
        <p class="recipient__email"><slot name="email"></slot></p>
      </div>
      <slot name="choseRole"></slot>
    </div>
    <slot name="deleteButton"></slot>
  </div>
</template>

<script setup>
import {ref} from 'vue'
const props = defineProps({
  email: String,
});
let userName = ref('')
const getRandomUser = async () => {
  const response = await fetch('https://randomuser.me/api/')
      .catch(error => alert(error))
  const data = await response.json()
  userName.value = data
}
getRandomUser()
</script>

<style lang="scss" scoped>
  .recipient {
    display: flex;
    align-items: center;
    width: 100%;
    &:not(:last-child) {
      margin-bottom: 12px;
    }
    .recipient__info {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 6px 16px 6px 12px;
      width: calc(100% - 30px);
      background-color: #F6EFE6;
      border-radius: 6px;
      .recipient__name-email {
        display: flex;
        flex-direction: column;
      }
      .recipient__email {
        font-weight: 400;
        font-size: 1.2rem;
        line-height: 16px;
        color: #876A68;
      }
      .recipient__name {
        font-weight: 400;
        font-size: 1.6rem;
        line-height: 24px;
        color: #3C1F1D;
      }
    }

  }
</style>