<template>
  <div class="role" @click="choseRole">
    <div class="role__current">{{ recipient.role }}
      <span class="role__icon" :class="{active: isOpen}"></span>
    </div>
    <div class="role__select" v-if="isOpen">
      <div
          class="role__guest"
          :class="{active: recipient.role === 'Guest'}"
          @click="changeRole('Guest')">
        Guest
        <span class="role__descr">Default access level, can leave tributes, share media and stories</span>
      </div>
      <div
          class="role__admin"
          :class="{active: recipient.role === 'Admin'}"
          @click="changeRole('Admin')">
        Administrator
        <span class="role__descr">Can control all aspects of the website, including moderating content posted by others and changing website settings</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref} from 'vue'

const props = defineProps({
  recipient: Object
});
const isOpen = ref(false)
const choseRole = () => {
  isOpen.value = !isOpen.value
}
const changeRole = (role) => {
  props.recipient.role = role
}
</script>

<style lang="scss" scoped>
  .role {
    position: relative;
    .role__current {
      cursor: pointer;
    }
    .role__select {
      position: absolute;
      top: calc(100% + 2px);
      right: 0;
      max-width: 320px;
      width: 318px;
      display: flex;
      flex-direction: column;
      padding: 4px 0;
      background-color: #FFF8EF;
      box-shadow: 4px 4px 24px rgba(0, 0, 0, 0.16);
      border-radius: 6px;
      z-index: 1;
      .role__guest, .role__admin {
        position: relative;
        padding: 12px 16px 12px 48px;
        cursor: pointer;
        font-weight: 600;
        font-size: 1.6rem;
        line-height: 24px;
        &:hover {
          background-color: #F6EFE6;
        }
        &.active {
          &:before {
            content: '';
            position: absolute;
            left: 16px;
            top: 16px;
            width: 15px;
            height: 11px;
            background-image: url("data:image/svg+xml,%3Csvg width='16' height='12' viewBox='0 0 16 12' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M5.9429 11.4016L0.800049 6.29984L2.43548 4.71584L5.9429 8.16156L13.5646 0.601562L15.2 2.2267L5.9429 11.4016Z' fill='%239C4619'/%3E%3C/svg%3E%0A");
          }
        }
        .role__descr {
          display: block;
          font-weight: 400;
          font-size: 1.2rem;
          line-height: 16px;
        }
      }
    }
    .role__icon {
      display: inline-block;
      margin-left: 5px;
      width: 9px;
      height: 6px;
      transition: transform .25s ease;
      background-repeat: no-repeat;
      background-position: top;
      background-image: url("data:image/svg+xml,%3Csvg width='10' height='6' viewBox='0 0 10 6' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.46303 0.5H8.53632C8.66145 0.500547 8.78361 0.539735 8.88735 0.61261C8.9911 0.685485 9.07178 0.788774 9.11918 0.909415C9.16658 1.03006 9.17859 1.16263 9.15367 1.29038C9.12875 1.41813 9.06803 1.53531 8.97919 1.62711L5.44887 5.30503C5.39006 5.36681 5.32008 5.41585 5.24299 5.44931C5.16589 5.48277 5.08319 5.5 4.99967 5.5C4.91615 5.5 4.83346 5.48277 4.75636 5.44931C4.67927 5.41585 4.60929 5.36681 4.55048 5.30503L1.02016 1.62711C0.931316 1.53531 0.870598 1.41813 0.84568 1.29038C0.820762 1.16263 0.832764 1.03006 0.880167 0.909415C0.92757 0.788774 1.00825 0.685485 1.112 0.61261C1.21574 0.539735 1.3379 0.500547 1.46303 0.5Z' fill='%233C1F1D'/%3E%3C/svg%3E%0A");
      &.active {
        transform: rotate(180deg);
        background-image: url("data:image/svg+xml,%3Csvg width='10' height='6' viewBox='0 0 10 6' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.46303 0.5H8.53632C8.66145 0.500547 8.78361 0.539735 8.88735 0.61261C8.9911 0.685485 9.07178 0.788774 9.11918 0.909415C9.16658 1.03006 9.17859 1.16263 9.15367 1.29038C9.12875 1.41813 9.06803 1.53531 8.97919 1.62711L5.44887 5.30503C5.39006 5.36681 5.32008 5.41585 5.24299 5.44931C5.16589 5.48277 5.08319 5.5 4.99967 5.5C4.91615 5.5 4.83346 5.48277 4.75636 5.44931C4.67927 5.41585 4.60929 5.36681 4.55048 5.30503L1.02016 1.62711C0.931316 1.53531 0.870598 1.41813 0.84568 1.29038C0.820762 1.16263 0.832764 1.03006 0.880167 0.909415C0.92757 0.788774 1.00825 0.685485 1.112 0.61261C1.21574 0.539735 1.3379 0.500547 1.46303 0.5Z' fill='%239C4619'/%3E%3C/svg%3E%0A");
      }
    }
  }
</style>