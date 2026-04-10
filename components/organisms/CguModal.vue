<script setup>
const { isOpen, close } = useCguModal()
const { t, tm, te, rt, locale } = useI18n()

const dialogRef = ref(null)
const closeButtonRef = ref(null)

const cguSectionIds = ['s1', 's2', 's3', 's4', 's5', 's6', 's7', 's8']
const cgvSectionIds = ['s1', 's2', 's3', 's4', 's5', 's6', 's7', 's8', 's9', 's10', 's11', 's12', 's13']
const placeholderPattern = /\[[A-Z0-9_]+\]/

let previousBodyOverflow = ''

function normalizeArray(value) {
  if (!Array.isArray(value)) return []

  return value
    .map(item => {
      if (typeof item === 'string') return item
      return rt(item)
    })
    .filter(item => item.trim() && !placeholderPattern.test(item))
}

function getOptionalString(path) {
  return te(path) ? t(path) : ''
}

function buildBlocks(basePath) {
  const blocks = []
  const text = normalizeArray(tm(`${basePath}.text`))
  const list = normalizeArray(tm(`${basePath}.list`))
  const textSuite = normalizeArray(tm(`${basePath}.text_suite`))
  const subsectionTitle = getOptionalString(`${basePath}.h4`)
  const textFin = normalizeArray(tm(`${basePath}.text_fin`))

  if (text.length) blocks.push({ type: 'paragraphs', items: text })
  if (list.length) blocks.push({ type: 'list', items: list })
  if (textSuite.length) blocks.push({ type: 'paragraphs', items: textSuite })
  if (subsectionTitle) blocks.push({ type: 'subheading', value: subsectionTitle })
  if (textFin.length) blocks.push({ type: 'paragraphs', items: textFin })

  return blocks
}

function buildSection(basePath, id) {
  return {
    id,
    title: t(`${basePath}.h3`),
    blocks: buildBlocks(basePath),
  }
}

const cguSections = computed(() => {
  locale.value
  return cguSectionIds.map(id => buildSection(`terms.cgu.sections.${id}`, id))
})

const cgvSections = computed(() => {
  locale.value
  return cgvSectionIds.map(id => buildSection(`terms.cgv.sections.${id}`, id))
})

function getFocusableElements() {
  if (!dialogRef.value) return []

  return [...dialogRef.value.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')]
    .filter(element => !element.hasAttribute('disabled') && element.getAttribute('aria-hidden') !== 'true')
}

function trapFocus(event) {
  const focusableElements = getFocusableElements()

  if (!focusableElements.length) {
    event.preventDefault()
    dialogRef.value?.focus()
    return
  }

  const firstElement = focusableElements[0]
  const lastElement = focusableElements[focusableElements.length - 1]
  const activeElement = document.activeElement

  if (event.shiftKey && activeElement === firstElement) {
    event.preventDefault()
    lastElement.focus()
  } else if (!event.shiftKey && activeElement === lastElement) {
    event.preventDefault()
    firstElement.focus()
  }
}

function handleKeydown(event) {
  if (!isOpen.value) return

  if (event.key === 'Escape') {
    event.preventDefault()
    close()
    return
  }

  if (event.key === 'Tab') trapFocus(event)
}

watch(isOpen, async (open) => {
  if (!import.meta.client) return

  if (open) {
    previousBodyOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    await nextTick()
    closeButtonRef.value?.focus()
    return
  }

  document.body.style.overflow = previousBodyOverflow
})

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
  if (import.meta.client) document.body.style.overflow = previousBodyOverflow
})
</script>

