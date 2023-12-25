import { join, resolve } from 'node:path'
import { rmSync } from 'node:fs'
import asciidoctorFactory, { type Asciidoctor } from '@asciidoctor/core'
import * as chokidar from 'chokidar'
import { create } from 'browser-sync'
import asciidoctorRevealjs from '@asciidoctor/reveal.js'

export interface ScribeOptions {
  watch: boolean
  base_dir: string
  out_dir: string
}

type ProcessorOptions = Exclude<Parameters<Asciidoctor['convertFile']>[1], undefined>
type Attributes = Exclude<ProcessorOptions['attributes'], undefined>

// Sets additional document attributes, which override equivalently-named
// attributes defined in the document unless the value ends with @
const own: Attributes = {
  slides: 'slides',
}

enum Transition {
  NONE = 'none',
  FADE = 'fade',
  SLIDE = 'slide',
  CONVEX = 'convex',
  CONCAVE = 'concave',
  ZOOM = 'zoom',
}

enum TransitionSpeed {
  SLOW = 'slow',
  DEFAULT = 'default',
  FAST = 'fast',
}

enum Theme {
  BLACK = 'black',
  WHITE = 'white',
  BEIGE = 'beige',
  SIMPLE = 'simple',
  MOON = 'moon',
  NIGHT = 'night',
  LEAGUE = 'league',
  SERIF = 'serif',
  SKY = 'sky',
  SOLARIZED = 'solarized',
}

const writePresentation = (options: ScribeOptions) => {
  rmSync(resolve(process.cwd(), options.base_dir, options.out_dir), { force: true, recursive: true })

  // https://asciidoctor.org/docs/asciidoctor-revealjs/#reveal-js-options
  const asciidoctor_reveal_js: Attributes = {
    revealjsdir: '/node_modules/reveal.js@',
    revealjs_history: true,
    revealjs_theme: Theme.MOON,
    revealjs_transition: Transition.NONE,
    revealjs_transitionSpeed: TransitionSpeed.DEFAULT,
    'source-highlighter': 'highlightjs',
    imagedir: '../images',
  }

  // These are the same as for the ruby version
  // http://asciidoctor.org/docs/user-manual/#ruby-api-options
  const asciidoctor_options: ProcessorOptions = {
    safe: 'safe',
    backend: 'revealjs',
    base_dir: resolve(process.cwd(), options.base_dir),
    to_dir: options.out_dir,
    mkdirs: true,
    attributes: Object.assign({}, own, asciidoctor_reveal_js),
  }
  const asciidoctor = asciidoctorFactory()
  asciidoctorRevealjs.register()
  asciidoctor.convertFile(resolve(process.cwd(), options.base_dir, 'slides/presentation.adoc'), asciidoctor_options)
}

export const present = (options: ScribeOptions) => {
  const browserSync = create('presentation')
  const startPath = join(options.base_dir, options.out_dir, 'presentation.html')

  //https://browsersync.io/docs/options#option-server
  browserSync.init({
    logLevel: 'info',
    server: true,
    online: false,
    ui: false,
    startPath,
    watchEvents: ['add'],
    logFileChanges: true,
  })

  if (options.watch) {
    chokidar
      .watch([
        resolve(process.cwd(), options.base_dir, 'slides') + '/*.adoc',
        resolve(process.cwd(), options.base_dir, 'styles') + '/*.css',
        resolve(process.cwd(), options.base_dir, 'images') + '/*',
      ])
      .on('all', (_event, _path) => {
        writePresentation(options)
        browserSync.reload()
      })
  } else {
    writePresentation(options)
  }
}
