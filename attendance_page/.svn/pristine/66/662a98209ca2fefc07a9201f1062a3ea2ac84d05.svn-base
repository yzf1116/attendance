<template>
  <div class="login-wrap">
    <div class="ms-title">
      <div class="logoImg">
        <img width="400" src="../assets/img/login.png">
      </div>
      移动警务考勤管理系统
    </div>
    <transition name="fadeUp">
      <div class="ms-login">
        <div class="sign-title">
          <strong>Sign in</strong> 用户登录


        </div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px"  @keyup.enter.native="submitForm('ruleForm')">
          <el-form-item prop="username" class="el-login-radio">
            <el-input v-model="ruleForm.username" placeholder="用户名">
              <template slot="prepend">
                <icon name="user"></icon>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input type="password" placeholder="密码" v-model="ruleForm.password"
                     >
              <template slot="prepend">
                <icon name="lock"></icon>
              </template>
            </el-input>
          </el-form-item>
          <div class="login-btn">
            <el-button type="success" :loading="btnLoding" @click="submitForm('ruleForm')">登录</el-button>
          </div>
          <!--<p style="font-size:12px;line-height:30px;color:#999;">Tips : 用户名和密码随便填。</p>-->
        </el-form>
      </div>
    </transition>

    <div class="footer-login">
      <p>@2016 云南公投建设集团有限公司 滇ICP证080268</p>
      <p>由云南云岭高速公路交通科技有限公司提供技术支持</p>

    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        btnLoding: false,
        ruleForm: {
          username: 'admin',
          password: 'admin'
        },
        rules: {
          username: [{
            required: true,
            message: '请输入用户名',
            trigger: 'blur'
          }],
          password: [{
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          }]
        },
        rolList: []
      }
    },
    methods: {
      submitForm(formName) {
        const self = this;
        self.btnLoding = true;
        self.$refs[formName].validate((valid) => {
          if (valid) {
            var _self = this
            // localStorage.setItem('ms_username', self.ruleForm.username);
            // localStorage.setItem('islogin', self.ruleForm.username);
            _self.$http.post('/login', {
                username: self.ruleForm.username,
                password: self.ruleForm.password
            })
              .then(function (response) {
                if (response.data.flag) {
                  document.cookie = "islogin=true";
                  document.cookie = "username=" + self.ruleForm.username;
                  localStorage.setItem('username', self.ruleForm.username);
                  console.log(response.data)
                  _self.$setStore('TOKEN', response.data.token);
                  _self.$setStore('userData', response.data.userData);
                  if (response.data.userData.roleList.length > 0) {
                    _self.rolList = response.data.userData.roleList;
                    _self.getSysRoleMenu();
                  } else {
                    self.btnLoding = false;
                    self.$message({
                      message: '当前账号未分配权限，请通知管理员分配后再登录',
                      type: 'warning'
                    });
                  }
                } else {
                  self.btnLoding = false;
                  self.$message({
                    message: response.data.msg,
                    type: 'warning'
                  });
                }
                //                console.log(this)
              })
              .catch(function (error) {
                console.log(error)
              });
          } else {
            self.btnLoding = false;
            self.$message({
              message: '请输入用户名/密码',
              type: 'warning'
            });
            console.log('error submit!!');
            return false;
          }
        });

      },
      /**
       * 缓存字典信息
       */
      getDictionaryList() {
        const _self = this;
        _self.$http.get('/system/dictionary/initdictionary', {
          params: {}
        })
          .then(function (response) {
            // _self.$store.dispatch('addlist', response.data.ret);
            _self.$setStore('gDictionaryList', response.data.ret)
          }).catch(function (error) {
          console.log(error)
        });
      },

      /**
       * 获取角色菜单
       */
      getSysRoleMenu(){
        const _self = this;
        var params = {
          rolList: _self.rolList
        }
        _self.$http.get('/system/role/getuserrolemenu', {
          params: params
        })
          .then(function (response) {
            _self.setmenu(response.data.data);
            _self.$router.push('/Layout');
            _self.$message({
              message: '登录成功，欢迎回到智慧工地！',
              type: 'success'
            });
          }).catch(function (error) {
          console.log(error)
        });
      },
      /**
       * 组装菜单信息
       */
      setmenu(res){
        var obj = {};
        var data = [];
        var linkdata = [];
        var pathData = [];

        const _self = this;
        for (var i = 0; i < res.length; i++) {
          pathData.push(res[i].menu_url)
          if (res[i].menu_level === 0) {
            if (res[i].menu_type === 1) {
              var sub = {};
              sub.id = res[i].id;
              sub.menu_name = res[i].menu_name;
              sub.menu_order = res[i].menu_order;
              sub.menu_icon = res[i].menu_icon;
              sub.menu_url = res[i].menu_url;
              sub.children = [];
              for (var x = 0; x < res.length; x++) {
                if (res[x].parent_menu_id == res[i].id) {
                  sub.children.push({
                    id: res[x].id,
                    menu_name: res[x].menu_name,
                    menu_url: res[x].menu_url,
                    menu_order: res[x].menu_order
                  })
                }
              }
              data.push(sub);
            } else {
              var sub = {};
              sub.id = res[i].id;
              sub.menu_name = res[i].menu_name;
              sub.menu_order = res[i].menu_order;
              sub.menu_icon = res[i].menu_icon;
              sub.menu_url = res[i].menu_url;
              sub.children = [];
              for (var x = 0; x < res.length; x++) {
                if (res[x].parent_menu_id == res[i].id) {
                  sub.children.push({
                    id: res[x].id,
                    menu_name: res[x].menu_name,
                    menu_url: res[x].menu_url,
                    menu_order: res[x].menu_order
                  })
                }
              }
              linkdata.push(sub);
            }

          }
        }
        obj.public = data;
        obj.link = linkdata;
        obj.path = pathData;
        _self.$setStore('gMenuList', obj)
      }

    },
    components: {},
    created() {
      //console.log('created')
    },
    mounted() {
      this.getDictionaryList(); //页面初始化时加载字典数据

    },
    updated() {
     // console.log('updated')
    },
  }
