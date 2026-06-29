<template>
  <footer class="footer bg-dark">
    <div class="container footer-content">
      <div class="footer-brand">
        <img src="../assets/logo Top Digital.png" alt="Logo de Top Digital Group" class="footer-logo" />
        <p>Imprenta en Puerto Ordaz con soluciones profesionales en impresión, corpóreos, diseño y ambientación.</p>
        <div class="socials">
          <a href="https://www.instagram.com/topdigitalgroup_/" target="_blank" rel="noopener noreferrer" class="social-link" title="Instagram">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
          </a>
          <a href="https://www.facebook.com/p/Top-Digital-Group-100063577030171/" target="_blank" rel="noopener noreferrer" class="social-link" title="Facebook">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
          </a>
        </div>
      </div>
      
      <div class="footer-links">
        <div class="link-group">
          <h4>Empresa</h4>
          <a href="#nosotros">Sobre nosotros</a>
          <a href="#proyectos">Proyectos</a>
          <a href="#contacto">Contacto</a>
        </div>
        <div class="link-group link-top-digital">
          <h4>Soluciones</h4>
          <a href="#servicios">Rotulación</a>
          <a href="#servicios">Corpóreos</a>
          <a href="#servicios">Stands</a>
        </div>
        <div class="link-group">
          <h4>Contacto</h4>
          <a href="mailto:gpatety.topdigitalgroup@gmail.com" class="text-wrapped">gpatety.topdigitalgroup@gmail.com</a>
          <a href="https://wa.me/584249377008" target="_blank" rel="noopener noreferrer">+58 424-9377008</a>
          <p class="loc-text">Centro Empresarial 21, Av. Paseo Caroní. Cdad. Guayana.</p>
        </div>
      </div>
    </div>
    
    <div class="container footer-bottom">
      <div class="copyright">
        <p>&copy; 2026. Emilmar Cuarez. Todos los derechos reservados.</p>
      </div>
      <div class="legal">
        <a href="#">Aviso Legal</a>
        <a href="#">Privacidad</a>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  padding: 6rem 0 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
}

.footer-content {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 4rem;
  margin-bottom: 4rem;
}

.footer-logo {
  height: 60px;
  width: auto;
  margin-bottom: 1.5rem;
}

.footer-brand p {
  color: var(--text-secondary);
  max-width: 300px;
  margin-bottom: 2rem;
}

.socials {
  display: flex;
  gap: 1rem;
}

.social-link {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  color: white;
  font-size: 0.8rem;
  font-weight: 700;
  transition: var(--transition);
}

.social-link:hover {
  background: var(--bg-accent);
  border-color: var(--bg-accent);
}

.footer-links {
  display: grid;
  grid-template-columns: 1fr 1fr 1.5fr;
  gap: 2rem;
}

.link-group h4 {
  font-size: 0.9rem;
  margin-bottom: 1.5rem;
  color: var(--text-primary);
}

.link-group a {
  display: block;
  text-decoration: none;
  color: var(--text-secondary);
  font-size: 0.9rem;
  margin-bottom: 0.8rem;
  transition: var(--transition);
}

.link-group a:hover {
  color: var(--bg-accent);
}

.text-wrapped {
  word-break: break-all;
}

.loc-text {
  font-size: 0.9rem;
  color: var(--text-secondary);
  line-height: 1.4;
  margin-top: 0.8rem;
}

.footer-bottom {
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--text-muted);
  font-size: 0.85rem;
}

.legal {
  display: flex;
  gap: 2rem;
}

.legal a {
  text-decoration: none;
  color: var(--text-muted);
}

.copyright {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

@media (max-width: 768px) {
  .footer {
    padding: 4rem 0 2rem;
  }
  .footer-content {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 4rem;
  }
  .footer-brand {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .footer-brand p {
    margin: 0 auto 2rem;
  }
  .socials {
    justify-content: center;
  }
  .footer-links {
    grid-template-columns: 1fr 1fr;
    gap: 3rem;
    text-align: left;
  }
  .footer-links .link-group:last-child {
    grid-column: span 2;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .footer-bottom {
    flex-direction: column;
    gap: 2rem;
    text-align: center;
  }
  .copyright {
    align-items: center;
  }
}

@media (max-width: 500px) {
  .footer-links {
    grid-template-columns: 1fr;
    text-align: center;
  }
  .footer-links .link-group:last-child {
    grid-column: span 1;
  }
}
</style>
