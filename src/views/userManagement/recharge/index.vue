<template>
    <div>
        <form-container label="名称" @submit="submitForm" @resetForm="resetForm"></form-container>
        <div class="table">
            <el-row>
                <router-link :to="`/userManagement/addRecharge`" class="resetWH">
                    <el-button type="primary">
                        新建充值活动
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
                        prop="price"
                        label="价格">
                </el-table-column>
                <el-table-column
                        prop="value"
                        label="面值">
                </el-table-column>
                <el-table-column
                        prop="totalOrders"
                        label="充值次数">
                </el-table-column>
                <el-table-column
                        prop="totalPaid"
                        label="金额">
                </el-table-column>
                <el-table-column
                        prop="state"
                        label="状态">
                    <template slot-scope="lists">
                        {{lists.row.enabled | filterEnabled}}
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
                            编辑
                        </span>
                        <span

                                size="small"
                                style="margin: 0 5px;"
                                class="option-span"
                                @click="enabledItem(lists.row)">
                                 {{lists.row.enabled | filterEnable}}
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
        </div>


    </div>
</template>

<script>


    import {
        GET_RECHARGEPLANS as GET_LIST,
        DELETE_RECHARGEPLANS as DELETE_ITEM,
        ENABLE_RECHARGEPLANS,
        DISABLE_RECHARGEPLANS,
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
        },
        components: {
            FormContainer
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

                            item.date = dateTimeFormate(item.startDate) + ' 至 ' + dateTimeFormate(item.endDate);
                        }
                        return item
                    });
                    this.lists = res
                });
            },


            /**
             * 查询
             */
            submitForm(res) {
                this.params = {
                    ...this.params,
                    query: res.name,
                    state: res.state
                };
                this.getList();
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
                if (row.enabled) {
                    DISABLE_RECHARGEPLANS(row.id).then(res => {
                        Alert.success("操作成功");
                        this.getList();
                    });
                } else {
                    ENABLE_RECHARGEPLANS(row.id).then(res => {
                        Alert.success("操作成功");
                        this.getList();
                    });
                }
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
            editItem(row) {
                this.$router.push('/userManagement/addRecharge?id=' + row.id);
            }
        },
        filters: {
            filterEnable(val) {
                switch (val) {
                    case true:
                        return '暂停';
                    case false:
                        return '启用';
                }
            },
            filterEnabled(val) {
                switch (val) {
                    case true:
                        return '启用中';
                    case false:
                        return '暂停中';
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
