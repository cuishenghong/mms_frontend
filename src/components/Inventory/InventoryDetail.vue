<template>
    <div
        class="main"
        v-loading="isRequest"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
    >
        <div>
            <i class="el-icon-back float-left back-font" @click="handleBack()">返回 </i>
            <h5 class="header-title">{{ msg }}</h5>
        </div>
        <el-form
            ref="form"
            :model="form"back-font
            label-width="80px"
            class="detail-form"
        >
            <el-row>
                <el-col :span="12">
                    <el-form-item label="商品名字">
                        <el-input
                            v-model="form && form.productionName"
                            disabled
                        ></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="商品类型">
                        <div
                            class="production-type"
                            v-if="form && form.productionType === '1'"
                        >
                            单碗
                        </div>
                        <div
                            class="production-type"
                            v-else-if="form && form.productionType === '2'"
                        >
                            套碗
                        </div>
                        <div
                            class="production-type"
                            v-else-if="form && form.productionType === '3'"
                        >
                            透明碗
                        </div>
                        <div class="production-type" v-else>单碗</div>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="个">
                        <el-input
                            v-model="form && form.per"
                            disabled
                        ></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="套">
                        <el-input
                            v-model="form && form.suite"
                            disabled
                        ></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="到货批次">
                        <el-input
                            v-model="form && form.arrivalBatch"
                            disabled
                        ></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="频率">
                        <el-input
                            v-model="form && form.frequency"
                            disabled
                        ></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="尺寸">
                        <el-input
                            v-model="form && form.size"
                            disabled
                        ></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="音调">
                        <el-input
                            v-model="form && form.pitch"
                            disabled
                        ></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="颜色1">
                        <el-input
                            v-model="form && form.color1"
                            disabled
                        ></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="颜色2">
                        <el-input
                            v-model="form && form.color2"
                            disabled
                        ></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="包">
                        <el-input
                            v-model="form && form.pack"
                            disabled
                        ></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="库存预警">
                        <el-input
                            v-model="form && form.inventoryWarning"
                            disabled
                        ></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="创建人">
                        <el-input
                            v-model="form && form.creatorId"
                            disabled
                        ></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="创建时间">
                        <el-input
                            v-model="form && form.createTime"
                            disabled
                        ></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="修改人">
                        <el-input
                            v-model="form && form.creatorId"
                            disabled
                        ></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="修改时间">
                        <el-input
                            v-model="form && form.createTime"
                            disabled
                        ></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            msg: "库存详情",
            form: this.form,
            isRequest: this.isRequest,
        };
    },
    methods: {
        handleBack() {
            this.$router.push({
                name: "Inventory",
            });
        },
    },
    mounted() {
        if (this.$route.params.id) {
            this.isRequest = true;
            this.$post("/inventory/getInventoryList", {
                id: this.$route.params.id,
            })
                .then((res) => {
                    this.code = res.code;
                    this.form = res.resultList[0];
                    this.isRequest = false;
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    },
};
</script>
