interface interfaceName {
  [field: string]: any
  attribute: any
  method: (params: any) => void
}

class ClassName implements interfaceName {
  public readonly attribute = ''

  method (params: any): void {

  }
}

export const obj = new ClassName()
