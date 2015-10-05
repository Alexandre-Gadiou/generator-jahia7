'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({

  prompting: function () {
    var done = this.async();

    this.log(yosay(chalk.green('Jahia7 template project generator')));

    var prompts = [
    {
      type: 'input',
      name: 'projectName',
      message: 'Project name',
      default : this.appname // Default to current folder name
    },
    {
      type: 'input',
      name: 'projectDescription',
      message: 'Project description'
    },
    {
      type: 'input',
      name: 'projectGroupID',
      message: 'Project Group ID',
      default : 'com.company.jahia'
    },
    {
      type: 'input',
      name: 'projectArtifactID',
      message: 'Project ArtifactID',
      default : this.appname.toString().toLowerCase()
        .replace(/\s+/g, '')           // Replace spaces with -
        .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
        .replace(/\-\-+/g, '')         // Replace multiple - with single -
        .replace(/^-+/, '')             // Trim - from start of text
        .replace(/-+$/, '')     
    },
    {
      type: 'input',
      name: 'jahiaVersion',
      message: 'Jahia version',
      default : '7.0.0.2'
    }
    ];

    this.prompt(prompts, function (props) {
      
    this.projectName = props.projectName;
    this.projectDescription = props.projectDescription;
    this.projectGroupID = props.projectGroupID;
    this.projectArtifactID = props.projectArtifactID;
    this.jahiaVersion = props.jahiaVersion;

      done();
    }.bind(this));
  },

  writing: {
    projectFiles: function () {
      this.template('package.json','package.json');
      this.template('bower.json','bower.json');
      this.template('Gruntfile.js','Gruntfile.js');
      this.template('jahia-template/pom.xml','pom.xml');
      this.template('jahia-template/.gitignore','.gitignore');
    },

    prototypeFiles: function () {
      this.fs.copy(
        this.templatePath('app/pages'),
        this.destinationPath('src/main/html/pages')
      );
      this.fs.copy(
        this.templatePath('app/components'),
        this.destinationPath('src/main/html/components')
      );
      this.fs.copy(
        this.templatePath('app/content'),
        this.destinationPath('src/main/html/content')
      );
      this.fs.copy(
        this.templatePath('app/layouts'),
        this.destinationPath('src/main/html/layouts')
      );
      this.fs.copy(
        this.templatePath('app/partials'),
        this.destinationPath('src/main/html/partials')
      );

      this.fs.copy(
        this.templatePath('app/assets/images'),
        this.destinationPath('src/main/resources/images')
      );
      this.fs.copy(
        this.templatePath('app/assets/javascript'),
        this.destinationPath('src/main/resources/javascript')
      );
      this.fs.copy(
        this.templatePath('app/assets/sass'),
        this.destinationPath('src/main/resources/sass')
      );
      this.fs.copy(
        this.templatePath('app/assets/fonts'),
        this.destinationPath('src/main/resources/fonts')
      );
       this.fs.copy(
        this.templatePath('app/assets/vendor'),
        this.destinationPath('src/main/resources/vendor')
      );
    },

    jahiaFiles: function () {
      this.template('jahia-template/src/main/import/repository.xml','src/main/import/repository.xml');
      this.fs.copy(
        this.templatePath('jahia-template/src/main/resources/common/declarations.jspf'),
        this.destinationPath('src/main/resources/common/declarations.jspf')
      );
      this.fs.copy(
        this.templatePath('jahia-template/src/main/resources/jnt_template/html/template.projectName.jsp'),
        this.destinationPath('src/main/resources/jnt_template/html/template.'+this.projectArtifactID+'.jsp')
      );
      this.fs.copy(
        this.templatePath('jahia-template/src/main/resources/META-INF/definitions.cnd'),
        this.destinationPath('src/main/resources/META-INF/definitions.cnd')
      );
      this.fs.copy(
        this.templatePath('jahia-template/src/main/resources/META-INF/projectName.tld'),
        this.destinationPath('src/main/resources/META-INF/'+this.projectArtifactID+'.tld')
      );
      this.fs.copy(
        this.templatePath('jahia-template/src/main/resources/META-INF/spring/projectName.xml'),
        this.destinationPath('src/main/resources/META-INF/spring/'+this.projectArtifactID+'.xml')
      );
      this.fs.copy(
        this.templatePath('jahia-template/src/main/resources/resources/projectName.properties'),
        this.destinationPath('src/main/resources/resources/'+this.projectArtifactID+'.properties')
      );
      this.fs.copy(
        this.templatePath('jahia-template/src/site/site.xml'),
        this.destinationPath('src/site/site.xml')
      );
      this.fs.copy(
        this.templatePath('jahia-template/src/site/apt/index.apt'),
        this.destinationPath('src/site/apt/index.apt')
      );
    }
  },

  install: function () {
    this.installDependencies();
  }

});
