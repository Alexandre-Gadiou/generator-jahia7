'use strict';
module.exports = function (grunt) {

    grunt.loadNpmTasks('grunt-ejs');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-browser-sync');

    var srcFolder = 'src/main/resources/';
    var htmlFolder = 'src/main/html/';
    var distFolder = 'src/main/html/dist/';

    grunt.initConfig({

        clean: [distFolder ,".sass-cache"],

        sass: {
            options: {
                sourcemap: 'none'
            },
            dist: {
                files: {
                    'src/main/resources/css/theme.css': 'src/main/resources/sass/theme.scss'
                }
            }
        },

        cssmin: {
           dist: {
              files: {
                 'src/main/resources/css/theme.min.css': ['src/main/resources/css/theme.css']
              }
          }
        },


        concat: {
            dist: {
              src: ['src/main/resources/javascript/**/*.js','!src/main/resources/javascript/main.js','!src/main/resources/javascript/main.min.js'],
              dest: 'src/main/resources/javascript/main.js',
            },
        },

        uglify: {
            dist: {
              files: {
                'src/main/resources/javascript/main.min.js': 'src/main/resources/javascript/main.js'
              }
            }
        },

        ejs: {
            all: {
              src: ['src/main/html/pages/*.ejs'],
              dest: 'src/main/html/dist',
              expand: true,
              flatten: true,
              ext: '.html'
            },
        },

        copy: {

          css: {
            files: [
              {expand: true, cwd: 'src/main/resources/css', src: ['**/*'], dest: 'src/main/html/dist/css'},
            ],
          },
          javascript: {
            files: [
              {expand: true, cwd: 'src/main/resources/javascript', src: ['**/*'], dest: 'src/main/html/dist/javascript'},
            ],
          },
          images: {
            files: [
              {expand: true, cwd: 'src/main/resources/images', src: ['**/*'], dest: 'src/main/html/dist/images'},
            ],
          },
          fonts: {
            files: [
              {expand: true, cwd: 'src/main/resources/fonts', src: ['**/*'], dest: 'src/main/html/dist/fonts'},
            ],
          },
          vendor: {
            files: [
              {expand: true, cwd: 'bower_components', src: ['**/*'], dest: 'src/main/html/dist/vendor'},
              {expand: true, cwd: 'bower_components', src: ['**/*'], dest: 'src/main/resources/vendor'}
            ],
          },
        },

        browserSync: {
            bsFiles: {
                src : [
                    'src/main/html/dist/css/*.css',
                    'src/main/html/dist/*.html'
                ]
            },
            options: {
                watchTask: true,
                server: 'src/main/html/dist'
            }
        },

        watch: {
          html: {
            files: ['src/main/html/**/*.ejs'],
            tasks: ['buildHTML'],
          },
          images: {
            files: ['src/main/resources/images/**/*'],
            tasks: ['buildImages'],
          },
          fonts: {
            files: ['src/main/resources/fonts/**/*'],
            tasks: ['buildFonts'],
          },
          css: {
            files: ['src/main/resources/sass/**/*.scss'],
            tasks: ['buildCSS'],
          },

          scripts: {
            files: ['src/main/resources/javascript/**/*.js'],
            tasks: ['buildJS'],
          },
        },


    });
    
    grunt.registerTask('buildHTML', ['ejs']);
    grunt.registerTask('buildImages', ['copy:images']);
    grunt.registerTask('buildFonts', ['copy:fonts']);
    grunt.registerTask('buildVendor', ['copy:vendor']);
    grunt.registerTask('buildCSS', ['sass','copy:css']);
    grunt.registerTask('buildJS', ['concat','copy:javascript']);

    grunt.registerTask('build', ['clean','buildHTML','buildCSS', 'buildJS','buildImages','buildFonts','buildVendor']);
    grunt.registerTask('default', ['build','browserSync','watch']);
    grunt.registerTask('release', ['build', 'uglify','cssmin']);



};