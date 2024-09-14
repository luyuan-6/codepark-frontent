<template>
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
    <template #judgeInfo="{ record }">
      <a-tag :color="handleColor(record.judgeInfo.message)">
        {{ record?.judgeInfo?.message || "编译出错" }}
      </a-tag>
    </template>
    <template #judgeTime="{ record }">
      <icon-schedule />
      {{
        record.judgeInfo.time === null ? "N/A" : `${record.judgeInfo.time} ms`
      }}
    </template>
    <template #judgeMemory="{ record }">
      <icon-bug />
      {{
        record.judgeInfo.memory === null
          ? "N/A"
          : `${record.judgeInfo.memory} kb`
      }}
    </template>
    <template #createTime="{ record }">
      {{ moment(record.createTime).format("YYYY-MM-DD HH:mm:ss") }}
    </template>
  </a-table>
</template>
<script setup lang="ts">
import { onMounted, ref, watchEffect } from "vue";
import {
  QuestionControllerService,
  QuestionSubmitQueryRequest,
} from "../../generated";
import message from "@arco-design/web-vue/es/message";
import { useRoute } from "vue-router";
import moment from "moment";
import { useStore } from "vuex";

// 初始化数据
const dataList = ref([]);
// 数据记录条数
const total = ref(0);
const route = useRoute();
// 获取问题Id
const questionId = route.params.id as any;

// 获取用户信息
const store = useStore();
const user = store.state.user.loginUser;
// 分页参数
const searchParams = ref<QuestionSubmitQueryRequest>({
  questionId: questionId,
  userId: user.id,
  language: undefined,
  pageSize: 8,
  current: 1,
});
// 从后端获取数据
const loadData = async () => {
  const res = await QuestionControllerService.listQuestionSubmitByPageUsingPost(
    {
      ...searchParams.value,
      sortField: "createTime",
      sortOrder: "descend",
    }
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
    title: "编程语言",
    dataIndex: "language",
  },
  {
    title: "判题信息",
    slotName: "judgeInfo",
  },
  {
    title: "执行时间",
    slotName: "judgeTime",
  },
  {
    title: "内存消耗",
    slotName: "judgeMemory",
  },
  {
    title: "创建时间",
    slotName: "createTime",
  },
];

const handleColor = (record: any): string => {
  if (record === "通过") {
    return "green";
  } else {
    return "red";
  }
};

const doSubmit = () => {
  // 需要重置搜索页号
  searchParams.value = {
    ...searchParams.value,
    current: 1,
  };
};
</script>
<style scoped></style>
