import { reactive, ref } from 'vue'
import { useQuasar } from 'quasar'
import { useI18n } from 'vue-i18n'
import emailjs from '@emailjs/browser'

emailjs.init({
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
})

export function useContactForm() {
  const $q = useQuasar()
  const { t } = useI18n()

  const form = reactive({
    name: '',
    email: '',
    message: '',
    honeypot: '',
  })

  const sending = ref(false)
  const contactExpanded = ref(false)
  const cooldownUntil = ref(0)

  const toggleContact = () => {
    contactExpanded.value = !contactExpanded.value
  }

  const scrollToContact = () => {
    const el = document.getElementById('contacto-section')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
      setTimeout(() => {
        contactExpanded.value = true
      }, 500)
    }
  }

  const sendContact = async () => {
    if (form.honeypot) {
      console.warn('Bot detected via honeypot')
      return
    }

    if (Date.now() < cooldownUntil.value) {
      $q.notify({
        message: t('contact.cooldown'),
        color: 'warning',
        icon: 'timer',
      })
      return
    }

    if (!form.name || !form.email || !form.message) {
      $q.notify({
        message: t('contact.required'),
        color: 'negative',
        icon: 'warning',
      })
      return
    }

    sending.value = true

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          name: form.name,
          from_email: form.email,
          message: form.message,
        },
      )

      $q.notify({
        message: t('contact.sent'),
        color: 'positive',
        icon: 'done',
      })

      form.name = ''
      form.email = ''
      form.message = ''

      cooldownUntil.value = Date.now() + 60000
    } catch (error) {
      $q.notify({
        message: t('contact.error'),
        color: 'negative',
        icon: 'error',
      })
      console.error('EmailJS error:', error)
    } finally {
      sending.value = false
    }
  }

  return {
    form,
    sending,
    contactExpanded,
    toggleContact,
    scrollToContact,
    sendContact,
  }
}
