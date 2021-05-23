<template>
    <div id="NavMenu">
        <el-menu
            :default-active="activeIndex"
            class="el-menu-demo"
            mode="horizontal"
            @select="handleSelect"
            router
        >
            <template v-for="item in navMenuData">
                <el-menu-item :index="item.index" v-if="!item.child">{{
                    item.name
                }}</el-menu-item>

                <el-submenu :index="item.index" v-if="item.child">
                    <template slot="title">{{ item.name }}</template>
                    <template v-for="item2 in item.child">
                        <el-menu-item :index="item2.index">{{
                            item2.name
                        }}</el-menu-item>
                    </template>
                </el-submenu>
            </template>
        </el-menu>
    </div>
</template>

<script>
export default {
    name: "NavMenu",
    data() {
        return {
            activeIndex: "main",
            navMenuData: [
                { index: "main", name: "主页" },
                {
                    index: "Inventory",
                    name: "库存管理",
                    child: [
                        { index: "Inventory", name: "库存信息" },
                        { index: "SaleInfo", name: "销售信息" },
                    ],
                },

                {
                    index: "ProductionManage",
                    name: "产品管理",
                    child: [{ index: "ProductionManage", name: "产品管理" }],
                },

                {
                    index: "sysManage",
                    name: "系统管理",
                    child: [
                        { index: "userManage", name: "用户管理" },
                        { index: "roleManage", name: "角色管理" },
                        { index: "permManage", name: "权限管理" },
                        { index: "dictManage", name: "字典管理" },
                    ],
                },
                // { index: "not-found", name: "NotFound" },
                {
                    index: "2",
                    name: "我的工作台",
                    child: [
                        { index: "2-1", name: "选项1" },
                        { index: "2-2", name: "选项2" },
                        { index: "2-3", name: "选项3" },
                    ],
                },
            ],
        };
    },
    methods: {
        handleSelect(key, keyPath) {
            console.log(key, keyPath);
        },
    },
    mounted() {
        console.log(this.activeIndex);
        console.log(this.$route.path);
        this.activeIndex = this.$route.path.substring(
            1,
            this.$route.path.length
        );
    },
};
</script>

<style scoped></style>
