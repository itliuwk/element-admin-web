<template>
    <div>
        <form-container :cardId="$route.query.cardId" label="名称" @submit="submitForm"
                        @resetForm="resetForm"></form-container>
        <div class="table">
            <el-table
                    @sort-change='tableSortChange'
                    :data="lists"
                    style="width: 100%">
                <el-table-column
                        prop="name"
                        label="头像">
                    <template slot-scope="lists">
                        <img :src="lists.row.headImageUrl" width="50" height="50" alt="">
                    </template>
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="名称">
                </el-table-column>
                <el-table-column
                        prop="sex"
                        label="性别">
                </el-table-column>
                <el-table-column
                        prop="cardName"
                        label="会员等级">
                </el-table-column>
                <el-table-column
                        prop="mobile"
                        label="手机号">
                </el-table-column>
                <el-table-column
                        prop="credits"
                        sortable='custom'
                        label="积分">
                </el-table-column>
                <el-table-column
                        prop="balance"
                        sortable='custom'
                        label="余额">
                </el-table-column>
                <el-table-column
                        prop="totalRecharge"
                        sortable='custom'
                        label="累计充值">
                </el-table-column>
                <el-table-column
                        prop="totalOrderAmount"
                        sortable='custom'
                        label="累计消费">
                </el-table-column>
                <el-table-column
                        sortable='custom'
                        prop="createdDate"
                        label="注册时间">
                    <template slot-scope="lists">
                        {{lists.row.createdDate | filterCreatedDate}}
                    </template>
                </el-table-column>
                <el-table-column
                        fixed="right"
                        label="操作"
                >
                    <template slot-scope="lists">
                        <span
                                size="small"
                                class="option-span"
                                style="margin: 0 5px;"
                                @click="editItem(lists.row)">
                            详情
                        </span>


                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination
                        background
                        :current-page="page"
                        :page-size="params.size"
                        layout="total,prev, pager, next"
                        :total="count"
                        @current-change="currentChange"
                >
                </el-pagination>
            </div>
        </div>


    </div>
</template>

<script>

    import {
        GET_CUSTOMERS as GET_LIST,
        GET_CUSTOMERS_COUNT as COUNT
    } from '@/api/userManagement'

    import Alert from "@/utils/alert";
    import {pageSize} from '../../../config';

    const FormContainer = () => import('./form.vue');

    import {dateTimeFormate} from "@/filters/index";

    export default {
        name: "index",
        data() {
            return {
                isLoading: false,
                hackReset: true,
                addMerchandise: false,
                lists: [],
                count: 0,
                id: '',
                params: {
                    from: 0,
                    size: pageSize
                }
            }
        },
        mounted() {
            this.params = {
                ...this.params,
                cardId: this.params.cardId || this.cardId
            };
            this.getList(this.params);
            this.getCount(this.params);
        },
        components: {
            FormContainer
        },
        computed: {
            page: function () {
                return parseInt(this.params.from / this.params.size) + 1;
            },
            cardId: {
                get: function () {
                    return this.$route.query.cardId
                },
                set: function () {
                    return ''
                }
            }
        },
        methods: {

            /**
             * 获取列表数据
             */
            getList(params) {

                GET_LIST(params).then(res => {
                    res.map((item) => {
                        if (item.permanent) {
                            item.date = '永久有效';
                        } else {

                            item.date = dateTimeFormate(item.startDate) + ' 至 ' + dateTimeFormate(item.endDate);
                        }
                        return item
                    });
                    this.lists = res
                });
            },

            /**
             * 获取总数
             */
            getCount(params) {
                COUNT(params).then(res => {
                    this.count = res
                });
            },

            tableSortChange(column) {
                let desc = true;
                let field = '';
                if (column.order == 'ascending') {
                    desc = false
                }
                if (column.prop == 'totalOrderAmount') {  // 消费
                    field = 'expense'
                } else if (column.prop == 'balance') {  // 余额
                    field = 'balance'
                } else if (column.prop == 'totalRecharge') {  // 充值
                    field = 'recharge'
                } else if (column.prop == 'createdDate') {  // 注册
                    field = 'join'
                } else if (column.prop == 'credits') {  // 注册
                    field = 'credits'
                }
                this.lists = [];
                this.params = {
                    ...this.params,
                    from: 0,
                    size: pageSize,
                    desc,
                    field
                };

                this.getList(this.params);
                this.getCount(this.params);
            },


            /**
             * 查询
             */
            submitForm(res) {
                this.params = {
                    ...this.params,
                    from: 0,
                    size: pageSize,
                    ...res
                };
                this.getList(this.params);
                this.getCount(this.params);
            },

            /**
             * 重置
             */
            resetForm() {
                this.params = {
                    from: 0,
                    size: pageSize,
                    name:''
                };
                this.getList(this.params);
                this.getCount(this.params);
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
                this.getList(this.params)
            },


            /**
             * 编辑商品
             */
            editItem(row) {
                this.$router.push('/userManagement/userList/details?id=' + row.id);
            }
        },
        filters: {
            filterCreatedDate(val) {
                return dateTimeFormate(val)
            }
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .table {
        margin-top: 20px;
        padding: 30px;
        background: #fff;

        .option-span {
            color: #409EFF;
            cursor: pointer;
        }
    }

    .pagination {
        margin-top: 20px;
    }
</style>
