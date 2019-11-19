<template>
    <div class="integralSettings">
        <el-form ref="ruleForm" :model="form" :rules="rules2" label-width="120px">
            <el-form-item class="el-reset" label="启用积分">
                <el-switch v-model="form.enabled"></el-switch>
            </el-form-item>
            <el-form-item v-if="form.enabled" label="获取规则"></el-form-item>
            <el-form-item v-if="form.enabled" class="el-reset" prop="acquireRules.bindMobileCredits" label="绑定手机获取">
                <el-input class="el-input-reset" type="number" :min="0" v-model="form.acquireRules.bindMobileCredits"
                          placeholder="请输入积分"></el-input>
                <span>积分</span>
            </el-form-item>
            <el-form-item v-if="form.enabled" class="el-reset" label="每消费" prop="XF">
                <el-input placeholder="请输入元数" type="number" :min="0" v-model="form.acquireRules.expense"
                          class="el-input-reset"></el-input>
                <span>元</span>
                <span>奖励</span>
                <el-input placeholder="请输入积分" type="number" :min="0" v-model="form.acquireRules.expenseCredits"
                          class="el-input-reset"></el-input>
                <span>积分</span>
            </el-form-item>
            <el-form-item v-if="form.enabled" label="兑换规则"></el-form-item>
            <el-form-item v-if="form.enabled" class="el-reset" prop="redeemRules.creditsPerYuan" label="每">
                <el-input placeholder="请输入积分" type="number" :min="0" v-model="form.redeemRules.creditsPerYuan"
                          class="el-input-reset"></el-input>
                <span>积分抵扣一元</span>
            </el-form-item>
            <el-form-item v-if="form.enabled" class="el-reset" prop="maxRate"  label="最高可抵扣比例">
                <el-input placeholder="请输入百分比" type="number" :min="0" v-model="form.redeemRules.maxRate"
                          class="el-input-reset"></el-input>
                <span>%</span>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit('ruleForm')">确定</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import Alert from "@/utils/alert";
    import {
        GET_CREIDTSETTINGS,
        POST_CREIDTSETTINGS
    } from '@/api/userManagement'

    export default {
        data() {
            let validateXF = (rule, value, callback) => {
                let expenseCredits = this.form.acquireRules.expenseCredits;
                let expense = this.form.acquireRules.expense;
                if (expense) {
                    if (!expenseCredits) {
                        return callback(new Error('奖励积分不能为空'));
                    }else {
                        callback();
                    }
                } else {
                    callback();
                }
            };

            let validateMaxRate = (rule, value, callback) => {
                let maxRate = parseInt(this.form.redeemRules.maxRate);
                if (maxRate > 100) {
                    return callback(new Error('请输入0到100之间的数字'))
                } else if (maxRate < 0) {
                    return callback(new Error('请输入0到100之间的数字'))
                } else {
                    callback();
                }
            };
            return {
                form: {
                    enabled: false,
                    acquireRules: {
                        bindMobileCredits: '',
                        expense: '',
                        expenseCredits: ''
                    },
                    redeemRules: {
                        creditsPerYuan: '',
                        maxRate: ''
                    }
                },
                rules2: {
                    XF: [
                        {validator: validateXF, trigger: 'blur'}
                    ],
                    maxRate: [
                        {validator: validateMaxRate, trigger: 'blur'}
                    ]
                }
            }
        },
        mounted() {
            this.getDetail();
        },
        methods: {
            onSubmit() {
                this.$refs['ruleForm'].validate((valid) => {
                    if (valid) {
                        POST_CREIDTSETTINGS(this.form).then(res => {
                            Alert.success('操作成功');
                            setTimeout(() => {
                                this.getDetail();
                            }, 1000);
                        });
                    }
                });
            },
            getDetail() {
                GET_CREIDTSETTINGS().then(res => {
                    if (res.acquireRules == null || res.acquireRules.length === 0) {
                        res.acquireRules = {
                            bindMobileCredits: '',
                            expense: '',
                            expenseCredits: '',
                        };
                    }

                    if (res.redeemRules == null || res.redeemRules.length === 0) {

                        res.redeemRules = {
                            maxRate: '',
                            redeemRules: ''
                        };
                    }
                    this.form = res;
                })
            }
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss">
    .integralSettings {
        padding: 20px;
        background: #fff;

        .el-input-reset {
            width: 200px;
        }

        span {
            margin: 0 20px;
        }

        .el-reset {
            .el-form-item__label {
                color: #666;
                font-weight: normal;
            }
        }
    }
</style>
