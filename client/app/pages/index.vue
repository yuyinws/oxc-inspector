<script setup lang="ts">
const rpc = useRpc()

const { data: overview } = useAsyncData(
  'overview',
  () => rpc.value.call('oxc-inspector:overview'),
  {
    default: () => ({
      oxlint: {
        installed: false,
        version: undefined,
        tagUrl: undefined,
      },
      oxfmt: {
        installed: false,
        version: undefined,
        tagUrl: undefined,
      },
    }),
  },
)

const cardUi = {
  body: 'p-4 flex flex-col items-center justify-center',
}
</script>

<template>
  <div class="flex flex-col items-center gap-8 font-mono translate-y-50">
    <visual-logo />

    <div class="flex items-center gap-4">
      <UCard
        class="flex flex-col items-center justify-center gap-3 w-70 h-45 hover:shadow-lg dark:hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-all duration-300"
        :ui="cardUi"
      >
        <u-icon name="ph:check-circle" class="w-10 h-10 text-neutral-500 dark:text-neutral-400" />
        <p class="text-xl mt-2 font-medium text-neutral-700 dark:text-neutral-300">oxlint</p>

        <UButton
          v-if="overview?.oxlint.installed"
          size="sm"
          variant="link"
          trailing-icon
          :to="overview?.oxlint.tagUrl"
          target="_blank"
          class="text-neutral-500 cursor-pointer text-base dark:text-neutral-400"
        >
          v{{ overview?.oxlint.version }}
        </UButton>
        <span v-else class="text-neutral-500 text-base dark:text-neutral-400"> Not installed </span>

        <div class="flex items-center">
          <UButton
            to="/lint/report"
            icon="carbon:report"
            size="sm"
            variant="link"
            trailing-icon
            class="text-neutral-500 dark:text-neutral-400"
          >
            Reports
          </UButton>

          <UButton
            to="/lint/config"
            icon="carbon:settings"
            size="sm"
            variant="link"
            trailing-icon
            class="text-neutral-500 dark:text-neutral-400"
          >
            Config
          </UButton>

          <UButton
            to="https://oxc.rs/docs/guide/usage/linter.html"
            target="_blank"
            icon="carbon:document"
            size="sm"
            variant="link"
            trailing-icon
            class="text-neutral-500 dark:text-neutral-400"
          >
            Docs
          </UButton>
        </div>
      </UCard>

      <UCard
        class="flex flex-col items-center justify-center gap-3 w-70 h-45 hover:shadow-lg dark:hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-all duration-300"
        :ui="cardUi"
      >
        <u-icon name="ph:code" class="w-10 h-10 text-neutral-500 dark:text-neutral-400" />
        <p class="text-xl font-medium mt-2 text-neutral-700 dark:text-neutral-300">oxfmt</p>

        <UButton
          v-if="overview?.oxfmt.installed"
          size="sm"
          variant="link"
          trailing-icon
          :to="overview?.oxfmt.tagUrl"
          target="_blank"
          class="text-neutral-500 cursor-pointer dark:text-neutral-400 text-base"
        >
          v{{ overview?.oxfmt.version }}
        </UButton>
        <span v-else class="text-neutral-500 text-base dark:text-neutral-400"> Not installed </span>

        <div class="flex items-center">
          <UButton
            icon="carbon:settings"
            size="sm"
            variant="link"
            trailing-icon
            class="text-neutral-500 dark:text-neutral-400 cursor-pointer"
          >
            Config
          </UButton>

          <UButton
            to="https://oxc.rs/docs/guide/usage/linter.html"
            target="_blank"
            icon="carbon:document"
            size="sm"
            variant="link"
            trailing-icon
            class="text-neutral-500 dark:text-neutral-400"
          >
            Docs
          </UButton>
        </div>
      </UCard>
    </div>

    <div class="flex items-center gap-6">
      <UButton
        to="https://github.com/yuyinws/oxc-inspector"
        target="_blank"
        icon="lucide:star"
        variant="link"
        class="text-neutral-500 dark:text-neutral-400"
      >
        Star on GitHub
      </UButton>
      <UButton
        to="https://github.com/yuyinws/oxc-inspector/discussions"
        target="_blank"
        icon="lucide:lightbulb"
        variant="link"
        class="text-neutral-500 dark:text-neutral-400"
      >
        Ideas & Suggestions
      </UButton>
    </div>
  </div>
</template>
