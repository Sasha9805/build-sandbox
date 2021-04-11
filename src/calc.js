export default class Calc {

  add(...args) {
    return args.reduce((prev, current) => prev + current, 0)
  }

}