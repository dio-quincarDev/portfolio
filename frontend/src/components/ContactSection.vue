<template>
  <section id="contacto-section" class="contact reveal">
    <SectionHeader :eyebrow="$t('contact.eyebrow')" :title="$t('contact.title')" />

    <div class="contact__cta-row">
      <q-btn
        :label="$t('contact.open')"
        unelevated
        no-caps
        class="contact__cta"
        @click="modalOpen = true"
      />
    </div>

    <q-dialog v-model="modalOpen">
      <q-card class="contact__modal">
        <q-card-section class="contact__modal-body">
          <q-form @submit.prevent="handleSubmit" class="contact__form">
            <q-input
              v-model="form.name"
              :label="$t('contact.name')"
              outlined
              dense
              color="accent"
              class="contact__field"
              :rules="[(val) => !!val || $t('contact.nameRequired')]"
              hide-bottom-space
            />

            <q-input
              v-model="form.email"
              :label="$t('contact.email')"
              outlined
              dense
              type="email"
              color="accent"
              class="contact__field"
              :rules="[
                (val) => !!val || $t('contact.emailRequired'),
                (val) => /.+@.+\..+/.test(val) || $t('contact.emailInvalid'),
              ]"
              hide-bottom-space
            />

            <div style="display: none" aria-hidden="true">
              <input v-model="form.honeypot" tabindex="-1" autocomplete="off" />
            </div>

            <q-input
              v-model="form.message"
              :label="$t('contact.message')"
              outlined
              dense
              type="textarea"
              color="accent"
              class="contact__field"
              :rules="[(val) => !!val || $t('contact.messageRequired')]"
              hide-bottom-space
              :input-style="{ minHeight: '80px' }"
            />

            <div class="contact__submit-row">
              <q-btn
                flat
                no-caps
                class="contact__cancel"
                @click="modalOpen = false"
              >
                {{ $t('contact.close') }}
              </q-btn>
              <q-btn
                type="submit"
                :label="$t('contact.submit')"
                unelevated
                no-caps
                :loading="sending"
                :disable="sending || !!form.honeypot"
                class="contact__submit"
              />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import SectionHeader from 'components/SectionHeader.vue'
import { useContactForm } from 'src/composables/useContactForm'

const modalOpen = ref(false)

const { form, sending, sendContact } = useContactForm()

const handleSubmit = async () => {
  const ok = await sendContact()
  if (ok) modalOpen.value = false
}
</script>

<style scoped>
.contact__cta-row {
  display: flex;
  justify-content: center;
}

.contact__cta {
  background: var(--accent);
  color: #fff;
  padding: 10px 32px;
  font-size: 14px;
  font-family: 'Sora', sans-serif;
  border-radius: 6px;
}

.contact__cta:hover {
  filter: brightness(1.1);
}

.contact__modal {
  max-width: 420px;
  width: 90vw;
  border-radius: 12px;
  background: var(--surface);
}

.contact__modal-body {
  padding: 24px;
}

.contact__field {
  margin-bottom: 4px;
}

.contact__field :deep(.q-field__control) {
  background: var(--bg);
  border-radius: 6px;
}

.contact__submit-row {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 8px;
  margin-top: 16px;
}

.contact__cancel {
  font-family: 'Sora', sans-serif;
  font-size: 13px;
  color: var(--muted);
}

.contact__submit {
  background: var(--accent);
  color: #fff;
  padding: 6px 24px;
  font-size: 13px;
  font-family: 'Sora', sans-serif;
  border-radius: 6px;
  min-width: 120px;
}

.contact__submit:hover {
  filter: brightness(1.1);
}
</style>
