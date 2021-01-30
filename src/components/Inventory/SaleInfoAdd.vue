<template>
    <div>
        <div>
        <i class="el-icon-back float-left" @click="handleBack()"
            >返回库存信息</i
        ></div>
        <div
            class="main"
            v-loading="isRequest"
            element-loading-text="拼命加载中"
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(0, 0, 0, 0.8)"
        >
            <div class="container-submit">
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
                        <el-button
                            type="primary"
                            @click="handleSearch(selectForm)"
                            >查询</el-button
                        >
                    </el-form-item>
                </el-form>

                <el-button class="float-left" @click="setCurrent()"
                    >取消所选产品</el-button
                >

                <el-table
                    ref="displayForm"
                    :data="displayForm"
                    border
                    style="width: 100%"
                    highlight-current-row
                    @current-change="handleTableRowChange"
                >
                    <el-table-column
                        fixed
                        prop="productionName"
                        label="商品名称"
                    >
                    </el-table-column>
                    <el-table-column prop="productionType" label="商品类型">
                        <template slot-scope="scope">
                            <div v-if="scope.row.productionType === '1'">
                                单碗
                            </div>
                            <div v-else-if="scope.row.productionType === '2'">
                                套碗
                            </div>
                            <div v-else-if="scope.row.productionType === '3'">
                                透明碗
                            </div>
                            <div v-else>单碗</div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="frequency"
                        label="频率"
                    ></el-table-column>
                    <el-table-column prop="pack" label="是否包"
                        ><template slot-scope="scope">{{
                            scope.row.pack === "1" ? "是" : "否"
                        }}</template></el-table-column
                    >
                    <el-table-column
                        prop="pitch"
                        label="音调"
                    ></el-table-column>
                    <el-table-column prop="size" label="尺寸"></el-table-column>
                    <el-table-column
                        prop="color1"
                        label="颜色1"
                    ></el-table-column
                    ><el-table-column
                        prop="color2"
                        label="颜色2"
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

                <el-form
                    ref="createForm"
                    :model="createForm"
                    label-width="80px"
                >
                    <el-row :gutter="20">
                        <el-col :span="12"
                            ><el-form-item label="到货批次">
                                <el-input
                                    v-model="createForm.arrivalBatch"
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
                        <el-col :span="12">
                            <el-form-item label="库存预警">
                                <el-select
                                    v-model="createForm.inventoryWarning"
                                    placeholder="库存预警"
                                >
                                    <el-option
                                        label="库存不足"
                                        value="3"
                                    ></el-option>
                                    <el-option
                                        label="预警"
                                        value="2"
                                    ></el-option>
                                    <el-option
                                        label="正常"
                                        value="1"
                                    ></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-form-item>
                        <el-button
                            type="primary"
                            @click="handleCreate(createForm)"
                            :disabled="disabled"
                        >
                            创建
                        </el-button>
                        <el-button @click="handleAddProd(false)"
                            >取消</el-button
                        >
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
import _ from "lodash";

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
            createForm: {
                ...this.createForm,
            },
            addInven: false,
            selectedProdId: "",
            disabled: true,
            currentRow: this.createForm,
            isRequest: this.isRequest,
        };
    },
    methods: {
        handleBack() {
            this.$router.push({
                name: "SaleInfo",
            });
        },
        handleSearch(form) {
            this.isRequest = true;
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
                    this.isRequest = false;
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        handleAddProd() {
            this.$router.push({
                name: "Inventory",
            });
        },
        handleCreate(form) {
            if (!this.$route.params.id) {
                this.isRequest = true;

                this.$post("/inventory/insertInventory", {
                    productionId: this.selectedProdId,
                    arrivalBatch: form.arrivalBatch,
                    per: form.per,
                    suite: form.suite,
                    inventoryWarning: form.inventoryWarning,
                })
                    .then((res) => {
                        this.$router.push({
                            name: "Inventory",
                        });
                        this.addProd = false;
                        this.createForm = {};
                        this.displayForm = res.resultList;
                        this.totalpage = res.totalpage;
                        this.totalCount = res.totalCount;
                        this.isRequest = false;
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            } else {
                this.isRequest = true;

                this.$post("/inventory/updateInventory", {
                    id: this.$route.params.id,
                    productionId: this.selectedProdId,
                    arrivalBatch: form.arrivalBatch,
                    per: form.per,
                    suite: form.suite,
                    inventoryWarning: form.inventoryWarning,
                })
                    .then((res) => {
                        this.$router.push({
                            name: "Inventory",
                        });
                        this.addProd = false;
                        this.createForm = {};
                        this.displayForm = res.resultList;
                        this.totalpage = res.totalpage;
                        this.totalCount = res.totalCount;
                        this.isRequest = false;
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
        },
        handleTableRowChange(val) {
            this.currentRow = val;
            this.selectedProdId = val && val.id;
            this.disabled = false;
        },
        setCurrent(row) {
            this.$refs.displayForm.setCurrentRow(row);
            this.selectedProdId = "";
            this.disabled = true;
        },
        handleCurrentChange(val) {
            this.isRequest = true;
            this.$post("/production/getProdList", {
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
            this.$post("/production/getProdList", {
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
        this.$post("/production/getProdList", { pageNum: 1, pageSize: 10 })
            .then((res) => {
                this.displayForm = res.resultList;
                this.totalpage = res.totalpage;
                this.totalCount = res.totalCount;
                var prodList = res.resultList;
                if (this.$route.params.id) {
                    var editProductionId = this.$route.params.productionId;
                    var prodArray = { id: editProductionId };

                    this.$post("/inventory/getInventoryList", {
                        id: this.$route.params.id,
                    })
                        .then((res) => {
                            this.createForm = res.resultList[0];
                            var a = _.findIndex(prodList, prodArray);
                            this.currentRow = prodList[a];
                            this.$refs.displayForm.setCurrentRow(prodList[a]);
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                }
                this.isRequest = false;
            })
            .catch(function (error) {
                console.log(error);
            });
    },
};
</script>
