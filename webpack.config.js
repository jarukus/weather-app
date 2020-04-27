const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')

const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev

const optimization = () => {
	const config = {
		runtimeChunk: true,
		splitChunks: {
			chunks: 'all',
		},
	}

	if (isProd) {
		config.minimizer = [
			new OptimizeCssAssetWebpackPlugin(),
			new TerserWebpackPlugin(),
		]
	}

	return config
}

const filename = (ext) => (isDev ? `[name].${ext}` : `[name].[hash].${ext}`)

const cssLoaders = (extra) => {
	const loaders = [
		{
			loader: MiniCssExtractPlugin.loader,
			options: {
				hmr: isDev,
				reloadAll: true,
			},
		},
		'css-loader',
	]

	if (extra) {
		loaders.push(extra)
	}

	return loaders
}

const babelOptions = (preset) => {
	const opts = {
		presets: ['@babel/preset-env'],
		plugins: [
			'@babel/plugin-proposal-class-properties',
			'@babel/plugin-transform-async-to-generator',
		],
	}

	if (preset) {
		opts.presets.push(preset)
	}

	return opts
}

const jsLoaders = () => {
	const loaders = [
		{
			loader: 'babel-loader',
			options: babelOptions(),
		},
	]

	return loaders
}

const plugins = () => {
	const base = [
		new HTMLWebpackPlugin({
			template: '../public/index.html',
			minify: {
				collapseWhitespace: isProd,
			},
		}),
		new CleanWebpackPlugin(),
		new CopyWebpackPlugin([
			{
				from: path.resolve(__dirname, 'public/favicon.ico'),
				to: path.resolve(__dirname, 'build'),
			},
			{
				from: path.resolve(__dirname, 'public/_redirects'),
				to: path.resolve(__dirname, 'build'),
			},
		]),
		new MiniCssExtractPlugin({
			filename: filename('css'),
		}),
	]

	return base
}

module.exports = {
	context: path.resolve(__dirname, 'src'),
	mode: 'development',
	entry: {
		main: ['@babel/polyfill', './index.js'],
	},
	output: {
		filename: filename('js'),
		path: path.resolve(__dirname, 'build'),
		publicPath: '/',
	},
	resolve: {
		extensions: ['.js', '.json', '.png'],
		alias: {
			'@': path.resolve(__dirname, 'src'),
			'@components': path.resolve(__dirname, 'src/components'),
			'@containers': path.resolve(__dirname, 'src/containers'),
			'@store': path.resolve(__dirname, 'src/store'),
		},
	},
	optimization: optimization(),
	devServer: {
		port: 3000,
		historyApiFallback: true,
		hot: isDev,
	},
	devtool: isDev ? 'source-map' : '',
	plugins: plugins(),
	module: {
		rules: [
			{
				test: /\.css$/,
				use: cssLoaders(),
			},
			{
				test: /\.s[ac]ss$/,
				use: cssLoaders('sass-loader'),
			},
			{
				test: /\.(png|jpg|svg|gif)$/,
				use: ['file-loader'],
			},
			{
				test: /\.(ttf|woff|woff2|eot)$/,
				use: ['file-loader'],
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: jsLoaders(),
			},
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				loader: {
					loader: 'babel-loader',
					options: babelOptions('@babel/preset-react'),
				},
			},
		],
	},
}
