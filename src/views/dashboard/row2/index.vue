<template>
  <div class="row2">
    <CardRow/>
    <ChartRow/>
  </div>
</template><script>
import Header from "./header";
import CardRow from "./cardrows";
import ChartRow from "./chartRow";
export default {
  components: {
    Header,
    CardRow,
    ChartRow
  },
  props: ['screenAll'],
  watch: {
    screenAll(val) {

    }
  },
  data() {
    return {

    };
  }
};
</script>
<style lang="scss" scoped>
.row2 {
  margin-top: 20px;
  padding-top: 20px;
  background: #fff;
}
</style>


