<template>
  <button><slot></slot></button>
</template>

<script>
</script>

<style lang="scss" scoped>
button {
  padding: 12px 24px;
  background: linear-gradient(90deg, #64362D 0%, #82544B 100%);
  border: 1px solid #3E1007;
  box-shadow: inset 0 0 0 0 rgba(62,16,7,1);
  border-radius: 6px;
  color: #FFFFFF;
  font-weight: 600;
  font-size: 1.6rem;
  transition: box-shadow .25s ease;
  &:hover {
    box-shadow: inset 0px 0px 3px 1px rgba(62,16,7,1);
  }
}
</style>