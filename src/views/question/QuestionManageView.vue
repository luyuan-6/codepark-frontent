<template>
  <div id="manageQuestionView"></div>
  <a-table
    :columns="columns"
    :data="dataList"
    :pagination="{
      showTotal: true,
      pageSize: searchParams.pageSize,
      current: searchParams.current,
      total,
    }"
    @page-change="onPageChange"
  >
    <template #content="{ record }">
      <a-collapse :bordered="false">
        <a-collapse-item header="详情内容" key="1">
          <div>{{ record.content }}</div>
        </a-collapse-item>
      </a-collapse>
    </template>

    <template #tags="{ record }">
      <a-space wrap>
        <a-tag v-for="(tag, index) of record.tags" :key="index" color="#0fc6c2"
          >{{ tag }}
        </a-tag>
      </a-space>
    </template>

    <!--    <template #judgeConfig="{ record }">-->
    <!--      <a-space>-->
    <!--        <icon-schedule />-->
    <!--        时间限制-->
    <!--        {{ record.judgeConfig.timeLimit }} ms-->
    <!--      </a-space>-->
    <!--      <a-space>-->
    <!--        <icon-bug />-->
    <!--        内存限制-->
    <!--        {{ record.judgeConfig.memoryLimit }} kb-->
    <!--      </a-space>-->
    <!--    </template>-->
    <template #timeLimit="{ record }">
      <icon-schedule />
      {{ record.judgeConfig.timeLimit }} ms
    </template>
    <template #memoryLimit="{ record }">
      <icon-bug />
      {{ record.judgeConfig.memoryLimit }} kb
    </template>
    <template #createTime="{ record }">
      {{ moment(record.createTime).format("YYYY-MM-DD HH:mm:ss") }}
    </template>
    <template #optional="{ record }">
      <a-space>
        <a-button type="primary" @click="doUpdate(record)">
          <icon-pen-fill />
          修改
        </a-button>
        <a-button status="danger" @click="doDelete(record)">
          <icon-delete />
          删除
        </a-button>
      </a-space>
    </template>
  </a-table>
</template>

<script setup lang="ts">
import { onMounted, ref, watch, watchEffect } from "vue";
import { Question, QuestionControllerService } from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import { useRouter } from "vue-router";
import moment from "moment/moment";

// 初始化数据
const dataList = ref([]);
// 数据记录条数
const total = ref(0);
// 分页参数
const searchParams = ref({
  pageSize: 8,
  current: 1,
});
// 从后端获取数据
const loadData = async () => {
  const res = await QuestionControllerService.listQuestionVoByPageUsingPost(
    searchParams.value
  );
  console.log("res", res);
  if (res.code === 0) {
    // 获取分页后的记录
    dataList.value = res.data.records;
    // 获取总记录数
    total.value = res.data.total;
  } else {
    message.error("加载失败" + res.message);
  }
};

// 分页操作显示页面第一步
const onPageChange = (page: number) => {
  searchParams.value = {
    ...searchParams.value,
    current: page,
  };
};
/**
 * 监听searchParams 变量 改变时触发页面的重新加载
 */
watchEffect(() => {
  loadData();
});

// 页面加载时候更新数据
onMounted(() => {
  loadData();
});

// 设置表格列 与返回数据对应
const columns = [
  {
    title: "题号",
    dataIndex: "id",
  },
  {
    title: "标题",
    dataIndex: "title",
  },
  {
    title: "内容",
    slotName: "content",
  },
  {
    title: "标签",
    dataIndex: "tags",
    slotName: "tags",
  },
  // {
  //   title: "判题配置",
  //   dataIndex: "judgeConfig",
  //   slotName: "judgeConfig",
  // },
  {
    title: "时间限制",
    slotName: "timeLimit",
  },
  {
    title: "内存限制",
    slotName: "memoryLimit",
  },
  // {
  //   title: "判题用例",
  //   dataIndex: "judgeCase",
  //   // slotName: "judgeCase",
  // },
  {
    title: "用户id",
    dataIndex: "userId",
  },
  {
    title: "创建时间",
    slotName: "createTime",
  },
  {
    title: "操作",
    slotName: "optional",
  },
];

const router = useRouter();
// 更新操作
const doUpdate = (question: Question) => {
  // 跳转到修改页面
  router.push({
    path: "/update/question",
    // 传入id 便于后续的查询回显老数据
    query: {
      id: question.id,
    },
  });
};
// 删除操作
const doDelete = async (question: Question) => {
  const res = await QuestionControllerService.deleteQuestionUsingPost1({
    id: question.id,
  });
  if (res.code === 0) {
    message.success("删除成功");
    // 重新加载数据
    loadData();
  } else {
    message.error("删除失败");
  }
};
</script>

<style scoped>
#manageQuestionView {
  max-width: 1280px;
  margin: 0 auto;
}
</style>