<template>
  <ClientOnly>
    <Teleport to="body">
      <Transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="isOpen"
          class="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-4"
          style="background: rgba(24, 28, 29, 0.5); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px)"
          @click.self="close"
        >
          <div
            ref="dialogRef"
            tabindex="-1"
            role="dialog"
            aria-modal="true"
            aria-labelledby="terms-modal-title"
            :aria-label="t('terms.dialog_aria')"
            class="flex h-[90vh] w-[95vw] max-w-4xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl"
            @click.stop
          >
            <!-- En-tête -->
            <div class="flex items-start justify-between gap-4 border-b border-secondary/20 bg-white px-6 py-5 sm:px-8">
              <div class="space-y-2">
                <span class="inline-block rounded-full bg-secondary/40 px-3 py-1 font-jakarta text-xs font-semibold uppercase tracking-widest text-primary">
                  Nursy
                </span>
                <h1 id="terms-modal-title" class="font-manrope text-xl font-extrabold leading-tight text-text-main sm:text-2xl">
                  {{ t('terms.h1') }}
                </h1>
              </div>

              <button
                ref="closeButtonRef"
                type="button"
                class="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-info transition-colors duration-150 hover:bg-surface hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
                :aria-label="t('terms.close')"
                @click="close"
              >
                <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <!-- Contenu défilable -->
            <div class="flex-1 overflow-y-auto bg-surface px-5 py-6 sm:px-8 sm:py-8">
              <div class="space-y-10">

                <!-- CGU -->
                <section class="space-y-4" aria-labelledby="terms-cgu-title">
                  <div class="flex items-center gap-3">
                    <div class="h-px flex-1 bg-secondary/50" aria-hidden="true" />
                    <h2 id="terms-cgu-title" class="font-jakarta text-xs font-semibold uppercase tracking-widest text-primary">
                      {{ t('terms.cgu.h2') }}
                    </h2>
                    <div class="h-px flex-1 bg-secondary/50" aria-hidden="true" />
                  </div>

                  <div class="space-y-3">
                    <article
                      v-for="section in cguSections"
                      :key="section.id"
                      class="rounded-2xl bg-white p-5 shadow-sm sm:p-6"
                    >
                      <h3 class="border-l-2 border-primary pl-3 font-manrope text-base font-bold text-text-main sm:text-[17px]">
                        {{ section.title }}
                      </h3>

                      <div class="mt-4 space-y-3 font-ptsans text-sm leading-7 sm:text-[15px]">
                        <template v-for="(block, blockIndex) in section.blocks" :key="`${section.id}-${block.type}-${blockIndex}`">
                          <div v-if="block.type === 'paragraphs'" class="space-y-3 text-text-main/80">
                            <p v-for="(paragraph, paragraphIndex) in block.items" :key="`${section.id}-paragraph-${blockIndex}-${paragraphIndex}`">
                              {{ paragraph }}
                            </p>
                          </div>

                          <ul v-else-if="block.type === 'list'" class="space-y-2.5">
                            <li
                              v-for="(item, itemIndex) in block.items"
                              :key="`${section.id}-item-${blockIndex}-${itemIndex}`"
                              class="flex items-start gap-2.5 text-text-main/80"
                            >
                              <span class="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                              <span>{{ item }}</span>
                            </li>
                          </ul>

                          <h4 v-else-if="block.type === 'subheading'" class="inline-block rounded-full bg-secondary/30 px-3 py-1 font-jakarta text-xs font-semibold uppercase tracking-widest text-primary">
                            {{ block.value }}
                          </h4>
                        </template>
                      </div>
                    </article>
                  </div>
                </section>

                <!-- CGV -->
                <section class="space-y-4" aria-labelledby="terms-cgv-title">
                  <div class="flex items-center gap-3">
                    <div class="h-px flex-1 bg-secondary/50" aria-hidden="true" />
                    <h2 id="terms-cgv-title" class="font-jakarta text-xs font-semibold uppercase tracking-widest text-primary">
                      {{ t('terms.cgv.h2') }}
                    </h2>
                    <div class="h-px flex-1 bg-secondary/50" aria-hidden="true" />
                  </div>

                  <div class="space-y-3">
                    <article
                      v-for="section in cgvSections"
                      :key="section.id"
                      class="rounded-2xl bg-white p-5 shadow-sm sm:p-6"
                    >
                      <h3 class="border-l-2 border-primary pl-3 font-manrope text-base font-bold text-text-main sm:text-[17px]">
                        {{ section.title }}
                      </h3>

                      <div class="mt-4 space-y-3 font-ptsans text-sm leading-7 sm:text-[15px]">
                        <template v-for="(block, blockIndex) in section.blocks" :key="`${section.id}-${block.type}-${blockIndex}`">
                          <div v-if="block.type === 'paragraphs'" class="space-y-3 text-text-main/80">
                            <p v-for="(paragraph, paragraphIndex) in block.items" :key="`${section.id}-paragraph-${blockIndex}-${paragraphIndex}`">
                              {{ paragraph }}
                            </p>
                          </div>

                          <ul v-else-if="block.type === 'list'" class="space-y-2.5">
                            <li
                              v-for="(item, itemIndex) in block.items"
                              :key="`${section.id}-item-${blockIndex}-${itemIndex}`"
                              class="flex items-start gap-2.5 text-text-main/80"
                            >
                              <span class="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                              <span>{{ item }}</span>
                            </li>
                          </ul>

                          <h4 v-else-if="block.type === 'subheading'" class="inline-block rounded-full bg-secondary/30 px-3 py-1 font-jakarta text-xs font-semibold uppercase tracking-widest text-primary">
                            {{ block.value }}
                          </h4>
                        </template>
                      </div>
                    </article>
                  </div>
                </section>

              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </ClientOnly>
</template>