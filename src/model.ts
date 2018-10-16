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
    typeof face.texture === 'string' &&
    face.texture.length >= 2 &&
    face.texture[0] === '#'
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
  let faceCount

  return (
    element &&
    isArrayVector3(element.from) &&
    isArrayVector3(element.to) &&
    element.faces &&
    (faceCount = Object.keys(element.faces).length) >= 1 &&
    faceCount <= 6 &&
    [
      element.faces.down, element.faces.up,
      element.faces.north, element.faces.south,
      element.faces.west, element.faces.east
    ]
      .every((face: any) =>
        face === undefined || isMinecraftModelFace(face)
      )
  )
}

export interface MinecraftModel {
  textures: { [name: string]: string }
  elements: MinecraftModelElement[]
}

export function isMinecraftModel (model: any): model is MinecraftModel {
  return (
    model &&
    model.textures &&
    Object.entries(model.textures).every(([name, texture]) =>
      typeof name === 'string' && typeof texture === 'string'
    ) &&
    Array.isArray(model.elements) &&
    model.elements.every(isMinecraftModelElement)
  )
}
