<template>
  <section id="servicios" class="section services">
    <div class="services-grid-bg" aria-hidden="true"></div>

    <div class="services-layout">
      <div class="services-showcase reveal" v-reveal>
        <div class="services-label">
          <span>Servicios</span>
          <strong>Destacados</strong>
        </div>
        <div class="guide-lines" aria-hidden="true">
          <span></span>
          <span></span>
          <span></span>
        </div>

        <div class="catalog-stage" :key="`catalog-${activeFeatureIndex}`">
          <article class="feature-card catalog-card catalog-card-main">
            <img :src="activeFeature.image" :alt="activeFeature.title" />
            <div class="feature-content">
              <span>{{ activeFeature.category }}</span>
              <h3>{{ activeFeature.title }}</h3>
              <p>{{ activeFeature.description }}</p>
              <button @click="openModal(activeFeature.modal)">Explorar procesos</button>
            </div>
          </article>

          <article class="feature-card catalog-card catalog-card-side">
            <img :src="nextFeature.image" :alt="nextFeature.title" />
            <div class="feature-content">
              <span>{{ nextFeature.category }}</span>
              <h3>{{ nextFeature.title }}</h3>
              <p>{{ nextFeature.description }}</p>
              <button @click="openModal(nextFeature.modal)">Explorar proyectos</button>
            </div>
          </article>
        </div>

        <div class="feature-dots" aria-hidden="true">
          <span
            v-for="(_, index) in featureSlides"
            :key="index"
            :class="{ active: index === activeFeatureIndex }"
          ></span>
        </div>
      </div>

      <div class="services-panel reveal" v-reveal>
        <div class="panel-heading">
          <h2>Mas soluciones</h2>
        </div>

        <div class="cards-grid">
          <button
            v-for="(service, index) in serviceCards"
            :key="service.title"
            class="solution-card"
            @click="openModal(service)"
          >
            <span class="card-number">{{ String(index + 1).padStart(2, '0') }}</span>
            <span class="card-icon">{{ service.icon }}</span>
            <strong>{{ service.title }}</strong>
            <em>Ver mas</em>
          </button>
        </div>
      </div>
    </div>

    <Teleport to="body">
      <Transition name="modal-fade">
        <div v-if="activeService" class="modal-overlay" @click.self="closeModal">
          <div class="modal-content glass-modal">
            <button class="close-btn" @click="closeModal">&times;</button>
            <div class="modal-body">
              <div class="modal-info">
                <span class="eyebrow accent-text">Detalle del servicio</span>
                <h3 class="modal-title">{{ activeService.title }}</h3>
                <p class="modal-desc">
                  Diseno premium y fabricacion especializada con materiales de alta calidad
                  para lograr resultados limpios, duraderos y de alto impacto.
                </p>
                <div class="modal-actions">
                  <a href="#contacto" class="btn btn-primary" @click="closeModal">Solicitar cotizacion</a>
                </div>
              </div>
              <div class="modal-visuals">
                <div class="visual-item main-visual">
                  <img :src="activeService.image || imageIvoo" alt="Muestra principal" />
                </div>
                <div class="visual-item sub-visual">
                  <img src="../assets/imagen3.jpg" alt="Detalle A" />
                </div>
                <div class="visual-item sub-visual">
                  <img src="../assets/imagen4.jpg" alt="Detalle B" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </section>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import imageIvoo from '../assets/imagen4.jpg'
import imageFarma from '../assets/imagen2.jpg'
import imageWings from '../assets/imagen3.jpg'
import imagePrint from '../assets/imagen1.jpg'
import imageTextil from '../assets/franelas.png'

const activeService = ref(null)
const activeFeatureIndex = ref(0)
let featureTimer

const servicesList = [
  { title: 'Rotulacion', image: imageIvoo, icon: 'A1' },
  { title: 'Corporeos en acrilico con iluminacion', image: imageIvoo, icon: '01' },
  { title: 'Corporeos en PVC y MDF', image: imageWings, icon: '02' },
  { title: 'Letras corporeas en galvanizado', image: imageIvoo, icon: '03' },
  { title: 'Fachadas comerciales en alucobond (ACM)', image: imageIvoo, icon: '04' },
  { title: 'Ambientacion de locales comerciales', image: imageWings, icon: '05' },
  { title: 'Instalacion de elementos decorativos', image: imageFarma, icon: '06' },
  { title: 'Stands portatiles para eventos', image: imageWings, icon: '07' },
  { title: 'Stands corporativos y elementos tecnologicos', image: imageWings, icon: '08' },
  { title: 'Banderas publicitarias', image: imagePrint, icon: '09' },
  { title: 'Sublimacion personalizada', image: imageTextil, icon: '10' }
]
const serviceCards = computed(() => servicesList.slice(1, 10))

