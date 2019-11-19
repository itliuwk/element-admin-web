<template>
    <el-form :model="ruleForm" ref="ruleForm" label-width="200px" class="addRecharge">
        <el-form-item class="resetIpt" label="名称" prop="name"
                      :rules="[{required: true, message: '不能为空', trigger: 'blur'}]">
            <el-input v-model="ruleForm.name" placeholder="请输入名称"></el-input>
        </el-form-item>
        <el-form-item class="resetIpt" label="价格" prop="price"
                      :rules="[{required: true, message: '不能为空', trigger: 'blur'}]">
            <el-input v-model="ruleForm.price" placeholder="请输入价格"></el-input>
        </el-form-item>
        <el-form-item class="resetIpt" label="面值" prop="value"
                      :rules="[{required: true, message: '不能为空', trigger: 'blur'}]">
            <el-input v-model="ruleForm.value" placeholder="请输入面值"></el-input>
        </el-form-item>
        <el-form-item label="充值礼包(可多选)">
            <div>
                <el-checkbox v-model="coupon">充值送优惠券</el-checkbox>
                <div class="couponList">
                    <div style="margin-bottom: 20px;" v-for="item in couponList" :key="item.index">
                        <el-select :disabled="!coupon" v-model="item.value" placeholder="请选择">
                            <el-option v-for="item in coupons" :key="item.id" :label="item.name"
                                       :value="item.id"></el-option>
                        </el-select>
                        <el-button :disabled="!coupon" v-if="item.tap=='addEquipment.vue'" style="margin-left: 15px;"
                                   @click="addCoupon" type="primary"
                                   size="small">添加
                        </el-button>
                        <el-button :disabled="!coupon" v-else style="margin-left: 15px;" type="danger"
                                   @click="removeCoupon(item.index)"
                                   size="small">删除
                        </el-button>
                    </div>
                </div>
            </div>
            <div>
                <el-checkbox v-model="card">充值送会员卡</el-checkbox>
                <div>
                    <el-select :disabled="!card" v-model="ruleForm.cardId" placeholder="请选择">
                        <el-option v-for="item in cards" :key="item.id" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                </div>
            </div>
        </el-form-item>
        <el-form-item style="text-align: center;">
            <el-button type="primary" @click="submitForm('ruleForm')" :loading="isLoading">提交</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
    </el-form>

</template>

<script>

    import Alert from "@/utils/alert";
    import {GET_VIPVARDS, GET_COUPONS} from '@/api/common'

    import {mapActions} from "vuex"


    import {
        POST_RECHARGEPLANS as ADD_ITEM,
        PUT_RECHARGEPLANS as UPDATE_ITEM,
        DETAIL_RECHARGEPLANS
    } from '@/api/userManagement'

    export default {
        name: "addRecharge",
        data() {
            return {
                ruleForm: {
                    name: '',
                    price: '',
                    value: '',
                    couponIds: [],
                    cardId: ''
                },
                cards: [],
                coupons: [],
                coupon: false,
                card: false,
                isLoading: false,
                couponList: [
                    {
                        value: '',
                        index: 0,
                        tap: 'addEquipment.vue',
                    }
                ],
                value: ''
            }
        },
        watch: {
            coupon(val) {
                if (!val) {
                    this.couponList = [
                        {
                            value: '',
                            index: 0,
                            tap: 'addEquipment.vue',
                        }
                    ]
                }
            },
            card(val) {
                if (!val) {
                    this.ruleForm = {
                        ...this.ruleForm,
                        cardId: ''
                    }
                }
            }
        },

        computed: {
            id() {
                return this.$route.query.id
            }
        },

        mounted() {
            /**
             * 会员卡数据
             */
            GET_VIPVARDS().then(res => {
                res.unshift({
                    id: '',
                    name: '请选择'
                });
                this.cards = res
            });

            GET_COUPONS().then(res => {
                res.unshift({
                    id: '',
                    name: '请选择'
                });
                this.coupons = res
            });


            if (this.id) {
                this.getDetailItem();
                this.ruleForm = {
                    ...this.ruleForm,
                    id: this.id
                }
            }
        },
        methods: {

            ...mapActions([
                "delVisitedView"
            ]),


            /**
             * 获取充值详情
             */
            getDetailItem() {

                DETAIL_RECHARGEPLANS(this.id).then(res => {
                    let couponList = [];
                    if (res.cardId) {
                        this.card = true;
                    }
                    if (res.couponIds.length) {
                        this.coupon = true;
                        res.coupons.map((item, index) => {
                            if (index === 0) {
                                couponList.push({
                                    value: item.id,
                                    index: 0,
                                    tap: 'addEquipment.vue',
                                })
                            } else {
                                couponList.push({
                                    value: item.id,
                                    index: index,
                                    tap: 'remove',
                                })
                            }
                            return item;
                        });
                    } else {
                        couponList.push({
                            value: '',
                            index: 0,
                            tap: 'addEquipment.vue',
                        })
                    }
                    this.couponList = couponList;
                    this.ruleForm = res;
                })
            },

            submitForm(formName) {
                let that = this;
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let couponIds = this.couponList.map(item => item.value);
                        let cardId = '';
                        this.ruleForm = {
                            ...this.ruleForm,
                            couponIds
                        };
                        that.isLoading = true;
                        if (!that.ruleForm.id) {

                            ADD_ITEM({...that.ruleForm}).then(res => {
                                setTimeout(() => {
                                    Alert.success('新建成功');
                                    that.isLoading = false;
                                    that.delVisitedView(that.$route).then(res => {
                                        that.$router.go(-1);
                                    });
                                }, 1500);

                            }).catch(err => {
                                Alert.fail(err);
                                that.isLoading = false;
                            })
                        } else {
                            UPDATE_ITEM({...that.ruleForm}).then(res => {
                                setTimeout(() => {
                                    Alert.success('更新成功');
                                    that.isLoading = false;
                                    that.delVisitedView(that.$route).then(res => {
                                        that.$router.go(-1);
                                    });
                                }, 1500);

                            }).catch(err => {
                                Alert.fail(err);
                                that.isLoading = false;
                            })
                        }


                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            addCoupon() {
                let obj = {
                    value: '',
                    tap: 'remove',
                };
                let couponList = [];
                couponList.push(obj);
                couponList = [...this.couponList, ...couponList];
                for (let i = 0; i < couponList.length; i++) {  //
                    couponList[i].index = i
                }
                this.couponList = couponList;
            },
            removeCoupon(index) {
                let couponList = this.couponList;
                for (let i = 0; i < couponList.length; i++) {
                    if (couponList[i].index == index) {
                        couponList.splice(i, 1)
                    }
                }
                this.couponList = couponList;

            }
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .addRecharge {
        background: #fff;
        padding: 20px 0;

        .resetIpt {
            width: 550px;
        }

        .couponList {

        }
    }
</style>
