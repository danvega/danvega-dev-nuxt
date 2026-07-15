<template>
  <Container class="mt-16 sm:mt-32">
    <header class="max-w-2xl">
      <p class="font-mono text-sm text-green-600 dark:text-green-400">$ cat input.json | json2record</p>
      <h1 class="mt-4 text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
        JSON to Java Record
      </h1>
      <p class="mt-6 text-base text-zinc-600 dark:text-zinc-400">
        Paste any JSON and get clean Java records back — nested objects included. Everything runs in your
        browser and the
        <a href="https://github.com/danvega/danvega-dev-nuxt/blob/main/app/pages/tools/json-to-java-record.vue" class="text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300">source code</a>
        is open.
      </p>
    </header>

    <!-- Input terminal -->
    <div class="mt-12 overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-900 shadow-2xl">
      <div class="flex items-center gap-2 border-b border-zinc-700/60 bg-zinc-800 px-4 py-3">
        <span class="h-3 w-3 rounded-full bg-red-500"></span>
        <span class="h-3 w-3 rounded-full bg-yellow-500"></span>
        <span class="h-3 w-3 rounded-full bg-green-500"></span>
        <span class="ml-2 font-mono text-xs text-zinc-400">input.json</span>
      </div>
      <textarea
          id="jsonInput"
          v-model="jsonInput"
          spellcheck="false"
          aria-label="JSON input"
          placeholder='{ "paste": "your JSON here" }'
          class="block h-64 w-full resize-none bg-transparent p-4 font-mono text-[13px] leading-relaxed text-zinc-100 placeholder-zinc-500 caret-white outline-none"
          @input="handleInput"
      ></textarea>
    </div>

    <!-- Pipe command strip -->
    <div class="mt-6 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 px-4 py-3 font-mono text-sm text-zinc-700 dark:text-zinc-300 overflow-x-auto">
      <span class="text-green-600 dark:text-green-400">$</span>
      cat input.json | json2record --name
      <input
          id="recordName"
          v-model="recordName"
          type="text"
          aria-label="Record name"
          class="w-28 border-0 border-b border-dashed border-zinc-400 dark:border-zinc-500 bg-transparent px-1 font-mono text-sm text-blue-600 dark:text-blue-400 focus:border-blue-500 focus:outline-none"
      />
      &gt; {{ outputFileName }}
    </div>

    <!-- Output terminal -->
    <div class="mt-6 overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-900 shadow-2xl">
      <div class="flex items-center justify-between border-b border-zinc-700/60 bg-zinc-800 px-4 py-3">
        <div class="flex items-center gap-2">
          <span class="h-3 w-3 rounded-full bg-red-500"></span>
          <span class="h-3 w-3 rounded-full bg-yellow-500"></span>
          <span class="h-3 w-3 rounded-full bg-green-500"></span>
          <span class="ml-2 font-mono text-xs text-zinc-400">{{ outputFileName }}</span>
        </div>
        <button
            :disabled="javaRecords.length === 0"
            class="font-mono text-xs text-zinc-400 transition-colors hover:text-zinc-200 disabled:cursor-not-allowed disabled:opacity-40"
            @click="copyOutput"
        >
          {{ copied ? 'copied!' : 'copy' }}
        </button>
      </div>
      <pre class="max-h-96 min-h-40 overflow-auto p-4 font-mono text-[13px] leading-relaxed text-zinc-300"><code v-html="prettyJava"></code></pre>
    </div>

    <div class="mt-8 flex flex-wrap items-center gap-4">
      <button
          class="rounded-md bg-zinc-800 dark:bg-zinc-700 px-5 py-2.5 font-mono text-sm font-semibold text-white shadow-sm transition-colors hover:bg-zinc-700 dark:hover:bg-zinc-600"
          @click="convertJsonToJavaRecord"
      >
        ./convert
      </button>
      <button
          :disabled="javaRecords.length === 0"
          class="rounded-md border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 px-5 py-2.5 font-mono text-sm font-semibold text-zinc-800 dark:text-zinc-100 shadow-sm transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-50"
          @click="downloadRecords"
      >
        ./download
      </button>
      <button
          class="font-mono text-sm text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300"
          @click="loadExample"
      >
        load example
      </button>
    </div>
  </Container>
</template>

<script setup>
import { ref, computed } from 'vue'
import { debounce } from 'lodash-es'
import JSZip from 'jszip'

useHead({
  title: 'JSON to Java Record Converter | Dan Vega',
  meta: [
    { name: 'title', content: 'JSON to Java Record Converter' },
    { name: 'description', content: 'Free online tool that converts JSON into Java records, nested objects included. Runs entirely in your browser.' },
    { property: 'og:title', content: 'JSON to Java Record Converter' },
    { property: 'og:description', content: 'Convert JSON into Java records right in your browser.' }
  ]
});

const recordName = ref('Root')
const jsonInput = ref('')
const javaOutput = ref('')
const javaRecords = ref([])
const copied = ref(false)

const outputFileName = computed(() => `${(recordName.value || 'Root').trim()}.java`)

const escapeHtml = (str) => str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')

