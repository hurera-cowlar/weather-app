<template>
  <Line :data="data_" :options="options_" />
</template>

<script setup>
import { Line } from 'vue-chartjs'
import { ref, watch, toRefs } from 'vue'

const props = defineProps(['data', 'options'])

const { data, options } = toRefs(props)

watch(
  () => data,
  (newValue, oldValue) => {
    console.log('props changed')
  }
)

const data_ = ref(data)
const options_ = ref(options)
</script>
