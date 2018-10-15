export type ArrayVector3 = [number, number, number]

export function isArrayVector3 (arrayVector: any): arrayVector is ArrayVector3 {
  return (
    Array.isArray(arrayVector) &&
    arrayVector.length === 3 &&
    arrayVector.every(coordinate => typeof coordinate === 'number')
  )
}

export interface MinecraftModelElement {
  from: ArrayVector3
  to: ArrayVector3
}

export function isMinecraftModelElement (element: any): element is MinecraftModelElement {
  return (
    element &&
    isArrayVector3(element.from) &&
    isArrayVector3(element.to)
  )
}

export interface MinecraftModel {
  elements: MinecraftModelElement[]
}

export function isMinecraftModel (model: any): model is MinecraftModel {
  return (
    model &&
    Array.isArray(model.elements) &&
    model.elements.every(isMinecraftModelElement)
  )
}
