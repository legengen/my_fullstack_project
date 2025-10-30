<template>
    <div class="taco-designer">
        <h1>设计你的玉米卷</h1>
        <form @submit.prevent="submitTaco">
            <div v-for="(items, type) in groupedIngredients" :key="type">
                <h3 class="tagline">{{ slogans[type] || '选择你的饲料' }}</h3>
                <div v-for="item in items" :key="item.id">
                    <input type="checkbox" :value="item.id" v-model="selectedIngredients">
                    <span>{{ item.name }}</span>
                </div>
            </div>
            <div>
                <h3>给你的玉米卷起名</h3>
                <input type="text" v-model="tacoName">
                <button type="submit">提交你的玉米卷</button>
            </div>
        </form>

        <div v-if="taco">
            <h1>你设计的taco</h1>
            <p>{{ taco }}</p>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';

const ingredients = ref([])
const selectedIngredients = ref([])
const tacoName = ref('')
const taco = ref(null)

const slogans = {
    WRAP: 'Designate your wrap:',
    PROTEIN: 'Pick your protein:',
    CHEESE: 'Choose your cheese:',
    VEGGIES: 'Determine your veggies:',
    SAUCE: 'Select your sauce:'
}

const getIngredients = async () => {
    try {
        const res = await axios.get("/api/ingredients")
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
    } catch (err) {
        console.error(err)
        alert('失败')
    }
}
</script>