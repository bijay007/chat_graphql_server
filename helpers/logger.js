// simple db operations log viewer
import chalk from 'chalk';

const dbLogger = (operationName, error, data) => {
  if (error) {
    console.log(`Error when ${chalk.red.bold(operationName)}`, chalk.magenta(err))
  }
  console.log(`${chalk.green.bold(operationName)} was successful: `, chalk.magenta(data))
}

export default dbLogger;
