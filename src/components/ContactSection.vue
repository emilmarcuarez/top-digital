<script setup>
import { computed, onMounted, reactive, ref } from 'vue'

const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit'
const WEB3FORMS_ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY
const COUNTRY_CODES_ENDPOINT = 'https://countriesnow.space/api/v0.1/countries/codes'

const FALLBACK_COUNTRY_CODES = [
  { label: 'Venezuela', code: 'VE', dialCode: '+58', flag: '🇻🇪' },
  { label: 'Colombia', code: 'CO', dialCode: '+57', flag: '🇨🇴' },
  { label: 'Estados Unidos', code: 'US', dialCode: '+1', flag: '🇺🇸' },
  { label: 'España', code: 'ES', dialCode: '+34', flag: '🇪🇸' },
  { label: 'México', code: 'MX', dialCode: '+52', flag: '🇲🇽' }
]

const formData = reactive({
  nombre: '',
  email: '',
  countryCode: 'VE',
  telefono: '',
  tipo_de_proyecto: '',
  detalles: ''
})

const countryCodes = ref(FALLBACK_COUNTRY_CODES)
const isSubmitting = ref(false)
const submitStatus = ref('')
const submitError = ref('')

const submitMessage = computed(() => submitError.value || submitStatus.value)
const selectedCountry = computed(() => (
  countryCodes.value.find((country) => country.code === formData.countryCode) ?? FALLBACK_COUNTRY_CODES[0]
))
const phonePlaceholders = {
  VE: '424 9377008',
  CO: '300 1234567',
  US: '202 555 0143',
  ES: '612 34 56 78',
  MX: '55 1234 5678',
  AR: '11 2345 6789',
  CL: '9 1234 5678',
  PE: '912 345 678',
  EC: '99 123 4567',
  PA: '6123 4567',
  DO: '809 555 0123',
  BR: '11 91234 5678',
  CA: '416 555 0123',
  GB: '7400 123456',
  FR: '6 12 34 56 78',
  DE: '151 23456789',
  IT: '312 345 6789',
  PT: '912 345 678',
  NL: '6 12345678',
  MY: '12 345 6789'
}
const phonePlaceholder = computed(() => phonePlaceholders[formData.countryCode] ?? '700 123456')
const selectedDialCode = computed(() => selectedCountry.value?.dialCode ?? '+58')
const fullPhoneNumber = computed(() => `${selectedDialCode.value} ${formData.telefono}`.trim())

const resetContactForm = () => {
  formData.nombre = ''
  formData.email = ''
  formData.countryCode = 'VE'
  formData.telefono = ''
  formData.tipo_de_proyecto = ''
  formData.detalles = ''
}

const getFlagFromCountryCode = (code = '') => {
  if (code.length !== 2) return ''

  return code
    .toUpperCase()
    .split('')
    .map((letter) => String.fromCodePoint(127397 + letter.charCodeAt(0)))
    .join('')
}

const loadCountryCodes = async () => {
  try {
    const response = await fetch(COUNTRY_CODES_ENDPOINT)
    if (!response.ok) throw new Error('No se pudieron cargar los codigos telefonicos.')

    const result = await response.json()
    const parsedCodes = (result.data ?? [])
      .map((country) => ({
        label: country.name,
        code: country.code,
        dialCode: country.dial_code,
        flag: getFlagFromCountryCode(country.code)
      }))
      .filter((country) => country.label && country.code && country.dialCode)
      .sort((a, b) => a.label.localeCompare(b.label, 'es'))

    if (parsedCodes.length) {
      countryCodes.value = parsedCodes
    }
  } catch {
    countryCodes.value = FALLBACK_COUNTRY_CODES
  }
}

