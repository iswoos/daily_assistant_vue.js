<template>
  <div>
    <button @click="getCurrentPosition()">위치 좌표 확인</button>
    <div>{{ isPositionReady ? 'yes' : 'no' }}</div>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'MainPage',

  setup() {
    const positionObj = ref({})
    const isPositionReady = ref(false)

    const getCurrentPosition = () => {
      if (!navigator.geolocation) {
        setAlert('위치 정보를 찾을 수 없습니다.1')
      } else {
        navigator.geolocation.getCurrentPosition(
          getPositionValue,
          geolocationError,
        )
      }
    }

    const getPositionValue = (val) => {
      positionObj.value.latitude = val.coords.latitude
      positionObj.value.longitude = val.coords.longitude
      isPositionReady.value = true
      console.log(positionObj.value.latitude)
      console.log(positionObj.value.longitude)

      const { latitude, longitude } = formatLongitudeAndLatitude(
        positionObj.value.latitude,
        positionObj.value.longitude,
      )
      console.log(latitude)
      console.log(longitude)
      setAlert('주소 확인 완료')
    }

    const formatLongitudeAndLatitude = (latitude, longitude) => {
      const formatLatitude = Math.trunc(latitude * 1000) / 1000
      const formatLongitude = Math.trunc(longitude * 1000) / 1000
      return { latitude: formatLatitude, longitude: formatLongitude }
    }

    const geolocationError = () => {
      setAlert('위치 정보를 찾을 수 없습니다.2')
    }

    const setAlert = (text) => {
      alert(text)
    }

    return {
      positionObj,
      isPositionReady,
      getCurrentPosition,
      formatLongitudeAndLatitude,
    }
  },
}
</script>
