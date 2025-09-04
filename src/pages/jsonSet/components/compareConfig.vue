<script setup lang='ts' name='compareConfig'>
import { ref } from 'vue'
import { RollbackOutlined } from '@ant-design/icons-vue'

interface Config {
  configID: string
  configName: string
  describe: string
  condition: string
  version: string
  creator: string
  createTime: string
}

const { config } = defineProps<{
  config: Config
}>()

const emit = defineEmits(['close'])

const compareConfig = ref<string | undefined>(undefined)
const currentConfig = ref<string | undefined>(config.configID)
const configLists = [
  {
    label: '分地区测试',
    value: '1',
  },
  {
    label: '呵呵测试',
    value: '2',
  },
  {
    label: '基础配置',
    value: '3',
  },
]
const copyOther = ref('0')
</script>

<template>
  <div class="compare">
    <div class="header">
      <span>JSON配置对比</span>
      <a-button type="primary" class="back-but" @click="emit('close', false)">
        <template #icon>
          <RollbackOutlined />
        </template>
        返回
      </a-button>
    </div>

    <div class="containner">
      <div class="left">
        <div class="select-part">
          <div class="select">
            <div class="text">
              对比配置
            </div>
            <a-select
              v-model:value="compareConfig" show-search placeholder="请选择对比配置" :options="configLists"
              style="width: 200px"
            />
          </div>
        </div>

        <div class="content">
          <div class="content-header">
            <div class="config-name">
              分地区测试
            </div>
            <div class="condition">
              <span>条件:</span>
              <ul>
                <li>国家/地区==印度</li>
                <li>Build>=100</li>
              </ul>
            </div>
            <div class="version">
              <span>版本:&nbsp;&nbsp;88</span>
            </div>
          </div>
          <div class="OID-part">
            <div class="OID">
              <div class="OID-name">
                <a-tooltip>
                  <template #title>
                    hsj_jbjbj_jhkk
                  </template>
                  <span class="name">hsj_jbjbj_jhkk</span>
                </a-tooltip>
                <span>广告类型:&nbsp;&nbsp;native</span>
              </div>
              <div class="copy-other">
                <span>是否共享其他OID配置</span>
                <a-radio-group v-model:value="copyOther" disabled>
                  <a-radio value="1">
                    是
                  </a-radio>
                  <a-radio value="0">
                    否
                  </a-radio>
                </a-radio-group>
              </div>
              <div v-if="copyOther === '0'" class="nocopy">
                <div class="ads">
                  <div>广告源ads</div>
                  <a-button>jhjkbhjbnjbjh</a-button>
                </div>
                <div class="adstyle">
                  <div>广告样式</div>
                  <a-button>jhjkbhjbnjbjh</a-button>
                </div>
                <div class="adplan">
                  <div>广告计划</div>
                  <a-button>jhjkbhjbnjbjh</a-button>
                </div>
              </div>
              <div v-else class="withcopy">
                <div>目标OID</div>
                <a-button>jhjkbhjbnjbjh</a-button>
              </div>
            </div>
            <div class="OID">
              <div class="OID-name">
                <a-tooltip>
                  <template #title>
                    hsj_jbjbj_jhkk
                  </template>
                  <span class="name">hsj_jbjbj_jhkk</span>
                </a-tooltip>
                <span>广告类型:&nbsp;&nbsp;native</span>
              </div>
              <div class="copy-other">
                <span>是否共享其他OID配置</span>
                <a-radio-group v-model:value="copyOther" disabled>
                  <a-radio value="1">
                    是
                  </a-radio>
                  <a-radio value="0">
                    否
                  </a-radio>
                </a-radio-group>
              </div>
              <div v-if="copyOther === '0'" class="nocopy">
                <div class="ads">
                  <div>广告源ads</div>
                  <a-button>jhjkbhjbnjbjh</a-button>
                </div>
                <div class="adstyle">
                  <div>广告样式</div>
                  <a-button>jhjkbhjbnjbjh</a-button>
                </div>
                <div class="adplan">
                  <div>广告计划</div>
                  <a-button>jhjkbhjbnjbjh</a-button>
                </div>
              </div>
              <div v-else class="withcopy">
                <div>目标OID</div>
                <a-button>jhjkbhjbnjbjh</a-button>
              </div>
            </div>
            <div class="OID">
              <div class="OID-name">
                <a-tooltip>
                  <template #title>
                    hsj_jbjbj_jhkk
                  </template>
                  <span class="name">hsj_jbjbj_jhkk</span>
                </a-tooltip>
                <span>广告类型:&nbsp;&nbsp;native</span>
              </div>
              <div class="copy-other">
                <span>是否共享其他OID配置</span>
                <a-radio-group v-model:value="copyOther" disabled>
                  <a-radio value="1">
                    是
                  </a-radio>
                  <a-radio value="0">
                    否
                  </a-radio>
                </a-radio-group>
              </div>
              <div v-if="copyOther === '0'" class="nocopy">
                <div class="ads">
                  <div>广告源ads</div>
                  <a-button>jhjkbhjbnjbjh</a-button>
                </div>
                <div class="adstyle">
                  <div>广告样式</div>
                  <a-button>jhjkbhjbnjbjh</a-button>
                </div>
                <div class="adplan">
                  <div>广告计划</div>
                  <a-button>jhjkbhjbnjbjh</a-button>
                </div>
              </div>
              <div v-else class="withcopy">
                <div>目标OID</div>
                <a-button>jhjkbhjbnjbjh</a-button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="right">
        <div class="select-part">
          <div class="select">
            <div class="text">
              当前配置
            </div>
            <a-select
              v-model:value="currentConfig" show-search placeholder="请选择当前配置"
              :options="configLists" style="width: 200px"
            />
          </div>
          <a-button class="add">
            增加的内容(0)
          </a-button>
          <a-button class="remove">
            删除的内容(0)
          </a-button>
          <a-button class="different">
            差异的内容(0)
          </a-button>
        </div>

        <div class="content">
          <div class="content-header">
            <div class="config-name">
              分地区测试
            </div>
            <div class="condition">
              <span>条件:</span>
              <ul>
                <li>国家/地区==印度</li>
                <li>Build>=100</li>
              </ul>
            </div>
            <div class="version">
              <span>版本:&nbsp;&nbsp;88</span>
            </div>
          </div>
          <div class="OID-part">
            <div class="OID">
              <div class="OID-name">
                <a-tooltip>
                  <template #title>
                    hsj_jbjbj_jhkk
                  </template>
                  <span class="name">hsj_jbjbj_jhkk</span>
                </a-tooltip>
                <span>广告类型:&nbsp;&nbsp;native</span>
              </div>
              <div class="copy-other">
                <span>是否共享其他OID配置</span>
                <a-radio-group v-model:value="copyOther" disabled>
                  <a-radio value="1">
                    是
                  </a-radio>
                  <a-radio value="0">
                    否
                  </a-radio>
                </a-radio-group>
              </div>
              <div v-if="copyOther === '0'" class="nocopy">
                <div class="ads">
                  <div>广告源ads</div>
                  <a-button>jhjkbhjbnjbjh</a-button>
                </div>
                <div class="adstyle">
                  <div>广告样式</div>
                  <a-button>jhjkbhjbnjbjh</a-button>
                </div>
                <div class="adplan">
                  <div>广告计划</div>
                  <a-button>jhjkbhjbnjbjh</a-button>
                </div>
              </div>
              <div v-else class="withcopy">
                <div>目标OID</div>
                <a-button>jhjkbhjbnjbjh</a-button>
              </div>
            </div>
            <div class="OID">
              <div class="OID-name">
                <a-tooltip>
                  <template #title>
                    hsj_jbjbj_jhkk
                  </template>
                  <span class="name">hsj_jbjbj_jhkk</span>
                </a-tooltip>
                <span>广告类型:&nbsp;&nbsp;native</span>
              </div>
              <div class="copy-other">
                <span>是否共享其他OID配置</span>
                <a-radio-group v-model:value="copyOther" disabled>
                  <a-radio value="1">
                    是
                  </a-radio>
                  <a-radio value="0">
                    否
                  </a-radio>
                </a-radio-group>
              </div>
              <div v-if="copyOther === '0'" class="nocopy">
                <div class="ads">
                  <div>广告源ads</div>
                  <a-button>jhjkbhjbnjbjh</a-button>
                </div>
                <div class="adstyle">
                  <div>广告样式</div>
                  <a-button>jhjkbhjbnjbjh</a-button>
                </div>
                <div class="adplan">
                  <div>广告计划</div>
                  <a-button>jhjkbhjbnjbjh</a-button>
                </div>
              </div>
              <div v-else class="withcopy">
                <div>目标OID</div>
                <a-button>jhjkbhjbnjbjh</a-button>
              </div>
            </div>
            <div class="OID">
              <div class="OID-name">
                <a-tooltip>
                  <template #title>
                    hsj_jbjbj_jhkk
                  </template>
                  <span class="name">hsj_jbjbj_jhkk</span>
                </a-tooltip>
                <span>广告类型:&nbsp;&nbsp;native</span>
              </div>
              <div class="copy-other">
                <span>是否共享其他OID配置</span>
                <a-radio-group v-model:value="copyOther" disabled>
                  <a-radio value="1">
                    是
                  </a-radio>
                  <a-radio value="0">
                    否
                  </a-radio>
                </a-radio-group>
              </div>
              <div v-if="copyOther === '0'" class="nocopy">
                <div class="ads">
                  <div>广告源ads</div>
                  <a-button>jhjkbhjbnjbjh</a-button>
                </div>
                <div class="adstyle">
                  <div>广告样式</div>
                  <a-button>jhjkbhjbnjbjh</a-button>
                </div>
                <div class="adplan">
                  <div>广告计划</div>
                  <a-button>jhjkbhjbnjbjh</a-button>
                </div>
              </div>
              <div v-else class="withcopy">
                <div>目标OID</div>
                <a-button>jhjkbhjbnjbjh</a-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang='scss'>
