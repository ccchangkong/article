# 一个slider vue模块

> 自己做的播放器项目里的一个小组件

## 代码

[vue文件地址](https://github.com/ccchangkong/ccplayer/blob/master/src/components/slider.vue)，额，还是全贴出来把~

```js
<template>
  <div class="slider">
    {{inputValue}}
        <div class="slider-track"  ref="bar" @click.self='btnclick'>
          <div ref="step" class="slider-fill"></div>
          <span class="slider-thumb"  ref="btn" @mousedown='btndown' @touchstart="btnth">    
          </span>
        </div>
  </div>
</template>

<script>
export default {
  name: 'slider',
  props: {
    value: {
      type: [Number, String],
      default: 0
    },
    max: {
      type: Number,
      default: 100
    }
  },
  data () {
    return {
      x: '',
      l: '',
      flag: false,
      inputValue: this.value
    }
  },
  computed: {
    width () {
      return this.inputValue * (this.$refs.bar.offsetWidth / this.max) - this.$refs.btn.offsetWidth / 2
    },
    stepWidth () {
      return Math.max(0, this.width)
    }
  },
  mounted () {
    this.$refs.btn.style.left = this.width + 'px'
    this.$refs.step.style.width = this.stepWidth + 'px'
  },
  methods: {
    btnclick (e) {
      let x = e.clientX - this.$refs.bar.offsetLeft
      this.inputValue = Math.round((x / this.$refs.bar.offsetWidth) * 100)
      // var y = e.clientY - this.$refs.bar.offsetTop
    },
    maxW () {
      return this.$refs.bar.offsetWidth - this.$refs.btn.offsetWidth / 2
    },
    btndown (e) {
      this.x = (e || window.event).clientX
      this.l = this.$refs.btn.offsetLeft
      this.flag = true
      document.addEventListener('mousemove', this.btnmove)
      document.addEventListener('mouseup', this.btnup)
    },
    btnmove (e) {
      let m = Math
      let thisX = (e || window.event).clientX
      this.tTo(m, thisX)
      window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty()
    },
    btnup () {
      this.flag = false
      document.removeEventListener('mousemove', this.btnmove)
      document.removeEventListener('mouseup', this.btnup)
    },
    tTo (m, x) {
      let w = m.min(this.maxW(), m.max(-this.$refs.btn.offsetWidth / 2, this.l + (x - this.x)))
      this.inputValue = m.round(m.max(0, w / this.maxW()) * 100)
    },
    btnth (e) {
      this.x = (e || window.event).touches[0].clientX
      this.l = this.$refs.btn.offsetLeft
      this.flag = true
      document.addEventListener('touchmove', this.btnthmove)
      document.addEventListener('touchend', this.btnthup)
    },
    btnthmove (e) {
      let m = Math
      let thisX = (e || window.event).touches[0].clientX
      this.tTo(m, thisX)
    },
    btnthup () {
      this.flag = false
      document.removeEventListener('touchmove', this.btnthmove)
      document.removeEventListener('touchend', this.btnthup)
    }
  },
  watch: {
    inputValue (val) {
      this.$emit('input', val)
      this.$emit('change', val)
      this.$refs.btn.style.left = this.width + 'px'
      this.$refs.step.style.width = this.stepWidth + 'px'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .slider {
    font-size: 12px;
    line-height: 50px;
    position: relative;
    height: 50px;
    width: 200px;
    list-style: none;
  }
  .slider-thumb {
    background-color: black;
    width: 16px;
    height: 16px;
    position: absolute;
    left: -8px;
    top: -5px;
    cursor: pointer;
    border-radius: 50%;
    transition: 0.5s box-shadow;
  }
.slider-thumb.Act{
box-shadow: 0 0 5px #333;
}
  .slider-track {
    background: red;
    height: 5px;
    position: relative;
    font-size: 0px;
    cursor: pointer;
  }

  .slider-fill {
    background-color: blue;
    position: absolute;
    height: 5px;
    width: 0;
    left: 0;
    bottom: 0;
  }

</style>
```

## 数据流

![img](http://wx3.sinaimg.cn/large/6c7bfb12gy1fd3y9h847kj20i907imx4.jpg)

## DOM事件流

![](http://wx3.sinaimg.cn/large/6c7bfb12gy1fd3yw0fnkkj20ir0f83yu.jpg)

![福利](http://wx4.sinaimg.cn/large/6c7bfb12gy1fd3zg06vmbj20p00xc41t.jpg)