<template>
  <div class="component-container">
    <div class="input-show" @click="trigger_pick_modal(true)">
      <span>{{client.name||'请选择'}}</span>
      &nbsp;<i class="iconfont icon-down"></i>
    </div>

    <!--弹出框  选择 所属组织  -->
    <el-dialog title="选择组织" width="400px" :visible.sync="pick_modal_state">
      <organization-tree v-if="pick_modal_state" ref="addAuthorizedContainer"></organization-tree>
      <div slot="footer" class="dialog-footer">
        <el-button @click="pick_modal_state = false">取消</el-button>
        <el-button type="primary" @click="sure_select_zhuzhi">确定
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { createProp } from '../utils/dom';
export default {
  data () {
    return {
      client: {
        id: "",
        name: ""
      },
      pick_modal_state: false,
    }
  },
  props: {
    id: createProp([Number, String], "")
  },
  methods: {
    trigger_pick_modal (show) {
      this.pick_modal_state = show
    },
    sure_select_zhuzhi () {
      this.client = {
        id: this.$refs['addAuthorizedContainer'].currTreeId,
        name: this.$refs['addAuthorizedContainer'].currTreeName,
      }
      this.$emit('input', this.$refs['addAuthorizedContainer'].currTreeId)
    }
  }
}
</script>
<style lang="scss" scoped>
.iconfont {
  font-size: 12px;
}
</style>