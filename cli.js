#!/usr/bin/env node

const gulp = require("gulp");
const image = require("gulp-image");
const notify = require("gulp-notify");
const rename = require("gulp-rename");
const isImage = require("is-image");
const gulpif = require("gulp-if");
const chalk = require("chalk");
const path = require("path");
const open = require("open");

var args = process.argv.slice(2);

var keepOld = args.includes("-k");
var notification = args.includes("-n");
var imgLinks = args.filter((arg) => isImage(arg));
if (imgLinks.length > 0) {
  const newImages = imgLinks.map((img) => path.resolve(process.cwd(), img));

  // Copy file and rename.
  if (keepOld) {
    gulp
      .src(newImages)
      .pipe(rename({ suffix: "---old" }))
      .pipe(
        gulp.dest(function (file) {
          return file.base;
        })
      );
  }

  // Minify Image
  gulp
    .src(newImages)
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
        quiet: false, // defaults to false
      })
    )
    .pipe(
      gulp.dest(function (file) {
        return file.base;
      })
    )
    .pipe(
      gulpif(
        notification,
        notify(function (file) {
          return {
            title: "ImageMinify",
            message: file.relative + " Compressed Successful",
            actions: " Open Folder ",
            wait: true,
            folder: file.base,
          };
        })
      )
    );

  // Show Notification
  notify.on("click", function (options) {
    open(options.folder);
  });
} else {
  console.log(chalk.black.bgRed("Plz Provide Valid Image"));
}
