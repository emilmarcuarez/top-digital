<template>
  <section id="servicios" class="section services">
    <div class="services-grid-bg" aria-hidden="true"></div>

    <div class="services-layout">
      <div class="services-showcase">
        <div class="services-label">
          <span>Servicios</span>
          <strong>Destacados</strong>
        </div>
        <div class="guide-lines" aria-hidden="true">
          <span></span>
          <span></span>
          <span></span>
        </div>

        <Transition name="catalog-soft" mode="out-in">
          <div class="catalog-stage" :key="activeFeatureIndex">
            <article
              v-for="feature in activeFeaturePair"
              :key="feature.title"
              class="feature-card catalog-card"
            >
              <img
                :src="feature.image"
                :alt="feature.title"
                :style="getPanMediaStyle(feature)"
              />
              <div class="feature-content">
                <span>{{ feature.category }}</span>
                <h3>{{ feature.title }}</h3>
                <p>{{ feature.description }}</p>
                <button @click="openModal(feature.modal)">Explorar procesos</button>
              </div>
            </article>
          </div>
        </Transition>

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
><div> template error </div>
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
                <div class="slider-frame" :class="{ 'image-contain-frame': shouldContainServiceImage }">
                  <img
                    :key="activeServiceImage"
                    :src="activeServiceImage"
                    :alt="`${activeService.title} muestra ${activeModalImageIndex + 1}`"
                    :style="getPanMediaStyle(activeService)"
                    @click="openImagePreview(activeServiceImage)"
                  />
                  <div v-if="hasMultipleServiceImages" class="gallery-counter">
                    {{ String(activeModalImageIndex + 1).padStart(2, '0') }} / {{ String(activeServiceImages.length).padStart(2, '0') }}
                  </div>
                  <button
                    v-if="hasMultipleServiceImages"
                    type="button"
                    class="gallery-nav gallery-nav-prev"
                    aria-label="Imagen anterior"
                    @click="previousModalImage"
                  >
                    &#8249;
                  </button>
                  <button
                    v-if="hasMultipleServiceImages"
                    type="button"
                    class="gallery-nav gallery-nav-next"
                    aria-label="Imagen siguiente"
                    @click="nextModalImage"
                  >
                    &#8250;
                  </button>
                </div>

                <div
                  v-if="hasMultipleServiceImages"
                  class="gallery-thumbs"
                  aria-label="Galeria del servicio"
                >
                  <button
                    v-for="(image, index) in activeServiceImages"
                    :key="image"
                    type="button"
                    class="thumb-button"
                    :class="{ active: index === activeModalImageIndex }"
                    :aria-label="`Ver muestra ${index + 1}`"
                    @click="selectModalImage(index)"
                  >
                    <img :src="image" :alt="`${activeService.title} miniatura ${index + 1}`" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Transition>

      <Transition name="modal-fade">
        <div v-if="previewImage" class="image-preview-overlay" @click.self="closeImagePreview">
          <div class="image-preview-toolbar">
            <button type="button" aria-label="Alejar imagen" @click="zoomPreviewOut">-</button>
            <span>{{ Math.round(previewZoom * 100) }}%</span>
            <button type="button" aria-label="Acercar imagen" @click="zoomPreviewIn">+</button>
            <button type="button" aria-label="Cerrar vista ampliada" @click="closeImagePreview">&times;</button>
          </div>

          <div class="image-preview-stage">
            <img
              :src="previewImage"
              :alt="`${activeService?.title ?? 'Servicio'} vista ampliada`"
              :style="previewImageStyle"
            />
          </div>
        </div>
      </Transition>
    </Teleport>
  </section>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import imageIvoo from '../assets/imagen4.jpg'
