<template>
  <main class="px-5 py-5 s-14 text-sm">
    <section class="mx-auto bg-white lg:w-[800px]  shadow-lg rounded-md overflow-hidden   w-full  ">
      <header @click="toggleLocales" class="h-[100px] flex items-center justify-center relative">
        <div class="absolute inset-0 z-0 sports-bg bg-center bg-no-repeat bg-cover"></div>
        <div class="absolute inset-0 z-10 sports-box bg-gray-500 bg-opacity-5"></div>
        <div class="z-20">
          <div class="text-2xl sports-text">
            <!-- {{ t('hello') }} 国际化使用方式 -->
            <!-- <span class="font-bold ml-2">🏃 {{ t('hello') }}</span>-->
            <span class="font-bold ml-2"><span class="my-face">🏃</span>运动助手</span>
          </div>
        </div>
      </header>
      <nav class="bg-gray-200 h-9 text-center leading-9 text-gray-800 sm:text-[15px] text-[14px]">
        📢公告：提示网络错误请用浏览器打开网站
      </nav>

      <article class="w-11/12 mx-auto">
        <div class="leading-5 my-5">
          <p class="mb-3">系统支持Android / iOS</p>
          <p class="mb-3">自定义步数支持 微信、QQ、支付宝</p>
          <p class="mb-3">请把网站添加至书签防丢失！</p>
          <p class="mb-3">有任何问题请加入群聊！</p>
          <p class="mb-3">本站无广告，感觉大家支持！</p>
        </div>

        <div class="flex flex-wrap text-white">
          <a class="px-3 py-1 bg-orange-400 rounded mr-3 mb-3 hover:bg-opacity-90" href="https://jq.qq.com/?_wv=1027&k=fJJNtknG" target="_blank">加入群聊</a>
          <a class="px-3 py-1 bg-red-400 rounded mr-3 mb-3 hover:bg-opacity-90" href="http://doc.5173kk.com" target="_blank">使用教程</a>
          <a class="px-3 py-1 bg-blue-400 rounded mr-3 mb-3 hover:bg-opacity-90" href="http://sport.520e.com.cn" target="_blank">自动版本</a>
          <a class="px-3 py-1 bg-green-400 rounded mb-3 hover:bg-opacity-90" href="https://gitee.com/xx668888/sportsAssistant" target="_blank">免费搭建</a>
        </div>

        <div class="sports-line flex my-6 mt-2 mb-5">
          <span class="sports-line--text text-black-300 font-medium w-40 text-base flex justify-center">请选择接口</span>
        </div>
      </article>

      <article class="w-11/12 mx-auto">
        <x-form @submit="submitForm"></x-form>
      </article>

      <footer class="w-11/12 flex flex-col text-gray-600 leading-6 pb-5 justify-center items-center mx-auto">
        <p>©2020-2021 Company <span class="my-face" style="color: red">❤</span> 运动助手</p>
        <p>友情链接：
          <a class="hover:text-purple-700" href="http://yz.ovq.cc" target="_blank">QQ代挂</a>&nbsp;
          <a class="hover:text-purple-700" href="http://cron.520ling.com" target="_blank">云任务</a>
        </p>
      </footer>
    </section>
  </main>
</template>

<script setup lang="ts">
  import { useI18n } from 'vue-i18n';
  import xForm from '@/components/form/index.vue';
  import { mi, xin, ydq } from '@/api/index';
  import { ElMessage } from 'element-plus';

  const {availableLocales, locale} = useI18n();

  interface formType {
    type: number,
    mobile: string,
    password: string,
    step: string
  }

  // 切换国际化事件
  const toggleLocales = () => {
    const locales = availableLocales;
    locale.value = locales[(locales.indexOf(locale.value) + 1) % locales.length];
  };

  const submitForm = async (form: formType): Promise<any> => {
    const type = form.type;
    const fd = new FormData();
    fd.append('mobile', form.mobile);
    fd.append('password', form.password);
    fd.append('step', form.step);

    let res: any = null;
    if (type === 1) {
      res = await mi(fd);
    }
    if (type === 2) {
      res = await xin(fd);
    }
    if (type === 3) {
      res = await ydq(fd);
    }

    if (res.code != 0) {
      ElMessage.error(res.msg);
    } else {
      ElMessage.success(res.msg);
    }
  };
</script>

<style>
.sports-bg {
  background-image: url(@/assets/heading-logo.jpg);
}

.sports-box {
  backdrop-filter: blur(5px);
}

.sports-text {
  text-shadow: 1px 1px 2px #fff;
}

.leading-9 {
  line-height: 2.25rem;
}

.leading-5 {
  line-height: 1.25rem;
}

.sports-line:after,
.sports-line:before {
  position: relative;
  top: 50%;
  width: 50%;
  border-top: 1px solid transparent;
  border-top-color: inherit;
  border-bottom: 0;
  transform: translateY(50%);
  content: '';
}

.sports-close:after,
.sports-close:before {
  content: '';
  position: absolute;
  top: 45%;
  right: 50%;
  transform: rotate(50deg);
  width: 16px;
  height: 1px;
  background-color: rgba(0, 0, 0, 0.5);
}

.sports-close:before {
  transform: rotate(-50deg);
}

.el-dialog__header {
  border-bottom: 1px solid #f0f0f0;
  padding: 15px;
}

.el-dialog__footer {
  border-top: 1px solid #f0f0f0;
  padding: 15px;
}

.w-5\/6 {
  width: 83.333333% !important;
}

@media (min-width: 640px) {
  .sm\:max-w-130 {
    max-width: 32.5rem !important;
  }
}
</style>
