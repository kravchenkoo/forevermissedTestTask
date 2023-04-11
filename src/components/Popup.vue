<template>
  <div class="popup" :isOpen="isOpen">
    <div class="popup__header">
      <div class="popup__header--row">
        <h3>Invite others</h3>
        <button @click="closePopup"></button>
      </div>
      <div class="popup__input">
        <input type="email" name="email" v-model="email.email" placeholder="Enter people E-mails">
        <span class="popup__error" v-if="v$.$errors[0]">
          {{v$.$errors[0].$message}}
        </span>
        <button :disabled="v$.$errors[0]" @click="addUser">add</button>
      </div>
      <slot name="header"></slot>
      <Social></Social>
    </div>
    <div class="popup__body" v-if="users.length">
      <div class="scroll scroll--simple">
        <div class="inner">
          <slot name="body"></slot>
          <Recipients v-for="(user, index) in users" :key="user.id">
            <template v-slot:email>{{ user.email }}</template>
            <template v-slot:deleteButton><delete-button @deleteRecipient="deleteRecipient(index)"></delete-button></template>
            <template v-slot:choseRole><ChoseRole :recipient="user"></ChoseRole></template>
          </Recipients>
        </div>
      </div>
    </div>
    <div class="popup__footer">
      <input type="text" class="popup__footer-input" placeholder="Personal message (optional)" v-model="personalMessage">
      <div class="popup__footer--row">
        <span class="popup__recipients-num">{{users.length}} recipients</span>
        <PrimaryButton @click="toSuccess(finalData)">Send</PrimaryButton>
      </div>
    </div>
  </div>
</template>
<script setup>
import {ref, reactive} from 'vue'
import PrimaryButton from './PrimaryButton.vue'
import Recipients from './Recipient.vue'
import DeleteButton from './DeleteButton.vue'
import ChoseRole from './ChoseRole.vue'
import Social from './Social.vue'
import useEmailValidator from '../composables/useEmailValidator.js'

const personalMessage = ref('')
const emit = defineEmits(["closePopup"])
const users = reactive([])
const email = reactive({email: ""})
const {isValid, v$} = useEmailValidator(email)
const props = defineProps({
  isOpen: Boolean,
  toSuccess: Function
});
const finalData = reactive({
  users: users,
  message: personalMessage
})
const addUser = () => {
  isValid().then((data) => {
    if (data) {
      if (email.email) {
        users.push({
          id: new Date().valueOf(),
          email: email.email,
          role: 'Guest'
        })
      }
    }
  })
}
const deleteRecipient = (index) => {
  users.splice(index, 1)
}
const closePopup = () => emit('closePopup');
</script>

<style lang="scss" scoped>
  .popup {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    width: 80%;
    max-width: 598px;
    background: #FFF8EF;
    border-radius: 6px;
    .popup__header {
      padding: 24px;
      .popup__header--row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 24px;
        button {
          display: block;
          width: 15px;
          height: 15px;
          background-repeat: no-repeat;
          background-size: 14px 14px;
          background-position: center center;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 14 14' fill='none'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M1.70925 0.29327C1.3183 -0.0976991 0.684362 -0.0977652 0.293323 0.293123C-0.0977166 0.684011 -0.0977827 1.31783 0.293175 1.7088L5.58536 7.00114L0.301071 12.2845C-0.0899276 12.6754 -0.0899276 13.3092 0.301071 13.7002C0.692069 14.0911 1.326 14.0911 1.717 13.7002L7.00114 8.41697L12.2907 13.7067C12.6817 14.0977 13.3156 14.0978 13.7067 13.7069C14.0977 13.316 14.0978 12.6822 13.7068 12.2912L8.41707 7.00129L13.7046 1.71474C14.0956 1.32381 14.0956 0.689991 13.7046 0.299062C13.3136 -0.0918667 12.6796 -0.0918667 12.2886 0.299062L7.00129 5.58546L1.70925 0.29327Z' fill='%233C1F1D'/%3E%3C/svg%3E");
        }
      }
      h3 {
        font-weight: 600;
        font-size: 2.4rem;
      }
      .popup__input {
        display: flex;
        justify-content: space-between;
        position: relative;
        input {
          padding: 12px 16px;
          width: calc(100% - 92px);
        }
        button {
          padding: 12px 24px;
          opacity: 0.56;
          border: 1px solid #D1CAC1;
          border-radius: 6px;
          font-weight: 600;
          font-size: 1.6rem;
          line-height: 24px;
          transition: opacity .25s ease;
          &:hover {
            opacity: 1;
          }
          &:disabled {
            cursor: not-allowed;
          }
        }
        .popup__error {
          position: absolute;
          top: -30px;
          color: #fff;
          padding: 6px 12px;
          background-color: #d24e4e;
          border-radius: 6px;
          &:after {
            content: '';
            position: absolute;
            width: 10px;
            height: 10px;
            top: 100%;
            left: 10px;
            transform: rotate(45deg) translateY(-7px);
            background-color: #d24e4e;
          }
        }
      }
    }
    .popup__body {
      border-top: 1px solid #DFD8CF;
      border-bottom: 1px solid #DFD8CF;
      padding-right: 6px;

      .scroll {
        padding: 16px 16px 16px 24px;
        max-height: 30vh;
        width: 100%;
        overflow-y: scroll;
        display: block;

        .inner{
          height: 80%;
          width: 100%;
          content: '.';
        }

        // Simple
        &--simple::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        &--simple::-webkit-scrollbar-track {
          border-radius: 10px;
          background: rgba(0,0,0,0.1);
        }
        &--simple::-webkit-scrollbar-thumb{
          border-radius: 10px;
          background: rgba(0,0,0,0.2);
        }
        &--simple::-webkit-scrollbar-thumb:hover{
          background: rgba(0,0,0,0.4);
        }
        &--simple::-webkit-scrollbar-thumb:active{
          background: rgba(0,0,0,.9);
        }
      }
    }
    .popup__footer {
      padding: 24px;
      .popup__footer--row {
        display: flex;
        align-items: center;
        justify-content: flex-end;
      }
      .popup__recipients-num {
        margin-right: 24px;
      }
      .popup__footer-input {
        padding: 12px 16px;
        margin-bottom: 36px;
      }
    }
    input {
      background: #FFFFFF;
      border: 1px solid rgba(51, 51, 51, 0.16);
      border-radius: 6px;
      width: 100%;
      font-weight: 400;
      font-size: 1.6rem;
      line-height: 24px;
      color: #ACAAAD;
      &::placeholder {
        font-family: 'Open Sans';
        font-weight: 400;
        font-size: 1.6rem;
        line-height: 24px;
        color: #ACAAAD;
      }
    }
  }
</style>