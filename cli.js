#!/usr/bin/env node

import gulp from 'gulp';
import image from 'gulp-image';
import notify from "gulp-notify";
import rename from "gulp-rename";
import isImage from "is-image";
import gulpif from "gulp-if";
import chalk from "chalk";
import path from "path";
import open from "open";

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
