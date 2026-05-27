<template>
  <q-layout view="hHh lpR fFf">
    <q-header class="noc-header">
      <q-toolbar dense class="noc-toolbar">
        <div class="row items-center no-wrap q-gutter-x-sm">
          <img src="/icons/dq-logo.png" alt="Logo" class="logo-img" />
          <div class="text-mono text-weight-bold text-secondary q-ml-xs">
            <span class="gt-xs">dioquincar.dev</span>
            <span class="lt-sm">dq.dev</span>
          </div>
          <span class="text-mono text-grey-7 text-caption gt-sm q-ml-md">// sys:online</span>
        </div>

        <q-space />

        <div class="row items-center no-wrap q-gutter-x-xs lt-md">
          <q-btn flat dense round icon="menu" color="secondary" @click="drawer = !drawer" />
        </div>

        <div class="row items-center no-wrap q-gutter-x-sm gt-xs">
          <div class="row items-center no-wrap q-gutter-x-sm gt-sm">
            <q-btn
              flat
              dense
              class="nav-btn text-mono"
              :label="$t('nav.home')"
              @click="$router.push('/')"
            />
            <q-btn flat dense class="nav-btn text-mono" :label="$t('nav.about')" to="/about" />
            <q-separator vertical class="q-mx-xs" />
          </div>

          <q-btn
            flat
            dense
            round
            icon="translate"
            color="secondary"
            size="sm"
            @click="toggleLanguage"
          >
            <q-tooltip>{{ $t('nav.switchLang') }}</q-tooltip>
          </q-btn>

          <q-btn
            flat
            dense
            round
            :icon="$q.dark.isActive ? 'light_mode' : 'dark_mode'"
            color="secondary"
            size="sm"
            @click="toggleDark"
          >
            <q-tooltip>{{ $t('nav.toggleDark') }}</q-tooltip>
          </q-btn>

          <q-btn
            flat
            round
            icon="mdi-github"
            href="https://github.com/dio-quincarDev"
            target="_blank"
            color="secondary"
            size="sm"
          />
          <q-btn
            flat
            round
            href="https://x.com/DioQuincar"
            target="_blank"
            color="secondary"
            size="sm"
          >
            <q-icon size="18px">
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                style="fill: currentColor; width: 18px; height: 18px"
              >
                <path
                  d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
                ></path>
              </svg>
            </q-icon>
          </q-btn>
          <q-btn
            flat
            round
            icon="mdi-linkedin"
            href="https://linkedin.com/in/dio-quincar"
            target="_blank"
            color="secondary"
            size="sm"
          />
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="drawer" side="right" overlay behavior="mobile" class="noc-drawer">
      <q-list padding>
        <q-item clickable v-ripple @click="goHome">
          <q-item-section avatar><q-icon name="home" color="secondary" /></q-item-section>
          <q-item-section class="text-mono">{{ $t('nav.home') }}</q-item-section>
        </q-item>
        <q-item clickable v-ripple @click="goAbout">
          <q-item-section avatar><q-icon name="person" color="secondary" /></q-item-section>
          <q-item-section class="text-mono">{{ $t('nav.about') }}</q-item-section>
        </q-item>
        <q-item
          clickable
          v-ripple
          href="https://github.com/dio-quincarDev"
          target="_blank"
          @click="drawer = false"
        >
          <q-item-section avatar><q-icon name="mdi-github" color="secondary" /></q-item-section>
          <q-item-section class="text-mono">GitHub</q-item-section>
        </q-item>
        <q-item
          clickable
          v-ripple
          href="https://x.com/DioQuincar"
          target="_blank"
          @click="drawer = false"
        >
          <q-item-section avatar>
            <q-icon color="secondary" size="20px">
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                style="fill: currentColor; width: 20px; height: 20px"
              >
                <path
                  d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
                ></path>
              </svg>
            </q-icon>
          </q-item-section>
          <q-item-section class="text-mono">{{ $t('nav.x') }}</q-item-section>
        </q-item>
        <q-item
          clickable
          v-ripple
          href="https://linkedin.com/in/dio-quincar"
          target="_blank"
          @click="drawer = false"
        >
          <q-item-section avatar><q-icon name="mdi-linkedin" color="secondary" /></q-item-section>
          <q-item-section class="text-mono">LinkedIn</q-item-section>
        </q-item>
        <q-separator class="q-my-sm" />
        <q-item clickable v-ripple @click="toggleLanguage">
          <q-item-section avatar><q-icon name="translate" color="secondary" /></q-item-section>
          <q-item-section class="text-mono">{{ $t('nav.switchLangLabel') }}</q-item-section>
        </q-item>
        <q-item clickable v-ripple @click="toggleDark">
          <q-item-section avatar>
            <q-icon :name="$q.dark.isActive ? 'light_mode' : 'dark_mode'" color="secondary" />
          </q-item-section>
          <q-item-section class="text-mono">{{
            $q.dark.isActive ? 'Modo Claro' : 'Modo Oscuro'
          }}</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, computed, provide } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'

const $q = useQuasar()
const router = useRouter()
const { locale } = useI18n()
const drawer = ref(false)
const isSpanish = computed(() => locale.value === 'es')

const goHome = () => {
  router.push('/')
  drawer.value = false
}

const goAbout = () => {
  router.push('/about')
  drawer.value = false
}

const toggleLanguage = () => {
  locale.value = locale.value === 'es' ? 'en' : 'es'
}

const toggleDark = () => {
  $q.dark.toggle()
}

provide('isSpanish', isSpanish)
</script>

<style lang="scss" scoped>
.noc-header {
  background: var(--header-bg) !important;
  border-bottom: 1px solid var(--header-border);
  backdrop-filter: blur(12px);
}

.noc-toolbar {
  min-height: 52px;
  @media (max-width: 599px) {
    min-height: 44px;
    padding: 0 8px;
  }
}

.logo-img {
  height: 32px;
  width: auto;
  @media (max-width: 599px) {
    height: 24px;
  }
}

.nav-btn {
  font-size: 11px;
  letter-spacing: 1px;
  color: var(--text-secondary);
  padding: 4px 12px;
  border: 1px solid transparent;
  transition: all 0.2s;

  &:hover {
    color: $accent;
    border-color: rgba(239, 71, 111, 0.3);
    background: rgba(239, 71, 111, 0.05);
  }
}

.noc-drawer {
  background: var(--drawer-bg) !important;
  border-left: 1px solid var(--header-border);
}
</style>
