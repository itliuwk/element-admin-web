<template>
    <div>
        <form-container label="名称" @submit="submitForm" @resetForm="resetForm"></form-container>
        <div class="table">
            <el-row>
                <router-link :to="`/userManagement/addCard`" class="resetWH">
                    <el-button type="primary">
                        新增会员卡
                    </el-button>
                </router-link>
            </el-row>
            <el-table
                    :data="lists"
                    style="width: 100%">
                <el-table-column
                        prop="name"
                        label="名称">
                </el-table-column>
                <el-table-column
                        prop="users"
                        label="用户数">
                </el-table-column>
                <el-table-column
                        prop="discountRate"
                        label="权益">
                    <template slot-scope="lists">
                        {{lists.row.discountRate}} 折
                    </template>
                </el-table-column>
                <el-table-column
                        prop="date"
                        label="有效期">
                </el-table-column>
                <!--                <el-table-column-->
                <!--                        prop="createdDate"-->
                <!--                        label="创建时间">-->
                <!--                    <template slot-scope="lists">-->
                <!--                        {{lists.row.createdDate | filterCreatedDate}}-->
                <!--                    </template>-->
                <!--                </el-table-column>-->
                <el-table-column
                        fixed="right"
                        label="操作"
                >
                    <template slot-scope="lists">
                            <span
                                    size="small"
                                    class="option-span"
                                    style="margin: 0 5px;"
                                    @click="viewItem(lists.row)">
                            查看
                        </span>
                        <span
                                size="small"
                                class="option-span"
                                style="margin: 0 5px;"
                                @click="viewMember(lists.row)">
                            查看成员
                        </span>
                        <span
                                v-if="lists.row.enabled"
                                size="small"
                                style="margin: 0 5px;"
                                class="option-span"
                                @click="enabledItem(lists.row)">
                           失效
                        </span>
                        <span
                                type="text"
                                size="small"
                                style="margin: 0 5px;"
                                class="option-span"
                                @click="removeItem(lists.row.id)"
                        >
                            删除
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
        GET_VIPCARDS as GET_LIST,
        DELETE_VIPCARDS as DELETE_ITEM,
        ENABLE_VIPCARDS,
        DISABLE_VIPCARDS,
        GET_VIPCARDS_COUNT as COUNT
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
                    size: pageSize,
                    query: '',
                    state: ''
                }
            }
        },
        mounted() {
            this.getList();
            this.getCount();
        },
        components: {
            FormContainer
        },

        computed: {
            page: function () {
                return parseInt(this.params.from / this.params.size) + 1;
            },
        },
        methods: {

            /**
             * 获取列表数据
             */
            getList() {
                GET_LIST(this.params).then(res => {
                    res.map((item) => {
                        if (item.permanent) {
                            item.date = '永久有效';
                        } else {

                            item.date = item.validDays + '天内有效';
                        }
                        return item
                    });
                    this.lists = res
                });
            },


            /**
             * 获取总数
             */
            getCount() {
                COUNT(this.params).then(res => {
                    this.count = res
                });
            },

            /**
             * 查询
             */
            submitForm(res) {
                this.params = {
                    ...this.params,
                    query: res.name,
                    state: res.state,
                    from: 0,
                    size: pageSize,
                };
                this.getList();
                this.getCount();
            },

            /**
             * 重置
             */
            resetForm() {
                this.params = {
                    from: 0,
                    size: pageSize,
                    query: ''
                };
                this.getList();
                this.getCount();
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
                this.getList()
            },

            enabledItem(row) {
                DISABLE_VIPCARDS(row.id).then(res => {
                    Alert.success("操作成功");
                    this.getList();
                });
            },

            /**
             * 删除商品
             */
            removeItem(id) {
                this.$confirm('确定删除此商品嘛？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    DELETE_ITEM(id).then((res) => {
                        let lists = [];
                        this.lists.map((item) => {
                            if (item.id != id) {
                                lists.push(item)
                            }
                            return item;
                        });
                        this.lists = lists;
                    });
                    Alert.success("删除成功");
                }).catch(() => {

                })
            },


            /**
             * 编辑商品
             */
            viewItem(row){
                this.$router.push('/userManagement/addCard?id=' + row.id);
            },

            /**
             * 查看成员
             */
            viewMember(row) {
                this.$router.push('/userManagement/userList?cardId=' + row.id);
            }
        },
        filters: {
            filterState(val) {
                switch (val) {
                    case 'PENDING':
                        return '未开始';
                    case 'ACTIVE':
                        return '进行中';
                    case 'DISABLED':
                        return '已失效';
                    case 'ENDED':
                        return '已结束';
                    case '':
                        return '全部';
                }
            },
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