</script>

<!-- 添加 "scoped " css作用域只作用于本文件，不作用全局-->
<style scoped>
  .login-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    /*background: red;*/
    background-image: url("../assets/img/loginBg11.jpg");
    filter: "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod='scale')";
    -moz-background-size: 100% 100%;
    background-size: 100% 100%;
  }

  .ms-title {
    position: absolute;
    top: 45%;
    width: 100%;
    margin-top: -230px;
    text-align: center;
    font-size: 35px;
    color: #fff;
  }

  .ms-login {
    position: absolute;
    left: 50%;
    bottom: 30%;
    width: 300px;
    height: 160px;
    margin: -150px 0 0 -190px;
    padding: 40px;
    border-radius: 5px;
    /*background: rgba(255, 255, 255, 0.34);*/
  }

  .login-btn {
    text-align: center;
  }

  .login-btn button {
    width: 100%;
    height: 36px;
  }

  .sign-title {
    color: #fff;
    margin-bottom: 10px;
    text-align: center;
  }

  .sign-title strong {
    font-size: 30px;
  }

  .el-input__inner {
    border-radius: 20px !important;
  }

  .footer-login {
    position: absolute;
    left: 50%;
    bottom: 3%;
    width: 300px;
    margin: 0 -150px 0 -140px;
    font-size: 12px;
    color: #5593bc;
  }

  .ms-login {
    animation: vanishIn 0.7s ease 0s 1 backwards
  }

  @keyframes vanishIn {
    0% {
      opacity: 0;
      transform-origin: 50% 50%;
      transform: scale(2, 2);
      filter: blur(90px);
    }

    100% {
      opacity: 1;
      transform-origin: 50% 50%;
      transform: scale(1, 1);
      filter: blur(0px);
    }
  }
</style>
