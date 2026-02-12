<template>
  <svg v-if="name === 'bronze-drum'" :width="size" :height="size" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="32" cy="32" r="28" :stroke="color" stroke-width="2"/>
    <circle cx="32" cy="32" r="20" :stroke="color" stroke-width="1.5"/>
    <circle cx="32" cy="32" r="12" :stroke="color" stroke-width="1.5"/>
    <circle cx="32" cy="32" r="5" :fill="color"/>
    <line x1="32" y1="4" x2="32" y2="12" :stroke="color" stroke-width="1.5"/>
    <line x1="32" y1="52" x2="32" y2="60" :stroke="color" stroke-width="1.5"/>
    <line x1="4" y1="32" x2="12" y2="32" :stroke="color" stroke-width="1.5"/>
    <line x1="52" y1="32" x2="60" y2="32" :stroke="color" stroke-width="1.5"/>
    <line x1="11.2" y1="11.2" x2="16.8" y2="16.8" :stroke="color" stroke-width="1.2"/>
    <line x1="47.2" y1="47.2" x2="52.8" y2="52.8" :stroke="color" stroke-width="1.2"/>
    <line x1="52.8" y1="11.2" x2="47.2" y2="16.8" :stroke="color" stroke-width="1.2"/>
    <line x1="16.8" y1="47.2" x2="11.2" y2="52.8" :stroke="color" stroke-width="1.2"/>
  </svg>

  <svg v-else-if="name === 'embroidered-ball'" :width="size" :height="size" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="32" cy="32" r="24" :stroke="color" stroke-width="2"/>
    <ellipse cx="32" cy="32" rx="24" ry="10" :stroke="color" stroke-width="1.2"/>
    <ellipse cx="32" cy="32" rx="10" ry="24" :stroke="color" stroke-width="1.2"/>
    <circle cx="32" cy="32" r="4" :fill="color"/>
    <path d="M32 56 L28 62 L32 60 L36 62 Z" :fill="color" opacity="0.6"/>
  </svg>

  <svg v-else-if="name === 'wind-rain-bridge'" :width="size" :height="size" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 48 Q32 36 60 48" :stroke="color" stroke-width="2" fill="none"/>
    <line x1="16" y1="44" x2="16" y2="32" :stroke="color" stroke-width="1.5"/>
    <line x1="32" y1="42" x2="32" y2="28" :stroke="color" stroke-width="1.5"/>
    <line x1="48" y1="44" x2="48" y2="32" :stroke="color" stroke-width="1.5"/>
    <path d="M10 32 L16 24 L22 32" :stroke="color" stroke-width="1.5" fill="none"/>
    <path d="M26 28 L32 20 L38 28" :stroke="color" stroke-width="1.5" fill="none"/>
    <path d="M42 32 L48 24 L54 32" :stroke="color" stroke-width="1.5" fill="none"/>
    <path d="M20 24 L32 14 L44 24" :stroke="color" stroke-width="1.2" fill="none"/>
    <line x1="4" y1="48" x2="4" y2="58" :stroke="color" stroke-width="2"/>
    <line x1="60" y1="48" x2="60" y2="58" :stroke="color" stroke-width="2"/>
  </svg>

  <svg v-else-if="name === 'silver-jewelry'" :width="size" :height="size" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="32" cy="28" r="18" :stroke="color" stroke-width="2" fill="none"/>
    <circle cx="32" cy="28" r="12" :stroke="color" stroke-width="1" fill="none" stroke-dasharray="3 3"/>
    <circle cx="32" cy="28" r="4" :fill="color"/>
    <path d="M20 42 Q26 56 32 50 Q38 56 44 42" :stroke="color" stroke-width="1.5" fill="none"/>
    <circle cx="22" cy="16" r="2" :fill="color" opacity="0.5"/>
    <circle cx="42" cy="16" r="2" :fill="color" opacity="0.5"/>
    <circle cx="32" cy="12" r="2" :fill="color" opacity="0.5"/>
  </svg>

  <svg v-else-if="name === 'drum-tower'" :width="size" :height="size" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M22 58 L22 36 L32 16 L42 36 L42 58" :stroke="color" stroke-width="2" fill="none"/>
    <line x1="18" y1="58" x2="46" y2="58" :stroke="color" stroke-width="2"/>
    <path d="M18 36 L32 28 L46 36" :stroke="color" stroke-width="1.5" fill="none"/>
    <path d="M16 44 L32 38 L48 44" :stroke="color" stroke-width="1" fill="none"/>
    <path d="M14 52 L32 46 L50 52" :stroke="color" stroke-width="1" fill="none"/>
    <path d="M26 16 L32 8 L38 16" :stroke="color" stroke-width="1.5" fill="none"/>
    <line x1="32" y1="8" x2="32" y2="4" :stroke="color" stroke-width="1.5"/>
  </svg>

  <svg v-else :width="size" :height="size" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="32" cy="32" r="28" :stroke="color" stroke-width="2"/>
    <circle cx="32" cy="32" r="6" :fill="color"/>
  </svg>
</template>

<script setup>
defineProps({
  name: { type: String, required: true },
  size: { type: [Number, String], default: 48 },
  color: { type: String, default: '#1A535C' }
})
</script>
