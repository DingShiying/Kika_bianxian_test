<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { Chart } from '@antv/g2'

const container = ref<HTMLElement | null>(null)

// 定义本地数据
const localData = {
  name: '投放平台',
  children: [
    {
      name: '部门1',
      children: [
        {
          name: '业务组1',
          children: [
            {
              name: 'app1',
            },
            {
              name: 'app2',
            },
            {
              name: 'appp3',
            },
          ],
        },
        {
          name: '业务组2',
          children: [
            {
              name: 'app1',
            },
            {
              name: 'app2',
            },
            {
              name: 'appp3',
            },
          ],
        },
        {
          name: '业务组3',
          children: [
            {
              name: 'app1',
            },
            {
              name: 'app2',
            },
            {
              name: 'appp3',
            },
          ],
        },
      ],
    },
    {
      name: '部门2',
      children: [
        {
          name: '业务组1',
          children: [
            {
              name: 'app1',
            },
            {
              name: 'app2',
            },
            {
              name: 'appp3',
            },
          ],
        },
        {
          name: '业务组2',
          children: [
            {
              name: 'app1',
            },
            {
              name: 'app2',
            },
            {
              name: 'appp3',
            },
          ],
        },
      ],
    },
    {
      name: '部门2',
      children: [
        {
          name: '业务组1',
          children: [
            {
              name: 'app1',
            },
            {
              name: 'app2',
            },
            {
              name: 'appp3',
            },
          ],
        },
      ],
    },
    {
      name: '部门2',
      children: [
        {
          name: '业务组1',
          children: [
            {
              name: 'app1',
            },
            {
              name: 'app2',
            },
            {
              name: 'appp3',
            },
          ],
        },
      ],
    },
  ],
}

onMounted(() => {
  if (container.value) {
    const chart = new Chart({
      container: container.value,
      // height: 1000,
      // width: 800,
      autoFit: true,
      insetRight: 100,
      insetLeft: 100,
      insetTop: 20,
      insetBottom: 20,
    })

    chart.coordinate({ transform: [{ type: 'transpose' }] })

    chart
      .tree()
      .data({
        value: localData,
      })
      .layout({
        sortBy: (a, b) => a.value - b.value,
      })
      .style('nodeFill', () => ('skyblue'))// 节点颜色
      .style('linkStroke', 'l(0) 0:#ffffff 0.5:#7ec2f3 1:#1890ff')// 连接线颜色
      .style('labelText', (d: any) => d.data.name || '-')// 节点名称
      .style('labelFontSize', (d: any) => (d.height === 3 ? 20 : d.height === 2 ? 18 : 16))// 节点字体大小
      .style('labelFill', 'black')// 节点字体颜色
      .style('labelTextAlign', (d: any) => (d.height === 0 ? 'start' : 'end'))// 节点字体对齐方式
      .style('labelPosition', (d: any) => (d.height !== 0 ? 'left' : 'right'))// 节点位置
      .style('labelDx', (d: any) => (d.height === 0 ? 5 : -5))// 节点x轴偏移量
      .style('labelBackground', true)// 节点背景
      .tooltip(false)// 隐藏提示框
      .style('labelBackgroundFill', (d: any) => (d.height === 0 ? 'transparent' : d.height === 3 ? '#0099fb' : d.height === 2 ? '#44b6ffd6' : '#44b6ff70'))// 节点背景颜色
      .style('labelLineHeight', (d: any) => (d.height === 0 ? 0 : 40))// 节点背景高度
      .style('labelLineWidth', (d: any) => (d.height === 0 ? 0 : 20))// 节点背景宽度
    // .style('labelFill', (d: any) => (d.height === 3 || d.height === 2 ? '#fff' : 'black'))// 节点字体颜色

    chart.render()
  }
})
</script>

<template>
  <div ref="container" class="chart-container" />
</template>

<style scoped>
.chart-container {
  width: 100%;
  height: 100%;
}
</style>
