#!/usr/bin/env node

const gulp = require("gulp");
const image = require("gulp-image");
const notify = require("gulp-notify");
const rename = require("gulp-rename");
const cmder = require("commander");
const isImage = require("is-image");
const chalk = require("chalk");

const path = require("path");

var images = process.argv.slice(2);
var imgLinks = images.filter(img => isImage(img));
if (imgLinks) {
	const newImages = imgLinks.map(img => path.resolve(__dirname, img));

	// Copy file and rename.
	gulp.src(newImages)
		.pipe(rename({ suffix: "---old" }))
		.pipe(
			gulp.dest(function(file) {
				console.log(chalk.blue(file.basename));
				return file.base;
			})
		);

	// Minify Image
	gulp.src(newImages)
		.pipe(
			image({
				pngquant: true,
				optipng: false,
				zopflipng: true,
				jpegRecompress: false,
				mozjpeg: true,
				guetzli: false,
				gifsicle: true,
				svgo: true,
				concurrent: 10,
				quiet: false // defaults to false
			})
		)
		.pipe(
			gulp.dest(function(file) {
				console.log(chalk.blue(file.basename));
				return file.base;
			})
		)
		.pipe(
			notify({
				title: "Gulp Image",
				message: "<%= file.relative %> Compressed Successful",
				wait: true
			})
		);
}
