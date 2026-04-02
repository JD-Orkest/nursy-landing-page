<script setup>
const { toast } = useToast()
</script>

<template>
  <ClientOnly>
    <Teleport to="body">
      <Transition
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="opacity-0 translate-y-4"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition duration-200 ease-in"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 translate-y-4"
      >
        <div
          v-if="toast"
          class="fixed bottom-6 left-1/2 -translate-x-1/2 z-[10000] flex items-center gap-3 bg-primary text-white font-jakarta text-sm rounded-2xl px-5 py-4 shadow-xl w-max max-w-[calc(100vw-2rem)]"
          style="pointer-events: none"
          role="status"
          aria-live="polite"
        >
          <svg class="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          <span>{{ toast }}</span>
        </div>
      </Transition>
    </Teleport>
  </ClientOnly>
</template>
