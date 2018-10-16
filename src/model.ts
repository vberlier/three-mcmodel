export type ArrayVector3 = [number, number, number]

export function isArrayVector3 (arrayVector: any): arrayVector is ArrayVector3 {
  return (
    Array.isArray(arrayVector) &&
    arrayVector.length === 3 &&
    arrayVector.every(coordinate => typeof coordinate === 'number')
  )
}

export interface MinecraftModelFace {
  texture: string
}

export function isMinecraftModelFace (face: any): face is MinecraftModelFace {
  return (
    face &&
    typeof face.texture === 'string'
  )
}

export interface MinecraftModelElement {
  from: ArrayVector3
  to: ArrayVector3
  faces: {
    down?: MinecraftModelFace,
    up?: MinecraftModelFace,
    north?: MinecraftModelFace,
    south?: MinecraftModelFace,
    west?: MinecraftModelFace,
    east?: MinecraftModelFace
  }
}

export function isMinecraftModelElement (element: any): element is MinecraftModelElement {
  return (
    element &&
    isArrayVector3(element.from) &&
    isArrayVector3(element.to) &&
    element.faces &&
    (element.faces.down === undefined || isMinecraftModelFace(element.faces.down)) &&
    (element.faces.up === undefined || isMinecraftModelFace(element.faces.up)) &&
    (element.faces.north === undefined || isMinecraftModelFace(element.faces.north)) &&
    (element.faces.south === undefined || isMinecraftModelFace(element.faces.south)) &&
    (element.faces.west === undefined || isMinecraftModelFace(element.faces.west)) &&
    (element.faces.east === undefined || isMinecraftModelFace(element.faces.east))
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
