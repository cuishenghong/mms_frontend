<template>
    <div class="main">
        <h1 class="header-title">{{ msg }}</h1>
        <el-table :data="tableData" border style="width: 100%">
            <el-table-column
                fixed
                prop="createTime"
                label="创建日期"
                width="150"
            >
            </el-table-column>
            <el-table-column prop="creator" label="创建人姓名" width="120">
            </el-table-column>
            <el-table-column prop="arrivalBatch" label="到货日期" width="120">
            </el-table-column>
            <el-table-column
                prop="inventoryWarning"
                label="库存预警"
                width="120"
            >
            </el-table-column>
            <el-table-column prop="per" label="每套个数" width="300">
            </el-table-column>
            <el-table-column prop="productionId" label="产品编号" width="120">
            </el-table-column>
            <el-table-column prop="suite" label="套数" width="120">
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="100">
                <template slot-scope="scope">
                    <el-button
                        @click="handleClick(scope.row)"
                        type="primary"
                        size="small"
                        >查看</el-button
                    >
                    <el-button type="text" size="small">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="block">
            <span class="demonstration">完整功能</span>
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
            msg: "库存表",
            tableData: this.tableData,
            totalpage: this.totalpage,
            totalCount: this.totalCount,
            pageSize: this.pageSize,
            pageNum: this.pageNum,
        };
    },
    methods: {
        handleClick(row) {
            // this.$router.push({ path: "/ProductionInfo" });
            this.$router.push({
                name: "ProductionInfo",
                params: { id: row.id },
            });
        },
        handleCurrentChange(val) {
            this.$post("/inventory/getInventoryList", {
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
            this.$post("/inventory/getInventoryList", {
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
        this.$post("/inventory/getInventoryList", { pageNum: 1, pageSize: 10 })
            .then((res) => {
                this.tableData = res.resultList;
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
.main {
    font-size: 30px;
    color: #000000;
}
.header-title {
    margin: 0px;
}
</style>
