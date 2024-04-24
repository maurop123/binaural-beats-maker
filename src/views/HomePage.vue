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
              <div>{{ beatFrequency}}</div>
            <ion-range v-model="beatFrequency"></ion-range>
            <ion-button @click="play">Play</ion-button>
          </ion-col>
          </ion-row>
        </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'
    import type { Ref } from 'vue'
import { IonButton, IonContent, IonHeader, IonPage, IonRange, IonTitle, IonToolbar } from '@ionic/vue';

const beatFrequency: Ref<number> = ref(50)

function play() {
  console.debug('beatFrequency', beatFrequency.value)
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
