#!/usr/bin/env node
import { present } from './scribe.js'
import { longFormArgumentFrom, longFormFlagFrom } from './argument-parser.js'

const base_dir = longFormArgumentFrom(process.argv, 'base-dir', './')
const out_dir = longFormArgumentFrom(process.argv, 'out-dir', './out')
const watch = longFormFlagFrom(process.argv, 'watch', true)

const options = {
  base_dir,
  out_dir,
  watch,
}
console.table(options)
present(options)
