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

            <el-table-column prop="productionType" label="商品类型">
                <template slot-scope="scope">
                    <div v-if="scope.row.productionType === '1'">单碗</div>
                    <div v-else-if="scope.row.productionType === '2'">套碗</div>
                    <div v-else-if="scope.row.productionType === '3'">
                        透明碗
                    </div>
                    <div v-else>单碗</div>
                </template>
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
                        @click="editInven(scope.row.id)"
                        type="text"
                        size="small"
                        >编辑</el-button
                    > <el-button
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
       
          handleDetail(id) {            
             this.$router.push({
                name: "InventoryDetail",
                params: {  id  },
            });
        },
        editInven(id) {            
             this.$router.push({
                name: "InventoryInfoAdd",
                params: { flag: "editInven", id  },
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
            this.$post("/inventory/deleteInventory", { id: id, pageNum: 1, pageSize: 10 })
                .then((res) => {
                    this.displayForm = res.resultList;
                    this.totalpage = res.totalpage;
                    this.totalCount = res.totalCount;
                })
                .catch(function (error) {
                    console.log(error);
                });
        },

       
        handleCurrentChange(val) {
            this.$post("/inventory/getInventoryList", {
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
            this.$post("/inventory/getInventoryList", {
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
        this.$post("/inventory/getInventoryList", { pageNum: 1, pageSize: 10 })
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