export function applyMixins (className: any, extendsThis: any[]): any {
  extendsThis.forEach((extendsThisClassName): any => {
    Object.getOwnPropertyNames(extendsThisClassName.prototype).forEach((name): any => {
      Object.defineProperty(
        className.prototype, name, Object.getOwnPropertyDescriptor(extendsThisClassName.prototype, name) as PropertyDescriptor
      )
    }
    )
  })
}
