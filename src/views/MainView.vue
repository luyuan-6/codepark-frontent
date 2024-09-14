<!--首页-->
<template>
  <div class="main">
    <!--    左边-->
    <div
      style="
        width: 65%;
        height: 100%;
        float: left;
        margin-left: 40px;
        z-index: -20;
        font-family: Microsoft YaHei UI Light;
      "
    >
      <!--      轮播图-->
      <a-carousel
        :style="{
          width: '99%',
          height: '440px',
          marginLeft: '0',
          marginTop: '100px',
        }"
        style="z-index: 0"
        :default-current="1"
        :auto-play="true"
      >
        <a-carousel-item>
          <img
            src="../assets/user/mainT.jpg"
            :style="{
              width: '100%',
            }"
          />
        </a-carousel-item>
        <a-carousel-item>
          <img
            src="../assets/user/mainT1.jpg"
            :style="{
              width: '100%',
            }"
          />
        </a-carousel-item>
        <a-carousel-item>
          <img
            src="../assets/user/mainT2.jpg"
            :style="{
              width: '100%',
            }"
          />
        </a-carousel-item>
        <a-carousel-item>
          <img
            src="../assets/user/mainT3.jpg"
            :style="{
              width: '100%',
            }"
          />
        </a-carousel-item>
        <a-carousel-item>
          <img
            src="../assets/user/mainT4.jpg"
            :style="{
              width: '100%',
            }"
          />
        </a-carousel-item>
        <a-carousel-item>
          <img
            src="../assets/user/mainT5.png"
            :style="{
              width: '100%',
            }"
          />
        </a-carousel-item>
        <a-carousel-item>
          <img
            src="../assets/user/mainT6.png"
            :style="{
              width: '100%',
            }"
          />
        </a-carousel-item>
      </a-carousel>
      <!--      推荐-->
      <div style="width: 100%; height: 210px; margin-top: 10px">
        <h2 class="H2Title">推荐</h2>
        <a-row class="grid-demo">
          <a-col :span="8">
            <img
              src="../assets/user/mainTJ1.jpg"
              style="
                width: 96%;
                border-radius: 20px;
                height: 160px;
                object-fit: cover;
              "
              alt=""
            />
          </a-col>
          <a-col :span="8">
            <img
              src="../assets/user/mainTJ2.png"
              style="
                width: 96%;
                border-radius: 20px;
                height: 160px;
                object-fit: cover;
              "
            />
          </a-col>
          <a-col :span="8">
            <img
              src="../assets/user/mainTJ3.jpg"
              style="
                width: 96%;
                border-radius: 20px;
                height: 160px;
                object-fit: cover;
              "
            />
          </a-col>
        </a-row>
      </div>
      <!--      学习计划-->
      <div style="width: 100%; height: 250px">
        <div style="position: marker; width: 100%; height: 40px">
          <h2 class="H2Title">学习计划</h2>
          <a href="#">
            <h4 class="H4Link">查看更多</h4>
          </a>
        </div>
        <div
          v-for="dat in courseInfo"
          :key="dat.id"
          style="
            background-color: white;
            width: 33%;
            float: left;
            position: marker;
            margin-top: 6px;
            margin-left: 2px;
            height: 100px;
            border-radius: 10px;
          "
        >
          <!--              图片（封面）-->
          <a-avatar
            :size="74"
            shape="square"
            :image-url="dat.url"
            style="margin-top: 13px; margin-left: 10px; float: left"
          >
          </a-avatar>
          <!--              描述-->
          <div
            style="
              width: 65%;
              height: 80px;
              /*background-color: #42b983;*/
              margin-left: 90px;
              margin-top: 10px;
            "
          >
            <br />
            <h3 style="top: 20px" class="p">{{ dat.name }}</h3>
            <br />
            <h4 style="color: #5d5d5d" class="p">{{ dat.description }}</h4>
          </div>
        </div>
      </div>
      <!--          讨论-->
      <div style="width: 99.5%; height: 86%">
        <div
          style="position: marker; width: 100%; height: 40px; margin-top: 10px"
        >
          <h2 class="H2Title">讨论</h2>
        </div>
        <div
          style="
            width: 100%;
            height: 99%;
            background-color: white;
            border-radius: 20px;
          "
        >
          <!--          标签页开始-->
          <a-tabs
            default-active-key="1"
            style="margin-top: 10px; width: 95%; margin-left: 20px"
          >
            <a-tab-pane key="1" title="全部">
              <a-scrollbar style="height: 750vh; overflow: auto">
                <div v-for="n in 20" :key="n">
                  <a-list
                    :max-height="255"
                    class="list-demo-action-layout"
                    :bordered="false"
                    v-for="(t, index) in listTaoLun"
                    :key="index - 1"
                  >
                    <a-list-item
                      class="list-demo-item"
                      action-layout="vertical"
                    >
                      <template #actions>
                        <span><icon-heart />{{ t.ofLikes }}</span>
                        <span><icon-star />{{ t.ofFavorites }}</span>
                        <span><icon-message />{{ t.numberOfComments }}</span>
                      </template>
                      <template #extra>
                        <div className="image-area">
                          <!--                        配图1-->
                          <img alt="配图" :src="t.imageSrc" />
                        </div>
                      </template>
                      <a-list-item-meta :title="t.title">
                        <template #description>
                          <p
                            style="
                              width: 500px;
                              overflow: hidden;
                              text-overflow: ellipsis;
                              display: -webkit-box;
                              -webkit-line-clamp: 3;
                              -webkit-box-orient: vertical;
                            "
                          >
                            {{ t.description }}
                          </p>
                        </template>
                        <template #avatar>
                          <a-avatar shape="square">
                            <img alt="头像" :src="t.avatarSrc" />
                          </a-avatar>
                        </template>
                      </a-list-item-meta>
                    </a-list-item>
                  </a-list>
                </div>
              </a-scrollbar>
            </a-tab-pane>
            <a-tab-pane key="2" title="算法">
              Content of Tab Panel 2
            </a-tab-pane>
            <a-tab-pane key="3" title="数据结构">
              Content of Tab Panel 3
            </a-tab-pane>
            <a-tab-pane key="4" title="题目交流">
              Content of Tab Panel 4
            </a-tab-pane>
            <a-tab-pane key="5" title="职业发展">
              Content of Tab Panel 5
            </a-tab-pane>
            <a-tab-pane key="6" title="竞赛">Content of Tab Panel 6</a-tab-pane>
            <a-tab-pane key="7" title="前端">Content of Tab Panel 6</a-tab-pane>
            <a-tab-pane key="8" title="后端">Content of Tab Panel 6</a-tab-pane>
          </a-tabs>
        </div>
      </div>
    </div>
    <!--    右边   -->
    <div
      style="
        float: right;
        width: 29%;
        /*background-color: rgb(128, 74, 40);*/
        display: inline;
        margin-right: 40px;
      "
    >
      <!--   输入框-->
      <a-space
        direction="vertical"
        size="large"
        style="margin-top: 100px; z-index: 90; width: 100%; position: fixed"
      >
        <a-input-search
          :style="{ width: '400px', height: '47px', fontSize: '10px' }"
          placeholder="搜索一下吧~"
        />
      </a-space>
      <!--      日历框-->
      <div
        style="
          width: 400px;
          height: 400px;
          z-index: 90;
          position: fixed;
          margin-top: 160px;
        "
      >
        <div :style="{ display: 'flex' }">
          <a-card
            :style="{ width: '100%', borderRadius: '20px', height: '400px' }"
            title="今日计划"
          >
            <p>{{ currentDate }}</p>
            <br />
            <a-list
              :max-height="270"
              @reach-bottom="fetchData"
              :scrollbar="true"
            >
              <a-list-item v-for="task in tasks" :key="task.id">
                {{ task.description }}
              </a-list-item>
            </a-list>
          </a-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import moment from "moment"; // 引入moment.js库

