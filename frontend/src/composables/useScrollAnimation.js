import { onMounted, onBeforeUnmount } from 'vue'

export function useScrollAnimation(selector = '.reveal, .reveal-left, .reveal-clip') {
  let observer = null

  onMounted(() => {
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    )

    document.querySelectorAll(selector).forEach((el) => {
      observer.observe(el)
    })
  })

  onBeforeUnmount(() => {
    if (observer) observer.disconnect()
  })
}
