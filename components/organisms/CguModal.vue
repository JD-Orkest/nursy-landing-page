<script setup>
const { isOpen, close } = useCguModal()
const { t, tm, te, rt, locale } = useI18n()

const dialogRef = ref(null)
const closeButtonRef = ref(null)
const scrollRef = ref(null)
const activeTab = ref('cgu')

const cguSectionIds = ['s1', 's2', 's3', 's4', 's5', 's6', 's7', 's8']
const cgvSectionIds = ['s1', 's2', 's3', 's4', 's5', 's6', 's7', 's8', 's9', 's10', 's11', 's12', 's13']

let previousBodyOverflow = ''

function normalizeArray(value) {
  if (!Array.isArray(value)) return []

  return value
    .map(item => typeof item === 'string' ? item : rt(item))
    .filter(item => item.trim())
}

// Extrait l'acronyme entre parenthèses : "I. CONDITIONS GÉNÉRALES (CGU)" → "CGU"
function extractAcronym(h2) {
  const match = h2.match(/\(([^)]+)\)/)
  return match ? match[1] : h2
}

// "3. Titre de la section" → { num: '03', text: 'Titre de la section' }
function parseTitle(title) {
  const match = title.match(/^(\d+)\.\s*(.+)$/)
  if (match) return { num: String(match[1]).padStart(2, '0'), text: match[2] }
  return { num: null, text: title }
}

function switchTab(tab) {
  activeTab.value = tab
  nextTick(() => {
    if (scrollRef.value) scrollRef.value.scrollTop = 0
  })
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

const activeSections = computed(() =>
  activeTab.value === 'cgu' ? cguSections.value : cgvSections.value
)

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
    activeTab.value = 'cgu'
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
          class="fixed inset-0 z-[9999] flex items-end justify-center sm:items-center sm:p-4"
          style="background: rgba(24, 28, 29, 0.6); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px)"
          @click.self="close"
        >
          <div
            ref="dialogRef"
            tabindex="-1"
            role="dialog"
            aria-modal="true"
            aria-labelledby="terms-modal-title"
            :aria-label="t('terms.dialog_aria')"
            class="flex h-[92vh] w-full flex-col overflow-hidden rounded-t-3xl bg-surface shadow-2xl sm:h-[88vh] sm:max-w-3xl sm:rounded-3xl"
            @click.stop
          >
            <!-- ── En-tête ── -->
            <div class="shrink-0 border-b border-secondary/30 bg-white px-5 pb-0 pt-5 sm:px-8 sm:pt-6">
              <div class="mb-4 flex items-start justify-between gap-4">
                <div>
                  <div class="mb-1.5 flex items-center gap-2">
                    <span class="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-0.5 font-jakarta text-[11px] font-semibold uppercase tracking-widest text-primary">
                      <span class="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden="true" />
                      Nursy
                    </span>
                  </div>
                  <h1 id="terms-modal-title" class="font-manrope text-lg font-extrabold leading-tight text-text-main sm:text-xl">
                    {{ t('terms.h1') }}
                  </h1>
                </div>

                <button
                  ref="closeButtonRef"
                  type="button"
                  class="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-info transition-colors duration-150 hover:bg-surface hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                  :aria-label="t('terms.close')"
                  @click="close"
                >
                  <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <!-- Onglets -->
              <div class="flex gap-1" role="tablist">
                <button
                  v-for="tab in ['cgu', 'cgv']"
                  :key="tab"
                  role="tab"
                  type="button"
                  :aria-selected="activeTab === tab"
                  :aria-controls="`terms-tab-${tab}`"
                  class="relative px-4 py-2.5 font-jakarta text-sm font-semibold uppercase tracking-wide transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-1"
                  :class="
                    activeTab === tab
                      ? 'text-primary after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:rounded-t-full after:bg-primary'
                      : 'text-info hover:text-primary'
                  "
                  @click="switchTab(tab)"
                >
                  {{ extractAcronym(t(`terms.${tab}.h2`)) }}
                </button>
              </div>
            </div>

            <!-- ── Contenu défilable ── -->
            <div
              :id="`terms-tab-${activeTab}`"
              ref="scrollRef"
              role="tabpanel"
              class="flex-1 overflow-y-auto px-4 py-6 sm:px-8 sm:py-8"
            >
              <div class="space-y-3">
                <article
                  v-for="section in activeSections"
                  :key="section.id"
                  class="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-secondary/20"
                >
                  <!-- Titre section avec badge numéro -->
                  <div class="flex items-start gap-3 border-b border-secondary/15 px-5 py-4 sm:px-6">
                    <template v-if="parseTitle(section.title).num">
                      <span
                        class="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary/10 font-manrope text-xs font-extrabold text-primary"
                        aria-hidden="true"
                      >
                        {{ parseTitle(section.title).num }}
                      </span>
                      <h3 class="font-manrope text-[15px] font-bold leading-snug text-text-main sm:text-base">
                        {{ parseTitle(section.title).text }}
                      </h3>
                    </template>
                    <h3 v-else class="font-manrope text-[15px] font-bold leading-snug text-text-main sm:text-base">
                      {{ section.title }}
                    </h3>
                  </div>

                  <!-- Blocs de contenu -->
                  <div class="space-y-4 px-5 py-4 sm:px-6">
                    <template v-for="(block, blockIndex) in section.blocks" :key="`${section.id}-${block.type}-${blockIndex}`">
                      <div v-if="block.type === 'paragraphs'" class="space-y-2.5">
                        <p
                          v-for="(paragraph, paragraphIndex) in block.items"
                          :key="`${section.id}-p-${blockIndex}-${paragraphIndex}`"
                          class="font-ptsans text-sm leading-7 text-text-main/75 sm:text-[14.5px]"
                        >
                          {{ paragraph }}
                        </p>
                      </div>

                      <ul v-else-if="block.type === 'list'" class="space-y-2">
                        <li
                          v-for="(item, itemIndex) in block.items"
                          :key="`${section.id}-li-${blockIndex}-${itemIndex}`"
                          class="flex items-start gap-3 rounded-xl bg-surface px-3 py-2.5"
                        >
                          <span class="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                          <span class="font-ptsans text-sm leading-6 text-text-main/75 sm:text-[14.5px]">{{ item }}</span>
                        </li>
                      </ul>

                      <div v-else-if="block.type === 'subheading'" class="pt-1">
                        <span class="inline-block rounded-full bg-secondary/30 px-3 py-1 font-jakarta text-[11px] font-semibold uppercase tracking-widest text-primary">
                          {{ block.value }}
                        </span>
                      </div>
                    </template>
                  </div>
                </article>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </ClientOnly>
</template>