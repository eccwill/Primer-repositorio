<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title>Registro</ion-title>
                <ion-buttons slot="end">
                    <ion-button  fill="solid" @click="router.push({ name: 'Login' })">Login</ion-button>
                </ion-buttons>
            </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
            
                <ion-input 
                    class="ion-margin-top"
                    label="Usuario" 
                    label-placement="floating" 
                    fill="outline" 
                    placeholder="Escribe aquí tu usuario">
                </ion-input>
            
            <ion-input 
                class="ion-margin-top"
                label="Contraseña" 
                label-placement="floating" 
                fill="outline" 
                placeholder="Escribe aquí tu contraseña"
                type="password">
            </ion-input>
            <ion-button expand="block" class="ion-margin-top">Registrarse</ion-button>
            <pre>{{ userStore.login }}</pre>
        </ion-content>
    </ion-page>
</template>
<script setup lang="ts">
import { IonContent, IonHeader, IonTitle, IonToolbar, IonPage, IonItem, IonInput, IonButtons, IonButton } from '@ionic/vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user';
const router = useRouter();


const userStore = useUserStore();
</script>