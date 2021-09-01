const { src, dest, parallel, series, watch } = require('gulp');
const del 									 = require('del');
const browserSync 							 = require('browser-sync').create();
const fileinclude 							 = require('gulp-file-include');
const concat 								 = require('gulp-concat');
const sourcemaps                             = require('gulp-sourcemaps');
const scss									 = require('gulp-sass');
const autoprefixer 							 = require('gulp-autoprefixer');
const cleanCSS 								 = require('gulp-clean-css');
const babel 								 = require('gulp-babel');
const uglify 								 = require('gulp-uglify-es').default;
const ttf2woff                               = require('gulp-ttf2woff');
const ttf2woff2                              = require('gulp-ttf2woff2');
const webp 									 = require('gulp-webp');
const imagemin                               = require('gulp-imagemin');
const svgSprite 							 = require('gulp-svg-sprite');
//ip => деспечер задач => wi-fi
// host:      "192.168.31.29",// можно использовать ip сервера,

function browsersync(){
	browserSync.init({
		 server: {
            baseDir: "app/"
     	},
        port:      3000, // порт через который будет проксироваться сервер
        host:      "192.168.31.29",// можно использовать ip сервера,
        open: 'external' // указываем, что наш url внешний 
	});
}

function cleanApp(){
	return del('./app/');
}

function html (){
	return src('./src/index.html') //берем данные из исходника
		.pipe(fileinclude()) // подключаем инклюды
		// .pipe(webpHTML())
		.pipe(dest('./app')) //куда все складавать
		.pipe(browserSync.stream()); //запуск сервера
}

function styles(){
	return src('./src/scss/**/*.scss')
		.pipe(sourcemaps.init()) //мапим все файлы (иницилизируем). мапинг позволяет определить файл где находится св-во
		.pipe(scss({
				outputStyle: 'expendend' //способ форматирования стилей
			}))
		.pipe(autoprefixer({ //автопрефикc
					overrideBrowserslist: ["last 5 versions"], // последние 5 версий
	            	cascade: true, // каскад
	            	grid: true //префикс для грида
				}))
		.pipe(cleanCSS({ //убирает лишний CSS минифицируем
					level: 2 //уровень сжатия
				}))
		.pipe(sourcemaps.write('.'))// source map запишется отдельным файлом в той же папке, что и основной файл, в формате main.min.css.map и scripts.min.js.map.
		.pipe(dest('./app/css/'))//куда все складавать
		.pipe(browserSync.stream());// обновление страницы 
}

function styleLibs(){
	return src('node_modules/swiper/swiper-bundle.min.css')
		.pipe(concat('libs.css'))
    	.pipe(dest('./app/css/'))//куда все складавать
}

function scripts () {
	src('./src/js/plugins/**.js')
		.pipe(concat('plugins.js'))
		.pipe(dest('./app/js/'))
  	return src(
    	['./src/js/functions/**.js', './src/js/components/**.js', './src/js/main.js'])
	   	.pipe(sourcemaps.init()) //мапим все файлы (иницилизируем). мапинг позволяет определить файл где находится св-во
		.pipe(babel({ //преобразуем в код понятный для всех браузеров
				presets: ['@babel/env']
			}))
	    .pipe(concat('main.js'))
	   	.pipe(uglify()) //минифицуруем код
	    .pipe(sourcemaps.write('.'))// source map запишется отдельным файлом в той же папке, что и основной файл, в формате main.min.css.map и scripts.min.js.map.
	    .pipe(dest('./app/js'))
	    .pipe(browserSync.stream());
}

function scriptLibs(){
	return src('node_modules/swiper/swiper-bundle.min.js')
		.pipe(concat('libs.js'))
    	.pipe(dest('./app/js/'))//куда все складавать
}

function imagesWebp (){
	return src(['./src/img/**/*.{jpg,png,jpeg}', 
				'!./src/img/bg/**/*.*'
				]) //берем данные из исходника
		.pipe(
			webp({
				quality: 70
			})
		)
		.pipe(dest('app/img'))
		.pipe(browserSync.stream()); //запуск сервера
}

function images(){
	return src([
		'./src/img/*.{jpg,jpeg,png,svg,webp}',
		'./src/img/**/*.{jpg,jpeg,png,webp}'
		])
		.pipe(imagemin([
    		imagemin.gifsicle({interlaced: true}),
    		imagemin.mozjpeg({quality: 75, progressive: true}),
    		imagemin.optipng({optimizationLevel: 5}),
    		imagemin.svgo({
        	
        	plugins: [
	            {removeViewBox: true},
	            {cleanupIDs: false}
        		]
    		})
		]))
		.pipe(dest('app/img')) //куда все складавать
		.pipe(browserSync.stream()); //запуск сервера
}

//sprite svg
function svgSprit(){
	return src('./src/img/svg/**.svg')
    .pipe(svgSprite({
      mode: {
        stack: {
          sprite: "../sprite.svg" //sprite file name
        }
      },
    }))
    .pipe(dest('./app/img'))
    .pipe(browserSync.stream()); //запуск сервера
}

function resources(){ //перекидываем разные файлы с которыми ничего делать не нужно (php favicon)
	return src('./src/resources/**/*.*')
		.pipe(dest('./app/resources'));
}

function fonts(){
	src('./src/fonts/**.ttf')
			.pipe(ttf2woff()) //пееводим ttf --> woff
			.pipe(dest('./app/fonts/'))
		return src ('./src/fonts/**.ttf')
			.pipe(ttf2woff2()) //пееводим ttf --> woff2
			.pipe(dest('./app/fonts/'));
}

function watchFiles(){
	watch('./src/index.html', html);
	watch('./src/partHTML/**/*.html', html);
	watch('./src/scss/**/*.scss', styles); // следит за файлами по этому пути и выполняет ф-цию если будут измеенения
	watch('./src/js/**/*.js', scripts);
	watch('./src/img/**/*.{jpg,png,jpeg}', imagesWebp);
	watch('./src/img/*.{jpg,jpeg,png,svg,webp}', images);
	watch('./src/img/**/*.{jpg,jpeg,png,webp}', images);
	watch('./src/img/svg/**/*.*', svgSprit);
	watch('./src/resources/**/*.*', resources);
	watch('./src/fonts/**/*.ttf', fonts);
}

exports.html = html;
exports.styles = styles;
exports.scripts = scripts;

exports.watchFiles = watchFiles;
exports.browsersync = browsersync;
exports.default = series(cleanApp, imagesWebp, images, parallel(html, styles, styleLibs, scripts, scriptLibs, svgSprit, fonts, resources, watchFiles, browsersync));