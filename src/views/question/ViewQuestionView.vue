<template>
  <div id="viewQuestionView">
    <a-row :gutter="[24, 24]">
      <a-col :md="12" :xs="24">
        <a-card class="leftCard">
          <a-tabs default-active-key="question">
            <a-tab-pane key="question" title="题目">
              <a-card v-if="question" :title="question.title">
                <a-descriptions
                  title="判题条件"
                  :column="{ xs: 1, md: 2, lg: 3 }"
                >
                  <a-descriptions-item label="时间限制">
                    {{ question.judgeConfig.timeLimit ?? 0 }}
                  </a-descriptions-item>
                  <a-descriptions-item label="内存限制">
                    {{ question.judgeConfig.memoryLimit ?? 0 }}
                  </a-descriptions-item>
                  <a-descriptions-item label="堆栈限制">
                    {{ question.judgeConfig.stackLimit ?? 0 }}
                  </a-descriptions-item>
                </a-descriptions>
                <MdViewer :value="question.content || ''" />
                <template #extra>
                  <a-space wrap>
                    <a-tag
                      v-for="(tag, index) of question.tags"
                      :key="index"
                      color="green"
                      >{{ tag }}
                    </a-tag>
                  </a-space>
                </template>
              </a-card>
            </a-tab-pane>
            <a-tab-pane key="comment" title="评论">
              <QuestionComment />
            </a-tab-pane>
            <a-tab-pane key="answer" title="答案">暂时无法查看答案</a-tab-pane>
            <a-tab-pane key="record" title="提交记录">
              <SubmitView />
            </a-tab-pane>
          </a-tabs>
        </a-card>
      </a-col>
      <a-col :md="12" :xs="24">
        <a-card class="rightCard">
          <a-form v-model="form">
            <a-form-item
              field="language"
              label="编程语言"
              style="min-width: 240px"
            >
              <a-select
                v-model="form.language"
                :style="{ width: '320px' }"
                placeholder="选择编程语言"
              >
                <a-option>java</a-option>
                <a-option>python</a-option>
                <a-option>cpp</a-option>
                <a-option>c</a-option>
              </a-select>
            </a-form-item>
          </a-form>
          <CodeEditor
            :code="form.code"
            :language="form.language"
            :handle-change="changeCode"
          />
          <a-divider size="0" />
          <a-button
            status="success"
            style="margin-left: 550px; min-width: 100px"
            @click="doSubmit"
          >
            <icon-play-arrow-fill size="30px" />
            提交
          </a-button>
        </a-card>
      </a-col>
    </a-row>
  </div>
  <a-modal
    v-model:visible="judgePromptVisibleTrue"
    @cancel="handleCancel"
    :on-before-ok="handleBeforeOk"
    unmountOnClose
  >
    <template #title> Accept</template>
    <a-descriptions />
    <a-descriptions title="" :column="{ xs: 1, md: 2, lg: 3 }">
      <a-descriptions-item label="判题结果信息">
        {{ JugdeInfo.message }}
      </a-descriptions-item>
      <a-descriptions-item label="时间占用">
        {{ JugdeInfo.time }} ms
      </a-descriptions-item>
      <a-descriptions-item label="内存占用">
        {{ JugdeInfo.memory }} kb
      </a-descriptions-item>
    </a-descriptions>
    <h1>AC AC 陈冠希都没你帅哦！</h1>
  </a-modal>
  <a-modal
    v-model:visible="judgePromptVisibleFalse"
    @cancel="handleCancel"
    :on-before-ok="handleBeforeOk"
    unmountOnClose
  >
    <template #title> False</template>
    <div><h1>Failed Failed 彭于晏鼓励你再来一遍哦!</h1></div>
  </a-modal>
</template>

<script setup lang="ts">
import { onMounted, withDefaults, defineProps, ref, watch } from "vue";
import { QuestionControllerService, QuestionVO } from "../../../generated";
import MdViewer from "@/components/MdViewer.vue";
import message from "@arco-design/web-vue/es/message";
import CodeEditor from "@/components/CodeEditor.vue";
import QuestionComment from "@/components/QuestionComment.vue";
import SubmitView from "@/components/SubmitView.vue";

const question = ref<QuestionVO>();

interface Props {
  id: string;
}

const props = withDefaults(defineProps<Props>(), {
  id: () => "",
});

//加载数据
const loadData = async () => {
  const res = await QuestionControllerService.getQuestionVoByIdUsingGet(
    props.id as any
  );
  if (res.code === 0) {
    question.value = res.data;
    console.log(question.value);
  } else {
    message.error("加载失败," + res.message);
  }
};
// 语言选项
const form = ref({
  language: "java",
  code: question.value?.codeTemplate?.java,
});
// 监控语言的变化 给定不同的代码模板
watch(
  () => form.value.language,
  (language) => {
    console.log(" form.value.language == " + form.value.language);
    if (language === "java") {
      form.value.code = question.value?.codeTemplate?.java;
    } else if (language === "cpp") {
      form.value.code = question.value?.codeTemplate?.cpp;
    } else if (language === "python") {
      form.value.code = question.value?.codeTemplate?.python;
    } else if (language === "c") {
      form.value.code = question.value?.codeTemplate?.c;
    }
  }
);
const changeCode = (value: string) => {
  form.value = {
    ...form.value,
    code: value,
  };
};
const judgePromptVisibleTrue = ref(false);
const judgePromptVisibleFalse = ref(false);

// 判题信息
let JugdeInfo = ref({
  message: "",
  memory: " ",
  time: " ",
});
/**
 * 提交代码
 */
const doSubmit = async () => {
  if (!question.value?.id) {
    return;
  }
  const res = await QuestionControllerService.doQuestionSubmitUsingPost({
    ...form.value,
    questionId: question.value.id,
  });

  if (res.code === 0) {
    message.success("提交成功");
    JugdeInfo.value = JSON.parse(res.data.judgeInfo);
    console.log("res.data.judgeInfo ==  " + JugdeInfo.value);
    if (JugdeInfo.value.message === "通过") {
      judgePromptVisibleTrue.value = true;
    } else {
      judgePromptVisibleFalse.value = true;
    }
  } else {
    message.error("提交失败," + res.message);
  }
};

const handleBeforeOk = async () => {
  // await new Promise((resolve) => setTimeout(resolve, 1000));
  return true;
  // prevent close
  // return false;
};
const handleCancel = () => {
  judgePromptVisibleTrue.value = false;
  judgePromptVisibleFalse.value = false;
};

/**
 * 页面加载时，请求数据
 */
onMounted(() => {
  loadData();
  console.log(form.value);
});
</script>

<style scoped>
#viewQuestionView {
  max-width: 1400px;
  margin: 0 auto;
}
</style>
