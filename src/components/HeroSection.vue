<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const scrollY = ref(0)

const handleParallax = () => {
  scrollY.value = window.scrollY
}

onMounted(() => {
  window.addEventListener('scroll', handleParallax)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleParallax)
})
</script>

<template>
  <section id="inicio" class="hero">
    <div class="hero-bg">
      <img src="../assets/imagen1.jpg" 
           alt="Hero Background" 
           class="bg-img" 
           :style="{ transform: `scale(1.1) translateY(${scrollY * 0.3}px)` }" />
      <div class="overlay"></div>
    </div>
    
    <div class="container hero-container">
      <div class="hero-content fade-in">
        <span class="eyebrow accent-text">Expertos en Gigantografía</span>
        <h1 class="hero-title">
          Imprime tus ideas <br />
          a <span class="accent-text">lo grande</span>
        </h1>
        <p class="hero-description">
          Especializados en soluciones de impresión de alto impacto. 
          Transformamos espacios con precisión arquitectónica y calidad visual inigualable.
        </p>
        <div class="hero-actions">
          <a href="#proyectos" class="btn btn-primary">Ver Portafolio</a>
          <a href="#servicios" class="btn btn-outline">Nuestros Servicios</a>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  height: 100vh;
  display: flex;
  align-items: center;
  overflow: hidden;
}

.hero-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
}

.bg-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: scale(1.1);
  filter: brightness(0.7);
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to right, rgba(13, 13, 13, 0.9) 30%, rgba(13, 13, 13, 0.4) 100%);
}

.hero-container {
  position: relative;
  z-index: 10;
  width: 100%;
}

.hero-content {
  max-width: 800px;
  text-align: left;
}

.eyebrow {
  display: block;
  font-size: 0.85rem;
  font-weight: 700;
  text-transform: uppercase;
  margin-bottom: 1.5rem;
  letter-spacing: 0.2em;
}

.hero-title {
  font-size: 5.5rem;
  line-height: 1;
  margin-bottom: 2rem;
  font-weight: 800;
}

.hero-description {
  font-size: 1.25rem;
  color: var(--text-secondary);
  margin-bottom: 3rem;
  max-width: 500px;
}

.hero-actions {
  display: flex;
  gap: 1.5rem;
}

@media (max-width: 968px) {
  .hero-title {
    font-size: 3.5rem;
  }
}

@media (max-width: 600px) {
  .hero-title {
    font-size: 2.5rem;
  }
  .hero-description {
    font-size: 1.1rem;
  }
  .hero-actions {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }
}
</style>
