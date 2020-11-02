<template>
  <div class="nav">
    <div class="nav-a">
      <img src="./assets/logo.jpg" alt="上海鲜花港 - 郁金香" class="logo-img" />
      <ul class="nav-a-ul">
        <li
          class="nav-a-li"
          :class="classA == index ? 'active' : ''"
          @click="selected(index)"
          v-for="(item, index) in configNav"
        >
          <router-link
            :to="item.path"
            class="nav-a-text"
            @click="showToggle(index)"
            >{{ item.name }}</router-link
          >
          <ul class="menu_ul" :class="{ active: index === isShow }">
            <li
              class="menu_li"
              v-for="nav in item.subItems"
              :class="classB == nav ? 'active' : ''"
              @click="menuselected(nav)"
            >
              <router-link
                class="menu_ul_text"
                :to="nav.link"
                :class="{ active: nav.link == linkClick }"
                @click="treeNavSwitch(nav)"
                >{{ nav.text }}</router-link
              >
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      show: false,
      classA: 0,
      classB: 0,
      isShow: 0,
      linkClick: "",
      configNav: [
        {
          name: "首页",
          path: "/gwindex",
        },
        {
          name: "库存管理",
          path: "",
          subItems: [
            { link: "/education", text: "教学管理系统" },
            { link: "/yingxiaozhaosheng", text: "营销招生系统" },
            { link: "", text: "视频直播系统" },
            { link: "", text: "个性化定制服务" },
          ],
        },
        {
          name: "入库管理",
          path: "",
          subItems: [
            { link: "/education", text: "教学管理系统" },
            { link: "/yingxiaozhaosheng", text: "营销招生系统" },
            { link: "", text: "视频直播系统" },
            { link: "", text: "个性化定制服务" },
          ],
        },
        {
          name: "系统管理",
          path: "",
          subItems: [
            { link: "/education", text: "教学管理系统" },
            { link: "/yingxiaozhaosheng", text: "营销招生系统" },
            { link: "", text: "视频直播系统" },
            { link: "", text: "个性化定制服务" },
          ],
        },
        {
          name: "产品介绍",
          path: "",
          subItems: [
            { link: "/education", text: "教学管理系统" },
            { link: "/yingxiaozhaosheng", text: "营销招生系统" },
            { link: "", text: "视频直播系统" },
            { link: "", text: "个性化定制服务" },
          ],
        },
        {
          name: "渠道合作",
          path: "/partner",
        },
        {
          name: "关于我们",
          path: "/aboutour",
        },
      ],
    };
  },
  methods: {
    selected: function (index) {
      this.classA = index;
    },
    menuselected: function (nav) {
      this.classB = nav;
    },
    showToggle: function (index) {
      this.isShow = index;
    },
    treeNavSwitch: function (nav) {
      this.linkClick = nav.link;
    },
  },
};
</script>

<style scoped>
.nav {
  width: 80%;
  min-width: 1300px;
  height: auto;
  margin: 0px auto;
  position: absolute;
  border-bottom: none;
  line-height: 65px;
}
.nav-a {
  cursor: pointer;
  float: left;
  margin-left: 50px;
  letter-spacing: 4px;
  position: relative;
}
.nav-a-ul {
  list-style: none;
  background-color: aliceblue;
}
.nav-a-li {
  display: inline-block;
  margin-left: 30px;
  height: 60px;
}
.nav-a-text {
  font-size: 14px;
  line-height: 58px;
  text-decoration: none;
}
.menu_ul {
  width: 130px;
  list-style: none;
  background: #fff;
  border-radius: 3px;
  z-index: 999;
  position: absolute;
  top: 58px;
  left: 67px;
  display: none;
}
.menu_li {
  height: 30px;
  line-height: 30px;
  padding-left: 12px;
}
.menu_ul_text {
  font-size: 14px;
  color: #666;
  letter-spacing: 0;
  line-height: 30px;
  text-decoration: none;
  padding-left: 6px;
}
.nav-a-li:hover {
  border-bottom: 2px solid #fff;
}
.nav-a-li.active {
  border-bottom: 2px solid #fff;
}
/* .nav-a-li:active {
  border-bottom: 2px solid #fff;
} */
.nav-a-li:hover .menu_ul {
  display: block;
}
.menu_ul_text:hover {
  color: #2589ff;
}
.menu_li.active .menu_ul_text {
  color: #2589ff;
}
.logo-img {
  width: 40px;
}
</style>