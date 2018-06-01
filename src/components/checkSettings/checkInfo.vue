<template>
  <section class="checkInfo">
    <section class="pub_select">
      <el-form ref="form" :model="form" label-width="86px">
        <el-row>
          <el-col>
            <el-form-item label="系统类型:" prop="systemIDs">
              <el-select placeholder="请选择" v-model="form.systemIDs" multiple @change='checkType'>
                <el-option v-for="item,index in array.systemOptions" :value="item" :key="item" :label="item"> </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="检查医院 :" prop="hospitalNames">
              <el-select placeholder="请选择" v-model="form.hospitalNames" multiple>
                <el-option v-for="item,index in array.hospitalOptions" :value="item" :key="item" :label="item"> </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col class='pub_twoSelect'>
            <el-form-item class="pub_type" prop="numberType">
              <el-select placeholder="请选择" class="pub_typeOption" v-model="form.numberType">
                <el-option v-for="item,index in array.optionsNumber" :key='item' :label="item" :value="index"> </el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="number">
              <el-input v-model="form.number" placeholder="请输入内容"></el-input>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="患者姓名:" prop="chineseName">
              <el-input v-model="form.chineseName" placeholder="请输入患者姓名"></el-input>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="检查类型:" prop="examineTypeIDs">
              <el-select placeholder="请选择" v-model="form.examineTypeIDs" multiple>
                <el-option v-for="item,index in array.checkTypeOptions" :value="item" :key="item" :label="item"> </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col class='pub_twoSelect'>
            <el-form-item class="pub_type" prop="doctorType">
              <el-select class="pub_typeOption" v-model="form.doctorType">
                <el-option v-for="item,index in array.optionsDoctor" :key='item' :label="item" :value="index"> </el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="doctorName">
              <el-input v-model="form.doctorName" placeholder="请输入医生姓名"></el-input>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="打印状态:" prop="printFlag">
              <el-select v-model="form.printFlag" clearable placeholder="请选择打印状态">
                <el-option :value="0" label="未打印"> </el-option>
                <el-option :value="1" label="已打印"> </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="检查状态:" prop="workStates">
              <el-select placeholder="请选择检查状态" v-model="form.workStates" multiple filterable>
                <el-option v-for="item,index in array.workStatesOptions" :value="item.id" :key="item.id" :label="item.name"> </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="影像状态:" prop="imageType">
              <el-select v-model="form.imageType" clearable placeholder="请选择影像状态">
                <el-option :value="0" label="无"> </el-option>
                <el-option :value="1" label="有"> </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="危急报告:" prop="exceptionalType">
              <el-select v-model="form.exceptionalType" clearable placeholder="请选择危急报告">
                <el-option :value="0" label="无"> </el-option>
                <el-option :value="1" label="有"> </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col class="dateCol pub_twoSelect">
            <el-form-item class="pub_type" prop="dateType">
              <el-select placeholder="请选择" class="pub_typeOption" v-model="form.dateType">
                <el-option v-for="item,index in array.optionsDate" :key='item' :label="item" :value="index"> </el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="date">
              <el-date-picker v-model="form.date" type="daterange" align="right" unlink-panels range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="other.pickerOptions">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-button class="mlem" type="primary" @click='queryData(true)'>查询</el-button>
          <el-button class="mlem" @click="resetForm('form',queryData(true))">重置</el-button>
        </el-row>
      </el-form>
    </section>
    <section class="body">
      <div class="usercard" v-if="alert.usercard">
        <el-form ref="form" :model="cardInfo" label-width="86px">
          <el-row>
            <el-col>
              <el-form-item label="患者姓名:">
                <span>{{cardInfo.chineseName}}</span>
              </el-form-item>
            </el-col>
            <el-col>
              <el-form-item label="患者性别:">
                <span>{{['不详','男','女'][cardInfo.patientSex]}}</span>
              </el-form-item>
            </el-col>
            <el-col>
              <el-form-item label="患者年龄:">
                <span>{{cardInfo.ageStr}}</span>
              </el-form-item>
            </el-col>
            <el-col>
              <el-form-item label="检查状态:">
                <span>{{cardInfo.workStateStr}}</span>
              </el-form-item>
            </el-col>
            <el-col>
              <el-form-item label="检查类型:">
                <span>{{cardInfo.examineType}}</span>
              </el-form-item>
            </el-col>
            <el-col>
              <el-form-item label="检查项目:">
                <span>{{cardInfo.examineItem}}</span>
              </el-form-item>
            </el-col>
            <el-col class="textareacol">
              <el-form-item label="检查部位:">
                <span>{{cardInfo.examinePart}}</span>
              </el-form-item>
            </el-col>
            <el-col class="textareacol">
              <el-form-item label="登记时间:">
                <span>{{cardInfo.regTime}}</span>
              </el-form-item>
            </el-col>
            <el-col class="textareacol">
              <el-form-item label="阴阳性:">
                <span>{{cardInfo.isMasculine}}</span>
              </el-form-item>
            </el-col>
            <el-col>
              <el-form-item label="申请科室:">
                <span>{{cardInfo.reqOffice}}</span>
              </el-form-item>
            </el-col>
            <el-col>
              <el-form-item label="申请医生:">
                <span>{{cardInfo.reqDoctor}}</span>
              </el-form-item>
            </el-col>
            <el-col>
              <el-form-item label="审核医院:">
                <span>{{cardInfo.auditHospital}}</span>
              </el-form-item>
            </el-col>
            <el-col>
              <el-form-item label="审核医生:">
                <span>{{cardInfo.auditDoctor}}</span>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <aside class="leftList">
        <el-tabs v-model="other.activeType" type="card" @tab-click="handleClick">
          <el-tab-pane label="检查信息" name="0">
            <el-table ref="user" :data="array.userList" v-scroll="queryData" height="150" border style="flex-grow:1;" highlight-current-row @current-change="item=>{selectOneUser(item,true)}" @cell-mouse-enter="cellEnter" @cell-mouse-leave="cellLeave">
              <el-table-column prop="" label="操作" show-overflow-tooltip width="120">
                <template slot-scope="scope">
                  <el-tooltip class="item" effect="dark" content="影像" placement="top">
                    <el-button :disabled='!scope.row.examineImageFlag' class="icon iconfont icon-yingxiang pub_edit_btn" :plain="true" @click.stop='showAlert("showImg");getImageUrl(scope.row,"user")' size="mini"></el-button>
                  </el-tooltip>
                  <el-tooltip class="item" effect="dark" content="报告" placement="top">
                    <el-button :disabled='!scope.row.examineProcessFlag' class="icon iconfont icon-baogao1 pub_edit_btn" :plain="true" @click.stop='showAlert("showReport");getReportUrl(scope.row.id)' size="mini"></el-button>
                  </el-tooltip>
                </template>
              </el-table-column>
              <el-table-column prop="chineseName" label="姓名" show-overflow-tooltip width="180">
              </el-table-column>
              <el-table-column prop="name" label="性别" show-overflow-tooltip width="180">
                <template slot-scope="scope">
                  <span>{{['不详','男','女'][scope.row.patientSex]}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="ageStr" label="年龄" show-overflow-tooltip width="180">
              </el-table-column>
              <el-table-column prop="workStateStr" label="检查状态" show-overflow-tooltip width="180">
              </el-table-column>
              <el-table-column prop="examineType" label="检查类型" show-overflow-tooltip width="180">
              </el-table-column>
              <el-table-column prop="examineItem" label="检查项目" show-overflow-tooltip width="180">
              </el-table-column>
              <el-table-column prop="examinePart" label="检查部位" show-overflow-tooltip width="180">
              </el-table-column>
              <el-table-column prop="isMasculine" label="阴阳性" show-overflow-tooltip width="180">
              </el-table-column>
              <el-table-column prop="hisID" label="病历号" show-overflow-tooltip width="180">
              </el-table-column>
              <el-table-column prop="accessionNumber" label="检查号" show-overflow-tooltip width="180">
              </el-table-column>
              <el-table-column prop="regTime" label="登记时间" show-overflow-tooltip width="180">
              </el-table-column>
              <el-table-column prop="phone" label="联系电话" show-overflow-tooltip width="180">
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane name="1" :disabled="isEmpty(array.userInfo)">
            <span slot="label"> 相关检查<font class="pub_count">({{other.count}})</font></span>
            <el-table ref="check" :data="array.userInfo" height="150" border style="flex-grow:1;" highlight-current-row @current-change="item=>{selectOneUser(item,false)}" @cell-mouse-enter="cellEnter" @cell-mouse-leave="cellLeave">
              <el-table-column label="操作" show-overflow-tooltip width="120">
                <template slot-scope="scope">
                  <el-tooltip class="item" effect="dark" content="影像" placement="top">
                    <el-button :disabled='!scope.row.examineImageFlag' class="icon iconfont icon-yingxiang pub_edit_btn" :plain="true" @click.stop='showAlert("showImg");getImageUrl(scope.row,"check")' size="mini"></el-button>
                  </el-tooltip>
                  <el-tooltip class="item" effect="dark" content="报告" placement="top">
                    <el-button :disabled='!scope.row.examineProcessFlag' class="icon iconfont icon-baogao1 pub_edit_btn" :plain="true" @click.stop='showAlert("showReport");getReportUrl(scope.row.id)' size="mini"></el-button>
                  </el-tooltip>
                </template>
              </el-table-column>
              <el-table-column prop="chineseName" label="姓名" show-overflow-tooltip width="180">
              </el-table-column>
              <el-table-column label="性别" show-overflow-tooltip width="180">
                <template slot-scope="scope">
                  <span>{{['不详','男','女'][scope.row.patientSex]}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="ageStr" label="年龄" show-overflow-tooltip width="180">
              </el-table-column>
              <el-table-column prop="workStateStr" label="检查状态" show-overflow-tooltip width="180">
              </el-table-column>
              <el-table-column prop="examineType" label="检查类型" show-overflow-tooltip width="180">
              </el-table-column>
              <el-table-column prop="examineItem" label="检查项目" show-overflow-tooltip width="180">
              </el-table-column>
              <el-table-column prop="examinePart" label="检查部位" show-overflow-tooltip width="180">
              </el-table-column>
              <el-table-column prop="isMasculine" label="阴阳性" show-overflow-tooltip width="180">
              </el-table-column>
              <el-table-column prop="hisID" label="病历号" show-overflow-tooltip width="180">
              </el-table-column>
              <el-table-column prop="accessionNumber" label="检查号" show-overflow-tooltip width="180">
              </el-table-column>
              <el-table-column prop="regTime" label="登记时间" show-overflow-tooltip width="180">
              </el-table-column>
              <el-table-column prop="phone" label="联系电话" show-overflow-tooltip width="180">
              </el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
      </aside>
      <main class="main">
        <el-row class="first" v-if="!isEmpty(popup)">
          <div class="tag">
            <el-tag >{{popup.chineseName}}</el-tag>
            <el-tag >{{popup.examineType}}</el-tag>
            <el-tag >{{popup.examineItem}}</el-tag>
            <el-tag >{{popup.examinePart}}</el-tag>
          </div>
          <div class="btns">
            <el-button type="primary" class="false mlem" :disabled='!popup.examineProcessFlag' @click='showAlert("showReport");getReportUrl(false)'>报告</el-button>
            <el-button type="primary" class="false mlem" :disabled='!popup.examineImageFlag' @click='showAlert("showImg");getImageUrl(false)'>影像</el-button>
            <el-button type="primary" class="false mlem" @click='showAlert("showApplication")'>申请单</el-button>
            <!-- <el-button type="primary" class="false mlem">更多操作</el-button> -->
          </div>
        </el-row>
        <!-- 用户报告 -->
        <section class="content" v-if="alert.showReport">
          <div v-if='!isEmpty(array.reportList)' class="images">
            <img v-for="key in array.reportList" :src='key' v-if='other.reportType==1' />
            <embed :src='array.reportList[0]' v-if='other.reportType==0' />
          </div>
        </section>
        <!-- 用户影像 -->
        <section class="content" v-if="alert.showImg">
          <div v-if='!isEmpty(array.imageList)' class="images">
            <img v-for="key in array.imageList" :src='key' />
            <!--   <el-carousel :interval="5000" arrow="always">
              <el-carousel-item v-for="key in array.imageList" :key="key">
              <img :src='key' />
              </el-carousel-item>
            </el-carousel> -->
          </div>
        </section>
        <!-- 用户申请单 -->
        <section class="contertTitle" v-if="alert.showApplication">
          <h1>{{popup.hospitalName}}</h1>
          <h2><span>检查项目:{{popup.examineItem}}</span><span>申请单</span></h2>
        </section>
        <section class="content" v-if="alert.showApplication">
          <el-form ref="form" :model="popup" label-width="86px">
            <el-row>
              <el-col>
                <el-form-item label="申请单号:">
                  <span>{{popup.hisExamineID}}</span>
                </el-form-item>
              </el-col>
              <el-col>
                <el-form-item label="患者姓名:">
                  <span>{{popup.chineseName}}</span>
                </el-form-item>
              </el-col>
              <el-col>
                <el-form-item label="患者性别:">
                  <span> <span>{{['不详','男','女'][popup.patientSex]}}</span></span>
                </el-form-item>
              </el-col>
              <el-col>
                <el-form-item label="患者年龄:">
                  <span>{{popup.ageStr}}</span>
                </el-form-item>
              </el-col>
              <el-col>
                <el-form-item label="联系电话:">
                  <span>{{popup.phone}}</span>
                </el-form-item>
              </el-col>
              <el-col>
                <el-form-item label="病历号:">
                  <span>{{popup.hisID}}</span>
                </el-form-item>
              </el-col>
              <el-col>
                <el-form-item label="就诊类别:">
                  <span>{{popup.stayInsu}}</span>
                </el-form-item>
              </el-col>
              <el-col>
                <el-form-item label="门诊号:">
                  <span>{{popup.outPatientNo}}</span>
                </el-form-item>
              </el-col>
              <el-col>
                <el-form-item label="检查部位:">
                  <span>{{popup.examinePart}}</span>
                </el-form-item>
              </el-col>
              <el-col>
                <el-form-item label="住院号:">
                  <span>{{popup.inPatientNo}}</span>
                </el-form-item>
              </el-col>
              <el-col>
                <el-form-item label="床号:">
                  <span>{{popup.bedNo}}</span>
                </el-form-item>
              </el-col>
              <el-col class="textareacol">
                <el-form-item label="临床诊断:">
                  <el-input type="textarea" :rows="3" placeholder="请输入内容" resize="none" v-model="popup.clinicDiagnose"></el-input>
                </el-form-item>
              </el-col>
              <el-col class="textareacol">
                <el-form-item label="过敏史:">
                  <el-input type="textarea" :rows="3" placeholder="请输入内容" resize="none" v-model="popup.allergic"></el-input>
                </el-form-item>
              </el-col>
              <el-col class="textareacol">
                <el-form-item label="患者病史:">
                  <el-input type="textarea" :rows="3" placeholder="请输入内容" resize="none" v-model="popup.medicalRecord"></el-input>
                </el-form-item>
              </el-col>
              <el-col class="textareacol">
                <el-form-item label="检查目的:">
                  <el-input type="textarea" :rows="3" placeholder="请输入内容" resize="none" v-model="popup.examinePurpose"></el-input>
                </el-form-item>
              </el-col>
              <el-col class="textareacol">
                <el-form-item label="注意事项:">
                  <el-input type="textarea" :rows="3" placeholder="请输入内容" resize="none" v-model="popup.annotation"></el-input>
                </el-form-item>
              </el-col>
              <el-col>
                <el-form-item label="申请科室:">
                  <span>{{popup.reqOffice}}</span>
                </el-form-item>
              </el-col>
              <el-col>
                <el-form-item label="申请医生:">
                  <span>{{popup.reqDoctor}}</span>
                </el-form-item>
              </el-col>
              <el-col>
                <el-form-item label="申请时间:">
                  <span>{{popup.reqDate}}</span>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </section>
      </main>
    </section>
  </section>
</template>
<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      form: {
        systemIDs: [], //系统类型
        hospitalNames: [], //医院名称
        examineTypeIDs: [], //检查类型内码
        chineseName: '', //患者姓名
        number: '', //号码
        numberType: 0, //号码类型0病历号 1申请单号2身份证号3检查号4住院号5病区6床号
        doctorName: '', //医生姓名
        doctorType: 0, //医生类型 0申请医生、1申请科室、2检查医生、3书写医生、4审核医生
        dateType: 0, //日期类型 0申请日期、1登记日期、2检查日期、3报告日期、4会诊日期
        startDate: '', //开始日期
        endDate: '', //结束日期
        printFlag: '', //报告打印标记，0：未打印；1：已打印
        workStates: [], //检查状态数组
        imageType: '', //影像状态 0有 1无
        exceptionalType: '', //危急报告  0有 1无
        // date: [new Date(), new Date()]
        date: [new Date().getTime() - 3600 * 1000 * 24 * 90, new Date()]
      },
      popup: { //申请单

      },
      cardInfo: {}, //用户简易卡片
      alert: {
        usercard: false, //用户简易卡片
        showApplication: false, //用户申请单
        showReport: false, //用户报告
        showImg: false, //用户影像
      },
      array: {
        optionsNumber: ['病历号', '申请单号', '身份证号', '检查号', '住院号', '病区', '床号'], //病历号下拉框
        optionsDoctor: ['申请医生', '申请科室', '检查医生', '书写医生', '审核医生', ],
        optionsDate: ['申请日期', '登记日期', '检查日期', '报告日期', '会诊日期'],
        userList: [], //患者列表
        userInfo: [], //患者相关检查列表
        systemOptions: [], //所有系统类型
        hospitalOptions: [], //所有检查医院
        checkTypeOptions: [], //所有检查类型
        workStatesOptions: [], //所有检查状态

        imageList: [], //用户影像列表
        reportList: [], //用户报告列表
      },
      other: {
        activeType: 0,
        count: 0, //相关检查条数
        reportType: 0, //报告默认是图像1是pdf
        pickerOptions: {
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              const end = new Date(new Date().toLocaleDateString()).getTime() + 86399999;
              const start = new Date(new Date().toLocaleDateString()).getTime();
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
      }
    }
  },
  computed: {
    ...mapState([
      "pageSize",
      'userMsg',
      'loginState'
    ]),

  },
  created() {
    this.getHospitals();
    this.accessToIdentify();
    this.checkType();
    this.getWorkState();
    this.queryData(true);
    this.loginState.then(data => {
      console.log(this.userMsg)
      this.$set(this.form, 'hospitalNames', [this.userMsg.hospitalName]);
    })
  },
  methods: {
    cellEnter(row) {
      this.cardInfo = this.copy(row)
      this.alert.usercard = true;

    },
    cellLeave() {
      this.cardInfo = {}
      this.alert.usercard = false;

    },
    handleClick() {
      console.log(this.other.activeType)
    },
    //获取所有医院
    getHospitals() {
      this.get('fusegetDianosisHospitals').then(data => {
        this.array.hospitalOptions = _.get(data, 'data', []);
      }).catch(() => {
        console.log('错误');
      })
    },
    //获取所有系统标识
    accessToIdentify() {
      this.get('fusegetSystems').then(data => {
        this.array.systemOptions = _.get(data, 'data', []);
      }).catch(() => {
        console.log('错误');
      })
    },
    //获取检查类型
    checkType() {
      this.array.checkTypeOptions = [];
      this.form.examineTypeIDs = [];
      this.get('fusegetExamineType', {
        params: {
          systemIDs: this.form.systemIDs
        }
      }).then(data => {
        this.array.checkTypeOptions = _.get(data, 'data', []);
      }).catch(() => {
        console.log('错误');
      })
    },
    //获取检查状态
    getWorkState() {
      this.get('fusegetWorkState').then(data => {
        this.array.workStatesOptions = _.get(data, 'data', []);
      }).catch(() => {
        console.log('错误');
      })
    },
    //查看某个患者的相关检查,type存在,检查患者的点击,否则为相关检查表格点击
    selectOneUser(val, type) {
      console.log(val)
      if (!val) return false;
      this.showAlert("showReport");
      this.getReportUrl(val.id);
      this.popup = this.copy(val)
      if (type) {
        this.get('fusequeryRelatedExamine', {
          params: {
            id: val.id
          }
        }).then(data => {
          this.array.userInfo = _.get(data, 'data.data', []);
          this.other.count = _.get(data, 'data.count', 0);
        }).catch(() => {
          console.log('错误');
        })
      }
    },
    //查看所有患者列表
    queryData(can) {
      can ? this.form.page = 0 : this.form.page++;
      console.log(this.form.date)
      let startDate = this.isEmpty(this.form.date) ? '' : this.formatTime(this.form.date[0]);
      let endDate = this.isEmpty(this.form.date) ? '' : this.formatTime(this.form.date[1], 1);
      this.post('fusequeryStudyInfo', {
        ...this.form,
        pageSize: this.pageSize,
        startDate: startDate,
        endDate: endDate
      }).then(data => {
        console.log(data);
        if (can) {
          this.array.userList = _.get(data, 'data.data', []);
        } else {
          this.array.userList.push(...data.data);
        }
      }).catch(() => {
        console.log('错误');
      })

    },
    //获取某条检查的影像url,如果can存在,证明选择的是表格中的影像按钮,否则点击的是显示内容中的影像按钮
    getImageUrl(item, can) {
      if (can) {
        this.$refs[can].setCurrentRow(item);
        this.popup = this.copy(item);
      }
      this.showAlert("showImg");
      this.array.imageList = [];
      let id = item ? item.id : this.popup.id;
      this.get('fusegetImgUrlByID', {
        params: {
          id: id
        }
      }).then(data => {
        console.log(data)
        let type = _.get(data, 'data.type', '');
        // 图像类型-1没有影像 0图像 1pacswiew
        if (type == 1) {
          // console.log(data.data.data[0])
          window.open(data.data.data[0]);
        } else {
          this.array.imageList = _.get(data, 'data.data', []);
        }
      }).catch(() => {
        console.log('错误');
      })
    },
    //获取某条检查的报告url
    getReportUrl(can) {
      this.array.reportList = [];
      let id = can ? can : this.popup.id;
      this.get('fusegetPDFUrlByID', {
        params: {
          id: id
        }
      }).then(data => {
        console.log(data)
        let type = _.get(data, 'data.type', '');
        //type报告类型-1没有报告 0pdf 1图像
        this.other.reportType = type
        this.array.reportList = _.get(data, 'data.data', []);
      }).catch(() => {
        console.log('错误');
      })
    },
    //显示用户操作的弹窗
    showAlert(can) {
      _.forOwn(this.alert, (value, key) => {
        this.alert[key] = false;
      });
      this.alert[can] = true;
    },


  }
}