import imageWings from '../assets/imagen3.jpg'
import imageTextil from '../assets/franelas.png'
import imageCorporeoAcrilico from '../assets/corporeos-acrilico.jpeg'
import imageCorporeoAcrilico2 from '../assets/corporeo-acrilico-2-top-digital.jpeg'
import imageCorporeoAcrilico3 from '../assets/corporeo-acrilico-3-top-digital.jpeg'
import imageCorporeoPvcMdf from '../assets/corporeos-pvc-mdf.jpeg'
import imageCorporeoPvcMdf2 from '../assets/corporeos-pvc-mdf-2.jpeg'
import imageCorporeoPvcMdf3 from '../assets/corporeos-pvc-mdf-3.jpeg'
import imageLetrasGalvanizado from '../assets/letras-corporeas-galvanizado.jpg'
import imageLetrasGalvanizado2 from '../assets/letras-corporeas-galvanizado-2.jpg'
import imageLetrasGalvanizado3 from '../assets/letras-corporeas-galvanizado-3.jpg'
import imageAmbienteLocales1 from '../assets/ambiente-locales-1.jpeg'
import imageAmbienteLocales2 from '../assets/ambiente-locales-2.jpeg'
import imageAmbienteLocales3 from '../assets/ambiente-locales-3.jpeg'
import imageAmbienteLocales4 from '../assets/ambiente-locales-4.jpeg'
import imageAmbienteLocales5 from '../assets/ambiente-locales-5.jpeg'
import imageAmbienteLocales6 from '../assets/ambiente-locales-6.jpeg'
import imageElementosDecorativos1 from '../assets/elementos-decorativos-1.jpg'
import imageElementosDecorativos2 from '../assets/elementos-decorativos-2.jpg'
import imageElementosDecorativos3 from '../assets/elementos-decorativos-3.jpg'
import imageElementosDecorativos4 from '../assets/elementos-decorativos-4.jpg'
import imageElementosDecorativos5 from '../assets/elementos-decorativos-5.jpg'
import imageElementosDecorativos6 from '../assets/elementos-decorativos-6.jpg'
import imageStandPortatil from '../assets/stand-portatil.jpg'
import imageStandPortatil2 from '../assets/stand-portatil-2.jpg'
import imageStandPortatil3 from '../assets/stand-portatil-3.jpg'
import imageStandPortatil4 from '../assets/stand-portatil-4.jpg'
import imageStandsCorporativos from '../assets/stands-corporativos.jpg'
import imageStandCorporativo2 from '../assets/stand-corporativo-2.jpg'
import imageVallaMangoBajito from '../assets/proyectos-recientes-mango-bajito.jpeg'
import imageVallaCashea from '../assets/valla_cashea.jpg'
import imageVallaFarmahumana from '../assets/proyectos-recientes-farmahumana.jpg'
import imageVallaInstalacionMango from '../assets/instalacion_mango.jpg'
import imageBanderinesPublicitarios from '../assets/banderines-publicitarios.jpeg'
import imageCarteleraFiscal from '../assets/cartelera-fiscal.jpg'
import imageCarteleraFiscal2 from '../assets/cartelera-fiscal-2.jpg'
import imageOtros from '../assets/otros.jpg'
import imageOtros1 from '../assets/otros-1.jpg'
import imageOtros2 from '../assets/otros-2.jpg'

const activeService = ref(null)
const activeFeatureIndex = ref(0)
const activeModalImageIndex = ref(0)
const previewImage = ref(null)
const previewZoom = ref(1)
let featureTimer

