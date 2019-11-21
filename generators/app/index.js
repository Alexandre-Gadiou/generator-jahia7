'use strict';

var Generator = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = class extends Generator {

  constructor(args, opts) {
    super(args, opts);
  }
  
  prompting() {

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
      default : '7.3.3.0'
    }
    ];

    return this.prompt(prompts).then(props => {
      this.projectName = props.projectName;
      this.projectDescription = props.projectDescription;
      this.projectGroupID = props.projectGroupID;
      this.projectArtifactID = props.projectArtifactID;
      this.jahiaVersion = props.jahiaVersion;
    });
   
  }

  writing() {
    const templateData = {
      projectName: this.projectName,
      projectDescription: this.projectDescription,
      projectGroupID: this.projectGroupID,
      projectArtifactID: this.projectArtifactID,
      jahiaVersion: this.jahiaVersion,
    };

    const copy = (input, output) => {
      this.fs.copy(this.templatePath(input), this.destinationPath(output));
    };

    const copyTpl = (input, output, data) => {
      this.fs.copyTpl(
        this.templatePath(input),
        this.destinationPath(output),
        data
      );
    };

    copyTpl('package.json','package.json',templateData);
    copyTpl('Gulpfile.js','Gulpfile.js',templateData);
    copyTpl('jahia-template/pom.xml','pom.xml',templateData);
    copyTpl('jahia-template/.gitignore','.gitignore',templateData);

    copy('app/pages','src/main/html/pages');
    copy('app/components','src/main/html/components');
    copy('app/content','src/main/html/content');
    copy('app/layouts','src/main/html/layouts');
    copy('app/partials','src/main/html/partials');
    copy('app/assets/images','src/main/resources/images');
    copy('app/assets/javascript','src/main/resources/javascript');
    copy('app/assets/sass','src/main/resources/sass');
    copy('app/assets/fonts','src/main/resources/fonts');

    copyTpl('jahia-template/src/main/import/repository.xml','src/main/import/repository.xml',templateData);
    copy('jahia-template/src/main/resources/common/declarations.jspf','src/main/resources/common/declarations.jspf');
    copy('jahia-template/src/main/resources/jnt_template/html/template.projectName.jsp','src/main/resources/jnt_template/html/template.'+this.projectArtifactID+'.jsp');
    copy('jahia-template/src/main/resources/META-INF/definitions.cnd','src/main/resources/META-INF/definitions.cnd');
    copy('jahia-template/src/main/resources/META-INF/projectName.tld','src/main/resources/META-INF/'+this.projectArtifactID+'.tld');
    copy('jahia-template/src/main/resources/META-INF/spring/projectName.xml','src/main/resources/META-INF/spring/'+this.projectArtifactID+'.xml');
    copy('jahia-template/src/main/resources/resources/projectName.properties','src/main/resources/resources/'+this.projectArtifactID+'.properties');
    copy('jahia-template/src/site/site.xml','src/site/site.xml');
    copy('jahia-template/src/site/apt/index.apt','src/site/apt/index.apt');
  }

  install() {
    this.installDependencies({
      npm: true,
      bower: false,      
    });
  }
 
};