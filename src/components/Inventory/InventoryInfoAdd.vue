<template>
    <div class="main">
        <el-form
            :inline="true"
            :model="selectForm"
            class="demo-form-inline"
            style="line-height: 80px !important"
        >
            <el-form-item label="产品编号">
                <el-input
                    v-model="selectForm.productionId"
                    placeholder="产品编号"
                ></el-input>
            </el-form-item>
            <el-form-item label="创建人姓名">
                <el-input
                    v-model="selectForm.creator"
                    placeholder="创建人姓名"
                ></el-input>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="handleSearch(selectForm)"
                    >查询</el-button
                >
            </el-form-item>
        </el-form>
        <el-button
            class="add-button"
            type="success"
            @click="handleAddInven('1')"
            >新建库存</el-button
        >         <el-button @click="setCurrent()">取消所选产品</el-button>

        <el-table
        ref="displayForm" 
            :data="displayForm"
            border
            style="width: 100%"
            highlight-current-row
            @current-change="handleTableRowChange"
        >
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
            <el-table-column prop="color1" label="颜色1"></el-table-column
            ><el-table-column prop="color2" label="颜色2"></el-table-column>
            <el-table-column
                prop="creator"
                label="创建人"
                width="100"
            ></el-table-column>
            <el-table-column
                prop="createTime"
                label="创建日期"
                width="100"
            ></el-table-column>
            <el-table-column
                prop="modifier"
                label="修改人"
                width="100"
            ></el-table-column>
            <el-table-column
                prop="updateTime"
                label="修改日期"
                width="100"
            ></el-table-column>
          
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

        <el-dialog
            :title="titleMap[dialogStatus]"
            :visible.sync="addInven"
            width="60%"
            :before-close="handleClose"
        >
            <el-form ref="createForm" :model="createForm" label-width="80px">
                <el-row :gutter="20">
                    <el-col :span="12"
                        ><el-form-item label="产品编号">
                            <el-input
                                v-model="createForm.productionId"
                            ></el-input> </el-form-item
                    ></el-col>
                    <el-col :span="12"
                        ><el-form-item label="每套个数">
                            <el-input
                                v-model="createForm.per"
                            ></el-input> </el-form-item
                    ></el-col>
                </el-row>
                <el-row :gutter="20"
                    ><el-col :span="12"
                        ><el-form-item label="套数">
                            <el-input
                                v-model="createForm.suite"
                            ></el-input> </el-form-item
                    ></el-col>

                    <el-col :span="12"
                        ><el-form-item label="创建人姓名">
                            <el-input
                                v-model="createForm.creator"
                            ></el-input> </el-form-item
                    ></el-col>
                </el-row>

                <el-form-item>
                    <el-button
                        type="primary"
                        @click="createInven(createForm, dialogStatus)"
                    >
                        创建
                    </el-button>
                    <el-button @click="handleAddInven(false)">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
export default {
    data() {
        var pageSize = 10;
        var pageNum = 1;
        return {
            titleMap: {
                addInven: "新增库存",
                editInven: "编辑库存信息",
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

            addInven: false,
        };
    },
    methods: {
        handleSearch(form) {
            this.$post("/inventory/getInventoryList", {
                id: form.productionId,
                creator: form.creator,
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
        handleAddInven(flag) {
            if (flag) {
                this.createForm = {};
                (this.addInven = true), (this.dialogStatus = "addInven");
            } else {
                this.addInven = false;
            }
        },
        createInven(form, flag) {
            if (flag === "addInven") {
                this.$post("/inventory/insertInventory", {
                    productionId: form.productionId,
                    suite: form.suite,
                    per: form.per,
                    creator: form.creator,
                })
                    .then((res) => {
                        this.addInven = false;
                        this.createForm = {};
                        this.displayForm = res.resultList;
                        this.totalpage = res.totalpage;
                        this.totalCount = res.totalCount;
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            } else {
                this.$post("/user/updateUser", {
                    id: form.id,
                    productionId: form.productionId,
                    suite: form.suite,
                    per: form.per,
                    creator: form.creator,
                })
                    .then((res) => {
                        this.addInven = false;
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
        editInven(id) {
            this.dialogStatus = "editInven";
            (this.createForm = {}),
                (this.addInven = true),
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

        handleClick(row) {
            this.$router.push({
                name: "InventoryDetail",
                params: { id: row.id },
            });
        },
        handleTableRowChange(val) {
            this.currentRow = val;
        },
        setCurrent(row) {
            this.$refs.displayForm.setCurrentRow(row);
        },
        handleCurrentChange(val) {
            this.$post("/inventory/getInventoryList", {
                pageNum: val,
                pageSize: this.pageSize,
            })
                .then((res) => {
                    this.selectForm = res.resultList;
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
            this.$post("/inventory/getInventoryList", {
                pageNum: this.pageNum,
                pageSize: val,
            })
                .then((res) => {
                    this.selectForm = res.resultList;
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
