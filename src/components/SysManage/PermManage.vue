<template>
    <div class="main">
        <el-form
            :inline="true"
            :model="selectForm"
            class="demo-form-inline"
        >
            <el-form-item label="权限名称">
                <el-input
                    v-model="selectForm.permissionName"
                    placeholder="权限名称"
                ></el-input>
            </el-form-item>
            <el-form-item label="描述">
                <el-input
                    v-model="selectForm.remark"
                    placeholder="描述"
                ></el-input>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="handleSearch(selectForm)"
                    >查询</el-button
                >
            </el-form-item>
        </el-form>
        <el-button class="add-button" type="success" @click="handleAdd('1')"
            >新增权限</el-button
        >
   
 
         <el-dialog
            :title="titleMap[dialogStatus]"
            :visible.sync="add"
            width="60%"
            :before-close="handleClose"
        >
            <el-form ref="createForm" :model="createForm" label-width="80px">
                <el-row :gutter="20">
                    <el-col :span="12"
                        ><el-form-item label="权限名称">
                            <el-input
                                v-model="createForm.permissionName"
                            ></el-input> </el-form-item
                    ></el-col>
                    <el-col :span="12"
                        ><el-form-item label="描述">
                            <el-input
                                v-model="createForm.remark"
                            ></el-input> </el-form-item
                    ></el-col>
                </el-row>

                <el-form-item>
                    <el-button type="primary" @click="create(createForm)">
                        创建
                    </el-button>
                    <el-button @click="handleAdd(false)">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <el-table :data="displayForm" border style="width: 100%">
            <el-table-column
                fixed
                prop="permissionName"
                label="权限名称"
                width="250"
            >
            </el-table-column>
            <el-table-column
                prop="permissionName"
                label="角色列表"
                width="250"
            >
            </el-table-column>
            <el-table-column
                prop="remark"
                label="描述"
                width="320"
            ></el-table-column>
            <el-table-column fixed="right" label="操作" width="200">
                <template slot-scope="scope">
                    <el-button
                        @click="edit(scope.row.id)"
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
                    <el-button
                        @click="handleConfig(scope.row.id)"
                        type="text"
                        size="small"
                        >配置</el-button
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
                add: "新增权限",
                edit: "编辑权限",
            },
            dialogStatus: "",
            displayForm: this.displayForm,
            totalpage: this.totalpage,
            totalCount: this.totalCount,
            pageSize: this.pageSize,
            pageNum: this.pageNum,
            selectForm: {
                permissionName: "",
                remark: "",
            },
            form: {
                permissionName: "",
                remark: "",
            },
            createForm: {
                ...this.createForm,
            },

            add: false,
        };
    },
    methods: {
        handleSearch(form) {
            debugger;
            console.log("submit!");
            this.$post("/permission/getPermissionList", {
                permissionName: form.permissionName,
                remark: form.remark,
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
            this.$post("/permission/deletePermission", {
                id: id,
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

        handleAdd(flag) {
            if (flag) {
                this.createForm = {};
                (this.add = true), (this.dialogStatus = "add");
            } else {
                this.add = false;
            }
        },

        create(form) {
            this.$post("/permission/insertPermission", {
                permissionName: form.permissionName,
                remark: form.remark,
            })
                .then((res) => {
                    this.add = false;
                    this.createForm = {};
                    this.displayForm = res.resultList;
                    this.totalpage = res.totalpage;
                    this.totalCount = res.totalCount;
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        edit(id) {
            this.dialogStatus = "edit";
            (this.add = true),
                this.$post("/permission/getPermissionList", {
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
            this.$post("/permission/getPermissionList", {
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
            this.$post("/permission/getPermissionList", {
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
        this.$post("/permission/getPermissionList", {
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
};
</script>
<<<<<<< HEAD

=======
>>>>>>> ae9ea8b128f1ad3cf4938a252349c2ad31382aa8
