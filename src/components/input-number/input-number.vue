
<template>
  <div class="number-inpuit">
    <div
      @click="down"
      class="btn btn-down"
    >
      <i class="el-icon-minus"></i>
    </div>
    <input
      type="text"
      :value="value"
      disabled
    />
    <div
      @click="up"
      class="btn btn-up"
    >
      <i class="el-icon-plus"></i></div>
  </div>
</template>
<script>
import { createProp } from '../../utils/dom';
export default {
  props: {
    min: createProp([String, Number], 0),
    max: createProp([String, Number], 0),
    value: createProp([String, Number], 12),
  },
  methods: {
    down() {
      if (this.value > this.min) {
        this.$emit("change", this.value - 1)
      }

    },
    up() {
      if (this.max && this.value < this.max) {
        this.$emit("change", this.value + 1)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.number-inpuit {
  display: flex;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  .btn {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    left: 1;
    width: 30px;
    height: 30px;
    background: #f5f7fa;
    color: #606266;
    cursor: pointer;
    i {
      font-size: 12px;
    }
    &.btn-down {
      border-radius: 4px 0 0 4px;
      border-right: 1px solid #dcdfe6;
    }
    &.btn-up {
      border-radius: 0 4px 4px 0;
      border-left: 1px solid #dcdfe6;
    }
  }
  input {
    width: 40px;
    border: none;
    outline: none;
    text-align: center;
    font-size: 14px;
    color: #606266;
    &[disabled="disabled"] {
      background: #fff;
    }
  }
}
</style>
