<template>
    <div class="main">
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
                    <el-button type="primary" @click="handleSearch(selectForm)"
                        >查询</el-button
                    >
                </el-form-item>
            </el-form>
         
            <el-button class="float-left" @click="setCurrent()">取消所选产品</el-button>

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
                <el-table-column prop="productionType" label="商品类型">
                    <template slot-scope="scope">
                        <div v-if="scope.row.productionType === '1'">单碗</div>
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
                <el-table-column prop="pitch" label="音调"></el-table-column>
                <el-table-column prop="size" label="尺寸"></el-table-column>
                <el-table-column prop="color1" label="颜色1"></el-table-column
                ><el-table-column prop="color2" label="颜色2"></el-table-column>
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
            createForm: {
                ...this.createForm,
            },

            addInven: false,
        };
    },
    methods: {
        handleSearch(form) {
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

        handleTableRowChange(val) {
            this.currentRow = val;
        },
        setCurrent(row) {
            this.$refs.displayForm.setCurrentRow(row);
        },
        handleCurrentChange(val) {
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
        this.$post("/production/getProdList", { pageNum: 1, pageSize: 10 })
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
