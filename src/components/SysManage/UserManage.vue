<template>
    <div class="main">
        <el-form
            :inline="true"
            :model="selectForm"
            class="demo-form-inline"
            style="line-height: 80px !important"
        >
            <el-form-item label="用户名">
                <el-input
                    v-model="selectForm.name"
                    placeholder="用户名"
                ></el-input>
            </el-form-item>
            <el-form-item label="账号">
                <el-input
                    v-model="selectForm.account"
                    placeholder="账号"
                ></el-input>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="handleSearch(selectForm)"
                    >查询</el-button
                >
            </el-form-item>
        </el-form>
        <el-button class="addUser" type="success" @click="handleAddUser('1')"
            >新增用户</el-button
        >
        <el-dialog
            :title="titleMap[dialogStatus]"
            :visible.sync="addUser"
            width="60%"
            :before-close="handleClose"
        >
            <el-form ref="createForm" :model="createForm" label-width="80px">
                <el-row :gutter="20">
                    <el-col :span="12"
                        ><el-form-item label="用户姓名">
                            <el-input
                                v-model="createForm.name"
                            ></el-input> </el-form-item
                    ></el-col>
                    <el-col :span="12"
                        ><el-form-item label="用户账号">
                            <el-input
                                v-model="createForm.account"
                            ></el-input> </el-form-item
                    ></el-col>
                </el-row>
                <el-row :gutter="20"
                    ><el-col :span="12"
                        ><el-form-item label="用户密码">
                            <el-input
                                v-model="createForm.password"
                            ></el-input> </el-form-item
                    ></el-col>
                    <el-col :span="12"
                        ><el-form-item label="性别">
                            <el-select
                                v-model="createForm.sex"
                                placeholder="请选择性别"
                            >
                                <el-option label="女" value="2"></el-option>
                                <el-option label="男" value="1"></el-option>
                            </el-select> </el-form-item></el-col
                ></el-row>
                <el-row :gutter="20"
                    ><el-col :span="12"
                        ><el-form-item label="手机号">
                            <el-input
                                v-model="createForm.mobilePhone"
                            ></el-input> </el-form-item
                    ></el-col>
                    <el-col :span="12"
                        ><el-form-item label="邮箱">
                            <el-input
                                v-model="createForm.mail"
                            ></el-input> </el-form-item></el-col
                ></el-row>

                <el-form-item>
                    <el-button type="primary" @click="createUser(createForm,dialogStatus)">
                        创建
                    </el-button>
                    <el-button @click="handleAddUser(false)">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <el-table :data="displayForm" border style="width: 100%">
            <el-table-column fixed prop="name" label="用户名" width="150">
            </el-table-column>
            <el-table-column
                prop="account"
                label="账号"
                width="120"
            ></el-table-column>
            <el-table-column
                prop="alias"
                label="昵称"
                width="120"
            ></el-table-column>
            <el-table-column
                prop="sex"
                label="性别"
                width="80"
            ><template slot-scope="scope">{{ scope.row.sex === '1' ? '男' : '女' }}</template></el-table-column>
            <el-table-column
                prop="mobilePhone"
                label="手机号"
                width="120"
            ></el-table-column>
            <el-table-column
                prop="mail"
                label="邮箱"
                width="200"
            ></el-table-column>
            <el-table-column
                prop="slogan"
                label="标语"
                width="200"
            ></el-table-column>
            <el-table-column
                prop="creator"
                label="创建人"
                width="120"
            ></el-table-column>
            <el-table-column
                prop="createTime"
                label="创建日期"
                width="120"
            ></el-table-column>
            <el-table-column
                prop="modifier"
                label="修改人"
                width="120"
            ></el-table-column>
            <el-table-column
                prop="updateTime"
                label="修改日期"
                width="120"
            ></el-table-column>
            <el-table-column
                prop="remark"
                label="备注"
                width="120"
            ></el-table-column>
            <el-table-column fixed="right" label="操作" width="100">
                <template slot-scope="scope">
                    <!-- <el-button
                        @click="handleClick(scope.row)"
                        type="primary"
                        size="small"
                        >查看</el-button
                    > -->
                    <el-button
                        @click="editUser(scope.row.id)"
                        type="text"
                        size="small"
                        >编辑</el-button
                    >
                    <el-button
                        @click="handleDelete(scope.row.id)"
                        type="text"
                        size="small"
                        >删除</el-button
                    >
                </template>
            </el-table-column>
        </el-table>
        <div class="block">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="1"
                :page-sizes="[5, 10, 20, 30]"
                :page-size="10"
                layout="total, sizes, prev, pager, next, jumper"
                :total="totalCount"
            >
            </el-pagination>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        var pageSize = 10;
        var pageNum = 1;
        console.log(this.createForm);
        return {
            titleMap: {
                addUser: "新增用户",
                editUser: "编辑用户信息",
            },
            dialogStatus: "",
            displayForm: this.displayForm,
            totalpage: this.totalpage,
            totalCount: this.totalCount,
            pageSize: this.pageSize,
            pageNum: this.pageNum,
            selectForm: {
                name: "",
                account: "",
            },
            form: {
                name: "",
                account: "",
            },
            createForm: {
                ...this.createForm,
            },

            addUser: false,
        };
    },
    methods: {
        handleSearch(form) {
            console.log("submit!");
            this.$post("/user/getUserList", {
                name: form.name,
                account: form.account,
                pageNum: 1,
                pageSize: 10,
            })
                .then((res) => {
                    this.displayForm = res.resultList;
                    this.totalpage = res.totalpage;
                    this.totalCount = res.totalCount;

                    // 业务代码
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        handleClose(done) {
            this.$confirm("确认关闭？")
                .then((_) => {
                    done();
                })
                .catch((_) => {});
        },
        handleDelete(id) {
            this.$post("/user/deleteUser", { id: id, pageNum: 1, pageSize: 10 })
                .then((res) => {
                    this.displayForm = res.resultList;
                    this.totalpage = res.totalpage;
                    this.totalCount = res.totalCount;
                })
                .catch(function (error) {
                    console.log(error);
                });
        },

        handleAddUser(flag) {
            if (flag) { this.createForm = {};
                (this.addUser = true), (this.dialogStatus = "addUser");
            } else {
                this.addUser = false;
            }
        },

        createUser(form,flag) {
            if(flag === "addUser"){
                this.$post("/user/insertUser", {
                name: form.name,
                account: form.account,
                password: form.password,
                sex: form.sex,
                mobilePhone: form.mobilePhone,
                mail: form.mail,
            })
                .then((res) => {
                    this.addUser = false;
                    this.createForm = {};
                    this.displayForm = res.resultList;
                    this.totalpage = res.totalpage;
                    this.totalCount = res.totalCount;
                })
                .catch(function (error) {
                    console.log(error);
                });
            }else{
                this.$post("/user/updateUser", {
                id:form.id,
                name: form.name,
                account: form.account,
                password: form.password,
                sex: form.sex,
                mobilePhone: form.mobilePhone,
                mail: form.mail,
            })
                .then((res) => {
                    this.addUser = false;
                    this.createForm = {};
                    this.displayForm = res.resultList;
                    this.totalpage = res.totalpage;
                    this.totalCount = res.totalCount;
                })
                .catch(function (error) {
                    console.log(error);
                });
            }
        },
        editUser(id) {
            this.dialogStatus = "editUser";
            this.createForm = {},
            (this.addUser = true),
                this.$post("/user/getUserList", {
                    id,
                })
                    .then((res) => {
                        this.createForm = res.resultList[0];
                        this.totalpage = res.totalpage;
                        this.totalCount = res.totalCount;
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
        },
        handleCurrentChange(val) {
            this.$post("/user/getUserList", {
                pageNum: val,
                pageSize: this.pageSize,
            })
                .then((res) => {
                    this.tableData = res.resultList;
                    this.totalpage = res.totalpage;
                    this.totalCount = res.totalCount;
                    this.pageNum = val;
                    this.pageSize = this.pageSize;
                    // 业务代码
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        handleSizeChange(val) {
            this.$post("/user/getUserList", {
                pageNum: this.pageNum,
                pageSize: val,
            })
                .then((res) => {
                    this.tableData = res.resultList;
                    this.totalpage = res.totalpage;
                    this.totalCount = res.totalCount;
                    this.pageSize = val;
                    this.pageNum = this.pageNum;
                    // 业务代码
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
    },
    mounted() {
        this.$post("/user/getUserList", { pageNum: 1, pageSize: 10 })
            .then((res) => {
                this.displayForm = res.resultList;
                this.totalpage = res.totalpage;
                this.totalCount = res.totalCount;

                // 业务代码
            })
            .catch(function (error) {
                console.log(error);
            });
    },
};
</script>

<style>
.el-form--inline .el-form-item__label {
    float: left;
}

.main {
    font-size: 30px;
    color: #000000;
    border: #000000;
}
.header-title {
    margin: 0px;
}
.el-row {
    margin-bottom: 20px;
    &:last-child {
        margin-bottom: 0;
    }
}
.el-col {
    border-radius: 4px;
}
.bg-purple-dark {
    background: #99a9bf;
}
.bg-purple {
    background: #d3dce6;
}
.bg-purple-light {
    background: #e5e9f2;
}
.grid-content {
    border-radius: 4px;
    min-height: 36px;
}
.row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
}
</style>
