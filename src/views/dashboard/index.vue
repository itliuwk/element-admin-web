<template>
    <div class="pageContainer">
        <Row1 :screenAll="screenAll"/>
        <Row2 :screenAll="screenAll"/>
        <Row3 :screenAll="screenAll"></Row3>
    </div>
</template>

<script>

    const Row2Tab = () => import("./row2Tab/row2Tab");
    const Row3 = () => import("./row3/index");
    const Row2 = () => import("./row2/index");
    const Row1 = () => import("./row1");
    export default {
        name: "index",
        data() {
            return {
                includeSubs: false,
                props: {
                    value: 'id',
                    label: 'name',
                    children: 'subs'
                },
                screenAll: 0
            };
        },
        async mounted() {


        },
        methods: {

            includeSubsChange(val) {

            },
            async determine() {

                setTimeout(() => {
                    this.$store.commit('SET_SCREENAll', this.screenAll + 1);
                    this.screenAll = this.screenAll + 1;
                }, 100)
            }
        },
        components: {
            Row1,
            Row2,
            // Row2Tab,
            Row3
        }
    };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .pageContainer {
        padding: 20px;
    }

    .row {
        background: #fff;
        margin-bottom: 20px;
        padding: 20px;
        border-radius: 5px;

        span {
            margin-right: 15px;
        }
    }
</style>
