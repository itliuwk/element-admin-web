<template>
    <div class="details">
        <div class="details_top">
            <h3>会员信息</h3>
            <el-row style="height: 104px">
                <el-col :span="12" style="height: 100%">
                    <div class="grid-content bg-purple">
                        <el-row>
                            <el-col :span="4">
                                <div class="grid-content bg-purple">
                                    <img :src="details.headImageUrl" alt="" width="90" height="90">

                                </div>
                            </el-col>
                            <el-col :span="10">
                                <div class="grid-content bg-purple-light">
                                    <p class="resetP">
                                        <span>姓名: </span>
                                        <span>{{details.name}}</span>
                                    </p>
                                    <p class="resetP">
                                        <span>性别: </span>
                                        <span>{{details.sex}}</span>
                                    </p>
                                    <p class="resetP">
                                        <span>会员等级: </span>
                                        <span @click="levelHandle">{{details.cardName}}<span class="icon"><svg-icon
                                                icon-class="bianji1"/></span></span>
                                    </p>
                                    <p class="resetP">
                                        <span>手机号码: </span>
                                        <span>{{details.mobeil}}</span>
                                    </p>
                                </div>
                            </el-col>
                            <el-col :span="10">
                                <div class="grid-content bg-purple">
                                    <p class="resetP">
                                        <span>注册时间: </span>
                                        <span>{{details.createdDate}}</span>
                                    </p>
                                    <p class="resetP">
                                        <span>会员Id: </span>
                                        <span>{{details.id}}</span>
                                    </p>
                                    <p class="resetP">
                                        <span>会员有效期: </span>
                                        <span>{{details.cardExpiry}} <span @click="levelHandle" class="icon"><svg-icon
                                                icon-class="bianji1"/></span></span>

                                    </p>
                                </div>
                            </el-col>
                        </el-row>
                    </div>
                </el-col>
                <el-col :span="12" style="height: 100%;line-height: 30px;">
                    <div class="grid-content bg-purple-light">
                        <el-row>
                            <el-col class="el-row8" :span="6">
                                <div class="grid-content bg-purple moneyInfo">
                                    <p>{{details.balance}} <span @click="balanceHandle" class="icon balance"><svg-icon
                                            icon-class="bianji1"/></span></p>
                                    <p>余额(元)</p>
                                </div>
                            </el-col>
                            <el-col class="el-row8" :span="6">
                                <div class="grid-content bg-purple moneyInfo">
                                    <p>{{details.credits}} <span @click="integralHandle" class="icon balance credits"><svg-icon
                                            icon-class="bianji1"/></span></p>
                                    <p>积分</p>
                                </div>
                            </el-col>
                            <el-col class="el-row8" :span="6">
                                <div class="grid-content bg-purple-light moneyInfo">
                                    <p>{{details.totalRecharge}}</p>
                                    <p>累计充值(元)</p>
                                </div>
                            </el-col>
                            <el-col class="el-row8" :span="6">
                                <div class="grid-content bg-purple moneyInfo">
                                    <p>{{details.totalExpense}}</p>
                                    <p>累计消费(元)</p>
                                </div>
                            </el-col>
                        </el-row>
                    </div>
                </el-col>
            </el-row>
        </div>
        <div class="details_bottom">
            <div>
                <el-select v-model="value" placeholder="请选择">
                    <el-option label="余额记录" value="1"></el-option>
                    <el-option label="消费记录" value="2"></el-option>
                    <el-option label="积分记录" value="3"></el-option>
                </el-select>
                <div class="row">
                    <div class="row1">
                        <div class="item1">
                            <div :class="`item ${type=='today'?'active':'none'}`" @click="selectTime('today')">今日</div>
                            <div :class="`item ${type=='week'?'active':'none'}`" @click="selectTime('week')">本周</div>
                            <div :class="`item ${type=='mouth'?'active':'none'}`" @click="selectTime('mouth')">本月</div>
                        </div>
                        <div class="item2">
                            <el-date-picker
                                    style="width:230px;"
                                    size="mini"
                                    v-model="dates"
                                    type="daterange"
                                    range-separator="至"
                                    start-placeholder="开始"
                                    end-placeholder="结束"
                                    @change="datechange"
                            ></el-date-picker>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <Balance v-if="value=='1'" :isF5="isF5" :selDate="selDate"></Balance>
                <Consumption v-else-if="value=='2'" :isF5="isF5" :selDate="selDate"></Consumption>
                <Credits v-else :selDate="selDate" :isF5="isF5"></Credits>
            </div>
        </div>


        <el-dialog
                title="修改会员等级 / 有效期"
                :visible.sync="dialogInfo"
                v-if="dialogInfo"
                width="375px">
            <div class="dialogInfo">
                <div>
                    <span>会员级别：</span>
                    <el-select v-model="member.cardId">
                        <el-option v-for="item in cards" :key="item.id" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                </div>
                <div>
                    <span>有效期：</span>
                    <el-switch
                            v-model="member.permanent"
                            active-text="永久有效">
                    </el-switch>

                </div>
                <div v-if="!member.permanent">
                    <span>过期时间：</span>
                    <el-date-picker
                            v-model="member.expiry"
                            type="date"
                            placeholder="选择日期">
                    </el-date-picker>

                </div>
                <div>
                    <span style="vertical-align: top;">调整备注：</span>
                    <el-input
                            type="textarea"
                            class="note"
                            :autosize="{ minRows: 2, maxRows: 4}"
                            placeholder="请输入内容"
                            v-model="member.note">
                    </el-input>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
            <el-button @click="dialogInfo = false">取 消</el-button>
            <el-button type="primary" @click="editVip">确 定</el-button>
        </span>
        </el-dialog>


        <el-dialog
                title="修改余额"
                :visible.sync="dialogBalance"
                v-if="dialogBalance"
                width="390px">
            <div class="dialogBalance">
                <div>
                    <span>当前余额：</span>
                    <p style="display: inline-block;margin: 0;">{{balance.balance}}元</p>
                </div>
                <div>
                    <span>余额调整：</span>
                    <el-input-number style="width: 120px" v-model="balance.value" @change="handleChange"
                                     :min="0 - balance.balance"></el-input-number>
                    <div style="vertical-align: bottom;margin-left: 70px;">调整后余额 <span
                            style="margin-top: 10px;vertical-align: bottom;font-size: 20px;font-weight: bold;min-width: 0">{{balance.balance + balance.value}}</span>
                        元
                    </div>
                </div>
                <div>
                    <span style="vertical-align: top;">调整备注：</span>
                    <el-input
                            type="textarea"
                            class="note"
                            :autosize="{ minRows: 2, maxRows: 4}"
                            placeholder="请输入内容"
                            v-model="balance.note">
                    </el-input>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
            <el-button @click="dialogBalance = false, balance.value='', balance.note=''">取 消</el-button>
            <el-button type="primary" @click="editBalance">确 定</el-button>
        </span>
        </el-dialog>

        <el-dialog
                title="修改积分"
                :visible.sync="dialogCredits"
                v-if="dialogCredits"
                width="390px">
            <div class="dialogCredits">
                <div>
                    <span>当前积分：</span>
                    <p style="display: inline-block;margin: 0;">{{credits.credits}}元</p>
                </div>
                <div>
                    <span>积分调整：</span>
                    <el-input-number style="width: 120px" v-model="credits.value" @change="handleChange"
                                     :min="0 - credits.credits"></el-input-number>
                    <div style="vertical-align: bottom;margin-left: 70px;">调整后积分 <span
                            style="margin-top: 10px;vertical-align: bottom;font-size: 20px;font-weight: bold;min-width: 0">{{credits.credits + credits.value}}</span>
                        元
                    </div>
                </div>
                <div>
                    <span style="vertical-align: top;">调整备注：</span>
                    <el-input
                            type="textarea"
                            class="note"
                            :autosize="{ minRows: 2, maxRows: 4}"
                            placeholder="请输入内容"
                            v-model="credits.note">
                    </el-input>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
            <el-button @click="dialogCredits = false,credits.value='', credits.note=''">取 消</el-button>
            <el-button type="primary" @click="editCredits">确 定</el-button>
        </span>
        </el-dialog>

    </div>


