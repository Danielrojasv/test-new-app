import * as gulp from "gulp";
import * as clean from "gulp-clean";
import * as ts from "gulp-typescript";
let tsProject = ts.createProject("tsconfig.json");

gulp.task('clean', () =>
    gulp.src('dist/*', {
        read: false
    })
    .pipe(clean())
);
gulp.task('build', () =>
    tsProject.src()
    .pipe(tsProject())
    .js.pipe(gulp.dest("dist"))
);