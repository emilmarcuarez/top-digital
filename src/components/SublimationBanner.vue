<template>
  <section class="section sublimation-banner">
    <div class="glow-orb"></div>
    
    <div class="container banner-container">
      <div class="text-content reveal" v-reveal>
        <span class="eyebrow accent-text">Servicio Especializado</span>
        <h2 class="section-title">Sublimación Textil <br>de Alta Fidelidad</h2>
        <p class="section-subtitle">
          Lleva la identidad de tu equipo o empresa al siguiente nivel. Diseñamos y fabricamos indumentaria personalizada con colores que no se desgastan y telas de máximo rendimiento.
        </p>
        
        <ul class="feature-list">
          <li><span class="check">✓</span> Colores ultra vibrantes y duraderos.</li>
          <li><span class="check">✓</span> Diseños 100% personalizados a tu medida.</li>
          <li><span class="check">✓</span> Materiales transpirables de calidad premium.</li>
        </ul>
        
        <a href="#contacto" class="btn btn-primary mt-action">Cotizar Indumentaria</a>
      </div>
      
      <div class="visual-content reveal" v-reveal style="transition-delay: 0.2s">
        <div class="textile-orbit" aria-hidden="true">
          <span></span>
          <span></span>
        </div>

        <div class="apparel-grid">
          <div
            v-for="(item, index) in apparelItems"
            :key="item.label"
            class="apparel-item"
            :class="getItemClass(index)"
          >
            <img :src="item.image" :alt="item.alt" />
          </div>
        </div>

        <div class="tags-arc">
          <button
            v-for="(item, index) in apparelItems"
            :key="item.label"
            class="apparel-tag"
            :class="[item.tagClass, { 'accent-tag': activeIndex === index }]"
            type="button"
            @click="setActive(index)"
          >
            {{ item.label }}
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import franelasImage from '../assets/franelas.png'
import jerseyImage from '../assets/jersey.png'
import chaquetaImage from '../assets/chaqueta.png'

const activeIndex = ref(1) // 1 = Jerseys (Center by default)
let textileTimer

const apparelItems = [
  {
    label: 'Franelas',
    tagClass: 'tag-left',
    image: franelasImage,
    alt: 'Franelas personalizadas'
  },
  {
    label: 'Jerseys',
    tagClass: 'tag-center',
    image: jerseyImage,
    alt: 'Jerseys deportivos personalizados'
  },
  {
    label: 'Chaquetas',
    tagClass: 'tag-right',
    image: chaquetaImage,
    alt: 'Chaquetas personalizadas'
  }
]

const nextItem = () => {
  activeIndex.value = (activeIndex.value + 1) % apparelItems.length
}

const startTimer = () => {
  textileTimer = window.setInterval(nextItem, 3600)
}

const resetTimer = () => {
  window.clearInterval(textileTimer)
  startTimer()
}

const setActive = (index) => {
  activeIndex.value = index
  resetTimer()
}

const getItemClass = (itemIndex) => {
  if (activeIndex.value === itemIndex) return 'item-center'
  
  if (activeIndex.value === 0) {
    return itemIndex === 1 ? 'item-right' : 'item-left'
  } else if (activeIndex.value === 1) {
    return itemIndex === 0 ? 'item-left' : 'item-right'
  } else { // activeIndex === 2
    return itemIndex === 0 ? 'item-right' : 'item-left'
  }
}

onMounted(startTimer)

onUnmounted(() => {
  window.clearInterval(textileTimer)
})
</script>

