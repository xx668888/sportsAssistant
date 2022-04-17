<template>
  <div class="sports flex justify-between leading-10">
    <div v-for="(item, index) of tabs" :key="item.current" @click="switchTabs(index)" :class="`sports-tabs flex rounded ${item.active ? 'active' : ''} cursor-pointer relative overflow-hidden flex-1 justify-center items-center mr-2`">
      <img :src="item.img" class="lg:h-6 mr-2 h-5" alt=""/>{{ item.name }}
    </div>
  </div>

  <div class="pr-4 py-5">
    <el-form ref="ruleFormRef" class="w-full" size="large" :model="tabs[current].form" autocomplete="off" :rules="rules" label-width="100px">
      <el-form-item :label="tabs[current].formItem.userLabel" prop="mobile">
        <el-input v-model.trim="tabs[current].form.mobile" :placeholder="tabs[current].formItem.userPlaceholder" clearable/>
      </el-form-item>

      <el-form-item v-if="tabs[current].password" :label="tabs[current].formItem.passwordLabel" prop="password">
        <el-input v-model.trim="tabs[current].form.password" type="password" clearable show-password :placeholder="tabs[current].formItem.passwordPlaceholder"/>
      </el-form-item>

      <el-form-item :label="tabs[current].formItem.stepLabel" prop="step">
        <el-input v-model.trim="tabs[current].form.step" placeholder="1-100000" clearable/>
      </el-form-item>

      <el-button @click="submit(ruleFormRef)" type="primary" class="w-full">提交</el-button>

    </el-form>

  </div>
</template>

<script setup lang="ts">
  import {ref, reactive, defineEmits} from 'vue';
  import {FormInstance} from 'element-plus';
  import mi from '@/assets/mi.jpg';
  import lx from '@/assets/lx.jpg';
  import ydq from '@/assets/ydq.png';

  let current = ref<number>(0);
  let activeColor = ref<string>('#ff6a00');
  let backgroundColor = ref<string>('#ffe1cc');
  const ruleFormRef = ref<FormInstance>();
  const emit = defineEmits(['submit']);

  const tabs = ref([
    {
      current: 0,
      name: 'Zepp Life',
      color: '#ffe1cc',
      img: mi,
      borderColor: '#ff6a00',
      active: true,
      password: true,
      form: {
        mobile: '',
        password: '',
        step: '',
        type: 1,
      },

      formItem: {
        userLabel: '运动账号：',
        userPlaceholder: '请输入Zepp Life账号',
        passwordLabel: '运动密码：',
        passwordPlaceholder: '请输入Zepp Life密码',
        stepLabel: '运动步数：',
      },
    },
    {
      current: 1,
      name: '乐心健康',
      color: '#d0eaf7',
      img: lx,
      borderColor: '#1296d8',
      active: false,
      password: true,
      form: {
        mobile: '',
        password: '',
        step: '',
        type: 2,
      },

      formItem: {
        userLabel: '运动账号：',
        userPlaceholder: '请输入乐心运动账号',
        passwordLabel: '运动密码：',
        passwordPlaceholder: '请输入乐心运动密码',
        stepLabel: '运动步数：',
      },
    },
    {
      current: 2,
      name: '悦动圈',
      color: '#d7eedf',
      img: ydq,
      borderColor: '#36ab61',
      active: false,
      password: false,
      form: {
        mobile: '',
        step: '',
        type: 3,
      },

      formItem: {
        userLabel: '授权链接：',
        userPlaceholder: '请输入悦动圈授权链接',
        stepLabel: '运动步数：',
      },
    },
  ]);

  let rules = reactive({
    mobile: [
      {
        required: true,
        message: '请填写信息',
        trigger: 'blur',
      },
    ],
    password: [
      {
        required: true,
        message: '请填写信息',
        trigger: 'blur',
      },
    ],
    step: [
      {
        required: true,
        message: '请填写信息',
        trigger: 'blur',
      },
    ],
  });

  const switchTabs = (index: number): void => {
    tabs.value.forEach(v => {
      v.active = false;
    });
    tabs.value[index].active = true;
    current.value = index;
    backgroundColor.value = tabs.value[index].color;
    activeColor.value = tabs.value[index].borderColor;
  };

  // submit form
  const submit = async (form: FormInstance | undefined) => {
    if (!form) return;
    await form.validate((valid, fields) => {
      if (valid) {
        emit('submit', tabs.value[current.value].form);
      } else {
        console.log('error submit!', fields);
      }
    });
  };

  const resetForm = async (form: FormInstance | undefined) => {
    if (!form) return;
    form.resetFields();
  };
</script>

<style>
  .active:before {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    height: 2px;
    background-color: v-bind(activeColor);
    bottom: 0;
  }

  .sports-tabs {
    background-color: #f3f4f6;
    transition-duration: .3s;
  }

  .sports-tabs:nth-child(1):hover {
    background-color: #ffe1cc;
  }

  .sports-tabs:nth-child(2):hover {
    background-color: #d0eaf7;
  }

  .sports-tabs:nth-child(3):hover {
    background-color: #d7eedf;
  }

  .active {
    background-color: v-bind(backgroundColor);
  }

  .sports .active:hover {
    background-color: v-bind(backgroundColor);
  }

  input {
    outline: none;
  }
</style>