const featureSlides = computed(() => [
  {
    title: 'Textil industrial',
    category: 'Sublimacion',
    description: 'Prendas y uniformes personalizados con color vibrante.',
    image: imageTextil,
    modal: servicesList[10]
  },
  {
    title: 'Rotulacion visual',
    category: 'Rotulacion',
    description: 'Fachadas, avisos y ambientacion comercial de alto impacto.',
    image: imageIvoo,
    modal: servicesList[0]
  },
  {
    title: 'Material POP',
    category: 'Punto de venta',
    description: 'Stands, exhibidores y piezas promocionales para activar marcas.',
    image: imageWings,
    modal: servicesList[7]
  },
  {
    title: 'Gigantografia',
    category: 'Gran formato',
    description: 'Vallas y lonas visibles a distancia con montaje profesional.',
    image: imageFarma,
    modal: servicesList[6]
  }
])

const activeFeature = computed(() => featureSlides.value[activeFeatureIndex.value])
const nextFeatureIndex = computed(() => (activeFeatureIndex.value + 1) % featureSlides.value.length)
const nextFeature = computed(() => featureSlides.value[nextFeatureIndex.value])

const openModal = (service) => {
  activeService.value = service
  document.body.style.overflow = 'hidden'
}

const closeModal = () => {
  activeService.value = null
  document.body.style.overflow = ''
}

onMounted(() => {
  featureTimer = window.setInterval(() => {
    activeFeatureIndex.value = (activeFeatureIndex.value + 1) % featureSlides.value.length
  }, 4300)
})

onUnmounted(() => {
  window.clearInterval(featureTimer)
  document.body.style.overflow = ''
})
</script>

<style scoped>
.services {
  position: relative;
  overflow: hidden;
  background:
    radial-gradient(circle at 18% 18%, rgba(255, 107, 53, 0.09), transparent 24rem),
    linear-gradient(135deg, #111820 0%, #121416 48%, #101010 100%);
}

.services-grid-bg {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(90deg, rgba(255,255,255,0.045) 1px, transparent 1px),
    linear-gradient(180deg, rgba(255,255,255,0.032) 1px, transparent 1px);
  background-size: 34px 34px;
  mask-image: linear-gradient(90deg, transparent, black 8%, black 92%, transparent);
  opacity: 0.36;
  pointer-events: none;
}

.services-layout {
  position: relative;
  width: min(96vw, var(--container-max));
  margin: 0 auto;
  display: grid;
  grid-template-columns: minmax(540px, 0.86fr) minmax(620px, 1fr);
  gap: clamp(2rem, 3vw, 4rem);
  align-items: start;
}

.services-showcase {
  position: relative;
  min-height: 585px;
  padding-top: 5.2rem;
  overflow: visible;
}

.services-label {
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}

.services-label span {
  color: var(--bg-accent);
  font-family: var(--font-body);
  font-size: 0.92rem;
  font-weight: 500;
  letter-spacing: 0;
  text-transform: none;
}

.services-label strong {
  color: white;
  font-family: var(--font-heading);
  font-size: clamp(2rem, 3vw, 3.2rem);
  font-weight: 700;
  line-height: 0.92;
  letter-spacing: 0.01em;
  text-transform: uppercase;
}

.guide-lines {
  display: none;
  position: absolute;
  top: 1.45rem;
  left: 10rem;
  right: 0;
  height: 42px;
  z-index: 3;
  pointer-events: none;
  opacity: 0.42;
}

.guide-lines span {
  position: absolute;
  left: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(255, 107, 53, 0.72), rgba(255,255,255,0.2), transparent);
  transform-origin: left center;
  animation: guideDraw 4.3s cubic-bezier(0.16, 1, 0.3, 1) infinite;
}

.guide-lines span::after {
  content: "";
  position: absolute;
  right: 0;
  top: -3px;
  width: 7px;
  height: 7px;
  border-radius: 999px;
  background: var(--bg-accent);
  box-shadow: 0 0 18px rgba(255, 107, 53, 0.9);
}

.guide-lines span:nth-child(1) {
  top: 0;
  width: 48%;
}

.guide-lines span:nth-child(2) {
  top: 18px;
  left: 18%;
  width: 54%;
  animation-delay: 0.18s;
}

.guide-lines span:nth-child(3) {
  top: 36px;
  left: 7%;
  width: 36%;
  animation-delay: 0.34s;
}

.catalog-stage {
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 1.04fr) minmax(0, 0.96fr);
  gap: 1.05rem;
  height: 520px;
  animation: catalogPage 0.72s cubic-bezier(0.16, 1, 0.3, 1) both;
}

.feature-card {
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.16);
  border-radius: 8px;
  background: #0b0d0f;
  box-shadow: 0 26px 80px rgba(0, 0, 0, 0.34);
  height: 100%;
}

