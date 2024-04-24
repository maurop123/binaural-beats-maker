<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Blank</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Blank</ion-title>
        </ion-toolbar>
      </ion-header>

        <!-- main -->
        <ion-grid>
          <ion-row>
            <ion-col size="3">
              <div class="flex justify-between">
                <span class="text-sm text-slate-500">Beat Frequency: 
              </span><span class="font-bold">{{ beatFrequency}}Hz</span></div>
            <ion-range v-model="beatFrequency" max="50"></ion-range>
            <ion-button v-if="!isPlaying" @click="play">Play</ion-button>
            <ion-button v-else @click="pause">Pause</ion-button>
          </ion-col>
          </ion-row>
        </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
    import type { Ref } from 'vue'
import { IonButton, IonContent, IonHeader, IonPage, IonRange, IonTitle, IonToolbar } from '@ionic/vue';
import BeatPlayer from '@/BeatPlayer.ts'

const beat1 = new BeatPlayer()
const beatFrequency: Ref<number> = ref(beat1.frequency.beat)
const isPlaying: Ref<boolean> = ref(false)

watch(beatFrequency, (newVal, oldVal) => {
  beat1.frequency.beat = newVal
})

function play() {
  beat1.play()
  isPlaying.value = true
}

function pause() {
  beat1.pause()
  isPlaying.value = false
}
</script>

<style scoped>
#container {
  text-align: center;
  
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

#container strong {
  font-size: 20px;
  line-height: 26px;
}

#container p {
  font-size: 16px;
  line-height: 22px;
  
  color: #8c8c8c;
  
  margin: 0;
}

#container a {
  text-decoration: none;
}
</style>
