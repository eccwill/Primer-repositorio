<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title>Registro</ion-title>
                <ion-buttons slot="end">
                    <ion-button fill="solid" @click="router.push({ name: 'Login' })">Login</ion-button>
                </ion-buttons>
            </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
            <h2>Crear Cuenta</h2>
            
            <ion-input 
                v-model="userStore.register.username"
                class="ion-margin-top"
                label="Usuario" 
                label-placement="floating" 
                fill="outline" 
                placeholder="Mínimo 4 caracteres"
                @ion-change="validateForm">
            </ion-input>
            <ion-text color="danger" v-if="errors.username">
                <p style="font-size: 0.85rem;">{{ errors.username }}</p>
            </ion-text>

            <ion-input 
                v-model="userStore.register.email"
                class="ion-margin-top"
                label="Correo" 
                label-placement="floating" 
                fill="outline" 
                placeholder="ejemplo@correo.com"
                type="email"
                @ion-change="validateForm">
            </ion-input>
            <ion-text color="danger" v-if="errors.email">
                <p style="font-size: 0.85rem;">{{ errors.email }}</p>
            </ion-text>

            <ion-input 
                v-model="userStore.register.password"
                class="ion-margin-top"
                label="Contraseña" 
                label-placement="floating" 
                fill="outline" 
                placeholder="Mínimo 6 caracteres"
                type="password"
                @ion-change="validateForm">
            </ion-input>
            <ion-text color="danger" v-if="errors.password">
                <p style="font-size: 0.85rem;">{{ errors.password }}</p>
            </ion-text>

            <ion-button 
                expand="block" 
                class="ion-margin-top"
                @click="handleRegister"
                :disabled="!isFormValid || isLoading">
                {{ isLoading ? 'Registrando...' : 'Registrarse' }}
            </ion-button>

            <ion-text color="success" v-if="successMessage">
                <p>{{ successMessage }}</p>
            </ion-text>
        </ion-content>
    </ion-page>
</template>

<script setup lang="ts">
import { IonContent, IonHeader, IonTitle, IonToolbar, IonPage, IonInput, IonButtons, IonButton, IonText } from '@ionic/vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user';
import { ref, computed } from 'vue';

const router = useRouter();
const userStore = useUserStore();
const isLoading = ref(false);
const successMessage = ref('');
const errors = ref({
    username: '',
    email: '',
    password: ''
});

const isFormValid = computed(() => {
    return userStore.register.username && 
           userStore.register.email && 
           userStore.register.password &&
           !errors.value.username &&
           !errors.value.email &&
           !errors.value.password;
});

function validateUsername(username: string): string {
    if (!username || username.length < 4) {
        return 'El usuario debe tener al menos 4 caracteres';
    }
    if (!/^[a-zA-Z0-9_]+$/.test(username)) {
        return 'El usuario solo puede contener letras, números y guión bajo';
    }
    return '';
}

function validateEmail(email: string): string {
    if (!email) {
        return 'El correo es requerido';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return 'Por favor ingresa un correo válido';
    }
    return '';
}

function validatePassword(password: string): string {
    if (!password || password.length < 6) {
        return 'La contraseña debe tener al menos 6 caracteres';
    }
    return '';
}

function validateForm() {
    errors.value.username = validateUsername(userStore.register.username || '');
    errors.value.email = validateEmail(userStore.register.email || '');
    errors.value.password = validatePassword(userStore.register.password || '');
}

async function handleRegister() {
    validateForm();
    
    if (!isFormValid.value) {
        return;
    }

    isLoading.value = true;
    successMessage.value = '';
    
    try {
        await userStore.$register();
        successMessage.value = '¡Registro exitoso! Redirigiendo...';
        setTimeout(() => {
            router.push({ name: 'Tabs' });
        }, 2000);
    } catch (error: any) {
        errors.value.email = error.response?.data?.message || 'Error al registrar. Intenta de nuevo.';
    } finally {
        isLoading.value = false;
    }
}
</script>