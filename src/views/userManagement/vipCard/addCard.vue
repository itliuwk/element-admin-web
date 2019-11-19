<template>
    <div class="form">
        <el-form :model="ruleForm" ref="ruleForm" label-width="120px" class="demo-ruleForm">

            <el-form-item class="resetIpt" label="名称" prop="name"
                          :rules="[{required: true, message: '不能为空', trigger: 'blur'}]">
                <el-input :disabled="disabled" v-model="ruleForm.name"></el-input>
            </el-form-item>

            <el-form-item label="有效期" prop="permanent">
                <el-switch
                        :disabled="disabled"
                        v-model="ruleForm.permanent"
                        active-text="永久有效">
                </el-switch>
            </el-form-item>


            <el-form-item label="" v-if="!ruleForm.permanent" prop="validDays"
                          :rules="[{required: true, message: '不能为空', trigger: 'blur'}]">
                <div>
                    领取后
                    <el-input style="width: 80px;margin: 0 15px" :disabled="disabled" :min="0"
                              v-model="ruleForm.validDays" type="number"></el-input>
                    内有效
                </div>
                <div>
                    卡过期后，消费者自动变更至
                    <el-select v-model="ruleForm.fallbackCardId" :disabled="disabled">
                        <el-option label="请选择" value=""></el-option>
                        <el-option v-for="item in cards" :key="item.id" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                </div>
            </el-form-item>


            <el-form-item class="resetIpt" label="领取设置" prop="acquireType"
                          :rules="[{required: true, message: '不能为空', trigger: 'blur'}]">
                <el-radio :disabled="disabled" v-model="ruleForm.acquireType" label="DIRECT">直接领取</el-radio>
                <el-radio :disabled="disabled" v-model="ruleForm.acquireType" label="RULE">满足条件</el-radio>
            </el-form-item>


            <el-form-item v-if="ruleForm.acquireType=='RULE'">
                累计充值
                <el-input style="width: 80px;margin: 0 15px" :disabled="disabled"
                          v-model="ruleForm.totalRecharge"></el-input>
                元
            </el-form-item>

            <el-form-item label="使用需知">
                <el-input type="textarea" :disabled="disabled" v-model="ruleForm.note"></el-input>
            </el-form-item>


            <el-form-item label="权益" prop="discountRate" :rules="[{required: true, message: '不能为空', trigger: 'blur'}]">
                消费折扣
                <el-input style="width: 80px;margin: 0 15px" @input="discountRateIpt"
                          :disabled="disabled" v-model="ruleForm.discountRate"></el-input>
                折
            </el-form-item>


            <el-form-item style="text-align: center;" v-if="!disabled">
                <el-button type="primary" @click="submitForm('ruleForm')" :loading="isLoading">提交</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>


        </el-form>


    </div>
</template>
<script>
    import Alert from "@/utils/alert";

    import {GET_VIPVARDS} from '@/api/common'

    import {mapActions} from "vuex";
    import {
        POST_VIPCARDS as ADD_ITEM,
        PUT_VIPCARDS as UPDATE_ITEM,
        DETAIL_VIPCARDS
    } from '@/api/userManagement'

    import {FormateYYMMDD} from "@/filters/index";

    export default {
        data() {
            return {
                cards: [],

                noRestriction: false, // 不限制
                disabled: false,
                isLoading: false,
                ruleForm: {
                    id: '',
                    name: '',
                    permanent: false,
                    acquireType: 'DIRECT',
                    fallbackCardId: '',
                    totalRecharge: '',
                    note: '',
                    discountRate: ''
                }
            };
        },
        props: ['currId'],
        computed: {
            id() {
                return this.$route.query.id
            },
            state() {
                return this.$route.query.state
            }
        },
        mounted() {

            /**
             * 会员卡数据
             */
            GET_VIPVARDS().then(res => {
                this.cards = res
            });


            if (this.id) {
                this.getDetailItem();
                this.ruleForm = {
                    ...this.ruleForm,
                    id: this.id
                }
            }

        },
        watch: {},
        methods: {
            ...mapActions([
                "delVisitedView"
            ]),
            /**
             * 获取商品详情
             */
            getDetailItem() {

                DETAIL_VIPCARDS(this.id).then(res => {
                    Alert.fail('只能查看不能编辑');
                    this.disabled = true;
                    this.ruleForm = res;
                })
            },


            /**
             * 权益
             */
            discountRateIpt(val) {
                if (val >= 10) {
                    val = 0;

                    Alert.fail('打折额度不能超过10');
                }
                this.ruleForm = {
                    ...this.ruleForm,
                    discountRate: val
                };
            },


            /**
             * 不限制
             */
            noRestrictionFun(val) {
                this.noRestriction = val;
            },

            /**
             * 重置
             */
            resetForm() {
                this.$refs['ruleForm'].resetFields();
            },

            /**
             * 提交
             */
            submitForm() {
                let that = this;
                let noviceCourtesyDetails = this.$refs['ruleForm'];
                noviceCourtesyDetails.validate((val) => {
                    if (val) {
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
                            // UPDATE_ITEM({...that.ruleForm}).then(res => {
                            //     setTimeout(() => {
                            //         Alert.success('更新成功');
                            //         that.isLoading = false;
                            //         that.delVisitedView(that.$route).then(res => {
                            //             that.$router.go(-1);
                            //         });
                            //     }, 1500);
                            //
                            // }).catch(err => {
                            //     Alert.fail(err);
                            //     that.isLoading = false;
                            // })
                        }

                    }
                });
            }
        }
    }
</script>

<style lang="scss" scoped>
    .resetIpt {
        width: 350px;
    }

    .form {
        height: 100%;
        background: #fff;
        padding: 30px 30px 30px 0;
    }

    .file {
        position: relative;
        top: 0;
        display: inline-block;
        border: 1px solid #e6e6e6;
        border-radius: 4px;
        overflow: hidden;
        color: #1E88C7;
        text-decoration: none;
        text-indent: 0;
        width: 110px;
        height: 140px;
        text-align: center;
        line-height: 85px;
        font-size: 40px;

        input {
            position: absolute;
            font-size: 100px;
            right: 0;
            top: 0;
            opacity: 0;
            cursor: pointer;
        }
    }

    .image {
        width: 110px;
        height: 140px;
        position: relative;

        img {
            width: 100%;
            height: 100%;
        }

        i {
            position: absolute;
            top: -6px;
            right: -6px;
            display: inline-block;
            width: 15px;
            height: 15px;
            line-height: 15px;
            text-align: center;
            background: red;
            border-radius: 50%;
            color: #fff;
            cursor: pointer;
        }
    }

    .el-textarea {
        width: 400px;
        height: 80px;
        resize: none;

        &.el-textarea__inner {
            resize: none;
        }
    }

    .el-form-item__content {
        position: relative;

        .info {
            position: absolute;
            font-size: 12px;
            top: 48px;
            color: #ccc;
            line-height: normal;
        }
    }

</style>
