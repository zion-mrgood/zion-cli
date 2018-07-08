const path = require('path');
const inquirer = require('inquirer');
const which = require('which');
const fs = require('fs-extra');
const exists = require('fs').existsSync;
const download = require('download-git-repo');
const shell = require('shelljs');
const cwd = process.cwd();

const { Tip, Error, Success, Warn } = require('./util/chalkTool');
const { spinnerTool } = require('./util/spinnerTool')

const ORIGIN = 'sunjayking';
const PROJECTNAME = 'zionProject';

// 检查npm环境
function findNpm() {
  const npms = ['tnpm', 'cnpm', 'npm'];
  for (var i = 0; i < npms.length; i++) {
    try {
      which.sync(npms[i]);
      return npms[i];
    } catch (e) {
    }
  }
  throw new Error('please install npm');
}

module.exports = function (args) {
  // Step 1 => 输入项目名称，选择项目模板类型
  const question = [
    {
      type: 'input',
      name: 'name',
      message: Tip('Input project name:'),
    },
    {
      type: 'list',
      name: 'type',
      message: Tip('Choose a type of project'),
      choices: [
        {
          name: '001-Pure',
          value: 'pure'
        },
        {
          name: '002-Mobile/React',
          value: 'mobile-react'
        },
        {
          name: '003-Admin/React',
          value: 'admin-react'
        },
      ],
    }
  ];
  inquirer.prompt(question).then( answers => {
    // Step 2 => 提示安装信息，确认后开始执行
    const confirms = [{
      type: 'confirm',
      name: 'confirms',
      message: Tip('create now?')
    }]
    
    inquirer.prompt(confirms).then( answer=> {
      if (!answer.confirms) return;
      
      const projectName = answers.name || PROJECTNAME;
      const branch = answers.type;
      
      if (exists(path.join(cwd, projectName))) {
        Warn(`<${projectName}> is already exists`);
        return;
      }
      
      const spinner = new spinnerTool();
      spinner.text('downloading...').start();
      
      download(`${ORIGIN}/${branch}`, path.join(cwd, projectName), { clone: false }, err => {
        if (err) {
          spinner.fail(`Failed to download repo https://github.com/${ORIGIN}/${branch}`, err);
          return;
        }
        
        spinner.success(`Success to download repo https://github.com/${ORIGIN}/${branch}`);
        
        const npm = findNpm();
        
        spinner.text('npm install...').start();
        
        shell.exec(`cd ${path.join(cwd, projectName)} && ${npm} install`, () => {
          spinner.success(`project ${projectName} create success\nVisit https://github.com/sunjayking/doc/${branch} to learn more.`);
        });
      })
    })
  })
};