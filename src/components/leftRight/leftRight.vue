
<template>
  <div class="left-right">
    <div class="left-container">
      <div class="table">
        <div class="inpout-container">
          <input
            type="text"
            placeholder="输入关键字"
            :value="leftquery"
            @input="($event)=>leftquery=$event.target.value"
            @keydown.enter="change_left_data"
          />
          <el-button
            class="search-btn"
            type="primary"
            @click="change_left_data"
          >搜索</el-button>
        </div>
        <!-- table header -->
        <div class="table-rows table-titles">
          <div
            class="table-item"
            style="width:50px;flex:none;min-width:0px!important;"
          >
            <el-checkbox
              @input="select_all_left"
              :value="checked_all_left"
            ></el-checkbox>
          </div>
          <div
            class="table-item"
            v-for="key in leftColumsKeys"
            :key="key"
          >{{renderTitle(colums,key)}}</div>
        </div>

        <div
          class="table-rows"
          v-for="(table_item,table_index) in left"
          :key="table_index"
          @click="selectleftrow(table_item,table_index)"
        >
          <div
            class="table-item"
            style="width:50px;flex:none;min-width:0px!important;"
          >
            <el-checkbox
              v-if="right.filter(_item=>_item.id==table_item.id).length==0"
              :value="table_item.checked"
              @input="change_left_row_checked($event,table_item,table_index)"
            ></el-checkbox>
            <el-checkbox
              v-if="right.filter(_item=>_item.id==table_item.id).length!=0"
              :disabled="true"
            ></el-checkbox>
          </div>
          <div
            class="table-item"
            v-for="key in leftColumsKeys"
            :key="key"
          >
            <!-- 渲染 每一个 c_item -->
            {{renderItem(table_item,key,colums[key])}}
          </div>
        </div>
        <div class="pagination">
          <el-pagination
            :page-size="left_size"
            layout="total,prev, pager, next"
            :total="leftCount"
            @current-change="leftchangepage"
          >
          </el-pagination>
        </div>
      </div>

    </div>
    <div class="btns">
      <div
        class="btn right-btn"
        :disabled="!isclick_left||left.filter(item=>item.checked).length==0"
        @click="go2right"
      >
        <i class="iconfont icon-right"></i>
      </div>
      <div
        :disabled="!isclick_right||right.filter(item=>item.checked).length==0"
        class="btn left-btn"
        @click="go2left"
      >
        <i class="iconfont icon-left"></i>
      </div>
    </div>
    <div class="right-container">
      <div
        class="table"
        style="padding:40px;"
        v-if="right.length==0"
      >
        请从左边选择数据
      </div>
      <div
        class="table"
        v-if="right.length!=0"
      >
        <!-- table header -->
        <div class="table-rows table-titles">
          <div
            class="table-item"
            style="width:50px;flex:none;min-width:0px!important;"
          >
          </div>
          <div
            class="table-item"
            v-for="key in leftColumsKeys"
            :key="key"
          >{{renderTitle(colums,key)}}</div>
        </div>

        <div
          class="table-rows"
          v-for="(table_item,table_index) in right"
          :key="table_index"
          @click="selectrightrow(table_item,table_index)"
        >
          <div
            class="table-item"
            style="width:50px;flex:none;min-width:0px!important;"
          >
            <el-checkbox
              :value="table_item.checked"
              @input="change_right_row_checked($event,table_item,table_index)"
            ></el-checkbox>
          </div>
          <div
            class="table-item"
            v-for="key in leftColumsKeys"
            :key="key"
          >
            <!-- 渲染 每一个 c_item -->
            {{renderItem(table_item,key,colums[key])}}
          </div>
        </div>

      </div>
    </div>
  </div>
