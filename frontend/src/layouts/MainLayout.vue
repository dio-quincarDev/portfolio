<template>
  <q-layout view="hHh lpR fFf">
    <a href="#main-content" class="skip-link">Skip to main content</a>
    <q-header class="noc-header">
      <div class="header-frame" aria-hidden="true"></div>
      <q-toolbar dense class="noc-toolbar">
        <div class="row items-center no-wrap q-gutter-x-xs gt-xs">
          <q-btn
            flat dense round
            :icon="$q.dark.isActive ? 'light_mode' : 'dark_mode'"
            color="secondary" size="sm"
            @click="toggleDark"
            :aria-label="$t('nav.toggleDark')"
          >
            <q-tooltip>{{ $t('nav.toggleDark') }}</q-tooltip>
          </q-btn>
          <q-btn
            flat dense round
            icon="translate"
            color="secondary" size="sm"
            @click="toggleLanguage"
            :aria-label="$t('nav.switchLang')"
          >
            <q-tooltip>{{ $t('nav.switchLang') }}</q-tooltip>
          </q-btn>
        </div>

        <div class="row items-center no-wrap q-gutter-x-xs lt-md">
          <q-btn
            flat dense round
            :icon="$q.dark.isActive ? 'light_mode' : 'dark_mode'"
            color="secondary" size="sm"
            @click="toggleDark"
            :aria-label="$t('nav.toggleDark')"
          />
          <q-btn
            flat dense round
            icon="translate"
            color="secondary" size="sm"
            @click="toggleLanguage"
            :aria-label="$t('nav.switchLang')"
          />
        </div>

        <q-space />

        <div class="row items-center no-wrap lt-md">
          <q-btn
            flat dense round
            icon="menu" color="secondary"
            @click="drawer = !drawer"
            :aria-label="$t('nav.toggleMenu')"
          />
        </div>

        <nav aria-label="Main navigation" class="row items-center no-wrap gt-xs">
          <div class="row items-center no-wrap q-gutter-x-xs">
            <button
              class="nav-btn text-mono"
              :class="{ 'nav-btn--active': isHome }"
              :aria-current="isHome ? 'page' : undefined"
              @click="$router.push('/')"
            >
              <span v-if="isHome" class="nav-indicator" aria-hidden="true">▌</span>
              {{ $t('nav.home') }}
            </button>
            <button
              class="nav-btn text-mono"
              :class="{ 'nav-btn--active': isProjects }"
              :aria-current="isProjects ? 'page' : undefined"
              @click="$router.push('/projects')"
            >
              <span v-if="isProjects" class="nav-indicator" aria-hidden="true">▌</span>
              {{ $t('nav.projects') }}
            </button>
            <button
              class="nav-btn text-mono"
              :class="{ 'nav-btn--active': isAbout }"
              :aria-current="isAbout ? 'page' : undefined"
              @click="$router.push('/about')"
            >
              <span v-if="isAbout" class="nav-indicator" aria-hidden="true">▌</span>
              {{ $t('nav.about') }}
            </button>
          </div>

          <span class="nav-sep" aria-hidden="true">│</span>

          <nav aria-label="Social links" class="row items-center no-wrap">
            <q-btn
              flat round
              icon="mdi-github"
              href="https://github.com/dio-quincarDev"
              target="_blank" rel="noopener noreferrer"
              color="secondary" size="sm"
              aria-label="GitHub"
            />
            <q-btn
              flat round
              href="https://x.com/DioQuincar"
              target="_blank" rel="noopener noreferrer"
              color="secondary" size="sm"
              aria-label="X (Twitter)"
            >
              <q-icon size="18px">
                <svg viewBox="0 0 24 24" aria-hidden="true" style="fill: currentColor; width: 18px; height: 18px">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
                </svg>
              </q-icon>
            </q-btn>
            <q-btn
              flat round
              icon="mdi-linkedin"
              href="https://linkedin.com/in/dio-quincar"
              target="_blank" rel="noopener noreferrer"
              color="secondary" size="sm"
              aria-label="LinkedIn"
            />
          </nav>
        </nav>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="drawer"
      side="right"
      overlay
      behavior="mobile"
      class="noc-drawer"
      aria-label="Navigation menu"
    >
      <div class="drawer-inner">
        <div class="drawer-toggles">
          <q-btn
            flat dense round
            :icon="$q.dark.isActive ? 'light_mode' : 'dark_mode'"
            size="sm"
            @click="toggleDark"
            :aria-label="$t('nav.toggleDark')"
          />
          <q-btn
            flat dense round
            icon="translate"
            size="sm"
            @click="toggleLanguage"
            :aria-label="$t('nav.switchLang')"
          />
          <span class="drawer-toggle-label">{{ isSpanish ? 'ES' : 'EN' }}</span>
        </div>

        <q-list padding class="drawer-nav">
          <q-item clickable v-ripple @click="goHome" :active="isHome" :aria-current="isHome ? 'page' : undefined">
            <q-item-section avatar>
              <q-icon :name="isHome ? 'home' : 'home'" :color="isHome ? 'accent-text' : 'secondary'" />
            </q-item-section>
            <q-item-section class="drawer-item-label">{{ $t('nav.home') }}</q-item-section>
            <div v-if="isHome" class="drawer-active-indicator" aria-hidden="true">▌</div>
          </q-item>
          <q-item clickable v-ripple @click="goProjects" :active="isProjects" :aria-current="isProjects ? 'page' : undefined">
            <q-item-section avatar>
              <q-icon name="code" :color="isProjects ? 'accent-text' : 'secondary'" />
            </q-item-section>
            <q-item-section class="drawer-item-label">{{ $t('nav.projects') }}</q-item-section>
            <div v-if="isProjects" class="drawer-active-indicator" aria-hidden="true">▌</div>
          </q-item>
          <q-item clickable v-ripple @click="goAbout" :active="isAbout" :aria-current="isAbout ? 'page' : undefined">
            <q-item-section avatar>
              <q-icon name="person" :color="isAbout ? 'accent-text' : 'secondary'" />
            </q-item-section>
            <q-item-section class="drawer-item-label">{{ $t('nav.about') }}</q-item-section>
            <div v-if="isAbout" class="drawer-active-indicator" aria-hidden="true">▌</div>
          </q-item>
        </q-list>

        <div class="drawer-footer">
          <div class="drawer-social">
            <q-btn flat round icon="mdi-github" href="https://github.com/dio-quincarDev" target="_blank" rel="noopener noreferrer" @click="drawer = false" aria-label="GitHub" />
            <q-btn flat round href="https://x.com/DioQuincar" target="_blank" rel="noopener noreferrer" @click="drawer = false" aria-label="X (Twitter)">
              <q-icon size="18px">
                <svg viewBox="0 0 24 24" aria-hidden="true" style="fill: currentColor; width: 18px; height: 18px">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
                </svg>
              </q-icon>
            </q-btn>
            <q-btn flat round icon="mdi-linkedin" href="https://linkedin.com/in/dio-quincar" target="_blank" rel="noopener noreferrer" @click="drawer = false" aria-label="LinkedIn" />
          </div>
        </div>
      </div>
    </q-drawer>

    <q-page-container>
      <main id="main-content" style="display: contents">
        <router-view />
      </main>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, computed, provide, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'