const handleContactSubmit = async () => {
  submitStatus.value = ''
  submitError.value = ''

  if (!WEB3FORMS_ACCESS_KEY) {
    submitError.value = 'El formulario aun no tiene configurada la clave de envio.'
    return
  }

  isSubmitting.value = true

  try {
    const response = await fetch(WEB3FORMS_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        access_key: WEB3FORMS_ACCESS_KEY,
        subject: 'Nueva solicitud desde Top Digital',
        from_name: 'Top Digital',
        nombre: formData.nombre,
        email: formData.email,
        telefono: fullPhoneNumber.value,
        codigo_de_area: selectedDialCode.value,
        pais_telefono: selectedCountry.value?.label,
        tipo_de_proyecto: formData.tipo_de_proyecto,
        detalles: formData.detalles
      })
    })

    const result = await response.json()

    if (!response.ok || !result.success) {
      throw new Error(result.message || 'No se pudo enviar la solicitud.')
    }

    submitStatus.value = 'Solicitud enviada. Te contactaremos a la brevedad.'
    resetContactForm()
  } catch (error) {
    submitError.value = error.message || 'No se pudo enviar la solicitud. Intenta nuevamente.'
  } finally {
    isSubmitting.value = false
  }
}

onMounted(loadCountryCodes)
</script>

<template>
  <section id="contacto" class="section contact">
    <div class="container contact-container reveal" v-reveal>
      <div class="contact-content">
        <h2 class="section-title">Inicia tu proyecto</h2>
        <p class="section-subtitle">Completa el formulario y te contactaremos a la brevedad.</p>
        
        <form class="contact-form" @submit.prevent="handleContactSubmit">

          <div class="form-row">
            <div class="form-group">
              <label>Nombre Completo</label>
              <input
                type="text"
                name="nombre"
                v-model.trim="formData.nombre"
                placeholder="Tu nombre"
                class="form-input"
                required
              />
            </div>
            <div class="form-group">
              <label>Email Corporativo</label>
              <input
                type="email"
                name="email"
                v-model.trim="formData.email"
                placeholder="ejemplo@empresa.com"
                class="form-input"
                required
              />
            </div>
          </div>

          <div class="form-group">
            <label>Numero de telefono</label>
            <div class="phone-field">
              <select
                class="form-input phone-code"
                name="codigo_de_area"
                v-model="formData.countryCode"
                aria-label="Codigo de area"
                required
              >
                <option
                  v-for="country in countryCodes"
                  :key="`${country.code}-${country.dialCode}`"
                  :value="country.code"
                >
                  {{ country.flag }} {{ country.label }} {{ country.dialCode }}
                </option>
              </select>

              <input
                type="tel"
                name="telefono"
                v-model.trim="formData.telefono"
                :placeholder="phonePlaceholder"
                class="form-input phone-number"
                autocomplete="tel"
                inputmode="tel"
                required
              />
            </div>
          </div>
          
          <div class="form-group">
            <label>Tipo de proyecto</label>
            <select class="form-input" name="tipo_de_proyecto" v-model="formData.tipo_de_proyecto" required>
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
            <textarea
              name="detalles"
              v-model.trim="formData.detalles"
              placeholder="Cuéntanos más..."
              class="form-textarea"
              required
            ></textarea>
          </div>
          
          <button type="submit" class="btn btn-primary btn-block" :disabled="isSubmitting">
            {{ isSubmitting ? 'Enviando...' : 'Enviar Solicitud' }}
          </button>

          <p
            v-if="submitMessage"
            class="form-status"
            :class="{ 'form-status-error': submitError }"
          >
            {{ submitMessage }}
          </p>
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

.phone-field {
  display: grid;
  grid-template-columns: minmax(190px, 0.42fr) minmax(0, 1fr);
  gap: 0.75rem;
}

.phone-code {
  min-width: 0;
}

.phone-number {
  min-width: 0;
}

.form-textarea {
  min-height: 120px;
  resize: vertical;
}

.btn-block {
  width: 100%;
}

.btn-block:disabled {
  cursor: wait;
  opacity: 0.72;
}

.form-status {
  margin: -0.5rem 0 0;
  color: rgba(255, 255, 255, 0.78);
  font-size: 0.92rem;
  font-weight: 700;
}

.form-status-error {
  color: #ff8a65;
}

@media (max-width: 600px) {
  .phone-field {
    grid-template-columns: 1fr;
  }

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
