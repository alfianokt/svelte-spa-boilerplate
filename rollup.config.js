import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
import { premove } from 'premove';
import size from 'rollup-plugin-size';

const production = !process.env.ROLLUP_WATCH;

function serve() {
	let server;

	function toExit() {
		if (server) server.kill(0);
	}

	return {
		writeBundle() {
			if (server) return;
			server = require('child_process').spawn('npm', ['run', 'start', '--', '--dev'], {
				stdio: ['ignore', 'inherit', 'inherit'],
				shell: true
			});

			process.on('SIGTERM', toExit);
			process.on('exit', toExit);
		}
	};
}

export default {
	input: 'src/main.js',
	output: {
		dir: 'public/build',
		format: 'esm',
		sourcemap: !production
	},
	plugins: [
		premove('public/build'),
		svelte({
			dev: !production,
			css: css => {
				css.write('bundle.css');
			}
		}),
		resolve({
			browser: true,
			dedupe: ['svelte']
		}),
		commonjs(),
		size(),
		!production && serve(),
		!production && livereload('public'),
		production && terser()
	],
	watch: {
		clearScreen: false
	}
};