const $q = useQuasar()
const router = useRouter()
const { locale } = useI18n()
const drawer = ref(false)
const isSpanish = computed(() => locale.value === 'es')

const isHome = computed(() => router.currentRoute.value.path === '/')
const isProjects = computed(() => router.currentRoute.value.path === '/projects')
const isAbout = computed(() => router.currentRoute.value.path === '/about')

const goHome = () => { router.push('/'); drawer.value = false }
const goProjects = () => { router.push('/projects'); drawer.value = false }
const goAbout = () => { router.push('/about'); drawer.value = false }
const toggleLanguage = () => { locale.value = locale.value === 'es' ? 'en' : 'es' }
const toggleDark = () => { $q.dark.toggle() }

watch(locale, (val) => {
  document.documentElement.lang = val === 'es' ? 'es' : 'en'
})

provide('isSpanish', isSpanish)
</script>

<style lang="scss" scoped>
$accent: #ef476f;

// ====================
// Header — retro terminal frame
// ====================
.noc-header {
  background: var(--header-bg) !important;
  border-bottom: 1px solid var(--header-border);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  position: relative;
}

// terminal window top accent line — subtle retro frame
.header-frame {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: var(--accent);
  opacity: 0.5;
  pointer-events: none;
}

.noc-toolbar {
  min-height: 52px;
  @media (max-width: 599px) {
    min-height: 44px;
    padding: 0 8px;
  }
}

// ====================
// Nav buttons — terminal-style, monospace
// ====================
.nav-btn {
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: var(--text);
  background: none;
  border: none;
  padding: 4px 10px;
  cursor: pointer;
  transition: color var(--dur-fast) var(--ease);
  display: inline-flex;
  align-items: center;
  gap: 2px;
  position: relative;

  &:hover {
    color: var(--accent);
  }

  &:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }
}

.nav-btn--active {
  color: var(--accent);
}

// terminal cursor blink
.nav-indicator {
  animation: terminal-blink 1s steps(1) infinite;
  font-size: 10px;
  line-height: 1;
  display: inline-block;
}

@keyframes terminal-blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

.nav-sep {
  color: var(--border);
  font-size: 12px;
  padding: 0 4px;
  user-select: none;
}

// ====================
// Drawer — retro-terminal overlay
// ====================
.noc-drawer {
  background: var(--drawer-bg) !important;
  border-left: 1px solid var(--header-border);
}

.drawer-inner {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 20px 16px;

  // CRT scanline overlay — subtle, only in drawer
  background-image: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 2px,
    rgba(0, 0, 0, 0.035) 2px,
    rgba(0, 0, 0, 0.035) 4px
  );
}

.drawer-toggles {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 0 12px 16px;
  border-bottom: 1px solid var(--border);
  margin-bottom: 8px;
}

.drawer-toggle-label {
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  letter-spacing: 1px;
  color: var(--muted);
  margin-left: 4px;
}

.drawer-nav {
  flex: 1;
  padding: 0;

  .q-item {
    position: relative;
    padding: 14px 12px;
    border-radius: var(--radius-sm);
    transition: background var(--dur-fast) var(--ease);

    &:hover {
      background: rgba($accent, 0.04);
    }
  }
}

.drawer-item-label {
  font-family: 'JetBrains Mono', monospace;
  font-size: 13px;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: var(--text);
}

.drawer-active-indicator {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--accent);
  font-size: 14px;
  line-height: 1;
  animation: terminal-blink 1s steps(1) infinite;
}

.drawer-footer {
  border-top: 1px solid var(--border);
  padding-top: 16px;
}

.drawer-social {
  display: flex;
  justify-content: center;
  gap: 4px;
}

// ====================
// Dark mode — scanline color adjustment
// ====================
.body--dark {
  .drawer-inner {
    background-image: repeating-linear-gradient(
      0deg,
      transparent,
      transparent 2px,
      rgba(255, 255, 255, 0.035) 2px,
      rgba(255, 255, 255, 0.035) 4px
    );
  }
}
</style>
