<template>
  <div id="zong">
    <div id="wap" ref="wap">
      <div class="bet">
        <!-- 刷新提示信息 -->
        <div class="top-tip" v-show="shows">
          <van-loading class="refresh-hook" type="spinner" size="15px" color="red"/>
          {{pulldownMsg}}
        </div>
        <!--内容-->
        <ul class="content">

          <li v-for="item in data">{{ item }}</li>
          <div class="bottom-tip">
            <van-loading class="refresh-hook" type="spinner" size="15px" color="red" v-show="downs"/>{{pullupMsg}}
          </div>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import {Loading} from 'vant';

  Vue.use(Loading);
  import BScroll from 'better-scroll'

  export default {
    name: "index",
    data() {
      return {
        data: ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'a', 's', 'd', 'f', 'g', 'h', 'j'],
        pulldownMsg: '下拉刷新',
        pullupMsg: '上拉加载更多',
        shows: false,
        downs:false
      }
    },
    created() {

      this.$nextTick(() => {
        // 获取视口高度
        let winHeight = document.documentElement.clientHeight;
        // 将高度转为rem
        document.getElementById('wap').style.height = (winHeight - 50) / parseFloat(document.documentElement.style.fontSize) + 'rem';
        this.scroll = new BScroll(this.$refs.wap, {probeType: 1, click: true})
        // 滑动事件
        this.scroll.on('scroll', (res) => {
          console.log(res);
          if (res.y > 30) {
            this.shows = true;
            this.pulldownMsg = '释放立即刷新';
          } else {
            this.shows = false
          }
        });
        // 下拉刷新
        this.scroll.on('touchEnd', (res) => {
          if (res.y > 30) {
            this.shows = true;
            this.pulldownMsg = '刷新中';
            setTimeout(() => {
              //  调用接口，请求数据
              this.gets().then(data => {
                if (data) {
                  this.pulldownMsg = '刷新成功';
                  this.data = data;
                  setTimeout(() => {
                    this.shows = false
                  }, 1000)
                }


              });
              //刷新列表后，重新计算滚动区域高度
              this.scroll.refresh();
            }, 3000)
          } else if (res.y < (this.scroll.maxScrollY - 30)) {
            this.downs = true;
            this.pullupMsg = '加载中。。。';
            this.gets().then(res => {
              setTimeout(() => {
                this.data = [...this.data, ...res];
                this.downs = false;
                this.pullupMsg = '上拉加载更多';
              }, 3000)

            })
          }
        })
      })
    },
    methods: {
      gets() {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            const arr = [];
            for (let i = 0; i < 50; i++) {
              arr.push(i)
            }
            resolve(arr);
          }, 1000)
        })
      },
      // 刷新成功
      refreshalert() {
        this.alertHook = 'block';
        setTimeout(() => {
          this.alertHook = 'none'
        }, 1000)
      }
    }
  }
</script>

<style scoped lang="stylus">
  @import "../../style/common"
  #wap {
    width: 100%;
    height: 300px;
    overflow: hidden;
    position: relative;
    background: pink;
  }

  li {
    line-height: 50px;
    text-align: center;
    border-bottom: 1px solid red;
  }

  .top-tip {
    z-index: 1;
    width: 100%;
    height: 35px;
    line-height: 35px;
    text-align: center;
    color: #555;
    background: #f2f2f2;
  }

  .bottom-tip {
    width: 100%;
    height: 35px;
    line-height: 35px;
    text-align: center;
    color: #777;
    background: #f2f2f2;
  }

  /* 全局提示信息 */
  .alert-hook {
    display: none;
    position: fixed;
    top: 62px;
    left: 0;
    z-index: 2;
    width: 100%;
    height: 35px;
    line-height: 35px;
    text-align: center;
    color: #fff;
    font-size: 12px;
    background: rgba(7, 17, 27, 0.5);
  }

  .refresh-hook {
    display: inline-block;
  }
</style>
