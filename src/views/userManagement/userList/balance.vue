<template>
    <div class="tabs">
        <el-row>
            <el-col :span="24">
                <div class="grid-content bg-purple-dark bg-purple-dark2">
                    <p>充值 <span>{{summary.totalRecharge}}元</span></p>
                    <p>支付 <span>{{summary.totalBalancePaid}}元</span></p>
                </div>
            </el-col>
        </el-row>
        <el-tabs v-model="params.type" @tab-click="handleClick">
            <el-tab-pane label="全部记录" name="all"></el-tab-pane>
            <el-tab-pane label="充值记录" name="RECHARGE"></el-tab-pane>
            <el-tab-pane label="支付记录" name="EXPENSE"></el-tab-pane>
            <el-tab-pane label="调整记录" name="ADJUST"></el-tab-pane>
        </el-tabs>

        <el-table
                :data="audits"
                style="width: 100%">
            <el-table-column
                    prop="id"
                    label="交易流水号">
            </el-table-column>
            <el-table-column
                    prop="createdDate"
                    label="交易时间">
            </el-table-column>
            <el-table-column
                    prop="info"
                    label="交易类型">
            </el-table-column>
            <el-table-column
                    prop="amount"
                    label="交易额度">
            </el-table-column>
            <el-table-column
                    prop="balance"
                    label="交易后余额">
            </el-table-column>
            <el-table-column
                    prop="referenceId"
                    label="关联订单号">
            </el-table-column>
            <el-table-column
                    prop="note"
                    label="备注">
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
    import {
        AUDITS_BALANCE_CUSTOMERS,
        SUMMARY_BALANCE_CUSTOMERS,
        AUDITS_BALANCE_COUNT_CUSTOMERS
    } from '@/api/userManagement'
    import {pageSize} from '../../../config';
    import {FormateYYMMDD, dateTimeFormate} from "@/filters/index";

    export default {
        name: "balance",
        data() {
            return {
                count: 0,
                params: {
                    from: 0,
                    size: pageSize,
                    type: 'all'
                },
                summary: {},
                audits: [],
            }
        },
        props: {
            selDate: Object,
            isF5: Number | String
        },
        watch: {
            selDate(val) {
                this.get_detail_balance();
            },
            isF5() {
                this.get_detail_balance();
            }
        },
        mounted() {
            this.get_detail_balance();
        },
        methods: {
            get_detail_balance() {
                let params = JSON.parse(JSON.stringify(this.params));
                if (params.type == 'all') {
                    params.type = ''
                }
                params = {
                    ...params,
                    ...this.selDate
                };
                SUMMARY_BALANCE_CUSTOMERS({...params}).then(res => {

                    this.summary = res;

                });

                AUDITS_BALANCE_CUSTOMERS({...params}).then(res => {
                    res.map(item => {
                        if (item.type == 'RECHARGE') {
                            item.info = '常规充值'
                        } else if (item.type == 'EXPENSE') {
                            item.info = '支付余额'
                        } else if (item.type == "ADJUST") {
                            item.info = '调整记录'
                        }

                        if (item.amount > 0) {
                            item.amount = '+' + item.amount
                        } else {
                            item.amount = item.amount
                        }
                        item.createdDate = dateTimeFormate(item.createdDate);

                        return item;
                    });
                    this.audits = res
                });

                AUDITS_BALANCE_COUNT_CUSTOMERS({...params}).then(res => {

                    this.count = res;

                });
            },
            handleClick() {
                let type = this.type == 'all' ? '' : this.type;
                this.params = {
                    ...this.params
                };
                this.get_detail_balance();
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
                this.get_detail_balance();
            },
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    p {
        padding: 0;
        margin: 0;
    }

    .bg-purple-light1 {
        text-align: right;
        padding-right: 100px;
        font-weight: bold;
        margin-top: 20px;
    }

    .bg-purple {
        p {
            margin: 8px 0;
        }
    }

    .el-row-border {
        border-bottom: 1px solid #e9e9e9;
    }

    .bg-purple-dark2 {
        position: relative;
        top: 30px;
        text-align: right;

        p {
            display: inline-block;
            margin: 0 10px;

            span {
                font-weight: bold;
                font-size: 25px;
            }
        }
    }
</style>
