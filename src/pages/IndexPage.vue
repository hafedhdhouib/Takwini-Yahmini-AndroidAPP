<template>
  <q-page class="flex flex-center a">
    <img
      alt=""
      src="~assets/logoich3ar.png"
      style=""
    >
    <q-btn color="warning" :to="{ path: '/ich3ar' }" text-color="black" size="lg" label="ابدأ" />
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'IndexPage'
})
</script>
<style>
.a{
  flex-direction:column;
  background: #25389C;

}
</style>
