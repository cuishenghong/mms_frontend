<template>
    <div class="main">
        <el-form
            :inline="true"
            :model="selectForm"
            class="demo-form-inline"
            style="line-height: 80px !important"
        >
            <el-form-item label="角色名称">
                <el-input
                    v-model="selectForm.roleName"
                    placeholder="角色名称"
                ></el-input>
            </el-form-item>
            <el-form-item label="角色编码">
                <el-input
                    v-model="selectForm.roleCode"
                    placeholder="角色编码"
                ></el-input>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="handleSearch(selectForm)"
                    >查询</el-button
                >
            </el-form-item>
        </el-form>
        <el-button class="add-button" type="success" @click="handleAddRole('1')"
            >新增角色</el-button
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
                        ><el-form-item label="角色名称">
                            <el-input
                                v-model="createForm.roleName"
                            ></el-input> </el-form-item
                    ></el-col>
                    <el-col :span="12"
                        ><el-form-item label="角色编码">
                            <el-input
                                v-model="createForm.roleCode"
                            ></el-input> </el-form-item
                    ></el-col>
                </el-row>
                <el-row :gutter="20"
                    ><el-col :span="24"
                        ><el-form-item label="描述">
                            <el-input
                                v-model="createForm.roleDescription"
                            ></el-input> </el-form-item></el-col
                ></el-row>

                <el-form-item>
                    <el-button
                        type="primary"
                        @click="createRole(createForm, dialogStatus)"
                    >
                        创建
                    </el-button>
                    <el-button @click="handleAddRole(false)">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <el-table :data="displayForm" border style="width: 100%">
            <el-table-column fixed prop="roleName" label="角色名称" width="150">
            </el-table-column>
            <el-table-column prop="roleCode" label="角色编码"></el-table-column>
            <el-table-column prop="creator" label="创建人"></el-table-column>
            <el-table-column
                prop="createTime"
                label="创建日期"
            ></el-table-column>
            <el-table-column prop="modifier" label="修改人"></el-table-column>
            <el-table-column
                prop="updateTime"
                label="修改日期"
            ></el-table-column>
            <el-table-column
                prop="roleDescription"
                label="描述"
                width="200"
            ></el-table-column>
            <el-table-column fixed="right" label="操作">
                <template slot-scope="scope">
                    <el-button
                        @click="editRole(scope.row.id)"
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
                addRole: "新增角色",
                editRole: "编辑角色",
            },
            dialogStatus: "",
            displayForm: this.displayForm,
            totalpage: this.totalpage,
            totalCount: this.totalCount,
            pageSize: this.pageSize,
            pageNum: this.pageNum,
            selectForm: {
                roleName: "",
                roleCode: "",
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
            this.$post("/role/getRoleList", {
                name: form.name,
                account: form.account,
                pageNum: 1,
                pageSize: 10,
            })
                .then((res) => {
                    this.displayForm = res.resultList;
                    this.totalpage = res.totalpage;
                    this.totalCount = res.totalCount;
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
            this.$post("/role/deleteRole", { id: id, pageNum: 1, pageSize: 10 })
                .then((res) => {
                    this.displayForm = res.resultList;
                    this.totalpage = res.totalpage;
                    this.totalCount = res.totalCount;
                })
                .catch(function (error) {
                    console.log(error);
                });
        },

        handleAddRole(flag) {
            if (flag) {
                this.createForm = {};
                (this.addUser = true), (this.dialogStatus = "addRole");
            } else {
                this.addUser = false;
            }
        },

        createRole(form, flag) {
            if (flag === "addRole") {
                this.$post("/role/insertRole", {
                    roleName: form.roleName,
                    roleCode: form.roleCode,
                    roleDescription: form.roleDescription,
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
            } else {
                this.$post("/role/updateRole", {
                    id: form.id,
                    roleName: form.roleName,
                    roleCode: form.roleCode,
                    roleDescription: form.roleDescription,
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
        editRole(id) {
            this.dialogStatus = "editRole";
            (this.createForm = {}),
                (this.addUser = true),
                this.$post("/role/getRoleList", {
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
            this.$post("/role/getRoleList", {
                pageNum: val,
                pageSize: this.pageSize,
            })
                .then((res) => {
                    this.displayForm = res.resultList;
                    this.totalpage = res.totalpage;
                    this.totalCount = res.totalCount;
                    this.pageNum = val;
                    this.pageSize = this.pageSize;
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        handleSizeChange(val) {
            this.$post("/role/getRoleList", {
                pageNum: this.pageNum,
                pageSize: val,
            })
                .then((res) => {
                    this.displayForm = res.resultList;
                    this.totalpage = res.totalpage;
                    this.totalCount = res.totalCount;
                    this.pageSize = val;
                    this.pageNum = this.pageNum;
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
    },
    mounted() {
        this.$post("/role/getRoleList", { pageNum: 1, pageSize: 10 })
            .then((res) => {
                this.displayForm = res.resultList;
                this.totalpage = res.totalpage;
                this.totalCount = res.totalCount;
            })
            .catch(function (error) {
                console.log(error);
            });
    },
};
</script>
