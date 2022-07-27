let gulp = require('gulp'),
    sass = require('gulp-sass')(require('sass')),
    browserSync = require('browser-sync'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    del = require('del'),
    autoprefixer = require('gulp-autoprefixer');   


// ================================================================================================================================


    // Слежение за html файлами, обновление страницы при изменении
gulp.task('html', function(){
    return gulp.src('app/*.html')
        .pipe(browserSync.reload({stream: true}));
});

    // Компиляция scss файлов в css, добавить суффикс 'min' (т.к. минифицирован) затем обновлять страницу при измении
gulp.task('scss', function(){
    return gulp.src('app/scss/**/*.scss')
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(autoprefixer({
            browsers: ['last 8 versions']
        }))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({stream: true}));
});

    // Добавление и объеденение css библиотек в один файл
gulp.task('css', function(){
    return gulp.src([
        'node_modules/reset-css/reset.css'
    ])
    .pipe(concat('_libs.scss'))
    .pipe(gulp.dest('app/scss'))
    .pipe(browserSync.reload({stream: true}));
});

    // Слежение за js файлами, обновление страницы при изменении
gulp.task('script', function(){
    return gulp.src('app/js/*.js')
        .pipe(browserSync.reload({stream: true}));
});

    // Объеденение всех JS библиотек в один файл (concat), затем минификация (uglify), выгрузка в папку js и обновление страницы после изменения
// gulp.task('jsLibs', function(){
//     return gulp.src([
//         'node_modules/.../..'
//     ])
//         .pipe(concat('libs.min.js'))
//         .pipe(uglify())
//         .pipe(gulp.dest('app/scripts'))
//         .pipe(browserSync.reload({stream: true}));
// });

    // Объеденение всех JS файлов в один файл (main.min.js), затем минификация (uglify), выгрузка в папку js и обновление страницы после изменения
gulp.task('js', function(){
    return gulp.src([
        'app/js/search.js'
    ])
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('app/scripts'))
    .pipe(browserSync.reload({stream: true}));
});




// ================================================================================================================================


    // Обновление страницы после изменения в проекте
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "app/"
        }
    });
});


// ================================================================================================================================

    // Удаляем папку с конечным продуктом, перед новой выгрузкой
gulp.task('clean', async function(){
    del.sync('dist');
});

    // Выгрузка конечного продукта в папку dist 
gulp.task('exportProject', function(){
    let buildHTML = gulp.src('app/**/*.html')
        .pipe(gulp.dest('dist'));
    
    let buildCSS = gulp.src('app/css/**/*.css')
        .pipe(gulp.dest('dist/css'));

    let buildJS = gulp.src('app/scripts/**/*.js')
        .pipe(gulp.dest('dist/js'));
        
    let buildFonts = gulp.src('app/fonts/**/*.*')
        .pipe(gulp.dest('dist/fonts'));

    let buildImg = gulp.src('app/img/**/*.*')
        .pipe(gulp.dest('dist/img'));
});


    // Общая таска, которая перед выгрузкой конечного продукта удаляет не актуальную папку dist, а затем компилирует актуальную.
gulp.task('build', gulp.series('clean', 'exportProject'));


// ================================================================================================================================


    // Слежение за файлами, с подследующим запуском таски после изменения
gulp.task('watch', function(){
    gulp.watch('app/scss/**/*.scss', gulp.parallel('scss'));
    gulp.watch('app/*.html', gulp.parallel('html'));
    gulp.watch('app/js/*.js', gulp.series('script', 'js'));
});

    // дефолтный таск, который запускает поочередно плагины и создает live server
gulp.task('default', gulp.parallel('css', 'js', 'scss', 'browser-sync', 'watch'));

