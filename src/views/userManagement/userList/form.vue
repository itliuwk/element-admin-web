<template>
    <div class="form-container">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="姓名">
                <el-input v-model="formInline.name" placeholder="请输入姓名"></el-input>
            </el-form-item>
            <el-form-item label="手机">
                <el-input v-model="formInline.mobile" placeholder="请输入手机"></el-input>
            </el-form-item>
            <el-form-item label="会员等级">
                <el-select v-model="formInline.cardId">
                    <el-option label="全部" value=""></el-option>
                    <el-option v-for="item in cards" :key="item.id" :label="item.name" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="性别">
                <el-select v-model="formInline.sex">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="男" value="1"></el-option>
                    <el-option label="女" value="2"></el-option>
                    <el-option label="未知" value="0"></el-option>
                </el-select>
            </el-form-item>

            <div>
                <el-form-item label="筛选时间">
                    <el-date-picker

                            v-model="value1"
                            @change="changeValue1"
                            type="daterange"
                            placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="注册时间">
                    <el-date-picker
                            v-model="value2"
                            type="daterange"
                            @change="changeValue2"
                            placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item style="padding-left:30px">
                    <el-button type="default" @click="resetForm1('formInline')">重置</el-button>
                    <el-button type="primary" @click="onSubmit">查询</el-button>
                </el-form-item>
            </div>
        </el-form>
    </div>
</template>

<script>
    import {GET_VIPVARDS} from '@/api/common'
    import {parseint} from "../../../filters";

    export default {
        name: 'form-container',
        data() {
            return {
                value1: [],
                value2: [],
                cards: [],
                formInline: {
                    name: '',
                    mobile: '',
                    cardId: '',
                    sex: '',
                    start: '',
                    end: '',
                    joinDateStart: '',
                    joinDateEnd: '',
                }
            }
        },
        props: ['cardId'],
        created(){
            GET_VIPVARDS().then(res => {
                res.map(item=>{
                    item.id = item.id +'';
                    return item;
                });
                this.cards = res;
            });
        },
        mounted() {
            this.formInline = {
                ...this.formInline,
                cardId: this.cardId
            };
        },
        methods: {
            onSubmit() {
                this.$emit('submit', this.formInline)
            },
            resetForm1() {
                this.formInline = {
                    name: '',
                    mobile: '',
                    cardId: '',
                    sex: '',
                    start: '',
                    end: '',
                    joinDateStart: '',
                    joinDateEnd: '',
                };
                this.value1 = [];
                this.value2 = [];
                this.$emit('resetForm');

            },
            changeValue1(val){
                if (val){
                    this.formInline = {
                        ...this.formInline,
                        start: val[0],
                        end: val[1]
                    }
                } else {
                    this.formInline = {
                        ...this.formInline,
                        start: '',
                        end: '',
                    }
                }
            },
            changeValue2(val){
                if (val){
                    this.formInline = {
                        ...this.formInline,
                        joinDateStart: val[0],
                        joinDateEnd: val[1]
                    }
                } else {
                    this.formInline = {
                        ...this.formInline,
                        joinDateStart: '',
                        joinDateEnd: '',
                    }
                }

            }
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .form-container {
        padding: 20px;
        background: #fff;
    }
</style>
