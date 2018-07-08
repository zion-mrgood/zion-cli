const ora = require('ora');
const { Tip, Error, Success } = require('./chalkTool');

function spinnerTool(color='cyan'){
  const spinner = ora();
  spinner.color = color;
  spinner.spinner = {
    interval: 80,
    frames: [
      '---------',
      '>--------',
      '>>-------',
      '>>>------',
      '>>>>-----',
      '>>>>>----',
      '>>>>>>---',
      '>>>>>>>--',
      '>>>>>>>>-',
      '>>>>>>>>>',
      '|>>>>>>>>',
      '||>>>>>>>',
      '|||>>>>>>',
      '||||>>>>>',
      '|||||>>>>',
      '||||||>>>',
      '|||||||>>',
      '||||||||>',
      '|||||||||',
      '-||||||||',
      '--|||||||',
      '---||||||',
      '----|||||',
      '-----||||',
      '------|||',
      '-------||',
      '--------|',
    ]
  };
  this.spinner = spinner;
}

/**
 * @desc start 开始
*/
spinnerTool.prototype.start = function(){
  this.spinner.start();
}
  
/**
 * @desc text 修改文本 支持链式
*/
spinnerTool.prototype.text = function(...props){
  this.spinner.text = Tip(...props);
  return this;
}

/**
 * @desc success 成功
*/
spinnerTool.prototype.success = function(...props){
  this.spinner.succeed(Success(...props));
  this.spinner.clear();
}

/**
 * @desc fail 失败
*/
spinnerTool.prototype.fail = function(...props){
  this.spinner.fail(Error(...props));
  this.spinner.clear();
}

/**
 * @desc fail 清除实例
*/
spinnerTool.prototype.clear = function(){
  this.spinner.clear();
}

module.exports = {
  spinnerTool
}