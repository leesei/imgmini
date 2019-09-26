const gulp = require("gulp");
const image = require("gulp-image");
var notify = require("gulp-notify");

gulp.task("image", done => {
	gulp.src("./src/*")
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
		.pipe(gulp.dest("./dist"))
		.pipe(
			notify({
				title: "Gulp Image",
				message: "Images Compressed Successful",
				wait: true
			})
		);
	done();
});
gulp.task("default", gulp.series("image"));
