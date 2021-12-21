import { colors } from "./deps.ts";

type Fcn = (str: string) => string;

export class Console {
  constructor(private filename: string = "./logs.txt") {
  }

  protected log(msg: string, type: string, ...functions: Fcn[]) {
    const text = `[${type.toUpperCase()}]${" ".repeat(8 - type.length)}\t${new Date().toISOString()}\t${msg}`;
    console.log(functions.reduce((acc: string, fcn: Fcn) => fcn(acc), text));
    Deno.writeTextFileSync(this.filename, `${text}\r\n`, {
      append: true,
      create: true
    })
  }

  error(msg: string) {
    this.log(msg, "Error", colors.red);
  }

  critical(msg: string) {
    this.log(msg, "Critical", colors.bold, colors.red);
  }

  ok(msg: string) {
    this.log(msg, "Ok", colors.green);
  }

  info(msg: string) {
    this.log(msg, "Info", colors.blue);
  }

  debug(msg: string) {
    this.log(msg, "Debug", colors.gray);
  }

  warning(msg: string) {
    this.log(msg, "Warning", colors.yellow);
  }
}