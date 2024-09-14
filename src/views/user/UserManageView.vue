<template>
  <div id="QuestionView">
    <a-form :model="searchParams" layout="inline">
      <a-form-item
        field="userAccount"
        label="用户账号"
        style="min-width: 240px"
      >
        <a-input
          v-model="searchParams.userAccount"
          placeholder="请输入用户账号"
        />
      </a-form-item>
      <a-form-item field="userName" label="用户昵称" style="min-width: 240px">
        <a-input v-model="searchParams.userName" placeholder="请输入用户昵称" />
      </a-form-item>
      <a-form-item field="userRole" label="身份" style="min-width: 240px">
        <a-input v-model="searchParams.userRole" placeholder="请输入身份" />
      </a-form-item>
      <a-form-item>
        <a-button type="primary" @click="doSubmit">提交</a-button>
      </a-form-item>
    </a-form>
    <a-divider :size="'0'"></a-divider>
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
      <template #userAvatar="{ record }">
        <a-avatar :size="70" shape="circle">
          <img alt="头像" :src="record?.userAvatar" />
        </a-avatar>
      </template>
      <template #createTime="{ record }">
        {{ moment(record.createTime).format("YYYY-MM-DD") }}
      </template>

      <template #optional="{ record }">
        <a-space>
          <a-button type="primary" @click="handleClick(record)"> 修改</a-button>
          <a-popconfirm content="你确定要删除吗？">
            <a-button status="danger" @click="doDelete(record)"> 删除</a-button>
          </a-popconfirm>
        </a-space>
      </template>
    </a-table>

    <a-modal
      v-model:visible="visible"
      title="修改用户信息"
      @cancel="handleCancel"
      @before-ok="handleBeforeOk"
    >
      <a-form :model="form">
        <a-form-item field="id" label="用户id">
          <a-input v-model="form.id" />
        </a-form-item>
        <a-form-item field="userAccount" label="用户账号">
          <a-input v-model="form.userAccount" />
        </a-form-item>
        <a-form-item field="userName" label="用户昵称">
          <a-input v-model="form.userName" />
        </a-form-item>
        <a-form-item field="userRole" label="用户身份">
          <a-select v-model="form.userRole">
            <a-option value="user">user</a-option>
            <a-option value="admin">admin</a-option>
          </a-select>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watchEffect } from "vue";
import {
  User,
  UserControllerService,
  UserQueryRequest,
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
const searchParams = ref<UserQueryRequest>({
  userName: "",
  userAccount: "",
  userRole: "",
  pageSize: 8,
  current: 1,
});
// 从后端获取数据
const loadData = async () => {
  const res = await UserControllerService.listUserByPageUsingPost(
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
    title: "用户id",
    dataIndex: "id",
  },
  {
    title: "用户账号",
    dataIndex: "userAccount",
  },
  {
    title: "用户昵称",
    dataIndex: "userName",
  },
  {
    title: "头像",
    slotName: "userAvatar",
  },
  {
    title: "用户身份",
    dataIndex: "userRole",
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
const doSubmit = () => {
  // 需要重置搜索页号
  searchParams.value = {
    ...searchParams.value,
    current: 1,
  };
};

// const doUpdate = (user: User) => {};

const doDelete = async (user: User) => {
  const res = await UserControllerService.deleteUserUsingPost({ id: user.id });
  if (res.code === 0) {
    message.success("删除成功");
    // 重新加载数据
    loadData();
  } else {
    message.error("删除失败");
  }
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

const visible = ref(false);
const form = ref({
  id: undefined,
  userAccount: "",
  userName: "",
  userRole: "",
});

const handleClick = async (user: User) => {
  visible.value = true;
  const id = user.id;
  const res = await UserControllerService.getUserByIdUsingGet(id);
  if (res.code === 0) {
    console.log(res);
    form.value.id = res.data.id;
    form.value.userRole = res.data.userRole;
    form.value.userAccount = res.data.userAccount;
    form.value.userName = res.data.userName;
  } else {
    message.error("加载失败" + res.message);
  }
};
const handleBeforeOk = async (done: () => void) => {
  console.log(form);
  const res = await UserControllerService.updateUserUsingPost({
    ...form.value,
  });
  if (res.code === 0) {
    message.success("更新成功");
    loadData();
  } else {
    message.error("更新失败");
  }
  // window.setTimeout(() => {
  //   done();
  //   // prevent close
  //   // done(false)
  // }, 3000);
};
const handleCancel = () => {
  visible.value = false;
};
</script>

<style scoped>
#QuestionView {
  max-width: 1280px;
  margin: 0 auto;
}
</style>
