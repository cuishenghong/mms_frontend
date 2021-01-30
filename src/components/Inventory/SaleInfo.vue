<template>
    <div
        class="main"
        v-loading="isRequest"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
    >
        <el-form
            :inline="true"
            :model="selectForm"
            class="demo-form-inline"
            style="line-height: 80px !important"
        >
            <el-form-item label="订单号">
                <el-input
                    v-model="selectForm.orderId"
                    placeholder="订单号"
                ></el-input>
            </el-form-item>
            <el-form-item label="产品名称">
                <el-input
                    v-model="selectForm.productionName"
                    placeholder="产品名称"
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
            >新建销售记录</el-button
        >
        <el-table :data="displayForm" border style="width: 100%">
            <el-table-column prop="productionName" label="产品名称">
            </el-table-column>

            <el-table-column prop="orderId" label="订单号"> </el-table-column>
            <el-table-column prop="amount" label="数量"> </el-table-column>
            <el-table-column prop="price" label="单价"> </el-table-column>
            <el-table-column prop="total" label="总价" width="200">
            </el-table-column>
            <el-table-column prop="faultType" label="问题件类型">
                <template slot-scope="scope">
                    <div v-if="scope.row.faultType === '1'">正常</div>
                    <div v-else-if="scope.row.faultType === '2'">运输损坏</div>
                    <div v-else-if="scope.row.faultType === '3'">销毁</div>
                    <div v-else-if="scope.row.faultType === '4'">其他</div>
                    <div v-else>正常</div>
                </template>
            </el-table-column>
            <el-table-column
                prop="faultDescription"
                label="问题件描述"
                width="100"
            ></el-table-column>
            <el-table-column
                prop="creator"
                label="创建人"
                width="100"
            ></el-table-column>
            <el-table-column
                prop="createTime"
                label="创建日期"
                width="150"
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
            <el-table-column fixed="right" label="操作" width="150">
                <template slot-scope="scope">
                    <el-button
                        @click="handleDetail(scope.row.id)"
                        type="text"
                        size="small"
                        >详情</el-button
                    >
                    <el-button
                        @click="editInven(scope.row.id, scope.row.productionId)"
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
        return {
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
            isRequest: this.isRequest,
        };
    },
    methods: {
        handleSearch(form) {
            this.isRequest = true;

            this.$post("/sale/getSaleList", {
                id: form.productionId,
                creator: form.creator,
                pageNum: 1,
                pageSize: 10,
            })
                .then((res) => {
                    this.displayForm = res.resultList;
                    this.totalpage = res.totalpage;
                    this.totalCount = res.totalCount;
                    this.isRequest = false;
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        handleAddInven(flag) {
            this.$router.push({
                name: "SaleInfoAdd",
                params: { flag: "addInven" },
            });
        },

        handleDetail(id) {
            this.$router.push({
                name: "InventoryDetail",
                params: { id },
            });
        },
        editInven(id, productionId) {
            this.$router.push({
                name: "SaleInfoAdd",
                params: { id, productionId },
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
            this.isRequest = true;

            this.$post("/sale/deleteSaleRecord", {
                id: id,
                pageNum: 1,
                pageSize: 10,
            })
                .then((res) => {
                    this.displayForm = res.resultList;
                    this.totalpage = res.totalpage;
                    this.totalCount = res.totalCount;
                    this.isRequest = false;
                })
                .catch(function (error) {
                    console.log(error);
                });
        },

        handleCurrentChange(val) {
            this.isRequest = true;

            this.$post("/sale/getSaleList", {
                pageNum: val,
                pageSize: this.pageSize,
            })
                .then((res) => {
                    this.displayForm = res.resultList;
                    this.totalpage = res.totalpage;
                    this.totalCount = res.totalCount;
                    this.pageNum = val;
                    this.pageSize = this.pageSize;
                    this.isRequest = false;
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        handleSizeChange(val) {
            this.isRequest = true;

            this.$post("/sale/getSaleList", {
                pageNum: this.pageNum,
                pageSize: val,
            })
                .then((res) => {
                    this.displayForm = res.resultList;
                    this.totalpage = res.totalpage;
                    this.totalCount = res.totalCount;
                    this.pageSize = val;
                    this.pageNum = this.pageNum;
                    this.isRequest = false;
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
    },
    mounted() {
        this.isRequest = true;

        this.$post("/sale/getSaleList", { pageNum: 1, pageSize: 10 })
            .then((res) => {
                this.displayForm = res.resultList;
                this.totalpage = res.totalpage;
                this.totalCount = res.totalCount;
                this.isRequest = false;
            })
            .catch(function (error) {
                console.log(error);
            });
    },
};
</script>
