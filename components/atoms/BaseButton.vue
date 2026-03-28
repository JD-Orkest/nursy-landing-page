<script setup>
defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: (v) => ['primary', 'outline', 'ghost'].includes(v),
  },
  tag: {
    type: String,
    default: 'button',
  },
  href: {
    type: String,
    default: null,
  },
})
</script>

<template>
  <component
    :is="href ? 'a' : tag"
    :href="href"
    class="inline-flex items-center justify-center gap-2 font-manrope font-semibold rounded-xl transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 min-h-[48px] px-6 text-sm md:text-base"
    :class="{
      'bg-gradient-to-r from-primary to-primary-dark text-white shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]':
        variant === 'primary',
      'border-2 border-primary text-primary bg-transparent hover:bg-primary/10 active:bg-primary/20':
        variant === 'outline',
      'text-primary bg-transparent hover:bg-primary/10 active:bg-primary/20':
        variant === 'ghost',
    }"
  >
    <slot />
  </component>
</template>
