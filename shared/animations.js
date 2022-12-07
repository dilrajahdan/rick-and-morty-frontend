import { gsap } from 'gsap'

// Set scene
export const setScene = () => {
  const tl = gsap.timeline({ onComplete: introScene() })

  tl.set('.site-header .v-parallax__image-container', { opacity: 0 })
  tl.set('.site-header__logo-container', {
    opacity: 0,
    scale: 3,
    rotate: -180,
    transformOrigin: 'center center',
  })
  tl.set('.site-header__title', { opacity: 0, y: '100%' })

  tl.set('.character-card', {
    opacity: 0,
    rotation: gsap.utils.wrap([-2, 2]),
  })
  tl.set('.character-paging', { opacity: 0, y: 100 })
  tl.set('.character-paging .v-btn', { opacity: 0, y: '100%' })

  // return tl
}

// Intro scene
export const introScene = () => {
  const tl = gsap.timeline()

  tl.to('.site-header__logo-container', {
    opacity: 1,
    duration: 2,
    ease: 'bounce.out',
    scale: 1,
    rotate: 0,
  })

  tl.to('.site-header__title', {
    y: 0,
    opacity: 1,
    duration: 1.1,
    ease: 'elastic.out(1, 0.3)',
  })

  tl.to(
    '.site-header .v-parallax__image-container',
    {
      opacity: 1,
      duration: 5,
      ease: 'power2.out',
    },
    '-=1'
  )

  tl.to(
    '.character-card',
    {
      opacity: 1,
      ease: 'power4.outIn',
      // rotation: 0,
      rotation: gsap.utils.wrap([-7, 7]),

      stagger: {
        from: 'edges',
        grid: 'auto',
        amount: 0.5,
        duration: 0.5,
      },
    },
    '-=4'
  )

  tl.to(
    '.character-paging',
    {
      opacity: 1,
      y: 0,
      duration: 0.2,
      ease: 'power4.outIn',
    },
    '-=3'
  )
  tl.to(
    '.character-paging .v-btn',
    {
      opacity: 1,
      y: 0,
      ease: 'power4.outIn',
      stagger: 0.2,
    },
    '-=3'
  )

  // return tl
}