const servicesList = [
  { title: 'Rotulacion', image: imageIvoo, icon: 'A1' },
  {
    title: 'Corporeos en acrilico con iluminacion',
    image: imageCorporeoAcrilico,
    images: [imageCorporeoAcrilico, imageCorporeoAcrilico2, imageCorporeoAcrilico3],
    icon: '01'
  },
  {
    title: 'Vallas publicitarias',
    image: imageVallaMangoBajito,
    images: [
      imageVallaMangoBajito,
      imageVallaFarmahumana,
      imageVallaInstalacionMango,
      imageVallaCashea
    ],
    icon: '02'
  },
  {
    title: 'Banderines publicitarios',
    image: imageBanderinesPublicitarios,
    images: [imageBanderinesPublicitarios],
    icon: '03'
  },
  {
    title: 'Carteleras fiscales',
    image: imageCarteleraFiscal,
    images: [imageCarteleraFiscal, imageCarteleraFiscal2],
    icon: '04'
  },
  {
    title: 'Corporeos en PVC y MDF',
    image: imageCorporeoPvcMdf,
    images: [imageCorporeoPvcMdf, imageCorporeoPvcMdf2, imageCorporeoPvcMdf3],
    icon: '05'
  },
  {
    title: 'Letras corporeas en galvanizado',
    image: imageLetrasGalvanizado,
    images: [imageLetrasGalvanizado, imageLetrasGalvanizado2, imageLetrasGalvanizado3],
    icon: '06'
  },
  {
    title: 'Fachadas comerciales en alucobond (ACM)',
    image: imageIvoo,
    images: [imageIvoo],
    icon: '07'
  },
  {
    title: 'Ambientacion de locales comerciales',
    image: imageAmbienteLocales1,
    images: [
      imageAmbienteLocales1,
      imageAmbienteLocales2,
      imageAmbienteLocales3,
      imageAmbienteLocales4,
      imageAmbienteLocales5,
      imageAmbienteLocales6
    ],
    icon: '08'
  },
  {
    title: 'Instalacion de elementos decorativos',
    image: imageElementosDecorativos1,
    images: [
      imageElementosDecorativos1,
      imageElementosDecorativos2,
      imageElementosDecorativos3,
      imageElementosDecorativos4,
      imageElementosDecorativos5,
      imageElementosDecorativos6
    ],
    icon: '09'
  },
  {
    title: 'Stands portatiles para eventos',
    image: imageStandPortatil,
    images: [imageStandPortatil, imageStandPortatil2, imageStandPortatil3, imageStandPortatil4],
    icon: '10'
  },
  {
    title: 'Stands corporativos y elementos tecnologicos',
    image: imageStandsCorporativos,
    images: [imageStandsCorporativos, imageStandCorporativo2],
    icon: '11'
  },
  {
    title: 'Otros',
    image: imageOtros,
    images: [imageOtros, imageOtros1, imageOtros2],
    icon: '12'
  },
  { title: 'Sublimacion personalizada', image: imageTextil, icon: '13' }
]
const serviceCards = computed(() => servicesList.slice(1, 13))
const activeServiceImages = computed(() => activeService.value?.images ?? [
  activeService.value?.image ?? imageIvoo,
  imageWings,
  imageIvoo
])
const activeServiceImage = computed(() => (
  activeServiceImages.value[activeModalImageIndex.value] ?? activeServiceImages.value[0]
))
const hasMultipleServiceImages = computed(() => activeServiceImages.value.length > 1)
const shouldContainServiceImage = computed(() => activeService.value?.title === 'Vallas publicitarias')
const previewImageStyle = computed(() => ({
  width: `min(${previewZoom.value * 100}%, ${previewZoom.value * 1180}px)`,
  height: `${previewZoom.value * 100}%`
}))

const featureSlides = computed(() => [
  {
    title: 'Material POP',
    category: 'Punto de venta',
    description: 'Stands, exhibidores y piezas promocionales para activar marcas.',
    image: imageWings,
    modal: servicesList[10],
    services: [servicesList[10], servicesList[11], servicesList[3], servicesList[12]]
  },
  {
    title: 'Vallas publicitarias',
    category: 'Gran formato',
    description: 'Vallas y lonas visibles a distancia con montaje profesional.',
    image: imageVallaMangoBajito,
    modal: servicesList[2],
    services: [servicesList[2], servicesList[4], servicesList[6], servicesList[5]]
  },
  {
    title: 'Corporeos iluminados',
    category: 'Volumen y luz',
    description: 'Letras, logos y volumenes con acabados limpios para marca.',
    image: imageCorporeoAcrilico,
    modal: servicesList[1],
    services: [servicesList[1], servicesList[5], servicesList[6], servicesList[7]]
  }
])

const activeFeature = computed(() => featureSlides.value[activeFeatureIndex.value])
const activeFeaturePair = computed(() => [
  activeFeature.value,
  featureSlides.value[(activeFeatureIndex.value + 1) % featureSlides.value.length]
])

const openModal = (service) => {
  activeService.value = service
  activeModalImageIndex.value = 0
  document.body.style.overflow = 'hidden'
}

const closeModal = () => {
  activeService.value = null
  activeModalImageIndex.value = 0
  previewImage.value = null
  previewZoom.value = 1
  document.body.style.overflow = ''
}

const selectModalImage = (index) => {
  activeModalImageIndex.value = index
}

const nextModalImage = () => {
  activeModalImageIndex.value = (activeModalImageIndex.value + 1) % activeServiceImages.value.length
}

const previousModalImage = () => {
  activeModalImageIndex.value = (
    activeModalImageIndex.value - 1 + activeServiceImages.value.length
  ) % activeServiceImages.value.length
}

const openImagePreview = (image) => {
  previewImage.value = image
  previewZoom.value = 0.82
}

const closeImagePreview = () => {
  previewImage.value = null
  previewZoom.value = 1
}

const zoomPreviewIn = () => {
  previewZoom.value = Math.min(previewZoom.value + 0.25, 3)
}

const zoomPreviewOut = () => {
  previewZoom.value = Math.max(previewZoom.value - 0.25, 0.75)
}

