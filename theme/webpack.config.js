const defaultConfig = require("@wordpress/scripts/config/webpack.config");
const copyWebpackPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

/**
 * @see https://stackoverflow.com/questions/35903246/how-to-create-multiple-output-paths-in-webpack-config
 */

module.exports = {
	...defaultConfig,
	entry: {
		...defaultConfig.entry(),
		main: './src/main.js',
		editor: './src/editor.js',
	},
	plugins: [
		new CleanWebpackPlugin({
			cleanOnceBeforeBuildPatterns: ['images/**'], // nettoie seulement images/
		  }),
		...defaultConfig.plugins.filter(plugin => plugin.constructor.name !== 'RtlCssPlugin'),
		new copyWebpackPlugin({
			patterns: [
				{ from: 'src/img/static/', to: 'images/static/', noErrorOnMissing: true },
			],
		}),
	],
};