// 当前日期
const currentDate = ref("");

// 今天的任务列表
const tasks = ref([
  { id: 1, description: "早上：晨跑" },
  { id: 2, description: "上午：阅读技术文档" },
  { id: 3, description: "下午：编写代码" },
  { id: 4, description: "晚上：与朋友视频聊天" },
  { id: 5, description: "晚上：与朋友视频聊天" },
  { id: 6, description: "晚上：与朋友视频聊天" },
  { id: 7, description: "晚上：与朋友视频聊天" },
  { id: 8, description: "晚上：与朋友视频聊天" },
]);

// 初始化日期
onMounted(() => {
  currentDate.value = moment().format("YYYY年MM月DD日");
});

//学习计划显示数据
const courseInfo = ref([
  {
    id: 1,
    name: "前端开发",
    description: "前端开发前端开发前端开发前端开发前端开发前端开发前端开发",
    url: "../assets/user/mainGG.jpg",
  },
  {
    id: 2,
    name: "后端开发",
    description: "后端开发后端开发后端开发后端开发后端开发后端开发",
    url: "../assets/user/mainGG.jpg",
  },
  {
    id: 3,
    name: "全栈开发",
    description:
      "全栈开发全栈开发全栈开发全栈开发全栈开发全栈开发全栈开发全栈开发",
    url: "../assets/user/mainGG.jpg",
  },
  {
    id: 4,
    name: "人工智能",
    description: "人工智能人工智能人工智能人工智能",
    url: "../assets/user/mainGG.jpg",
  },
  {
    id: 5,
    name: "大数据",
    description: "大数据大数据",
    url: "../assets/user/mainGG.jpg",
  },
  {
    id: 6,
    name: "云计算",
    description: "云计算云计算云计算云计算",
    url: "../assets/user/mainGG.jpg",
  },
]);