</script>
<style lang='less' scoped>
@import '../../assets/css/mixin.less';
.checkInfo {
  // border: 1px solid blue;
  width: 100%;
  display: flex;
  flex-direction: column;
  .body {
    flex-grow: 1; // border: 1px solid green;
    margin: 15px 0;
    display: flex;
    position: relative;
    /deep/ .usercard {
      background: #fff;
      border: 1px solid #dfe4ed;
      position: absolute;
      z-index: 10000;
      width: 400px;
      left: 360px;
       @media (min-width: 1120px) {
        left: 450px;
      }
      top: 150px;
      .el-form {
        .el-row {
          display: flex;
          flex-wrap: wrap;
          .el-col:not(.textareacol) {
            // border: 1px solid red;
            max-width: 150px;
            margin-left: 1em;
            .el-form-item {
              margin-bottom: 0px;
            }
          }
          .textareacol {
            width: 100%; // border: 1px solid blue;
            padding: 0 1em;
            .el-form-item {
              margin-bottom: 0px;
            }
          }
        }
      }
    }
    .leftList {
      width: 360px;

      @media (min-width: 1120px) {
        width: 450px;
      }
      display: flex;
      flex-direction: column;
      /deep/.el-tabs {
        flex-grow: 1;
        display: flex;
        flex-direction: column;

        .el-tabs__header {
          margin-bottom: 1px;
          border: none;
        }
        .el-tabs__content,
        .el-tab-pane {
          flex-grow: 1;
          display: flex;
          flex-direction: column;
          .el-table {
            flex-grow: 1;
            td,th{
                  height: 40px;
               padding: 0;
            }
            .cell{
              color:rgb(31, 61, 44);
            }
          }
        }
      }
    }
    .main {
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      border: 1px solid #dfe4ed;
      .first {
        width: 100%;
        height: 41px;
        margin-bottom: 10px;
        border-bottom: 1px solid #dfe4ed;
        flex-shrink: 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        .btns {
          flex-grow: 1;
          padding-right: 1em;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          height: 24px;
          .el-button {
            padding: 5px 10px;
            span{
            font-size: 16px;
            }
          }
        }
        .tag {
          display: flex;
          flex-direction: row;
          flex-grow: 1;
          .el-tag {
            @media (min-width: 1075px) {
              .el-tag {
                margin-left: 1em !important;
              }
            }
            color:#009933;
            font-size: 16px;
            height: 24px;
            line-height: 24px;
            margin-left: 10px;
          }
        }
      }
      .contertTitle {
        width: 100%;
        text-align: center;
        h1 {
          font-size: 1.5em;
        }
        h2 {
          span {
            margin-left: 1em;
          }
        }
      }
      .content {
        // border: 1px solid green;
        flex-grow: 1; // border: 1px solid red;
        margin-top: 10px;
        width: 100%;
        overflow-y: auto;
        .images {
          width: 100%;
          overflow: auto;
          text-align: center;
          /deep/embed {
            // border:1px solid red;
            width: 80%;
            height: 600px;
            margin-top: -60px;
          }
        }
        .el-form {
          .el-row {
            display: flex;
            flex-wrap: wrap;
            .el-col:not(.textareacol) {
              // border: 1px solid red;
              max-width: 210px;
              margin-left: 1em;
              .el-form-item {
                margin-bottom: 0px;
              }
            }
            .textareacol {
              width: 100%; // border: 1px solid blue;
              height: 80px;
              padding: 0 1em;
            }
          }
        }
      }
    }
  }
}

</style>
