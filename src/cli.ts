#!/usr/bin/env node
import { present } from './scribe';

const watch = !process.argv.includes('--no-watch');
const base_dir = process.cwd();
const out_dir = './out';

present({
    watch,
    base_dir,
    out_dir
});
