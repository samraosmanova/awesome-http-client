#!/usr/bin/env node
import axios from "axios"
import chalk from "chalk"

const validMethods = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'];

const args = process.argv.slice(2);

if (args.length < 2 || !validMethods.includes(args[0].toUpperCase())) {
  console.error(chalk.red.bold('awesome-http-client <method> <url> -h <headers...> -b <body>'));
  console.error(chalk.blue('Valid methods:', validMethods.join(', ')));
  process.exit(1);
}

const method = args[0].toUpperCase();
const url = args[1];
const headers = {};
let body;

const headerRegex = /-h\s+(.*?)(?=-b|-h|$)/gm;
const bodyRegex = /-b\s+(.*?)(?=-h|$)/;

let headerMatch;

while ((headerMatch = headerRegex.exec(args.join(' '))) !== null) {
  const [_, header] = headerMatch;
  const [key, value] = header.split(':');
  headers[key.trim()] = value.trim();
}

const bodyMatch = args.join(' ').match(bodyRegex);
if (bodyMatch) {
  body = bodyMatch[1];
}

axios({
  method,
  url,
  headers,
  data: body,
})
  .then(response => {
    console.log(chalk.blue('Status Code:'), response.status);
    console.log(chalk.blue('Response Body:'), chalk.green(JSON.stringify(response.data, null, 2)));
  })
  .catch(error => {
    console.error("💥", chalk.bold.red('Error:'), chalk.red(error.message));
  });