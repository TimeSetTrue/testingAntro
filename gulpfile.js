"use strict";
import gulp from 'gulp';
import browserSync from 'browser-sync';
import webpack from 'webpack-stream';
import autoprefixer from 'gulp-autoprefixer';
import rename from 'gulp-rename';
import imagemin from 'gulp-imagemin';
import uglify from 'gulp-uglify';
import ttf2woff from 'gulp-ttf2woff';
import ttf2woff2 from 'gulp-ttf2woff2';
import ttf2eot from 'gulp-ttf2eot';
import cleancss from 'gulp-clean-css';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import del from 'del';
import strip from 'gulp-strip-comments';
import ttf2svg from 'gulp-ttf-svg';
import concatCss from 'gulp-concat-css';

const sass = gulpSass(dartSass);
const dist = "./dist/";


gulp.task("clean", function () {
	return del(dist + "/**/*.*");
});


gulp.task('default', function () {
	return gulp.src(dist + '**/*.css')
		// .pipe(concatCss("styles/bzundle.css"))
		.pipe(gulp.dest('out/'));
});


gulp.task("images-min", () => {
	return gulp.src('./src/assets/img/**/*.+(jpg|jpeg|gif|png|svg)')
		.pipe(
			imagemin({
				progressive: true,
				svgoPlugins: [{
					removeViewBox: false
				}],
				interlaces: true,
				optimizationLevel: 3 // 0 to 7
			})
		)
		.pipe(gulp.dest(dist + 'assets/img/'))
		.pipe(browserSync.stream())
})

gulp.task("sass", function () {
	return gulp
		.src("./src/assets/scss/*.scss")
		.pipe(sass())
		.pipe(
			autoprefixer({
				overrideBrowserslist: ["last 12 versions"],
				browsers: [
					"Android >= 3",
					"Chrome >= 10",
					"Firefox >= 14",
					"Explorer >= 5",
					"iOS >= 3",
					"Opera >= 6",
					"Safari >= 3",
				],
			}),
		)
		// .pipe(gulp.dest(dist + "css/"))
		// .pipe(
		// 	rename({
		// 		suffix: ".min",
		// 	})
		// .pipe(
		// 	cleancss({
		// 		compatibility: "ie8",
		// 		level: 2,
		// 		format: 'keep-breaks'
		// 	}),
		// )
		.pipe(gulp.dest(dist + "assets/css/"))
		.pipe(
			browserSync.reload({
				stream: true,
			}),
		);
});


gulp.task("build-js", () => {
	return gulp.src("./src/assets/js/*.js")
		// .pipe(webpack({
		// 	mode: 'production',
		// 	watch: true,
		// 	output: {
		// 		filename: 'script.min.js'
		// 	},
		// }))
		// .pipe(uglify())
		.pipe(strip())
		.pipe(gulp.dest(dist + 'assets/js/'))
		.pipe(
			browserSync.reload({
				stream: true,
			}),
		);
});

gulp.task('ttf2svg', function () {
	return gulp
		.src("./src/assets/fonts/*.+(eot|svg|ttf|otf|woff|woff2)")
		.pipe(gulp.dest(dist + "assets/fonts/"))
		.pipe(ttf2svg())
		.pipe(gulp.dest(dist + 'assets/fonts/'))
		.pipe(
			browserSync.reload({
				stream: true,
			}),
		);
});


gulp.task("font-woff", function () {
	return gulp
		.src("./src/assets/fonts/*.+(eot|svg|ttf|otf|woff|woff2)")
		.pipe(gulp.dest(dist + "assets/fonts/"))
		.pipe(ttf2woff())
		.pipe(gulp.dest(dist + "assets/fonts/"))
		.pipe(
			browserSync.reload({
				stream: true,
			}),
		);
});

gulp.task("font-woff2", function () {
	return gulp
		.src("./src/assets/fonts/*.+(eot|svg|ttf|otf|woff|woff2)")
		.pipe(gulp.dest(dist + "assets/fonts/"))
		.pipe(ttf2woff2())
		.pipe(gulp.dest(dist + "assets/fonts/"))
		.pipe(
			browserSync.reload({
				stream: true,
			}),
		);
});


gulp.task("font-eot", function () {
	return gulp
		.src("./src/assets/fonts/*.+(eot|svg|ttf|otf|woff|woff2)")
		.pipe(gulp.dest(dist + "assets/fonts/"))
		.pipe(ttf2eot())
		.pipe(gulp.dest(dist + "assets/fonts/"))
		.pipe(
			browserSync.reload({
				stream: true,
			}),
		);
});


gulp.task("copy-html", () => {
	return gulp.src("./src/*.html")
		.pipe(gulp.dest(dist))
		.pipe(
			browserSync.reload({
				stream: true,
			}),
		);
});


gulp.task("watch", function () {
	browserSync.init({
		server: "./dist/",
		port: 4000,
		notify: true
	});
	gulp.watch("./src/*.html", gulp.parallel("copy-html"));
	gulp.watch(
		"./src/assets/fonts/**/*.*",
		gulp.parallel("font-woff", "font-woff2", "font-eot", "ttf2svg"),
	);
	gulp.watch("./src/assets/js/**/*.js", gulp.parallel("build-js"));
	gulp.watch("./src/assets/scss/**/*.scss", gulp.parallel("sass"));
	gulp.watch("./src/assets/img/**/*.+(jpg|jpeg|gif|png|svg)", gulp.parallel("images-min"));
});

gulp.task(
	"default",
	gulp.parallel(
		"clean",
		"images-min",
		"copy-html",
		"sass",
		"font-woff",
		"font-eot",
		"font-woff2",
		"ttf2svg",
		"build-js",
		"watch"
	),
);
