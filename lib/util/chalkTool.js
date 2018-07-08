const chalk = require('chalk');

module.exports = {
  Tip : (...props) => chalk.cyan(...props),
  Error : (...props) => chalk.red(...props),
  Success : (...props) => chalk.green(...props),
  Warn: (...props) => console.log(chalk.bgRed(' ERROR '),chalk.red(...props))
}