<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import imageGigantografia from '../assets/valla_cashea.jpg'
import imageCorporeo from '../assets/corporeo.jpg'
import imageInstalacion from '../assets/instalacion_mango.jpg'
import imageLetrasAcrilico from '../assets/letras-acrilico.jpeg'

const activeStory = ref(0)
let storyTimer

const stories = [
  {
    media: imageGigantografia,
    type: 'image',
    position: '50% 0%',
    panEndPosition: '50% 100%',
    label: 'Gigantografia',
    title: 'Formatos grandes para mensajes que se ven a distancia',
    copy: 'Vallas, lonas y piezas de gran escala con presencia clara, alto impacto y acabados resistentes.'
  },
  {
    media: imageCorporeo,
    type: 'image',
    position: '50% 0%',
    panEndPosition: '50% 100%',
    label: 'Corporeo',
    title: 'Volumen, relieve y marca con presencia fisica',
    copy: 'Elementos corporeos para fachadas, recepciones y espacios comerciales con terminaciones limpias.'
  },
  {
    media: imageInstalacion,
    type: 'image',
    position: '50% 0%',
    panEndPosition: '50% 100%',
    label: 'Instalacion',
    title: 'Montajes precisos para que cada pieza quede lista',
    copy: 'Instalacion profesional en sitio, cuidando alineacion, fijacion y presentacion final.'
  },
  {
    media: imageLetrasAcrilico,
    type: 'image',
    position: 'center top',
    label: 'Letras en acrilico',
    title: 'Letras en acrilico',
    copy: ''
  }
]

const currentStory = computed(() => stories[activeStory.value])

const getMediaStyle = (story) => ({
  objectFit: 'cover',
  objectPosition: story.position,
  '--pan-start-position': story.position ?? '50% 0%',
  '--pan-end-position': story.panEndPosition ?? '50% 100%'
})

const getStoryPosition = (index) => {
  const offset = (index - activeStory.value + stories.length) % stories.length
  return `position-${offset}`
}

const nextStory = () => {
  activeStory.value = (activeStory.value + 1) % stories.length
}

const selectStory = (index) => {
  activeStory.value = index
}

onMounted(() => {
  storyTimer = window.setInterval(nextStory, 3800)
})

onUnmounted(() => {
  window.clearInterval(storyTimer)
})
</script>

<template>
  <section id="nosotros" class="section about">
    <div class="container">
      <div class="about-heading reveal" v-reveal>
        <span class="eyebrow accent-text">Sobre nosotros</span>
        <h2 class="section-title">Nuestra esencia</h2>
        <p>
          Mas de una decada transformando ideas en piezas visuales que se sienten
          presentes, precisas y memorables.
        </p>
      </div>

      <div class="story-carousel reveal" v-reveal>
        <div class="story-stage">
          <article
            v-for="(story, index) in stories"
            :key="story.title"
            class="story-card"
            :class="getStoryPosition(index)"
          >
            <video
              v-if="story.type === 'video'"
              :src="story.media"
              :style="getMediaStyle(story)"
              autoplay
              muted
              loop
              playsinline
              preload="metadata"
              aria-hidden="true"
            ></video>
            <img
              v-else
              :src="story.media"
              :alt="story.title"
              :style="getMediaStyle(story)"
            />
            <div class="story-overlay"></div>
            <div class="story-content">
              <span v-if="story.label !== story.title">{{ story.label }}</span>
              <h3>{{ story.title }}</h3>
            </div>
          </article>
        </div>

        <aside class="story-panel">
          <span>Proyecto destacado</span>
          <h3>{{ currentStory.label }}</h3>
          <p v-if="currentStory.copy">{{ currentStory.copy }}</p>

          <div class="story-dots" aria-hidden="true">
            <button
              v-for="(_, index) in stories"
              :key="index"
              type="button"
              :class="{ active: index === activeStory }"
              @click="selectStory(index)"
            ></button>
          </div>
        </aside>
      </div>

      <div class="essence-strip reveal" v-reveal>
        <article class="strip-card metric">
          <strong>10+</strong>
          <span>Anos de experiencia</span>
        </article>

        <article class="strip-card">
          <span>01 / Mision</span>
          <p>
            Brindar soluciones profesionales en impresion, corporeos, diseno y
            ambientacion con comunicacion clara y tecnologia de vanguardia.
          </p>
        </article>

        <article class="strip-card">
          <span>02 / Vision</span>
          <p>
            Ser referentes en posicionamiento visual de marcas con materiales,
            acabados y ejecuciones de alto nivel.
          </p>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about {
  position: relative;
  overflow: hidden;
  background:
    radial-gradient(circle at 70% 10%, rgba(255, 107, 53, 0.13), transparent 24rem),
    linear-gradient(180deg, #0b0b0b 0%, #101010 52%, #0b0b0b 100%);
}

.about::before {
  content: "";
  position: absolute;
  inset: 0;
  background:
    linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px),
    linear-gradient(180deg, rgba(255,255,255,0.022) 1px, transparent 1px);
  background-size: 88px 88px;
  mask-image: linear-gradient(180deg, transparent, black 18%, black 82%, transparent);
  opacity: 0.45;
  pointer-events: none;
}

