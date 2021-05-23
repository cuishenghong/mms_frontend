<template>

    <div class="dictionary">
        <el-form
            :inline="true"
            :model="selectForm"
            class="demo-form-inline"
        >
            <el-form-item label="字典名称">
                <el-input
                    v-model="selectForm.name"
                    placeholder="字典名称"
                ></el-input>
            </el-form-item>
            
            <el-form-item label="字典描述">
                <el-input
                    v-model="selectForm.remark"
                    placeholder="字典描述"
                ></el-input>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="handleSearch(selectForm)"
                    >查询</el-button
                >
            </el-form-item>
        </el-form>
        
        
        <el-dialog
            :title="titleMap[dialogStatus]"
            :visible.sync="addDict"
            width="60%"
            :before-close="handleClose"
        >
            <el-form ref="createForm" :model="createForm" label-width="80px">
                <el-row :gutter="20">
                    <el-col :span="12"
                        ><el-form-item label="字典名称">
                            <el-input
                                v-model="createForm.name"
                            ></el-input> </el-form-item
                    ></el-col>
                     <el-col :span="12"
                        ><el-form-item label="字典编码">
                            <el-input
                                v-model="createForm.code"
                            ></el-input> </el-form-item
                    ></el-col>
                </el-row>
                <el-row :gutter="20">
                    
                    <el-col><el-form-item label="字典描述">
                            <el-input
                                v-model="createForm.remark"
                            ></el-input> </el-form-item
                    ></el-col>
                </el-row>
               <el-form-item>
                    <el-button
                        type="primary"
                        @click="createDict(createForm, dialogStatus)"
                    >
                        创建
                    </el-button>
                    <el-button @click="handleaddDict(3)">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>

        <el-dialog
            :title="titleMap[dialogStatus]"
            :visible.sync="addDictDetail"
            width="60%"
            :before-close="handleClose"
        >
            <el-form ref="createForm" :model="createForm" label-width="80px">
                <el-row><el-col><el-input v-show="false" v-model="createForm.sequence"></el-input></el-col></el-row>
                <el-row :gutter="20">
                    <el-col :span="12"
                        ><el-form-item label="字典名称">
                            <el-input v-model="createForm.name"
                            ></el-input> </el-form-item
                    ></el-col>
                     <el-col :span="12"
                        ><el-form-item label="排序">
                            <el-input
                                v-model="createForm.sequence"
                            ></el-input> </el-form-item
                    ></el-col>
                </el-row>
                <el-row :gutter="20">
                    
                    <el-col :span="12"><el-form-item label="数据名称">
                            <el-input
                                v-model="createForm.codeName"
                            ></el-input> </el-form-item
                    ></el-col>
                    <el-col :span="12"><el-form-item label="数据编码">
                            <el-input
                                v-model="createForm.codeValue"
                            ></el-input> </el-form-item
                    ></el-col>
                </el-row>
               <el-form-item>
                    <el-button
                        type="primary"
                        @click="createDict(createForm, dialogStatus)"
                    >
                        创建
                    </el-button>
                    <el-button @click="handleaddDict(4)">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>

        <el-row :gutter="10">
            <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4"><div class="grid-content "></div></el-col>
            <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8"><div class="grid-content "><el-button class="add-button" type="success" @click="handleaddDict('1')"
            >新增字典类型</el-button
        ></div></el-col>
        <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8"><div class="grid-content "><el-button class="add-button" type="success" disabled
            >数据字典列表</el-button
        ></div></el-col>
        </el-row>
        <el-row :gutter="10">
            <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4"><div class="grid-content "></div></el-col>
            <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
                <div class="grid-content bg-purple">
                    <el-table ref="singleTable" :data="displayForm"  highlight-current-row @current-change="singleSelected" border style="width: 100%">
                    <el-table-column fixed type="index" label="序号" width="50"></el-table-column>
                    <el-table-column fixed prop="name" label="字典名称" width="100">
                    </el-table-column>
                    <el-table-column
                        prop="remark"
                        label="字典描述"
                    ></el-table-column>
                    <el-table-column
                        prop="creator"
                        label="创建人"
                        width="100"
                    ></el-table-column>
                    <el-table-column
                        prop="createTime"
                        label="创建日期"
                        width="160"
                    ></el-table-column>
                    <el-table-column
                        prop="modifier"
                        label="修改人"
                        width="100"
                    ></el-table-column>
                    <el-table-column
                        prop="updateTime"
                        label="修改日期"
                        width="160"
                    ></el-table-column>
                    
                    <el-table-column fixed="right" label="操作" width="140">
                        <template slot-scope="scope">
                            <el-button
                                @click="insertDictDetail(scope.row.id)"
                                type="text"
                                size="small"
                                >添加</el-button
                            >
                            <el-button
                                @click="editDict(scope.row.id)"
                                type="text"
                                size="small"
                                >编辑</el-button
                            >
                            <el-button
                                @click="handleDelete(scope.row.id,1)"
                                type="text"
                                size="small"
                                >删除</el-button
                            >
                        </template>
                    </el-table-column>
                </el-table>

                </div>
            
            </el-col>
            
            <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
                <div class="grid-content bg-purple-light">
                    <el-table :data="detailForm" border style="width: 100%">
                    <el-table-column fixed type="index" label="序号" width="50"></el-table-column>
                    <el-table-column fixed prop="name" label="字典名称" width="100">
                    </el-table-column>
                    <el-table-column
                        prop="codeName"
                        label="数据名称"
                        width="120"
                    ></el-table-column>
                    <el-table-column
                        prop="codeValue"
                        label="数据编码"
                    ></el-table-column>
                    <el-table-column
                        prop="sequence"
                        label="排序"
                    ></el-table-column>
                    <el-table-column fixed="right" label="操作" width="100">
                        <template slot-scope="scope">
                            <el-button
                                @click="editDictDetail(scope.row.id)"
                                type="text"
                                size="small"
                                >编辑</el-button
                            >
                            <el-button
                                @click="handleDelete(scope.row.id,2,scope.row.parentId,)"
                                type="text"
                                size="small"
                                >删除</el-button
                            >
                        </template>
                    </el-table-column>
                </el-table>
                </div>
            </el-col>
            <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4"><div class="grid-content ">

            </div>
            
            </el-col>
            
        </el-row>
            

        <el-row>
            <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4"><div class="grid-content "></div></el-col>
            <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
                <div class="grid-content">
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
            </el-col>
            <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
                <div class="grid-content">
                    <div class="block">
                        <el-pagination
                            @size-change="detailSizeChange"
                            @current-change="detailCurrentChange"
                            :current-page="1"
                            :page-sizes="[5, 10, 20, 30]"
                            :page-size="10"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="detailTotalCount"
                        >
                        </el-pagination>
                    </div>
                </div>
            </el-col>
            <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4"><div class="grid-content "></div></el-col>
        </el-row>
        
        
        
        
    </div>