</template>

<script>
    import Alert from "@/utils/alert";
    import {getToday, getLastWeek, getLastMonth, dateFormate} from "@/utils/date";

    const Balance = () => import('./balance');
    const Consumption = () => import('./consumption');
    const Credits = () => import('./credits');

    import {
        DETAIL_CUSTOMERS,
        CRADS_CUSTOMERS,
        BALANCE_CUSTOMERS,
        POST_CREDITS_CUSTOMERS
    } from '@/api/userManagement'

    import {GET_VIPVARDS} from '@/api/common'


    import {FormateYYMMDD, dateTimeFormate} from "@/filters/index";

    export default {
        name: "userDetails",
        data() {
            return {

                cards: [],
                details: {},
                value: '1',
                type: 'today',
                dates: [],
                dialogInfo: false,
                dialogBalance: false,
                dialogCredits: false,

                isF5: 0, //  我这命名贼屌
                member: {
                    cardId: '',
                    expiry: '',
                    permanent: false,
                    note: ''
                },
                balance: {
                    balance: 0,
                    value: 0,
                    note: '',
                },

                credits: {
                    credits: 0,
                    value: 0,
                    note: '',
                },

                selDate: {
                    start: getToday().start,
                    end: getToday().end,
                    id: this.$route.query.id
                }
            }
        },
        components: {
            Balance,
            Consumption,
            Credits
        },
        computed: {
            id() {
                return this.$route.query.id
            }
        },
        mounted() {
            if (this.id) {
                this.get_detail();


                this.selDate = {
                    start: getToday().start,
                    end: getToday().end,
                    id: this.$route.query.id
                };
            }


            GET_VIPVARDS().then(res => {
                this.cards = res
            });


        },
        methods: {
            /**
             */

            get_detail() {
                DETAIL_CUSTOMERS(this.id).then(res => {
                    let cardPermanent = res.cardPermanent;
                    let cardDate = FormateYYMMDD(res.cardExpiry);
                    if (res.cardName) {
                        if (cardPermanent) {
                            res.cardExpiry = '永久有效'
                        } else {
                            res.date = FormateYYMMDD(res.cardExpiry);
                            res.cardExpiry = FormateYYMMDD(res.cardExpiry) + '前有效';
                        }
                    } else {
                        res.cardExpiry = ''
                    }

                    this.member = {
                        cardId: res.cardId,
                        expiry: res.date,
                        permanent: res.cardExpiry == '永久有效',
                        note: ''
                    };

                    this.balance = {
                        balance: res.balance,
                        value: 0,
                        note: '',
                    };

                    this.credits = {
                        credits: res.credits,
                        value: 0,
                        note: '',
                    };


                    res.createdDate = dateTimeFormate(res.createdDate);
                    this.details = res
                })
            },
            /**
             * 会员等级
             */
            levelHandle() {
                this.dialogInfo = true;
            },

            editVip() {
                this.member = {
                    ...this.member,
                    id: this.id
                };
                if (!this.member.note) {
                    Alert.fail('调整备注必填');
                    return;
                }
                CRADS_CUSTOMERS(this.member).then(res => {
                    this.dialogInfo = false;
                    this.isF5 = this.isF5 + 1;
                    setTimeout(() => {
                        Alert.success('修改成功');
                        this.get_detail();
                    }, 500)
                })
            },

            editBalance() {
                this.balance = {
                    ...this.balance,
                    id: this.id
                };
                if (!this.balance.note) {
                    Alert.fail('调整备注必填');
                    return;
                }
                BALANCE_CUSTOMERS(this.balance).then(res => {
                    this.dialogBalance = false;
                    this.isF5 = this.isF5 + 1;
                    setTimeout(() => {
                        Alert.success('修改成功');
                        this.get_detail();
                    }, 500)
                })
            },

            editCredits() {
                this.credits = {
                    ...this.credits,
                    id: this.id
                };
                if (!this.credits.note) {
                    Alert.fail('调整备注必填');
                    return;
                }
                POST_CREDITS_CUSTOMERS(this.credits).then(res => {
                    this.dialogCredits = false;
                    this.isF5 = this.isF5 + 1;
                    setTimeout(() => {
                        Alert.success('修改成功');
                        this.get_detail();
                    }, 500)
                })
            },

            /**
             * 余额
             */
            balanceHandle() {
                this.dialogBalance = true;
            },

            /**
             * 积分
             */
            integralHandle() {
                this.dialogCredits = true;
            },

            datechange(value) {
                if (value) {
                    this.type = "";
                    this.selDate = {
                        start: dateFormate(value[0]),
                        end: dateFormate(value[1]),
                        id: this.id
                    };
                } else {
                    this.selectTime("today");
                }
            },

            selectTime(val) {
                this.type = val;
                this.dates = [];
                if (this.type == "today") {
                    this.selDate = {
                        start: getToday().start,
                        end: getToday().end,
                        id: this.id
                    };
                }
                if (this.type == "week") {
                    this.selDate = {
                        start: getLastWeek().start,
                        end: getLastWeek().end,
                        id: this.id
                    };
                }
                if (this.type == "mouth") {
                    this.selDate = {
                        start: getLastMonth().start,
                        end: getLastMonth().end,
                        id: this.id
                    };
                }
            },
            handleChange(val) {
            }
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

    @import "@/styles/variables.scss";

    .details {
        padding: 20px;
        background: #fff;

        h3 {
            margin-bottom: 20px;
        }

        .details_top {
            border-bottom: 1px solid #e9e9e9;
            margin-bottom: 20px;

            .resetP {
                margin: 8px 0;
                font-size: 14px;

                span:nth-child(1) {
                    color: #666;
                    margin-right: 8px;
                }

                span:nth-child(2) {
                    cursor: pointer;
                }

            }

            .moneyInfo {
                p {
                    margin: 10px 0;
                }

                p:nth-child(1) {
                    font-weight: bold;
                }

                p:nth-child(2) {
                    color: #666;
                }

                .balance {
                    cursor: pointer;
                }
            }

            .el-row8 {
                position: relative;
                text-align: center;

                &:before {
                    content: ' ';
                    height: 80%;
                    width: 1px;
                    background: #e9e9e9;
                    position: absolute;
                    top: 0;
                    right: 0;
                }

                &:last-child:before {
                    background: #fff;
                }
            }

            .icon {
                margin-left: 10px;
                color: rgba(0, 0, 0, 0.45);
            }
        }


        .details_bottom {
            .row {
                display: inline-block;
            }

            .row1 {
                display: flex;
                padding: 20px;

                .item1 {
                    display: flex;
                    align-items: center;

                    .item {
                        text-align: center;
                        margin-left: 5px;
                        margin-right: 15px;
                        padding-bottom: 10px;
                        cursor: pointer;

                        &.active {
                            border-bottom: 2px solid $menuActiveText;
                        }
                    }
                }
            }
        }

        .dialogInfo {
            padding: 20px 0 0;

            & > div {
                margin-bottom: 15px;

                span:nth-child(1) {
                    display: inline-block;
                    min-width: 70px;
                    text-align: right;
                    font-weight: bold;
                }

                .note {
                    width: 68%;
                }
            }
        }

        .dialogBalance, .dialogCredits {
            padding: 20px 0 0;

            > div {
                margin-bottom: 15px;

                span:nth-child(1) {
                    display: inline-block;
                    min-width: 70px;
                    text-align: right;
                    font-weight: bold;
                }

                .note {
                    width: 68%;
                }
            }

        }

    }
</style>
