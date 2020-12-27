<template>
    <div class="main">
        <el-form
            :inline="true"
            :model="selectForm"
            class="demo-form-inline"
            style="line-height: 80px !important"
        >
            <el-form-item label="商品名称">
                <el-input
                    v-model="selectForm.productionName"
                    placeholder="商品名称"
                ></el-input>
            </el-form-item>
            <el-form-item label="商品类型">
                <el-input
                    v-model="selectForm.productionType"
                    placeholder="商品类型"
                ></el-input>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="handleSearch(selectForm)"
                    >查询</el-button
                >
            </el-form-item>
        </el-form>
        <el-button class="add-button" type="success" @click="handleAddProd('1')"
            >新增用户</el-button
        >
        <el-dialog
            :title="titleMap[dialogStatus]"
            :visible.sync="addProd"
            width="60%"
            :before-close="handleClose"
        >
            <el-form ref="createForm" :model="createForm" label-width="80px">
                <el-row :gutter="20">
                    <el-col :span="12"
                        ><el-form-item label="商品名称">
                            <el-input
                                v-model="createForm.productionName"
                            ></el-input> </el-form-item
                    ></el-col>
                    <el-col :span="12"
                        ><el-form-item label="商品种类">
                            <el-select
                                v-model="createForm.productionType"
                                placeholder="商品种类"
                                ><el-option
                                    label="透明碗"
                                    value="3"
                                ></el-option>
                                <el-option label="套碗" value="2"></el-option>
                                <el-option label="单碗" value="1"></el-option>
                            </el-select> </el-form-item
                    ></el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="12"
                        ><el-form-item label="频率">
                            <el-input
                                v-model="createForm.frequency"
                            ></el-input> </el-form-item
                    ></el-col>
                    <el-col :span="12"
                        ><el-form-item label="是否包">
                            <el-select
                                v-model="createForm.pack"
                                placeholder="是否包"
                            >
                                <el-option label="否" value="2"></el-option>
                                <el-option label="是" value="1"></el-option>
                            </el-select> </el-form-item
                    ></el-col>
                </el-row>
                <el-row :gutter="20"
                    ><el-col :span="12"
                        ><el-form-item label="音调">
                            <el-input
                                v-model="createForm.pitch"
                            ></el-input> </el-form-item
                    ></el-col>
                    <el-col :span="12"
                        ><el-form-item label="尺寸">
                            <el-input
                                v-model="createForm.size"
                            ></el-input> </el-form-item></el-col
                ></el-row>

                <el-row :gutter="20">
                    <el-col :span="12"
                        ><el-form-item label="颜色1">
                            <el-input
                                v-model="createForm.color1"
                            ></el-input> </el-form-item
                    ></el-col>
                    <el-col :span="12"
                        ><el-form-item label="颜色2">
                            <el-input
                                v-model="createForm.color2"
                            ></el-input> </el-form-item></el-col
                ></el-row>
                <el-form-item>
                    <el-button
                        type="primary"
                        @click="createProd(createForm, dialogStatus)"
                    >
                        创建
                    </el-button>
                    <el-button @click="handleAddProd(false)">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <el-table :data="displayForm" border style="width: 100%">
            <el-table-column fixed prop="productionName" label="商品名称">
            </el-table-column>
            <el-table-column prop="productionType" label="商品类型"
                ><template slot-scope="scope">{{
                    scope.row.sex === "1"
                        ? "单碗"
                        : scope.row.sex === "2"
                        ? "套碗"
                        : "透明碗"
                }}</template></el-table-column
            >
            <el-table-column prop="frequency" label="频率"></el-table-column>
            <el-table-column prop="sex" label="是否包"
                ><template slot-scope="scope">{{
                    scope.row.sex === "1" ? "是" : "否"
                }}</template></el-table-column
            >
            <el-table-column prop="pitch" label="音调"></el-table-column>
            <el-table-column prop="size" label="尺寸"></el-table-column>
            <el-table-column
                prop="color1"
                label="颜色1"
             ></el-table-column
            ><el-table-column
                prop="color2"
                label="颜色2"
             ></el-table-column>
            <el-table-column
                prop="creator"
                label="创建人"  width="100"
             ></el-table-column>
            <el-table-column
                prop="createTime"
                label="创建日期"  width="100"
             ></el-table-column>
            <el-table-column
                prop="modifier"
                label="修改人"  width="100"
             ></el-table-column>
            <el-table-column
                prop="updateTime"
                label="修改日期"  width="100"
             ></el-table-column>
            <el-table-column
                prop="remark"
                label="备注"  width="100"
             ></el-table-column>
            <el-table-column fixed="right" label="操作" width="100">
                <template slot-scope="scope">
                    <el-button
                        @click="editProd(scope.row.id)"
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
                addProd: "新增用户",
                editProd: "编辑用户信息",
            },
            dialogStatus: "",
            displayForm: this.displayForm,
            totalpage: this.totalpage,
            totalCount: this.totalCount,
            pageSize: this.pageSize,
            pageNum: this.pageNum,
            selectForm: {
                productionName: "",
                productionType: "",
            },
            form: {
                productionName: "",
                productionType: "",
            },
            createForm: {
                ...this.createForm,
            },

            addProd: false,
        };
    },
    methods: {
        handleSearch(form) {
            console.log("submit!");
            this.$post("/production/getProdList", {
                productionName: form.productionName,
                productionType: form.productionType,
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
            this.$post("/production/deleteProd", { id: id, pageNum: 1, pageSize: 10 })
                .then((res) => {
                    this.displayForm = res.resultList;
                    this.totalpage = res.totalpage;
                    this.totalCount = res.totalCount;
                })
                .catch(function (error) {
                    console.log(error);
                });
        },

        handleAddProd(flag) {
            if (flag) {
                this.createForm = {};
                (this.addProd = true), (this.dialogStatus = "addProd");
            } else {
                this.addProd = false;
            }
        },

        createProd(form, flag) {
            if (flag === "addProd") {
                this.$post("/production/insertProd", {
                    productionName: form.productionName,
                    productionType: form.productionType,
                    size: form.size,
                    pitch: form.pitch,
                    pack: form.pack,
                    frequency: form.frequency,
                    color1: form.color1,
                    color2: form.color2,
                })
                    .then((res) => {
                        this.addProd = false;
                        this.createForm = {};
                        this.displayForm = res.resultList;
                        this.totalpage = res.totalpage;
                        this.totalCount = res.totalCount;
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            } else {
                this.$post("/production/updateProd", {
                    id: form.id,
                     productionName: form.productionName,
                    productionType: form.productionType,
                    size: form.size,
                    pitch: form.pitch,
                    pack: form.pack,
                    frequency: form.frequency,
                    color1: form.color1,
                    color2: form.color2,
                })
                    .then((res) => {
                        this.addProd = false;
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
        editProd(id) {
            this.dialogStatus = "editProd";
            (this.createForm = {}),
                (this.addProd = true),
                this.$post("/production/getProdList", {
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
            this.$post("/production/getProdList", {
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
            this.$post("/production/getProdList", {
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
        this.$post("/production/getProdList", { pageNum: 1, pageSize: 10 })
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