<style scoped>
.sublimation-banner {
  background: linear-gradient(135deg, var(--bg-primary) 0%, #1a0e0a 100%);
  position: relative;
  overflow: hidden;
  border-top: 1px solid rgba(255, 107, 53, 0.05);
  border-bottom: 1px solid rgba(255, 107, 53, 0.05);
  padding: 6rem 0;
}

.glow-orb {
  position: absolute;
  top: 50%;
  right: 10%;
  width: 800px;
  height: 800px;
  background: radial-gradient(circle, rgba(255, 107, 53, 0.12) 0%, transparent 70%);
  transform: translateY(-50%);
  z-index: 0;
  pointer-events: none;
}

.banner-container {
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 4rem;
  align-items: center;
  position: relative;
  z-index: 1;
}

.text-content {
  padding-right: 2rem;
}

.section-title {
  color: white;
}

.section-subtitle {
  font-size: 1.1rem;
  color: var(--text-secondary);
  line-height: 1.7;
  margin-bottom: 2rem;
}

.feature-list {
  list-style: none;
  padding: 0;
  margin-bottom: 3rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.feature-list li {
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 1rem;
  color: var(--text-primary);
}

.check {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  background: rgba(255, 107, 53, 0.15);
  color: var(--bg-accent);
  border-radius: 50%;
  font-size: 0.8rem;
  font-weight: bold;
}

.mt-action {
  margin-top: 1rem;
}

/* Dynamic Image Showcase */
.visual-content {
  position: relative;
  height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.apparel-grid {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.apparel-item {
  position: absolute;
  transition: all 0.6s cubic-bezier(0.25, 1, 0.5, 1);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.apparel-item img {
  width: 100%;
  height: auto;
  object-fit: contain;
  filter: drop-shadow(0 20px 30px rgba(0,0,0,0.5));
  transition: transform 0.4s ease;
}

.apparel-item:hover img {
  transform: translateY(-15px) scale(1.05);
}

.item-center {
  z-index: 3;
  width: 55%;
  transform: translateY(-20px) scale(1);
  opacity: 1;
  filter: blur(0);
}

.item-left {
  z-index: 2;
  width: 45%;
  left: 0;
  transform: translateX(20px) translateY(40px) rotate(-5deg) scale(0.9);
  opacity: 0.6;
  filter: blur(2px);
}

.item-right {
  z-index: 1;
  width: 45%;
  right: 0;
  transform: translateX(-20px) translateY(30px) rotate(5deg) scale(0.9);
  opacity: 0.6;
  filter: blur(2px);
}

/* Circular Tags Arc */
.tags-arc {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100px;
  z-index: 10;
}

.apparel-tag {
  position: absolute;
  padding: 0.5rem 1.5rem;
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 30px;
  font-size: 0.8rem;
  font-weight: 700;
  color: white;
  backdrop-filter: blur(10px);
  text-transform: uppercase;
  letter-spacing: 1.5px;
  box-shadow: 0 10px 20px rgba(0,0,0,0.3);
  cursor: pointer;
  transition: all 0.3s ease;
  user-select: none;
}

.apparel-tag:hover {
  background: rgba(255, 107, 53, 0.2);
  border-color: var(--bg-accent);
}

.accent-tag {
  background: var(--bg-accent) !important;
  color: white !important;
  border-color: var(--bg-accent) !important;
  box-shadow: 0 10px 25px rgba(255, 107, 53, 0.4) !important;
}

/* Desktop positioning for tags */
.tag-left {
  bottom: 50px;
  left: 10%;
  transform: rotate(-12deg);
  animation: floatSubtle 4s ease-in-out infinite 0s;
}

.tag-center {
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  animation: floatSubtle 4s ease-in-out infinite 1s;
}

.tag-right {
  bottom: 50px;
  right: 10%;
  transform: rotate(12deg);
  animation: floatSubtle 4s ease-in-out infinite 0.5s;
}

@keyframes floatSubtle {
  0%, 100% { margin-top: 0; }
  50% { margin-top: -10px; }
}

@media (max-width: 1024px) {
  .banner-container {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
  
  .glow-orb {
    right: 50%;
    transform: translate(50%, -50%);
  }
  
  .text-content {
    padding-right: 0;
    text-align: center;
  }
  
  .feature-list {
    align-items: center;
  }
}

@media (max-width: 600px) {
  .visual-content {
    height: auto;
    min-height: 400px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .apparel-grid {
    height: 300px;
    width: 100%;
    position: relative;
  }
  
  .item-center { width: 50%; transform: translateY(-10px) scale(1); filter: blur(0); opacity: 1; }
  .item-left { width: 40%; transform: translateX(15px) translateY(30px) rotate(-5deg) scale(0.9); filter: blur(2px); opacity: 0.6; }
  .item-right { width: 40%; transform: translateX(-15px) translateY(20px) rotate(5deg) scale(0.9); filter: blur(2px); opacity: 0.6; }
  
  .tags-arc {
    position: relative;
    bottom: auto;
    left: auto;
    height: auto;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    flex-wrap: wrap;
    gap: 0.8rem;
    margin-top: 1rem;
    pointer-events: auto;
  }
  
  .apparel-tag {
    position: static;
    transform: none !important;
    animation: none !important;
    padding: 0.6rem 1.2rem;
    font-size: 0.85rem;
    border-radius: 30px;
  }
}
</style>
