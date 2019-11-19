<template>
    <div class="consumption">
        <el-row>
            <el-col :span="24">
                <div class="grid-content bg-purple-dark">
                    <p>消费(元) <span>{{summary.expense}}</span></p>
                    <p>订单(笔) <span>{{summary.orders}}</span></p>
                </div>
            </el-col>
        </el-row>

        <el-table
                :data="lists"
                style="width: 100%">
            <el-table-column
                    prop="expense"
                    label="消费金额(元)">
            </el-table-column>
            <el-table-column
                    prop="orders"
                    label="订单(笔)">
            </el-table-column>
            <el-table-column
                    prop="day"
                    label="消费时间">
            </el-table-column>
        </el-table>
        <div class="pagination">
            <el-pagination
                    background
                    :page-size="params.size"
                    layout="total,prev, pager, next"
                    :total="count"
                    @current-change="currentChange"
            >
            </el-pagination>
        </div>

    </div>

</template>

<script>
    import {pageSize} from '@/config';
    import {SUMMARY_EXPENSE_CUSTOMERS, AUDITS_EXPENSE_CUSTOMERS,AUDITS_EXPENSE_COUNT_CUSTOMERS} from '@/api/userManagement'

    import {FormateYYMMDD} from "@/filters/index";
    export default {
        name: "consumption",
        data(){
            return{
                lists: [],
                count: 0,
                params: {
                    from: 0,
                    size: pageSize
                },
                summary:{},
            }
        },
        props: {
            selDate: Object,
            isF5: Number | String
        },
        watch: {
            selDate(val) {
                this.get_detail_expense();
            },
            isF5() {
                this.get_detail_expense();
            }
        },
        mounted(){
            this.get_detail_expense();
        },
        methods:{
            get_detail_expense(){
                let params = JSON.parse(JSON.stringify(this.params));

                params = {
                    ...params,
                    ...this.selDate
                };

                SUMMARY_EXPENSE_CUSTOMERS({...params}).then(res => {
                    this.summary = res;
                });

                AUDITS_EXPENSE_CUSTOMERS({...params}).then(res => {
                    res.map(item => {
                        item.day = FormateYYMMDD(item.day);
                        return item;
                    });
                    this.lists = res;
                });

                AUDITS_EXPENSE_COUNT_CUSTOMERS({...params}).then(res => {
                    this.count = res;
                });
            },
            /**
             * 翻页
             */
            currentChange(res) {
                this.params = {
                    ...this.params,
                    from: parseInt(res - 1) * this.params.size,
                    size: pageSize,
                };
                this.get_detail_expense();
            },
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.bg-purple-dark{
    text-align: right;
    p{
        display: inline-block;
        margin: 0 10px;
        span{
            font-weight: bold;
            font-size: 25px;
        }
    }
}
</style>
