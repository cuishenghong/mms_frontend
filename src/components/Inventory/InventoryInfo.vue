<template>
    <div class="main">
        <el-form
            :inline="true"
            :model="selectForm"
            class="demo-form-inline"
            style="line-height: 80px !important"
        >
            <el-form-item label="产品名称">
                <el-input
                    v-model="selectForm.productionName"
                    placeholder="产品名称"
                ></el-input>
            </el-form-item>
            <el-form-item label="产品类型">
                <el-input
                    v-model="selectForm.productionType"
                    placeholder="产品类型"
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
        >
        <el-table :data="displayForm" border style="width: 100%">
            <el-table-column prop="productionName" label="产品名称">
            </el-table-column>
            <el-table-column prop="productionType" label="产品类型">
            </el-table-column>
            <el-table-column prop="per" label="每套个数"> </el-table-column>
            <el-table-column prop="suite" label="套数"> </el-table-column>
            <el-table-column prop="arrivalBatch" label="到货批次" width="200">
            </el-table-column>
            <el-table-column prop="inventoryWarning" label="库存预警">
            </el-table-column>
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
            <el-table-column
                prop="remark"
                label="备注"
                width="100"
            ></el-table-column>
            <el-table-column fixed="right" label="操作" width="100">
                <template slot-scope="scope">
                    <el-button
                        @click="handleClick(scope.row)"
                        type="text"
                        size="small"
                        >查看</el-button
                    >
                    <el-button
                        @click="editInven(scope.row.id)"
                        type="text"
                        size="small"
                        >编辑</el-button
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
        return {
           
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
            this.$router.push({
                name: "InventoryInfoAdd",
                params: { flag: "addInven" },
            });
        },
        editInven(id) {
            this.$router.push({
                name: "InventoryInfoAdd",
                params: { flag: "editInven", id },
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
        this.$post("/inventory/getInventoryList", { pageNum: 1, pageSize: 10 })
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
