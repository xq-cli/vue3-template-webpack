<template>
  <div class="app" >
    <button @click="handleClick" ref="test">加1</button>{{ a }}
    </div>
</template>
  
  <script setup>
import { onMounted, ref } from "vue";
const a = ref(3);
const test=ref(null)
const handleClick = () => {
  a.value++;
};
onMounted(()=>{
  console.log(test.value)
})

</script>
  
  <style lang="scss" scoped>
.app {
  color: blue;
}
</style>
  