
<template>
  <span :class="['el-link',type]">
    <slot />
  </span>
</template>
<script>
import { createProp } from '../utils/dom';
import col from 'element-ui';
export default {
  props: {
    type: createProp([String], '')
  }
}
</script>
<style lang="scss" scoped>
.el-link {
  color: #333;
  padding: 0 5px;
  cursor: pointer;
  &.danger {
    color: #f56c6c;
  }
  &.success {
    color: #67c23a;
  }
  &.primary {
    color: #409eff;
  }
  &.grey {
    color: #888;
  }
}
</style>