const getPanMediaStyle = (item = {}) => {
  const startPosition = item.panStartPosition ?? item.position ?? '50% 0%'
  const endPosition = item.panEndPosition ?? '50% 100%'

  return {
    objectPosition: startPosition,
    '--pan-start-position': startPosition,
    '--pan-end-position': endPosition
  }
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
  grid-template-columns: minmax(520px, 0.9fr) minmax(560px, 1fr);
  gap: clamp(2rem, 3vw, 3.5rem);
  align-items: start;
}

.services-showcase {
  position: relative;
  min-height: 600px;
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
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
  height: 520px;
  transform-origin: center;
  will-change: opacity, transform, filter;
}

.catalog-soft-enter-active,
.catalog-soft-leave-active {
  transition:
    opacity 0.54s ease,
    transform 0.64s cubic-bezier(0.16, 1, 0.3, 1),
    filter 0.54s ease;
}

.catalog-soft-enter-from {
  opacity: 0;
  filter: blur(6px);
  transform: translateY(12px) scale(0.985);
}

.catalog-soft-leave-to {
  opacity: 0;
  filter: blur(5px);
  transform: translateY(-8px) scale(0.99);
}

.feature-card {
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.16);
  border-radius: 8px;
  background: #0b0d0f;
  box-shadow:
    0 24px 68px rgba(0, 0, 0, 0.36),
    inset 0 1px 0 rgba(255, 255, 255, 0.08);
  height: 100%;
}

.catalog-card-main {
  position: relative;
  min-height: 100%;
  border-color: rgba(255, 255, 255, 0.18);
  box-shadow:
    0 26px 72px rgba(0, 0, 0, 0.44),
    inset 0 1px 0 rgba(255, 255, 255, 0.08);
}

