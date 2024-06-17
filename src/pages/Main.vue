<template>
  <div v-if="weatherData">
    <p>지역: {{ weatherData.city.name }}</p>
    <div v-for="item in weatherData.list" :key="item.dt">
      <p>시간: {{ utcToKSC(item.dt) }}</p>
      <p>날씨: {{ item.weather[0].description }}</p>
      <p>온도: {{ item.main.temp }} °C</p>
      <hr />
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import axios from 'axios'

export default {
  name: 'MainPage',

  setup() {
    const positionObj = ref({})
    const weatherData = ref(null)

    onMounted(() => {
      getCurrentPosition()
    })

    const getCurrentPosition = () => {
      if (!navigator.geolocation) {
        setAlert('위치 정보를 찾을 수 없습니다.')
      } else {
        navigator.geolocation.getCurrentPosition(
          getPositionValue,
          geolocationError,
        )
      }
    }

    const getPositionValue = async (val) => {
      positionObj.value.latitude = val.coords.latitude
      positionObj.value.longitude = val.coords.longitude

      const { latitude, longitude } = formatLongitudeAndLatitude(
        positionObj.value.latitude,
        positionObj.value.longitude,
      )

      await fetchWeatherData(latitude, longitude)
    }

    const formatLongitudeAndLatitude = (latitude, longitude) => {
      const formatLatitude = Math.trunc(latitude * 1000) / 1000
      const formatLongitude = Math.trunc(longitude * 1000) / 1000
      return { latitude: formatLatitude, longitude: formatLongitude }
    }

    const geolocationError = () => {
      setAlert('위치 정보를 찾을 수 없습니다.')
    }

    const setAlert = (text) => {
      alert(text)
    }

    const fetchWeatherData = async (latitude, longitude) => {
      const apiKey = process.env.VUE_APP_OPENWEATHER_API_KEY
      console.log('실행확인')
      console.log(apiKey)
      const url = `https://api.openweathermap.org/data/2.5/forecast?cnt=10&lat=${latitude}&lon=${longitude}&units=metric&lang=kr&appid=${apiKey}`

      try {
        const response = await axios.get(url)
        weatherData.value = response.data
      } catch (error) {
        console.error('날씨 정보를 가져오는 중 오류 발생:', error)
      }
    }

    // toLocaleString 메서드를 이용하여 ksc 시간으로 변경
    const utcToKSC = (utcTimestamp) => {
      const utcDate = new Date(utcTimestamp * 1000)
      return utcDate.toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })
    }

    return {
      positionObj,
      getCurrentPosition,
      formatLongitudeAndLatitude,
      weatherData,
      utcToKSC,
    }
  },
}
</script>
