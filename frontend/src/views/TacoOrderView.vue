<template>
    <form @submit.prevent="submitOrder">
        <h1>Order your taco creations!</h1>
        <h3>Deliver my taco masterpieces to...</h3>
        <div v-for="field in formFields" :key="field">
            <label :for="field">{{ field }}:</label>
            <input type="text" v-model="backgroundData[field]" :id="field">
            <!-- TODO: 去除已填写表单的空白提示 -->
            <span v-if="errors" class="error">{{ errors[field] }}</span>
        </div>
        <h3>Here's how I'll pay...</h3>
        <div v-for="field in paymentFields" :key="field">
            <label :for="field">{{ field }}:</label>
            <input type="text" v-model="backgroundData[field]" :id="field">
            <!-- TODO: 去除已填写表单的空白提示 -->
            <span v-if="errors" class="error">{{ errors[field] }}</span>
        </div>
        <button type="submit">submit</button>
    </form>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import axios from 'axios'
const errors = reactive<Record<string, string>>({})
const backgroundData = reactive({
  deliveryName: '',
  deliveryStreet: '',
  deliveryCity: '',
  deliveryState: '',
  deliveryZip: '',
  ccNumber: '',
  ccExpiration: '',
  ccCVV: ''
})
const formFields = ref<(keyof typeof backgroundData)[]>([
  'deliveryName',
  'deliveryStreet',
  'deliveryCity',
  'deliveryState',
  'deliveryZip'
])
const paymentFields = ref<(keyof typeof backgroundData)[]>([
  'ccNumber',
  'ccExpiration',
  'ccCVV'
])

const submitOrder = async () => {
  try {
    const res = await axios.post("/api/orders", backgroundData)
    alert(res.data)
  }
  catch (err) {
    if(axios.isAxiosError(err)){
      if (err.response?.status === 400) {
        Object.assign(errors, err.response.data);
      } else {
        alert(err.message);
      }
    }
    else {
      alert('未知错误')
    }
  }

}
</script>

<style>
.error {
  color: red;
}
</style>