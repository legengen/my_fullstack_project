<template>
    <form @submit.prevent="submitOrder">
        <h1>Order your taco creations!</h1>
        <h3>Deliver my taco masterpieces to...</h3>
        <div v-for="field in formFields" :key="field">
            <label :for="field">{{ field }}:</label>
            <input type="text" v-model="backgroundData[field]" :id="field">
        </div>
        <h3>Here's how I'll pay...</h3>
        <div v-for="field in paymentFields" :key="field">
            <label :for="field">{{ field }}:</label>
            <input type="text" v-model="backgroundData[field]" :id="field">
        </div>
        <button type="submit">submit</button>
    </form>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import axios from 'axios'
const backgroundData = reactive({
  name: '',
  street: '',
  city: '',
  state: '',
  zip: '',
  ccNumber: '',
  ccExpiration: '',
  ccCVV: ''
})
const formFields = ref<(keyof typeof backgroundData)[]>([
  'name',
  'street',
  'city',
  'state',
  'zip'
])
const paymentFields = ref<(keyof typeof backgroundData)[]>([
  'ccNumber',
  'ccExpiration',
  'ccCVV'
])

const submitOrder = async () => {
  try {
    const payload = {
      deliveryName: backgroundData.name,
      deliveryStreet: backgroundData.street,
      deliveryCity: backgroundData.city,
      deliveryState: backgroundData.state,
      deliveryZip: backgroundData.zip,
      ccNumber: backgroundData.ccNumber,
      ccExpiration: backgroundData.ccExpiration,
      ccCVV: backgroundData.ccCVV
    }
    const res = await axios.post("/api/orders", payload)
    alert(res.data)
  }
  catch (err) {
    console.error(err)
    alert('提交失败')
  }

}
</script>