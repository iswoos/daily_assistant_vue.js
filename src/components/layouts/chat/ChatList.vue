<template>
  <div class="app">
    <h2>채팅방 리스트</h2>
    <ul class="chat-room-list">
      <li v-for="room in chatRooms" :key="room.id">
        <a href="#" @click.prevent="fetchChatRoom(room.id)">
          {{ room.name }}
        </a>
        <span class="room-description">{{ room.description }}</span>
      </li>
    </ul>

    <div v-if="selectedChatRoom" class="chat-room-details">
      <h3>{{ selectedChatRoom.name }}</h3>
      <p>{{ selectedChatRoom.description }}</p>
      <!-- 여기에 채팅방의 추가 정보를 표시할 수 있습니다. -->
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import axios from 'axios'

export default {
  name: 'ChatList',

  setup() {
    const chatRooms = ref([
      {
        id: 1,
        name: 'General Chat',
        description: 'General discussion about anything.',
      },
      {
        id: 2,
        name: 'Programming Help',
        description: 'Get help with programming questions.',
      },
      {
        id: 3,
        name: 'Music Lovers',
        description: 'Chat about your favorite music.',
      },
      {
        id: 4,
        name: 'Movie Buffs',
        description: 'Discuss latest movies and classics.',
      },
      {
        id: 5,
        name: 'Gaming Zone',
        description: 'Talk about your favorite games.',
      },
    ])

    const selectedChatRoom = ref(null)

    const fetchChatRoom = async (roomId) => {
      try {
        const response = await axios.get(
          `http://api.example.com/chat-rooms/${roomId}`,
        )
        selectedChatRoom.value = response.data // Assuming API returns chat room details
      } catch (error) {
        console.error('Error fetching chat room data:', error)
        // Handle error
      }
    }

    return {
      chatRooms,
      selectedChatRoom,
      fetchChatRoom,
    }
  },
}
</script>

<style>
.app {
  font-family: Arial, sans-serif;
  margin: 20px;
}

.chat-room-list {
  list-style-type: none;
  padding: 0;
}

.chat-room-list li {
  margin-bottom: 10px;
}

.chat-room-list li a {
  color: #333;
  text-decoration: none;
}

.chat-room-list li a:hover {
  text-decoration: underline;
}

.room-description {
  margin-left: 10px;
  color: #888;
}

.chat-room-details {
  margin-top: 20px;
  border: 1px solid #ccc;
  padding: 10px;
}
</style>