const prettyJava = computed(() => {
  if (!javaOutput.value) {
    return '<span class="text-zinc-500">// your Java records will appear here</span>'
  }
  if (javaOutput.value.startsWith('Error:')) {
    return `<span class="text-red-400">${escapeHtml(javaOutput.value)}</span>`
  }
  return escapeHtml(javaOutput.value)
      .replace(/\b(public|record)\b/g, '<span class="text-purple-400">$1</span>')
      .replace(/\b(String|int|double|boolean|Object|List)\b/g, '<span class="text-sky-400">$1</span>')
})

const loadExample = () => {
  jsonInput.value = JSON.stringify({
    name: 'Dan Vega',
    role: 'Spring Developer Advocate',
    yearsExperience: 25,
    isJavaChampion: true,
    social: {
      youtube: '@danvega',
      twitter: '@therealdanvega'
    },
    topics: ['Java', 'Spring Boot', 'AI']
  }, null, 2)
  convertJsonToJavaRecord()
}

const copyOutput = async () => {
  if (!javaOutput.value) return
  await navigator.clipboard.writeText(javaOutput.value)
  copied.value = true
  setTimeout(() => { copied.value = false }, 2000)
}

const formatJSON = (json) => {
  try {
    const obj = JSON.parse(json);
    return JSON.stringify(obj, null, 2);
  } catch (e) {
    // If parsing fails, return the original string
    return json;
  }
}

const handleInput = debounce(() => {
  jsonInput.value = formatJSON(jsonInput.value);
  convertJsonToJavaRecord();
}, 500)

const convertJsonToJavaRecord = () => {
  try {
    if (!jsonInput.value.trim()) {
      throw new Error("JSON input is empty")
    }
    const correctedJson = correctJson(jsonInput.value)
    const jsonObj = JSON.parse(correctedJson)
    const records = generateJavaRecords(jsonObj, recordName.value)
    javaRecords.value = records
    javaOutput.value = records.map(record => record.content).join('\n')
  } catch (error) {
    javaOutput.value = `Error: ${error.message}\n\nPlease check your JSON input and try again.`
    javaRecords.value = []
  }
}

const correctJson = (json) => {
  if (typeof json !== 'string') {
    throw new Error("Input is not a string")
  }

  // Remove any invisible characters
  json = json.replace(/[\u200B-\u200D\uFEFF]/g, '');

  // Remove any leading/trailing whitespace
  json = json.trim()

  // Ensure the input starts with { or [
  if (!['{', '['].includes(json[0])) {
    throw new Error("Invalid JSON: must start with { or [")
  }

  // Basic correction for common JSON errors
  json = json
      .replace(/,\s*([\]}])/g, '$1') // Remove trailing commas
      .replace(/'/g, '"') // Replace single quotes with double quotes
      .replace(/(\w+):/g, '"$1":') // Wrap unquoted property names in quotes

  let openBraces = (json.match(/{/g) || []).length
  let closeBraces = (json.match(/}/g) || []).length
  let openBrackets = (json.match(/\[/g) || []).length
  let closeBrackets = (json.match(/\]/g) || []).length

  // Add missing closing braces/brackets
  while (openBraces > closeBraces) {
    json += '}'
    closeBraces++
  }

  while (openBrackets > closeBrackets) {
    json += ']'
    closeBrackets++
  }

  return json
}

const generateJavaRecords = (obj, className) => {
  if (typeof obj !== 'object' || obj === null) {
    throw new Error(`Cannot generate Java record for non-object type: ${typeof obj}`)
  }

  let records = []
  const fields = []

  for (const [key, value] of Object.entries(obj)) {
    const fieldName = toCamelCase(key)
    const fieldType = getJavaType(value, toTitleCase(fieldName))

    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      records = records.concat(generateJavaRecords(value, toTitleCase(fieldName)))
    }

    fields.push(`${fieldType} ${fieldName}`)
  }

  const content = `public record ${className}(${fields.join(', ')}) {}\n`
  records.push({ name: className, content: content })
  return records
}

const getJavaType = (value, className) => {
  if (value === null) return 'Object'
  if (typeof value === 'string') return 'String'
  if (typeof value === 'number') {
    return Number.isInteger(value) ? 'int' : 'double'
  }
  if (typeof value === 'boolean') return 'boolean'
  if (Array.isArray(value)) {
    if (value.length === 0) return 'List<Object>'
    return `List<${getJavaType(value[0], className)}>`
  }
  if (typeof value === 'object') return className
  return 'Object'
}

const toCamelCase = (str) => {
  return str.replace(/[-_](.)/g, (_, c) => c.toUpperCase())
}

const toTitleCase = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

const downloadRecords = () => {
  if (javaRecords.value.length === 1) {
    const record = javaRecords.value[0]
    downloadSingleFile(record.name, record.content)
  } else if (javaRecords.value.length > 1) {
    downloadZip()
  }
}

const downloadSingleFile = (fileName, content) => {
  const blob = new Blob([content], { type: 'text/plain' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${fileName}.java`
  a.click()
  URL.revokeObjectURL(url)
}

const downloadZip = async () => {
  const zip = new JSZip()

  javaRecords.value.forEach(record => {
    zip.file(`${record.name}.java`, record.content)
  })

  const content = await zip.generateAsync({type: 'blob'})
  const url = URL.createObjectURL(content)
  const a = document.createElement('a')
  a.href = url
  a.download = 'java_records.zip'
  a.click()
  URL.revokeObjectURL(url)
}
</script>