.feature-card::after {
  content: "";
  position: absolute;
  inset: 0;
  background:
    linear-gradient(180deg, rgba(0,0,0,0.08) 16%, rgba(0,0,0,0.82) 100%),
    radial-gradient(circle at 18% 84%, rgba(255, 107, 53, 0.2), transparent 15rem);
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

.catalog-card .feature-content h3 {
  max-width: 11ch;
  font-size: clamp(1.75rem, 2.8vw, 3.05rem);
  line-height: 0.95;
  text-wrap: balance;
}

.feature-content {
  position: absolute;
  left: clamp(1.15rem, 2.1vw, 1.7rem);
  right: clamp(1.15rem, 2.1vw, 1.7rem);
  bottom: clamp(1.15rem, 2.1vw, 1.7rem);
  z-index: 2;
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
  max-width: 330px;
  margin: 0 0 1.15rem;
  color: rgba(255,255,255,0.78);
  font-size: 1rem;
  line-height: 1.48;
}

.feature-content button {
  padding: 0.72rem 1.08rem;
  border: 1px solid rgba(255,255,255,0.34);
  border-radius: 999px;
  color: white;
  background: rgba(0,0,0,0.3);
  font-weight: 800;
  cursor: pointer;
  transition: border-color 0.28s ease, background 0.28s ease, transform 0.28s ease;
}

.feature-content button:hover {
  border-color: rgba(255, 107, 53, 0.76);
  background: rgba(255, 107, 53, 0.88);
  transform: translateY(-2px);
}

.feature-dots {
  position: static;
  display: flex;
  align-items: center;
  gap: 0.55rem;
  margin-top: 1rem;
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
  display: none;
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
  margin-top: 0;
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

@keyframes miniServiceIn {
  from {
    opacity: 0;
    transform: translateX(1rem) scale(0.98);
  }
  to {
    opacity: 1;
    transform: translateX(0) scale(1);
  }
}

@keyframes sliderImageIn {
  from {
    opacity: 0;
    transform: scale(1.018);
  }
  to {
    opacity: 1;
    transform: scale(1);
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
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
  background: var(--bg-primary);
  min-width: 0;
}

.slider-frame {
  position: relative;
  flex: 1;
  min-height: 0;
  border-radius: var(--radius-md);
  overflow: hidden;
  box-shadow: 0 10px 20px rgba(0,0,0,0.5);
  background: #08090a;
}

.slider-frame.image-contain-frame {
  background:
    radial-gradient(circle at 50% 42%, rgba(255, 255, 255, 0.08), transparent 22rem),
    #070809;
}

.slider-frame img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  cursor: zoom-in;
  will-change: object-position;
  animation:
    sliderImageIn 0.34s ease both,
    mediaPanVertical 6.2s ease-in-out 0.34s infinite alternate;
}

.slider-frame.image-contain-frame img {
  object-fit: cover;
  padding: 0;
}

.gallery-counter {
  position: absolute;
  top: 1rem;
  left: 1rem;
  z-index: 2;
  padding: 0.42rem 0.65rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 999px;
  color: white;
  background: rgba(0, 0, 0, 0.44);
  backdrop-filter: blur(12px);
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.08em;
}

.gallery-nav {
  position: absolute;
  top: 50%;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  border: 1px solid rgba(255, 255, 255, 0.22);
  border-radius: 999px;
  color: white;
  background: rgba(0, 0, 0, 0.42);
  backdrop-filter: blur(12px);
  cursor: pointer;
  font-size: 2rem;
  line-height: 1;
  transform: translateY(-50%);
  transition: var(--transition);
}

.gallery-nav:hover {
  border-color: var(--bg-accent);
  background: var(--bg-accent);
}

.gallery-nav-prev {
  left: 1rem;
}

.gallery-nav-next {
  right: 1rem;
}

.gallery-thumbs {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(68px, 1fr));
  gap: 0.55rem;
  min-height: 86px;
}

.thumb-button {
  position: relative;
  min-width: 0;
  height: 86px;
  padding: 0;
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: 8px;
  overflow: hidden;
  background: #0d0f11;
  cursor: pointer;
  opacity: 0.58;
  transition: var(--transition);
}

.thumb-button.active,
.thumb-button:hover {
  opacity: 1;
  border-color: var(--bg-accent);
  transform: translateY(-2px);
}

.thumb-button img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.image-preview-overlay {
  position: fixed;
  inset: 0;
  z-index: 10000;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  background: rgba(0, 0, 0, 0.94);
  backdrop-filter: blur(12px);
}

.image-preview-toolbar {
  align-self: center;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.45rem;
  border: 1px solid rgba(255, 255, 255, 0.16);
  border-radius: 999px;
  background: rgba(12, 12, 12, 0.76);
  box-shadow: 0 16px 42px rgba(0, 0, 0, 0.38);
}

.image-preview-toolbar button,
.image-preview-toolbar span {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 2.35rem;
  height: 2.35rem;
  border-radius: 999px;
  color: white;
  font-weight: 800;
}

.image-preview-toolbar button {
  border: 1px solid rgba(255, 255, 255, 0.16);
  background: rgba(255, 255, 255, 0.06);
  cursor: pointer;
  transition: var(--transition);
}

.image-preview-toolbar button:hover {
  border-color: var(--bg-accent);
  background: var(--bg-accent);
}

.image-preview-toolbar span {
  min-width: 4.2rem;
  font-size: 0.78rem;
  letter-spacing: 0.08em;
}

.image-preview-stage {
  flex: 1;
  min-height: 0;
  display: grid;
  place-items: center;
  overflow: auto;
  padding: clamp(1rem, 3vw, 2rem);
  border-radius: 8px;
  background:
    linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px),
    linear-gradient(180deg, rgba(255,255,255,0.04) 1px, transparent 1px),
    #050505;
  background-size: 32px 32px;
}

.image-preview-stage img {
  max-width: none;
  max-height: none;
  object-fit: contain;
  transition: width 0.22s ease, height 0.22s ease;
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

  .catalog-stage {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    height: 500px;
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
    flex-direction: column;
    gap: 1rem;
    flex: none;
  }

  .slider-frame {
    height: 280px;
    flex: none;
  }

  .gallery-thumbs {
    display: flex;
    min-height: 74px;
    overflow-x: auto;
    padding-bottom: 0.25rem;
    scroll-snap-type: x proximity;
  }

  .thumb-button {
    flex: 0 0 74px;
    height: 74px;
    scroll-snap-align: start;
  }

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
    display: grid;
    grid-template-columns: 1fr;
    gap: 0.8rem;
    height: auto;
  }

  .catalog-card-main {
    position: relative;
    inset: auto;
  }

  .catalog-card {
    min-height: 430px;
  }

  .catalog-card .feature-content h3 {
    max-width: 11ch;
    font-size: clamp(2.25rem, 11vw, 3.45rem);
  }

  .feature-content {
    right: 1.2rem;
    bottom: 1.2rem;
  }

  .feature-dots {
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

  .slider-frame {
    height: 220px;
  }

  .gallery-nav {
    width: 36px;
    height: 36px;
    font-size: 1.7rem;
  }

  .gallery-counter {
    top: 0.75rem;
    left: 0.75rem;
  }

  .modal-info {
    padding: 1rem;
  }

  .modal-title {
    font-size: 1.4rem;
  }
}
</style>
