<template>
  <button class="delete" @click="deleteRecipient"></button>
</template>

<script setup>
const emit = defineEmits(["deleteRecipient"])
const deleteRecipient = () => {emit('deleteRecipient')}
</script>
<style lang="scss" scoped>
  .delete {
    position: relative;
    width: 20px;
    height: 20px;
    margin-left: 10px;
    padding: 0;
    border: none;
    display: block;
    background-color: transparent;
    &:after, &:before {
      content: '';
      width: 100%;
      height: 100%;
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      transform: rotate(0deg);
      transition: transform .25s ease;
      background-image: url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M20 10.0002C20 4.47698 15.5222 0.000244141 10 0.000244141C4.47784 0.000244141 0 4.47698 0 10.0002C0 15.5225 4.47779 20.0002 10 20.0002C15.5222 20.0002 20 15.5225 20 10.0002ZM10 1.50024C14.6938 1.50024 18.5 5.30551 18.5 10.0002C18.5 14.694 14.6938 18.5002 10 18.5002C5.30621 18.5002 1.5 14.694 1.5 10.0002C1.5 5.30551 5.30616 1.50024 10 1.50024ZM6 9.25024C5.58579 9.25024 5.25 9.58603 5.25 10.0002C5.25 10.4145 5.58579 10.7502 6 10.7502H14C14.4142 10.7502 14.75 10.4145 14.75 10.0002C14.75 9.58603 14.4142 9.25024 14 9.25024H6Z' fill='%23D1CAC1'/%3E%3C/svg%3E");
    }
    &:hover {
      &:after {
        transform: rotate(45deg);
      }
      &:before {
        transform: rotate(-45deg);
      }
    }
  }
</style>