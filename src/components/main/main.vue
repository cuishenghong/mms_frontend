<template>
  <div class="main">
    <h1>{{ msg }}</h1>
    <el-table
    :data="tableData"
    border
    style="width: 100%">
      <el-table-column
        fixed
        prop="createTime"
        label="创建日期"
        width="150">
      </el-table-column>
      <el-table-column
        prop="creator"
        label="创建人姓名"
        width="120">
      </el-table-column>
      <el-table-column
        prop="arrivalBatch"
        label="到货日期"
        width="120">
      </el-table-column>
      <el-table-column
        prop="inventoryWarning"
        label="库存预警"
        width="120">
      </el-table-column>
      <el-table-column
        prop="per"
        label="每套个数"
        width="300">
      </el-table-column>
      <el-table-column
        prop="productionId"
        label="产品编号"
        width="120">
      </el-table-column> 
      <el-table-column
        prop="suite"
        label="套数"
        width="120">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
          <el-button type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>



    <div class="block">
      <span class="demonstration">页数较少时的效果</span>
      <el-pagination
        layout="prev, pager, next"
        :total="50">
      </el-pagination>
    </div>
    <div class="block">
      <span class="demonstration">大于 7 页时的效果</span>
      <el-pagination
        layout="prev, pager, next"
        :total="1000">
      </el-pagination>
    </div>
      
  </div>
</template>

<script>
  export default {
    data () {
      return {
        msg: '库存表',
        tableData:this.tableData,
      }
    },
    methods: {
      handleClick(row) {
        console.log(row);
      }
    },
    mounted () {
        this.$post('/inventory/getInventoryList',{})
        .then(res => {
           this.tableData=res.resultList
         // 业务代码
        }).catch(function(error){
          console.log(error);
        })

    }
  }
</script>

<style>
  .main {
    font-size: 30px;
    color: #000000;
  }
</style>