</template>
<script>
import { createProp } from '../../utils/dom';
import { pageSize } from '../../config';
import { mergeArray, clone } from '../../utils/lodash';
export default {
  props: {
    left: createProp(Array),
    leftCount: createProp(Number),
    right: createProp(Array, 0),
    colums: createProp(Object),
  },
  data() {
    return {
      leftquery: "",
      left_from: 0,
      left_size: 10,
      isclick_right: false,
      isclick_left: false,
      checked_all_left: false,
    }
  },
  computed: {
    leftColumsKeys() {
      return Object.keys(this.colums)
    },
    leftpage() {
      return (this.left_from - 1) * this.left_size
    },
  },
  mounted() {
    this.$emit('leftChange', {
      query: this.leftquery,
      from: this.left_from,
      size: this.left_size
    })
  },
  methods: {
    select_all_left(value) {
      this.checked_all_left = value
      this.isclick_left = true
      var left = []
      if (this.checked_all_left) {
        left = clone(this.left).map(item => { item.checked = true; return item })
      } else {
        left = clone(this.left).map(item => { item.checked = false; return item })
      }
      this.$emit("update:left", left)
    },
    renderTitle(col, key) {
      if (typeof col[key] == 'string') {
        return col[key]
      }
      if (typeof col[key] == 'object') {
        return col[key].name
      }
    },
    go2right() {
      var right = clone(this.left.filter(item => item.checked)).map(item => {
        item.checked = false
        return item
      })
      right = clone(mergeArray(right, this.right))
      //左边右边一样的 checkout 设置 disaled
      this.checked_all_left = false
      this.$emit("update:right", right)
    },
    go2left() {
      var right = clone(this.right.filter(item => !item.checked))
      this.$emit("update:right", right)
    },
    leftchangepage(page) {
      this.left_from = (page - 1) * this.left_size
      this.$emit('leftChange', {
        query: this.leftquery,
        from: this.left_from,
        size: this.left_size
      })
    },
    change_left_data() {
      this.left_from = 0
      this.$emit('leftChange', {
        query: this.leftquery,
        from: this.left_from,
        size: this.left_size
      })
    },
    renderItem(row, key, keyValue) {
      if (typeof keyValue == "string") {
        return row[key]
      } else {
        return keyValue.formatter(row)
      }
    },
    change_left_row_checked($event, table_item, table_index) {
      this.left[table_index].checked = !$event
      this.$emit("update:left", this.left)
    },
    change_right_row_checked($event, table_item, table_index) {
      this.right[table_index].checked = !$event
      this.$emit("update:right", this.right)
    },
    selectleftrow(row, index) {
      this.left[index].checked = !row.checked
      this.isclick_left = true
      this.isclick_right = false
      this.$emit("update:left", this.left)

    },
    selectrightrow(row, index) {
      this.right[index].checked = !row.checked
      this.isclick_left = false
      this.isclick_right = true
      this.$emit("update:right", this.right)

    }
  }
}
</script>
<style lang="scss" scoped>
@import "@/styles/util.scss";
.left-right {
  display: flex;
  .left-container,
  .right-container {
    flex: 1;
  }
  .btns {
    display: flex;
    flex-direction: column;
    .btn {
      width: 50px;
      height: 50px;
      color: #fff;
      background: #409eff;
      border-radius: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      .iconfont {
        font-size: 30px !important;
      }
      &.left-btn {
        margin-top: 20px;
      }
      &:hover {
        opacity: 0.8;
      }
      &[disabled="disabled"] {
        cursor: not-allowed;
        color: #fff;
        background: #1f2d3d;
        opacity: 0.5;
      }
    }
  }
}
.table {
  border: 1px solid #ddd;
  .inpout-container {
    display: flex;
    align-items: center;
    padding: 20px 10px;
    input {
      padding-left: 10px;
      height: 80%;
      border: none;
      outline: none;
      flex: 1;
      border: 1px solid #ddd;
      border-right: none;
      height: 36px;
    }
    .search-btn {
      border-top-left-radius: 0px;
      border-bottom-left-radius: 0px;
    }
  }
  .table-rows.table-titles {
    border-top: 1px solid #ddd;
  }
  .table-rows {
    display: flex;
    align-items: center;
    border-bottom: 1px solid #ddd;
    &:last-child {
      border-bottom: none;
    }
    .table-item {
      display: flex;
      justify-content: center;
      align-items: center;
      border-right: 1px solid #ddd;
      cursor: pointer;
      width: 160px;
      min-height: 45px;
      display: flex;
      align-items: center;
      text-align: center;
      padding: 0 10px;
      width: 160px;
      font-size: 12px;
      &:last-child {
        padding-right: none;
        border-right: none;
        flex: 1;
      }
    }
  }

  .pagination {
    padding-top: 10px;
    height: 45px;
  }
}

.btns {
  margin: 0 20px;
}

.table-titles {
  font-weight: 600;
}
</style>

