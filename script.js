const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible')
      observer.unobserve(entry.target)
    }
  })
}, { threshold: 0.18 })

document.querySelectorAll('.reveal').forEach((node) => observer.observe(node))

const zoomImages = document.querySelectorAll('.final-gallery .gallery img')

if (zoomImages.length) {
  const lightbox = document.createElement('div')
  lightbox.className = 'lightbox'
  lightbox.innerHTML = '<button type="button" aria-label="Fechar imagem ampliada">x</button><img alt="">'
  document.body.appendChild(lightbox)

  const lightboxImage = lightbox.querySelector('img')
  const closeButton = lightbox.querySelector('button')

  const closeLightbox = () => {
    lightbox.classList.remove('is-open')
    document.body.style.overflow = ''
  }

  zoomImages.forEach((image) => {
    image.addEventListener('click', () => {
      lightboxImage.src = image.currentSrc || image.src
      lightboxImage.alt = image.alt
      lightbox.classList.add('is-open')
      document.body.style.overflow = 'hidden'
    })
  })

  closeButton.addEventListener('click', closeLightbox)
  lightbox.addEventListener('click', (event) => {
    if (event.target === lightbox) closeLightbox()
  })
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeLightbox()
  })
}
