// gulp'u dahil edelim
var gulp = require('gulp');

// eklentileri dahil edelim
var uglify  = require('gulp-uglify');
var concat  = require('gulp-concat');
var sass = require('gulp-sass');
var autoprefix = require('gulp-autoprefixer');

// Sass dosyalarının bulunduğu klasör
var sassDir = 'sass';

// CSS dosyalarının bulunduğu klasör
var CSSDir = 'css';

// JS dosyalarının bulunduğu klasör
var JSDir = 'js';

var JSFiles = [
              JSDir + "/src/jquery.min.js",
              JSDir + "/src/script.js"
            ];

var sassFiles = [
              sassDir + "/style.sass"
            ];

// Sass dosyalarını işler, browser uyumluluğu sağlar,
// ve oluşturulan CSS dosyasını CSS klasörüne kaydeder.
gulp.task('css', function () {
    return gulp.src(sassFiles)
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(autoprefix('last 15 version'))
        .pipe(gulp.dest(CSSDir));
});

// JS dosyalarını sıkıştırır
// ve hepsini birleştirerek JS klasörüne kaydeder.
gulp.task('js', function () {
    gulp.src(JSFiles)
        .pipe(uglify())
        .pipe(concat('all.js'))
        .pipe(gulp.dest(JSDir));
});

// İzlemeye alınan işlemler
gulp.task('watch', function () {
    // sass klasöründeki tüm dosya değişikliklerini izler ve css taskını çalıştırır.
    gulp.watch(sassDir + '/*.sass', ['css']);
    // belirlenen JS dosyalardaki değişikleri izler ve js taskını çalıştırır.
    gulp.watch(JSFiles, ['js']);
});

// Gulp çalıştığı anda yapılan işlemler
gulp.task('default', ['css', 'js', 'watch']);