</template>

<script>
export default {
    data() {
        var pageSize = 10;
        var pageNum = 1;
        var detailPageSize = 10;
        var detailPageNum = 1;
        
        console.log(this.createForm);
        return {
            titleMap: {
                addDict: "新增字典类型",
                editDict: "编辑字典类型",
                addDictDetail: "新增数据字典",
                editDictDetail: "编辑数据字典",
            },
            id: this.id,
            id: this.parentId,
            dialogStatus: "",
            displayForm: this.displayForm,
            detailForm: this.detailForm,
            totalpage: this.totalpage,
            totalCount: this.totalCount,
            pageSize: this.pageSize,
            pageNum: this.pageNum,
            detailTotalpage: this.detailTotalpage,
            detailTotalCount: this.detailTotalCount,
            detailPageSize: this.detailPageSize,
            detailPageNum: this.detailPageNum,
            selectForm: {
                name: "",
                remark: "",
            },
            form: {
                name: "",
                remark: "",
            },
            createForm: {
                ...this.createForm,
            },

            addDict: false,
            addDictDetail: false,
        };
    },
    methods: {
        handleSearch(form) {
            console.log("submit!");
            this.$post("/dictionary/getDictList", {
                type:1,
                name: form.name,
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
        handleDelete(id,typeFlag,parentId) {
            this.$post("/dictionary/deleteDictionary", { id: id, type:typeFlag, parentId:parentId,pageNum: 1, pageSize: 10 })
                .then((res) => {
                    if(typeFlag===1){
                        this.displayForm = res.resultList;
                        this.totalpage = res.totalpage;
                        this.totalCount = res.totalCount;
                    }else{
                        this.detailForm = res.resultList;
                        this.totalpage = res.totalpage;
                        this.totalCount = res.totalCount;
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },

        handleaddDict(flag) {
            if (flag == 1) {
                this.createForm = {};
                (this.addDict = true), (this.dialogStatus = "addDict");
            }else if(flag == 2) {
                this.createForm = {};
                (this.addDictDetail = true), (this.dialogStatus = "addDictDetail");
            }else if(flag == 3){
                this.addDict = false,(this.dialogStatus = "addDict");;
            }else if(flag == 4){
                this.addDictDetail = false,(this.dialogStatus = "editDictDetail");;
            }
        },

        createDict(form, flag) {
            if (flag === "addDict") {
                this.$post("/dictionary/insertDictionary", {
                    name: form.name,
                    codeName: form.codeName,
                    code: form.code,
                    sequence: form.sequence,
                    remark: form.remark,
                    
                })
                    .then((res) => {
                        this.addDict = false;
                        this.createForm = {};
                        this.displayForm = res.resultList;
                        this.totalpage = res.totalpage;
                        this.totalCount = res.totalCount;
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }else if(flag === "addDictDetail"){
                this.$post("/dictionary/insertDictionary", {
                    parentId: form.id,
                    name: form.name,
                    codeName: form.codeName,
                    codeValue: form.codeValue,
                    sequence: form.sequence,
                    
                })
                    .then((res) => {
                        this.addDictDetail = false;
                        this.createForm = {};
                        this.displayForm = res.resultList;
                        this.totalpage = res.totalpage;
                        this.totalCount = res.totalCount;
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }else{
                this.$post("/dictionary/updateDictionary", {
                    id: form.id,
                    name: form.name,
                    codeName: form.codeName,
                    code: form.code,
                    sequence: form.sequence,
                    remark: form.remark,
                })
                    .then((res) => {
                        this.addDict = false;
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
        
        insertDictDetail(id) {
            this.dialogStatus = "addDictDetail";
            (this.createForm = {}),
                (this.addDictDetail = true),
                this.$post("/dictionary/getDictList", {
                    id,type:1,
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

        editDict(id) {
            this.dialogStatus = "editDict";
            (this.createForm = {}),
                (this.addDict = true),
                this.$post("/dictionary/getDictList", {
                    id,type:1,
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
        editDictDetail(id){
            this.dialogStatus = "editDictDetail";
            (this.createForm = {}),
                (this.addDictDetail = true),
                this.$post("/dictionary/getDictList", {
                    id,type:2,
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
            this.$post("/dictionary/getDictList", {
                type:1,
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
            this.$post("/dictionary/getDictList", {
                type:1,
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
        detailSizeChange(val) {
            this.$post("/dictionary/getDictDetailList", {
                pageNum: this.detailPageNum,
                pageSize: val,
                id:this.id,
            })
                .then((res) => {
                    this.detailForm = res.resultList;
                    this.detailTotalpage = res.totalpage;
                    this.detailTotalCount = res.totalCount;
                    this.detailPageSize = val;
                    this.detailPageNum = this.detailPageNum;
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        detailCurrentChange(val) {
            this.$post("/dictionary/getDictDetailList", {
                pageNum: val,
                pageSize: this.detailPageSize,
                id:this.id,
            })
                .then((res) => {
                    this.detailForm = res.resultList;
                    this.detailTotalpage = res.totalpage;
                    this.detailTotalCount = res.totalCount;
                    this.detaiPageNum = val;
                    this.detailPageSize = this.detailPageSize;
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        setCurrent(row) {
            this.$refs.singleTable.setCurrentRow(row);
        },
        singleSelected(val) {
            this.currentRow = val;
            this.id = this.currentRow.id;
            this.$post("/dictionary/getDictDetailList", {
                    parentId:this.currentRow.id,
                })
                .then((res) => {
                    this.detailForm = res.resultList;
                    this.detailTotalpage = res.totalpage;
                    this.detailTotalCount = res.totalCount;
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
    },
    mounted() {
        this.$post("/dictionary/getDictList", {type:1, pageNum: 1, pageSize: 10 })
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