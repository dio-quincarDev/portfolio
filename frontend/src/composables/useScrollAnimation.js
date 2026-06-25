import { onMounted, onBeforeUnmount } from 'vue'

export function useScrollAnimation(selector = '.animate-on-scroll') {
  let observer = null

  onMounted(() => {
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' },
    )

    document.querySelectorAll(selector).forEach((el) => {
      observer.observe(el)
    })
  })

  onBeforeUnmount(() => {
    if (observer) observer.disconnect()
  })
}
