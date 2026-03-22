<template>
  <section id="servicios" class="section services">
    <div class="container">
      <div class="section-header text-center reveal" v-reveal>
        <span class="eyebrow accent-text">Nuestras Soluciones</span>
        <h2 class="section-title">Servicios Destacados</h2>
      </div>
      
      <div class="services-list">
        <div v-for="(service, index) in servicesList" :key="index" 
             class="service-item reveal" 
             v-reveal
             :style="{ transitionDelay: (index * 0.05) + 's' }">
          <div class="service-content">
            <h3>{{ service.title }}</h3>
            <button @click="openModal(service)" class="btn-link">Ver más <span class="arrow">→</span></button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal for Service Details -->
    <Teleport to="body">
      <Transition name="modal-fade">
        <div v-if="activeService" class="modal-overlay" @click.self="closeModal">
          <div class="modal-content glass-modal">
            <button class="close-btn" @click="closeModal">&times;</button>
            <div class="modal-body">
              <div class="modal-info">
                <span class="eyebrow accent-text">Detalle del Servicio</span>
                <h3 class="modal-title">{{ activeService.title }}</h3>
                <p class="modal-desc">
                  Diseño premium y fabricación especializada. Utilizamos tecnología de vanguardia y materiales de la más alta calidad para asegurar resultados impecables y un impacto visual superior para tu marca.
                </p>
                <div class="modal-actions">
                  <a href="#contacto" class="btn btn-primary" @click="closeModal">Solicitar Cotización</a>
                </div>
              </div>
              <div class="modal-visuals">
                <div class="visual-main">
                  <img src="../assets/imagen2.jpg" alt="Muestra Principal" />
                </div>
                <div class="visual-sub">
                  <div class="visual-wrapper">
                    <img src="../assets/imagen3.jpg" alt="Detalle A" />
                  </div>
                  <div class="visual-wrapper">
                    <img src="../assets/imagen4.jpg" alt="Detalle B" />
                  </div>
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
import { ref } from 'vue'

const servicesList = [
  { title: 'Rotulación' },
  { title: 'Fabricación de corpóreo en acrílico con iluminación' },
  { title: 'Fabricación de corpóreos en PVC y MDF' },
  { title: 'Fabricación de letras corpórea en galvanizado' },
  { title: 'Fabricación de fachadas comerciales en alucobond (ACM)' },
  { title: 'Elementos para ambientar los locales comerciales' },
  { title: 'Instalación de elementos decorativos' },
  { title: 'Stands portátiles para eventos' },
  { title: 'Stands para eventos corporativos y elementos tecnológicos' },
  { title: 'Banderas publicitarias que elevan tu marca' },
  { title: 'Sublimación adaptada al requerimiento del cliente' }
]

const activeService = ref(null)

const openModal = (service) => {
  activeService.value = service
  document.body.style.overflow = 'hidden'
}

const closeModal = () => {
  activeService.value = null
  document.body.style.overflow = ''
}
</script>

<style scoped>
.services {
  background-color: var(--bg-secondary);
  position: relative;
}

.text-center {
  text-align: center;
  margin-bottom: 4rem;
}

.services-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

.service-item {
  background: var(--bg-primary);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: var(--radius-md);
  padding: 2rem;
  transition: var(--transition);
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.service-item:hover {
  border-color: rgba(255, 107, 53, 0.3);
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
}

.service-content h3 {
  font-size: 1.1rem;
  margin-bottom: 1.5rem;
  line-height: 1.4;
  color: var(--text-primary);
  font-family: var(--font-body);
  font-weight: 600;
  text-transform: none;
}

.btn-link {
  background: none;
  border: none;
  color: var(--bg-accent);
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0;
  font-family: var(--font-body);
  transition: var(--transition);
}

.btn-link:hover {
  color: #ff8c61;
}

.arrow {
  transition: transform 0.3s ease;
}

.btn-link:hover .arrow {
  transform: translateX(5px);
}

/* Premium Modal Styles - FIXED ROBUST LAYOUT */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
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
  display: flex; /* Flexbox instead of Grid for rock-solid stability */
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
  overflow-y: auto; /* Prevent overflowing text from breaking layout */
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
  padding-right: 3rem; /* Room for close btn on desktop */
}

.modal-desc {
  color: rgba(255, 255, 255, 0.7); /* Hardcoded to ensure visibility */
  font-size: 1rem;
  line-height: 1.7;
  margin-bottom: 2rem;
}

.modal-actions {
  margin-top: auto; /* Pushes button to bottom nicely, avoiding crowding */
  margin-bottom: 1rem;
}

.modal-visuals {
  flex: 1.2;
  padding: 1.5rem 1.5rem 1.5rem 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background: var(--bg-primary);
}

.visual-main {
  flex: 2;
  border-radius: var(--radius-md);
  overflow: hidden;
  box-shadow: 0 10px 20px rgba(0,0,0,0.5);
  position: relative;
}

.visual-main img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
}

.visual-sub {
  flex: 1;
  display: flex;
  gap: 1rem;
}

.visual-wrapper {
  flex: 1;
  border-radius: var(--radius-md);
  overflow: hidden;
  box-shadow: 0 10px 20px rgba(0,0,0,0.5);
  position: relative;
}

.visual-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
  transition: var(--transition);
}

.visual-wrapper:hover img {
  transform: scale(1.05);
}

/* Modal Transitions */
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

@media (max-width: 968px) {
  .modal-body {
    flex-direction: column;
    height: auto;
    max-height: 85vh;
    overflow-y: auto;
  }
  
  /* UX REDESIGN: Images on top, Text below (Like a modern App Product Card) */
  .modal-visuals {
    order: 1;
    padding: 1.5rem 1.5rem 0.5rem 1.5rem;
    height: auto;
  }
  
  .visual-main {
    min-height: 250px;
  }
  
  .modal-info {
    order: 2;
    padding: 1.5rem;
  }
  
  .modal-title {
    font-size: 1.6rem;
    padding-right: 0;
  }
}

@media (max-width: 600px) {
  .modal-overlay {
    padding: 1rem;
  }

  .close-btn {
    top: 1rem;
    right: 1rem;
    width: 38px;
    height: 38px;
    font-size: 1.5rem;
    background: rgba(0,0,0,0.7);
    backdrop-filter: blur(8px);
    border: 1px solid rgba(255,255,255,0.1);
  }

  .modal-visuals {
    padding: 1rem 1rem 0.5rem 1rem;
  }

  .visual-main {
    min-height: 200px;
  }

  .visual-wrapper {
    height: 120px;
  }

  .modal-info {
    padding: 1rem;
  }

  .modal-title {
    font-size: 1.4rem;
  }
  
  .modal-actions {
    margin-bottom: 0;
    margin-top: 1.5rem;
  }
}
</style>
