<template>
    <div class="rightMenu">
        <el-popover
                placement="top-start"
                title=""
                width="100"
                trigger="click"
        >
            <!-- content -->
            <div class="popucontent">
                <div class="list">
                    <div class="listitem" @click="isAccount=true,getDetail()">账号设置</div>
                    <div class="listitem last2" @click="isPassword=true">修改密码</div>
                    <div @click="logout" class="listitem last">退出</div>
                </div>
            </div>
            <div
                    class="avtarWrapper"
                    slot="reference"
            >
                <span class="text">{{this.$store.state.user.user || user}}</span>
                <!--                <div class="avatarContainer">-->
                <!--                    <img-->
                <!--                            :src="logoSrc"-->
                <!--                            alt=""-->
                <!--                    >-->
                <!--                </div>-->
            </div>
        </el-popover>


        <el-dialog
                title="账号设置"
                :visible.sync="isAccount"
                width="500px">
            <div v-if="isAccount">
                <div class="mt10">
                    <span>姓名：</span>
                    <el-input v-model="info.name" style="width: 60%"></el-input>
                </div>
                <div class="mt10">
                    <span>手机号：</span>
                    <el-input v-model="info.mobile" style="width: 60%"></el-input>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="isAccount = false">取 消</el-button>
                <el-button type="primary" @click="updateAccount">确 定</el-button>
            </span>
        </el-dialog>


        <el-dialog
                title="修改密码"
                :visible.sync="isPassword"
                width="500px">
            <div v-if="isPassword">
                <div class="mt10">
                    <span>旧密码：</span>
                    <el-input type="password" v-model="changePassword.oldPassword" style="width: 60%"></el-input>
                </div>
                <div class="mt10">
                    <span>新密码：</span>
                    <el-input type="password" v-model="changePassword.newPassword" style="width: 60%"></el-input>
                </div>
                <div class="mt10">
                    <span>确认新密码：</span>
                    <el-input type="password" v-model="changePassword.confirmPassword" style="width: 60%"></el-input>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="isPassword = false">取 消</el-button>
                <el-button type="primary" @click="updatePassword">确 定</el-button>
            </span>
        </el-dialog>

    </div>
</template>
<script>
    // import logoSrc from '@/assets/quxia.png'
    import {getCookie} from "../../../../utils/cookie";
    import {mapState, mapActions} from "vuex";
    import Alert from "@/utils/alert";
    import {PROFLE, PUT_PROFLE, PUT_CHANGEPASSWORD} from "@/api/layout";

    export default {
        data() {
            return {
                // logoSrc:logoSrc,
                user: '',
                isAccount: false,
                isPassword: false,

                changePassword: {
                    oldPassword: '',
                    newPassword: '',
                    confirmPassword: ''
                },

                info: {
                    name: '',
                    mobile: '',
                }
            }
        },
        mounted() {
            let LoginByUsername = getCookie('LoginByUsername');
            this.user = JSON.parse(LoginByUsername).username
        },
        methods: {
            ...mapActions([
                "delAllVisitedViews"
            ]),
            getDetail() {
                PROFLE().then(res => {
                    console.log(res);
                    this.info = res
                })
            },
            getCookie(name) {
                let arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
                if (arr = document.cookie.match(reg)) {
                    return true;
                    // return (arr[2]);
                } else {
                    return false
                }
            },
            logout() {
                let exp = new Date();
                exp.setTime(exp.getTime() - 1);
                let Cookie = this.getCookie('access_token');
                if (Cookie != null) {
                    document.cookie = 'access_token' + "=" + Cookie + ";expires=" + exp.toGMTString();
                }
                this.delAllVisitedViews();
                setTimeout(() => {
                    window.location.reload();
                    window.localStorage.clear();
                    window.sessionStorage.clear();
                    window.localtion.href = `/login`
                }, 100)
            },
            updateAccount() {
                if (!this.info.name) {
                    Alert.fail('姓名不能为空');
                    return false;
                }

                if (!this.info.mobile) {
                    Alert.fail('手机号不能为空');
                    return false;
                }
                PUT_PROFLE(this.info).then(res => {
                    Alert.success('操作成功');
                    this.isAccount = false;
                });

            },
            updatePassword() {
                if (!this.changePassword.oldPassword) {
                    Alert.fail('旧密码不能为空');
                    return false;
                }

                if (!this.changePassword.newPassword) {
                    Alert.fail('新密码不能为空');
                    return false;
                }

                if (!this.changePassword.confirmPassword) {
                    Alert.fail('确认新密码不能为空');
                    return false;
                }


                if (this.changePassword.newPassword != this.changePassword.confirmPassword) {
                    Alert.fail('新密码和确认新密码不一致');
                    return false;
                }


                PUT_CHANGEPASSWORD(this.changePassword).then(res => {
                    Alert.success('操作成功');
                    this.isPassword = false
                }).catch(err=>{
                    if (err.response.status===500){
                        Alert.fail('旧密码不匹配,请重新输入！');
                    }
                })

            }
        }
    };
</script>
<style lang="scss" scoped>
    @import "@/styles/variables.scss";

    .popucontent {
        .list {
            width: 100%;

            .listitem {
                height: 30px;
                display: flex;
                align-items: center;
                padding-left: 10px;
                cursor: pointer;

                &:hover {
                    background: $menuActiveText;
                    color: #fff;
                }

                &.last2 {
                    height: 35px;
                }

                &:last-child {
                    /*border-top: 1px solid #ddd;*/
                }
            }
        }
    }

    .rightMenu {
        float: right;
        height: 100%;
        display: flex;
        justify-self: center;
        align-items: center;
        padding-right: 20px;

        .avtarWrapper {
            display: flex;
            justify-self: center;
            align-items: center;

            .text {
                padding-right: 5px;
                cursor: pointer;
            }

            .avatarContainer {
                width: 40px;
                height: 40px;
                background: #eee;
                border-radius: 100%;

                img {
                    width: 40px;
                    height: 40px;
                    background: #eee;
                    border-radius: 100%;
                }
            }
        }
    }

    .mt10 {
        margin-top: 10px;

        > span {
            display: inline-block;
            width: 90px;
            text-align: right;
        }
    }
</style>
