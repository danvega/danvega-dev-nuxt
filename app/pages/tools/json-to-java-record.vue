<template>
  <div class="container mt-20 max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-lg min-h-screen">
    <h1 class="text-3xl font-bold mb-6 text-center text-gray-800">JSON to Java Record Converter</h1>
    <p class="my-8">If you want the source code for this tool my website is open source and you can find it
      <a href="https://github.com/danvega/danvega-dev-nuxt/blob/main/pages/tools/json-to-java-record.vue" class="text-blue-500 underline hover:no-underline">here</a>.</p>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label for="recordName" class="block text-sm font-medium text-gray-700 mb-2">Record Name:</label>
        <input
            type="text"
            id="recordName"
            v-model="recordName"
            class="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter Record name..."
        />
      </div>
      <div class="md:col-span-2">
        <label for="jsonInput" class="block text-sm font-medium text-gray-700 mb-2">JSON Input:</label>
        <div class="relative border border-gray-300 rounded-md" style="height: 300px;">
          <div ref="preRef" class="absolute top-0 left-0 w-full h-full overflow-auto m-0 p-2 bg-transparent code-input" v-html="highlightedJson"></div>
          <textarea
              ref="textareaRef"
              id="jsonInput"
              v-model="jsonInput"
              class="absolute top-0 left-0 w-full h-full p-2 font-mono bg-transparent resize-none outline-none code-input"
              placeholder="Paste your JSON here..."
              :style="{ color: 'transparent', caretColor: 'black' }"
              @input="handleInput"
          ></textarea>
        </div>
      </div>
      <div class="md:col-span-2">
        <label for="javaOutput" class="block text-sm font-medium text-gray-700 mb-2">Java Record Output:</label>
        <div class="p-2 border border-gray-300 rounded-md bg-gray-50 overflow-auto code-input" style="max-height: 300px;" v-html="highlightedJava"></div>
      </div>
    </div>
    <div class="mt-6 flex justify-center space-x-4">
      <button
          @click="convertJsonToJavaRecord"
          class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Convert to Java Record
      </button>
      <button
          @click="downloadRecords"
          :disabled="javaRecords.length === 0"
          class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Download Record(s)
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue'
import { useRuntimeConfig } from '#app'
import { debounce } from 'lodash-es'
import JSZip from 'jszip'

const recordName = ref('Root')
const jsonInput = ref('')
const javaOutput = ref('')
const javaRecords = ref([])
const textareaRef = ref(null)
const preRef = ref(null)

const runtimeConfig = useRuntimeConfig()
const shiki = runtimeConfig.public.shiki

const highlightedJson = computed(() => {
  if (!shiki) return jsonInput.value
  return shiki.highlight(jsonInput.value || ' ', { lang: 'json', theme: 'nord' })
})

const highlightedJava = computed(() => {
  if (!shiki) return javaOutput.value
  return shiki.highlight(javaOutput.value || ' ', { lang: 'java', theme: 'nord' })
})

onMounted(() => {
  syncScroll()
})

watch([jsonInput, javaOutput], () => {
  // Highlighting is handled by the computed properties
})

const syncScroll = () => {
  const textarea = textareaRef.value
  const pre = preRef.value
  if (textarea && pre) {
    textarea.addEventListener('scroll', () => {
      pre.scrollTop = textarea.scrollTop
      pre.scrollLeft = textarea.scrollLeft
    })
  }
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

<style scoped>
.code-input {
  font-family: monospace;
  white-space: pre;
  overflow: auto;
  tab-size: 2;
}
</style>