.about .container {
  position: relative;
}

.about-heading {
  max-width: 760px;
  margin-bottom: 2.4rem;
}

.about-heading p {
  max-width: 650px;
  color: var(--text-secondary);
  font-size: 1.2rem;
  line-height: 1.65;
}

.story-carousel {
  display: grid;
  grid-template-columns: minmax(480px, 1fr) minmax(280px, 0.42fr);
  gap: 1.2rem;
  align-items: stretch;
  min-height: 560px;
  margin-top: 0.5rem;
}

.story-stage {
  position: relative;
  min-height: 560px;
  perspective: 1000px;
}

.story-card {
  position: absolute;
  inset: 0;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 8px;
  background: #151515;
  box-shadow: 0 26px 70px rgba(0, 0, 0, 0.36);
  isolation: isolate;
  transition:
    transform 0.85s cubic-bezier(0.16, 1, 0.3, 1),
    opacity 0.55s ease,
    filter 0.55s ease;
}

.story-card img,
.story-card video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: saturate(1.05) contrast(1.04);
  will-change: object-position;
  transition: filter 0.55s ease;
}

.story-overlay {
  position: absolute;
  inset: 0;
  z-index: 1;
  background:
    linear-gradient(180deg, rgba(0,0,0,0.05) 18%, rgba(0,0,0,0.86) 100%),
    radial-gradient(circle at 25% 85%, rgba(255, 107, 53, 0.24), transparent 16rem);
}

.story-content {
  position: absolute;
  left: 2rem;
  right: 2rem;
  bottom: 1.8rem;
  z-index: 2;
}

.story-content span,
.strip-card span {
  color: rgba(255, 255, 255, 0.72);
  font-size: 0.68rem;
  font-weight: 800;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.story-content h3 {
  max-width: 520px;
  margin: 0.55rem 0 0;
  color: white;
  font-family: var(--font-heading);
  font-size: clamp(1.15rem, 1.55vw, 1.55rem);
  line-height: 1.12;
  text-transform: uppercase;
}

.story-card.position-0 {
  z-index: 4;
  opacity: 1;
  filter: saturate(1);
  transform: translate3d(0, 0, 0) rotate(0deg) scale(1);
}

.story-card.position-1 {
  z-index: 3;
  opacity: 0.58;
  filter: saturate(0.75) brightness(0.74);
  transform: translate3d(2rem, 1.4rem, -90px) rotate(2.5deg) scale(0.93);
}

.story-card.position-2 {
  z-index: 2;
  opacity: 0.32;
  filter: saturate(0.65) brightness(0.62);
  transform: translate3d(4rem, 2.7rem, -160px) rotate(4deg) scale(0.86);
}

.story-card.position-3 {
  z-index: 1;
  opacity: 0;
  filter: saturate(0.55) brightness(0.5);
  transform: translate3d(-2rem, 3rem, -220px) rotate(-4deg) scale(0.82);
}

.story-card.position-0 .story-content {
  animation: contentIn 0.72s cubic-bezier(0.16, 1, 0.3, 1);
}

.story-card.position-0 img {
  animation: mediaPanVertical 6.2s ease-in-out infinite alternate;
}

.story-card.position-0 video {
  animation: none;
}

.story-panel {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  min-height: 560px;
  padding: 1.4rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  background:
    radial-gradient(circle at 80% 18%, rgba(255, 107, 53, 0.22), transparent 12rem),
    linear-gradient(135deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.025)),
    rgba(255, 255, 255, 0.03);
  box-shadow: 0 26px 70px rgba(0, 0, 0, 0.24);
}