.feature-card::after {
  content: "";
  position: absolute;
  inset: 0;
  background:
    linear-gradient(180deg, rgba(0,0,0,0.08), rgba(0,0,0,0.84)),
    radial-gradient(circle at 20% 85%, rgba(255, 107, 53, 0.2), transparent 16rem);
}

.feature-card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: saturate(1.03) contrast(1.05);
  transition: transform 0.75s cubic-bezier(0.16, 1, 0.3, 1);
}

.feature-card:hover img {
  transform: scale(1.06);
}

.catalog-card {
  transform: translateZ(0);
}

.catalog-card-side {
  animation: catalogSide 0.72s cubic-bezier(0.16, 1, 0.3, 1) both;
}

.catalog-card .feature-content h3 {
  font-size: clamp(1.55rem, 1.95vw, 2.15rem);
  line-height: 1.02;
  max-width: 100%;
  text-wrap: balance;
}

.catalog-card-side .feature-content h3 {
  font-size: clamp(1.42rem, 1.72vw, 1.85rem);
}

.catalog-card-side .feature-content p {
  max-width: 290px;
  font-size: 0.9rem;
}

.feature-content {
  position: absolute;
  left: clamp(1.1rem, 2vw, 1.65rem);
  right: clamp(1.1rem, 2vw, 1.65rem);
  bottom: clamp(1.1rem, 2vw, 1.65rem);
  z-index: 1;
}

