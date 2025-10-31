<template>
    <div class="taco-designer">
        <h1>设计你的玉米卷</h1>
        <form @submit.prevent="submitTaco">
          <span v-if="errors" class="error">{{ errors.ingredients }}</span>
          <div v-for="(items, type) in groupedIngredients" :key="type">
              <h3 class="tagline">{{ slogans[type] || '选择你的饲料' }}</h3>
              <div v-for="item in items" :key="item.id">
                  <input type="checkbox" :value="item.id" v-model="selectedIngredients">
                  <!-- TODO: 去除已填写表单的空白提示 -->
                  <span>{{ item.name }}</span>
              </div>
          </div>
          <div>
              <h3>给你的玉米卷起名</h3>
              <input type="text" v-model="tacoName">
              <button type="submit">提交你的玉米卷</button>
              <!-- TODO: 去除已填写表单的空白提示 -->
              <span v-if="errors" class="error">{{ errors.name }}</span>
          </div>
        </form>

        <div v-if="taco">
            <h1>你设计的taco</h1>
            <p>{{ taco }}</p>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, reactive } from 'vue';
import axios from 'axios';

const ingredients = ref<ingredient[]>([])
const selectedIngredients = ref<ingredient[]>([])
const tacoName = ref('')
const taco = ref(null)
const errors = reactive<Record<string, string>>({})

interface ingredient {
  id: string,
  name: string,
  type: string
}

const slogans = {
    WRAP: 'Designate your wrap:',
    PROTEIN: 'Pick your protein:',
    CHEESE: 'Choose your cheese:',
    VEGGIES: 'Determine your veggies:',
    SAUCE: 'Select your sauce:'
}

const getIngredients = async () => {
    try {
        const res = await axios.get<ingredient[]>("/api/ingredients")
        ingredients.value = res.data;
    } catch (err) {
        console.error(err)
    }
}

onMounted(() => {
    getIngredients()
})

const groupedIngredients = computed(() => {
    return ingredients.value.reduce((groups, item) => {
        if (!groups[item.type]) { groups[item.type] = [] }
        groups[item.type].push(item)
        return groups
    }, {})
})

const submitTaco = async () => {
    taco.value = {
        name: tacoName.value,
        ingredients: selectedIngredients.value.map(id => ({ id }))
    }

    try {
      const res = await axios.post("/api/design", taco.value)
      alert('成功' + res.data.name)
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 400) {
          Object.assign(errors, err.response.data);
          console.error(errors)
        } else {
          alert(err.message);
        }
      } else {
        console.error('未知错误:', err);
      }
    }
}
</script>

<style>
.error {
  color: red;
}
</style>