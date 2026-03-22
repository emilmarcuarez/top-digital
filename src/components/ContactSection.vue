<template>
  <section id="contacto" class="section contact">
    <div class="container contact-container reveal" v-reveal>
      <div class="contact-content">
        <h2 class="section-title">Inicia tu proyecto</h2>
        <p class="section-subtitle">Completa el formulario y te contactaremos a la brevedad.</p>
        
        <form class="contact-form" @submit.prevent>
          <div class="form-row">
            <div class="form-group">
              <label>Nombre Completo</label>
              <input type="text" placeholder="Tu nombre" class="form-input" />
            </div>
            <div class="form-group">
              <label>Email Corporativo</label>
              <input type="email" placeholder="ejemplo@empresa.com" class="form-input" />
            </div>
          </div>
          
          <div class="form-group">
            <label>Tipo de proyecto</label>
            <select class="form-input">
              <option value="" disabled>Selecciona una opción</option>
              <option value="Rotulacion y Vinilos">Rotulación y Vinilos</option>
              <option value="Corporeos y Letras">Corpóreos y Letras 3D</option>
              <option value="Fachadas Alucobond">Fachadas Arquitectónicas (Alucobond)</option>
              <option value="Ambientacion">Diseño y Ambientación de Locales</option>
              <option value="Stands">Stands y Eventos Corporativos</option>
              <option value="Banderas">Banderas Publicitarias</option>
              <option value="Sublimacion">Sublimación Textil e Indumentaria</option>
              <option value="Material POP">Material POP y Merchandising</option>
              <option value="Gigantografia">Gigantografía y Lonas</option>
              <option value="Otro">Otro</option>
            </select>
          </div>
          
          <div class="form-group">
            <label>Detalles del proyecto</label>
            <textarea placeholder="Cuéntanos más..." class="form-textarea"></textarea>
          </div>
          
          <button type="submit" class="btn btn-primary btn-block">Enviar Solicitud</button>
        </form>
        
        <div class="contact-info-grid">
          <div class="info-item">
            <span class="info-label">Ubicación</span>
            <p>Centro Empresarial 21<br />Av. Paseo Caroní, con Manzanares<br />Ciudad Guayana 8050, Bolívar</p>
          </div>
          <div class="info-item">
            <span class="info-label">Contacto</span>
            <p>gpatety.topdigitalgroup@gmail.com<br />+58 424-9377008</p>
          </div>
        </div>
      </div>
      
      <div class="contact-visual">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d246.7623174169898!2d-62.75456304189176!3d8.28317529126678!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8dcbf93efc91a6c7%3A0xc57f5dc8473be3d1!2sCentro%20Empresarial%2021!5e0!3m2!1ses-419!2sve!4v1774057147557!5m2!1ses-419!2sve" 
          width="100%" 
          height="100%" 
          style="border:0;" 
          allowfullscreen="" 
          loading="lazy" 
          referrerpolicy="no-referrer-when-downgrade"
          class="map-iframe"
        ></iframe>
      </div>
    </div>
  </section>
</template>

<style scoped>
.contact {
  background-color: var(--bg-primary);
}

.contact-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6rem;
  align-items: center;
}

.section-title {
  margin-bottom: 0.5rem;
}

.section-subtitle {
  color: var(--text-secondary);
  margin-bottom: 3rem;
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 3rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  color: var(--text-muted);
}

.form-input, .form-textarea {
  background: var(--bg-secondary);
  border: 1px solid rgba(255, 255, 255, 0.05);
  padding: 1rem;
  border-radius: var(--radius-md);
  color: white;
  font-family: var(--font-body);
  transition: var(--transition);
}

.form-input option {
  background-color: #1a1a1a;
  color: white;
}

.form-input:focus, .form-textarea:focus {
  outline: none;
  border-color: var(--bg-accent);
  background: rgba(255, 107, 53, 0.05);
}

.form-textarea {
  min-height: 120px;
  resize: vertical;
}

.btn-block {
  width: 100%;
}

@media (max-width: 600px) {
  .btn-block {
    width: auto;
    align-self: flex-start;
  }
}

.contact-info-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

.info-label {
  display: block;
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--bg-accent);
  text-transform: uppercase;
  margin-bottom: 0.5rem;
}

.info-item p {
  font-size: 0.9rem;
  color: var(--text-secondary);
}

.contact-visual {
  position: relative;
  height: 600px;
  overflow: hidden;
  border-radius: var(--radius-lg);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.map-iframe {
  filter: grayscale(1) invert(0.9) contrast(1.2); /* Keep it dark theme friendly */
}

.badge-icon {
  font-size: 1.5rem;
}

.visual-badge strong {
  display: block;
  font-size: 0.9rem;
}

.visual-badge p {
  font-size: 0.8rem;
  color: var(--text-secondary);
}

@media (max-width: 968px) {
  .contact-container {
    grid-template-columns: 1fr;
    gap: 4rem;
  }
  .contact-visual {
    order: -1;
  }
  .visual-badge {
    right: 0;
    top: auto;
    bottom: -1rem;
    transform: none;
  }
}

@media (max-width: 600px) {
  .form-row {
    grid-template-columns: 1fr;
  }
  .contact-info-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  .contact-visual {
    height: 400px;
  }
}
</style>
