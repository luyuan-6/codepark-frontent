<template>
  <div id="QuestionView">
    <a-card>
      <a-form :model="searchParams" layout="inline">
        <a-form-item field="questionid" label="题号" style="min-width: 240px">
          <a-input
            v-model="searchParams.questionId"
            placeholder="请输入提交号"
          />
        </a-form-item>
        <a-form-item field="language" label="编程语言" style="min-width: 240px">
          <a-select
            v-model="searchParams.language"
            :style="{ width: '320px' }"
            placeholder="选择编程语言"
          >
            <a-option>java</a-option>
            <a-option>cpp</a-option>
            <a-option>go</a-option>
            <a-option>python</a-option>
          </a-select>
        </a-form-item>
        <a-form-item>
          <a-button type="primary" @click="doSubmit">搜索</a-button>
        </a-form-item>
      </a-form>
    </a-card>

    <a-divider size="0" />
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
      <template #status="{ record }">
        {{ record?.status === 2 ? "判题成功" : "判题失败" }}
      </template>
      <template #createTime="{ record }">
        {{ moment(record.createTime).format("YYYY-MM-DD HH:mm:ss") }}
      </template>
    </a-table>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watchEffect } from "vue";
import {
  QuestionControllerService,
  QuestionSubmitQueryRequest,
} from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import { useRouter } from "vue-router";
import moment from "moment";

const tableRef = ref();
// 初始化数据
const dataList = ref([]);
// 数据记录条数
const total = ref(0);
// 分页参数
const searchParams = ref<QuestionSubmitQueryRequest>({
  questionId: undefined,
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
    title: "提交号",
    dataIndex: "id",
  },
  {
    title: "编程语言",
    dataIndex: "language",
  },
  {
    title: "判题信息",
    slotName: "judgeInfo",
  },
  {
    title: "判题状态",
    slotName: "status",
  },
  {
    title: "题目ID",
    dataIndex: "questionId",
  },
  // {
  //   title: "用户ID",
  //   dataIndex: "userId",
  // },
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
const router = useRouter();
const doSubmit = () => {
  // 需要重置搜索页号
  searchParams.value = {
    ...searchParams.value,
    current: 1,
  };
};
</script>

<style scoped>
#QuestionView {
  max-width: 1280px;
  margin: 0 auto;
}
</style>
