<!-- <script setup lang="ts">
import { Line } from '@antv/g2plot'
import { ref, watchEffect } from 'vue'

const props = defineProps({
  offlineChartData: {
    type: Array,
    required: true,
  },
})

const offlineChartData = ref()
watchEffect(() => {
  offlineChartData.value = props.offlineChartData
})
const container = ref()

onMounted(() => {
  new Line(container.value, {
    data: offlineChartData.value as any,
    padding: 'auto',
    xField: 'date',
    yField: 'value',
    xAxis: {
      tickCount: 5,
    },
    seriesField: 'type',
    legend: {
      position: 'top',
    },
    slider: {
      start: 0.1,
      end: 0.5,
    },
  }).render()
})
</script>

<template>
  <div ref="container" />
</template>

<style scoped lang="less"></style> -->

<script setup lang="ts">
import { Line } from '@antv/g2plot'
import { onMounted, ref, watchEffect } from 'vue'

const props = defineProps({
  offlineChartData: {
    type: Array,
    required: true,
  },
})

const container = ref<HTMLElement | null>(null)

// 创建一个 Line 图表实例
let lineChart: Line | null = null

// 监听 props.offlineChartData 的变化
watchEffect(() => {
  if (container.value && props.offlineChartData) {
    if (lineChart) {
      // 如果图表已存在，更新数据并重新渲染
      lineChart.update({
        data: props.offlineChartData as any,
      })
    }
    else {
      // 如果图表不存在，创建一个新的图表实例
      lineChart = new Line(container.value, {
        data: props.offlineChartData as any,
        padding: 'auto',
        xField: 'date',
        yField: 'value',
        xAxis: {
          tickCount: 5,
        },
        seriesField: 'type',
        legend: {
          position: 'top',
        },
        slider: {
          start: 0.1,
          end: 0.5,
        },
      })
      lineChart.render()
    }
  }
})

onMounted(() => {
  // 确保容器已挂载
  if (container.value && props.offlineChartData) {
    lineChart = new Line(container.value, {
      data: props.offlineChartData as any,
      padding: 'auto',
      xField: 'date',
      yField: 'value',
      xAxis: {
        tickCount: 5,
      },
      seriesField: 'type',
      legend: {
        position: 'top',
      },
      slider: {
        start: 0.1,
        end: 0.5,
      },
    })
    lineChart.render()
  }
})
</script>

<template>
  <div ref="container" />
</template>

<style scoped lang="less"></style>