.story-panel span {
  color: var(--bg-accent);
  font-size: 0.68rem;
  font-weight: 800;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

.story-panel h3 {
  max-width: 100%;
  margin: 0.65rem 0 1rem;
  color: white;
  font-size: clamp(1.35rem, 1.8vw, 2rem);
  line-height: 1.05;
  letter-spacing: 0;
  overflow-wrap: anywhere;
}

.story-panel p {
  margin: 0;
  color: var(--text-secondary);
  font-size: 1rem;
  line-height: 1.65;
}

.story-dots {
  display: flex;
  gap: 0.55rem;
  margin-top: 2rem;
}

.story-dots button {
  width: 2.35rem;
  height: 3px;
  padding: 0;
  border: 0;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.2);
  cursor: pointer;
}

.story-dots button.active {
  background: var(--bg-accent);
  box-shadow: 0 0 18px rgba(255, 107, 53, 0.45);
}

.essence-strip {
  display: grid;
  grid-template-columns: 0.62fr 1fr 1fr;
  gap: 1.1rem;
  margin-top: 1.1rem;
}

.strip-card {
  min-height: 150px;
  padding: 1.35rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  background:
    linear-gradient(135deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.025)),
    rgba(255, 255, 255, 0.03);
}

.strip-card p {
  margin: 0.9rem 0 0;
  color: var(--text-secondary);
  font-size: 0.95rem;
  line-height: 1.65;
}

.metric {
  background:
    radial-gradient(circle at 85% 20%, rgba(255, 107, 53, 0.28), transparent 10rem),
    rgba(255, 107, 53, 0.08);
  border-color: rgba(255, 107, 53, 0.28);
}

.metric strong {
  display: block;
  color: var(--bg-accent);
  font-family: var(--font-heading);
  font-size: 4.3rem;
  line-height: 0.9;
}

.metric span {
  display: block;
  max-width: 150px;
  color: white;
}

@media (max-width: 1024px) {
  .story-carousel,
  .essence-strip {
    grid-template-columns: 1fr;
  }

  .story-panel {
    order: 1;
  }

  .story-stage {
    order: 2;
  }

  .story-carousel,
  .story-stage,
  .story-panel {
    min-height: 420px;
  }

  .story-panel {
    justify-content: center;
  }
}

@media (max-width: 600px) {
  .about-heading p {
    font-size: 1rem;
  }

  .story-carousel,
  .story-stage,
  .story-panel {
    min-height: 360px;
  }

  .story-content {
    left: 1.25rem;
    right: 1.25rem;
    bottom: 1.25rem;
  }

  .strip-card {
    min-height: auto;
  }

  .story-card.position-1 {
    transform: translate3d(1rem, 0.9rem, -80px) rotate(2deg) scale(0.94);
  }

  .story-card.position-2 {
    transform: translate3d(1.8rem, 1.8rem, -140px) rotate(3deg) scale(0.88);
  }
}

@keyframes contentIn {
  from {
    opacity: 0;
    transform: translateY(1rem);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes mediaPanVertical {
  from {
    object-position: var(--pan-start-position);
  }
  to {
    object-position: var(--pan-end-position);
  }
}
</style>