.compare {
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    background-color: white;
    z-index: 1000;

    .header {
        width: 100%;
        height: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        border-bottom: 1px solid #ccc;

        span {
            font-size: 20px;
            font-weight: bold;
        }

        .back-but {
            position: absolute;
            left: 20px;
        }
    }
}

.containner {
    width: 100%;
    height: calc(100% - 50px);
    display: flex;
    justify-content: space-between;

    .left,
    .right {
        width: 50%;
        height: 100%;
        padding: 20px;

        .select-part {
            display: flex;
            align-items: center;
            justify-content: space-between;
            height: 32px;
            margin-bottom: 10px;

            .select {
                display: flex;
                align-items: center;

                .text {
                    font-size: 16px;
                    font-weight: bold;
                    margin-right: 20px;
                }
            }

            .add {
                background-color: #a4e8cf;
            }

            .remove {
                background-color: #fab3ad;
            }

            .different {
                background-color: #84bafd;
            }
        }

        .content {
            width: 100%;
            height: calc(100% - 42px);
            overflow: auto;
            overflow-x: hidden;
            position: relative;

            /* 设置滚动条的宽度 */
            &::-webkit-scrollbar {
                width: 3px;
                /* 水平滚动条的宽度 */
                height: 3px;
                /* 垂直滚动条的高度 */
            }

            /* 设置滚动条轨道的样式 */
            &::-webkit-scrollbar-track {
                background: transparent;
                /* 轨道背景颜色 */
                border-radius: 10px;
                /* 轨道的圆角 */
            }

            /* 设置滚动条滑块的样式 */
            &::-webkit-scrollbar-thumb {
                background: #888;
                /* 滑块颜色 */
                border-radius: 10px;
                /* 滑块的圆角 */
            }

            .content-header {
                background-color: #f3f4f6;
                width: 100%;
                min-height: 100px;
                padding: 10px;
                border-radius: 10px;
                display: flex;
                justify-content: space-around;
                flex-wrap: wrap;
                position: sticky;
                top: 0;
                z-index: 100;

                .config-name {
                    width: 100%;
                    font-size: 30px;
                    text-align: center;
                }

                .condition {
                    display: flex;
                    min-width: 50%;

                    span {
                        font-size: 15px;
                        margin-right: 10px;
                    }

                    ul {
                        margin: 0;
                        padding: 0;
                        list-style-type: none;

                        li {
                            margin-bottom: 3px;
                            font-size: 15px;

                            &:last-of-type {
                                margin: 0;
                            }
                        }
                    }
                }

                .version {
                    width: 20%;
                    font-size: 15px;
                }
            }

            .OID-part {
                margin-top: 20px;
                display: grid;
                grid-template-columns: repeat(auto-fill, 280px);
                justify-content: space-around;
                width: 100%;
                gap: 10px;

                .OID {
                    width: 280px;
                    height: 210px;
                    background-color: #f5f7fa;
                    border-radius: 15px;
                    padding: 10px;
                    margin-right: 20px;
                    margin-bottom: 20px;

                    .OID-name {
                        width: 100%;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;

                        .name {
                            font-size: 18px;
                            font-weight: bolder;
                            color: #409eff;
                            width: 110px;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                        }
                    }

                    .copy-other {
                        width: 100%;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        margin-top: 10px;

                        span {
                            font-size: 14px;
                        }
                    }

                    .nocopy {
                        width: 100%;

                        .ads,
                        .adstyle,
                        .adplan {
                            width: 100%;
                            margin-top: 10px;
                            display: flex;
                            align-items: center;

                            div {
                                width: 100px;
                            }
                        }
                    }

                    .withcopy {
                        width: 100%;
                        margin-top: 10px;
                        display: flex;
                        align-items: center;

                        div {
                            width: 100px;
                        }
                    }
                }
            }
        }
    }
}
</style>