//列表
const listTaoLun = ref([
  {
    title: "Socrates",
    ofLikes: 100,
    ofFavorites: 20,
    numberOfComments: 17,
    avatarSrc:
      "//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp",
    imageSrc:
      "//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/29c1f9d7d17c503c5d7bf4e538cb7c4f.png~tplv-uwbnlip3yd-webp.webp",
    description:
      "Beijing ByteDance Technology Co., Ltd. is an enterprise located in China.Beijing ByteDance Technology Co., Ltd. is an enterprise located in China.Beijing ByteDance Technology Co., Ltd. is an enterprise located in China.Beijing ByteDance Technology Co., Ltd. is an enterprise located in China. ByteDance has products such as TikTok, Toutiao, volcano video and Douyin (the Chinese version of TikTok).",
  },
  {
    title: "Balzac",
    ofLikes: 99,
    ofFavorites: 12,
    numberOfComments: 77,
    avatarSrc:
      "//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/e278888093bef8910e829486fb45dd69.png~tplv-uwbnlip3yd-webp.webp",
    imageSrc:
      "//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/04d7bc31dd67dcdf380bc3f6aa07599f.png~tplv-uwbnlip3yd-webp.webp",
    description:
      "Beijing ByteDance Technology Co., Ltd. is an enterprise located in China. ByteDance has products such as TikTok, Toutiao, volcano video and Douyin (the Chinese version of TikTok).",
  },
  {
    title: "Plato",
    ofLikes: 998,
    ofFavorites: 100,
    numberOfComments: 45,
    avatarSrc:
      "//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/9eeb1800d9b78349b24682c3518ac4a3.png~tplv-uwbnlip3yd-webp.webp",
    imageSrc:
      "//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/1f61854a849a076318ed527c8fca1bbf.png~tplv-uwbnlip3yd-webp.webp",
    description:
      "Beijing ByteDance Technology Co., Ltd. is an enterprise located in China. ByteDance has products such as TikTok, Toutiao, volcano video and Douyin (the Chinese version of TikTok).",
  },
]);
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
.main {
  width: 100%;
  height: 100%;
  background: linear-gradient(
    271deg,
    rgba(92, 156, 252, 0.65),
    rgb(255, 255, 255)
  ); /*渐变颜色*/
}
.H2Title {
  margin-left: 20px;
  float: left;
  margin-top: 10px;
  margin-bottom: 5px;
  color: #416dfc;
  font-family: "Microsoft YaHei UI Light";
  text-shadow: 2px 2px 2px rgba(138, 138, 138, 0.61); /* 添加阴影效果 */
}
.H4Link {
  margin-right: 20px;
  margin-top: 10px;
  float: right;
  color: #416dfc;
}
.grid-demo {
  width: 100%;
  height: 80%;
  margin-top: 10px;
}
.p {
  width: 100%; /* 设置容器宽度 */
  text-overflow: ellipsis; /* 超出部分用省略号表示 */
  overflow: hidden; /* 超出部分隐藏 */
  white-space: nowrap; /* 文本不换行，这样超出一行的部分被截取，显示... */
}

/*列表*/
.list-demo-action-layout .image-area {
  width: 183px;
  height: 119px;
  border-radius: 2px;
  overflow: hidden;
}

.list-demo-action-layout .list-demo-item {
  padding: 20px 0;
  border-bottom: 1px solid var(--color-fill-3);
}

.list-demo-action-layout .image-area img {
  width: 100%;
}

.list-demo-action-layout .arco-list-item-action .arco-icon {
  margin: 0 4px;
}
</style>