.feature-content span,
.panel-heading span {
  color: rgba(255,255,255,0.74);
  font-size: 0.68rem;
  font-weight: 800;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.feature-content h3 {
  margin: 0.45rem 0 0.55rem;
  color: white;
  font-size: clamp(1.55rem, 1.95vw, 2.15rem);
  line-height: 1.02;
  max-width: 100%;
  text-wrap: balance;
}

.feature-content p {
  max-width: 320px;
  margin: 0 0 1rem;
  color: rgba(255,255,255,0.78);
  font-size: 0.95rem;
  line-height: 1.45;
}

.feature-content button {
  padding: 0.68rem 1rem;
  border: 1px solid rgba(255,255,255,0.34);
  border-radius: 999px;
  color: white;
  background: rgba(0,0,0,0.22);
  font-weight: 800;
  cursor: pointer;
}

.feature-dots {
  position: absolute;
  left: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  gap: 0.55rem;
}

.feature-dots span {
  width: 1.75rem;
  height: 2px;
  border-radius: 999px;
  background: rgba(255,255,255,0.22);
  transition: width 0.32s ease, background 0.32s ease;
}

.feature-dots span.active {
  width: 3rem;
  background: var(--bg-accent);
  box-shadow: 0 0 18px rgba(255, 107, 53, 0.55);
}

.services-panel {
  padding-top: 0.3rem;
}

.panel-heading {
  margin-bottom: 1rem;
  border-top: 1px solid rgba(255,255,255,0.22);
  padding-top: 1rem;
}

.panel-heading h2 {
  margin: 0;
  color: white;
  font-size: clamp(2rem, 3vw, 3.2rem);
  line-height: 1;
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.85rem;
}

.solution-card {
  position: relative;
  min-height: 176px;
  padding: 1.15rem 1rem 1rem;
  border: 1px solid rgba(255,255,255,0.18);
  border-radius: 8px;
  color: white;
  background:
    linear-gradient(135deg, rgba(255,255,255,0.07), rgba(255,255,255,0.015)),
    rgba(13, 18, 22, 0.7);
  text-align: left;
  cursor: pointer;
  transition: transform 0.28s ease, border-color 0.28s ease, background 0.28s ease;
}

.solution-card:hover {
  transform: translateY(-4px);
  border-color: rgba(255, 107, 53, 0.48);
  background:
    linear-gradient(135deg, rgba(255, 107, 53, 0.13), rgba(255,255,255,0.02)),
    rgba(13, 18, 22, 0.76);
}

.card-number {
  display: block;
  color: rgba(255, 107, 53, 0.46);
  font-family: var(--font-heading);
  font-size: 1.45rem;
  font-weight: 800;
  line-height: 0.9;
}

.card-icon {
  display: none;
}

.solution-card strong {
  display: block;
  margin-top: 1.05rem;
  color: white;
  font-family: var(--font-body);
  font-size: 0.82rem;
  font-weight: 700;
  line-height: 1.15;
  text-transform: none;
  max-width: 14rem;
}

.solution-card em {
  position: absolute;
  left: 1rem;
  bottom: 0.9rem;
  color: rgba(255,255,255,0.82);
  font-style: normal;
  font-size: 0.68rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.solution-card em::after {
  content: " ->";
  color: var(--bg-accent);
}

@keyframes guideDraw {
  0% {
    transform: scaleX(0);
    opacity: 0;
  }
  18%,
  72% {
    transform: scaleX(1);
    opacity: 1;
  }
  100% {
    transform: scaleX(1);
    opacity: 0;
  }
}

@keyframes featureIn {
  from {
    opacity: 0;
    filter: blur(8px);
  }
  to {
    opacity: 1;
    filter: blur(0);
  }
}

@keyframes catalogPage {
  from {
    opacity: 0;
    transform: translateX(34px);
    filter: blur(5px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
    filter: blur(0);
  }
}

@keyframes catalogSide {
  from {
    transform: translateX(24px) scale(0.98);
  }
  to {
    transform: translateX(0) scale(1);
  }
}

.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(15px);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.glass-modal {
  background: var(--bg-secondary);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: var(--radius-lg);
  width: 100%;
  max-width: 1100px;
  position: relative;
  box-shadow: 0 40px 80px rgba(0, 0, 0, 0.8), inset 0 1px 0 rgba(255,255,255,0.1);
  overflow: hidden;
}

.close-btn {
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  background: rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(255,255,255,0.1);
  color: white;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  font-size: 1.8rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: var(--transition);
  z-index: 20;
}

.close-btn:hover {
  background: var(--bg-accent);
  transform: rotate(90deg);
  border-color: var(--bg-accent);
}

.modal-body {
  display: flex;
  height: 70vh;
  min-height: 500px;
  max-height: 650px;
}

.modal-info {
  flex: 1;
  padding: 3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  background: var(--bg-primary);
  overflow-y: auto;
}

.modal-info .eyebrow {
  display: block;
  font-weight: 700;
  letter-spacing: 2px;
  font-size: 0.8rem;
  text-transform: uppercase;
  margin-bottom: 1rem;
}

.modal-title {
  font-size: 2rem;
  color: #ffffff;
  margin-bottom: 1rem;
  line-height: 1.2;
  padding-right: 3rem;
}

.modal-desc {
  color: rgba(255, 255, 255, 0.7);
  font-size: 1rem;
  line-height: 1.7;
  margin-bottom: 2rem;
}

.modal-actions {
  margin-top: auto;
  margin-bottom: 1rem;
}

.modal-visuals {
  flex: 1.2;
  padding: 1.5rem 1.5rem 1.5rem 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 2fr 1fr;
  gap: 1rem;
  background: var(--bg-primary);
}

.visual-item {
  border-radius: var(--radius-md);
  overflow: hidden;
  box-shadow: 0 10px 20px rgba(0,0,0,0.5);
  position: relative;
}

.main-visual {
  grid-column: 1 / -1;
}

.visual-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  inset: 0;
  transition: var(--transition);
}

.visual-item:hover img {
  transform: scale(1.05);
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.4s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-active .glass-modal,
.modal-fade-leave-active .glass-modal {
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.modal-fade-enter-from .glass-modal,
.modal-fade-leave-to .glass-modal {
  transform: scale(0.95) translateY(30px);
  opacity: 0;
}

@media (max-width: 1100px) {
  .services-layout {
    grid-template-columns: 1fr;
    width: min(94vw, 860px);
  }

  .cards-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 968px) {
  .modal-body {
    flex-direction: column;
    height: auto;
    max-height: 85vh;
    overflow-y: auto;
    overflow-x: hidden;
  }

  .modal-visuals {
    order: 1;
    padding: 1.5rem 1.5rem 1rem 1.5rem;
    display: flex;
    flex-direction: row;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    gap: 1rem;
    flex: none;
  }

  .visual-item {
    flex: 0 0 85%;
    height: 280px;
    scroll-snap-align: center;
  }

  .main-visual { grid-column: auto; grid-row: auto; }

  .modal-info {
    order: 2;
    padding: 1.5rem;
    flex: none;
    overflow-y: visible;
  }

  .modal-title {
    font-size: 1.6rem;
    padding-right: 0;
  }
}

@media (max-width: 680px) {
  .services-showcase {
    min-height: auto;
    padding-top: 5.4rem;
  }

  .services-label strong {
    font-size: 2.45rem;
  }

  .catalog-stage {
    grid-template-columns: 1fr;
    height: auto;
  }

  .catalog-card {
    min-height: 360px;
  }

  .catalog-card-side {
    display: none;
  }

  .feature-dots {
    position: static;
    margin-top: 1rem;
  }

  .cards-grid {
    grid-template-columns: 1fr;
  }

  .solution-card {
    min-height: 136px;
  }

  .modal-overlay {
    padding: 1rem;
  }

  .close-btn {
    top: 1rem;
    right: 1rem;
    width: 38px;
    height: 38px;
    font-size: 1.5rem;
  }

  .modal-visuals {
    padding: 1rem;
  }

  .visual-item {
    height: 220px;
    flex: 0 0 90%;
  }

  .modal-info {
    padding: 1rem;
  }

  .modal-title {
    font-size: 1.4rem;
  }
}
</style>
