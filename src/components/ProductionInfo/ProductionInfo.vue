<template>
    <div class="main">
        <h1 class="header-title">{{ msg }}</h1>
        <el-form ref="form" :model="form" label-width="80px">
            <el-row>
                <el-col :span="12">
                    <el-form-item label="商品Id">
                        <el-input v-model="form.id" disabled></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="商品名字">
                        <el-input
                            v-model="form.productionName"
                            disabled
                        ></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="商品类型ID">
                        <el-input
                            v-model="form.productionTypeId"
                            disabled
                        ></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="频率">
                        <el-input v-model="form.frequency" disabled></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="尺寸">
                        <el-input v-model="form.size" disabled></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="音调">
                        <el-input v-model="form.pitch" disabled></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="颜色1">
                        <el-input v-model="form.color1" disabled></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="颜色2">
                        <el-input v-model="form.color2" disabled></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="包">
                        <el-input v-model="form.pack" disabled></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="创建人">
                        <el-input v-model="form.creatorId" disabled></el-input>
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
            msg: "详情",
            form: this.form,
        };
    },
    methods: {
        handleClick(row) {
            this.$router.push({ path: "/HelloWorld" });
            console.log(row);
        },
    },
    mounted() {
        this.$post("/production/getProdInfo", { id: this.$route.params.id })
            .then((res) => {
                this.code = res.code;
                this.form = res.prodInfo;
                console.log(this.form);
                // 业务代码
            })
            .catch(function (error) {
                console.log(error);
            });
    },
};
</script>

