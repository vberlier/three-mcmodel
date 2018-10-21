import { BufferGeometry, Float32BufferAttribute, Uint16BufferAttribute } from 'three'

import { MinecraftModel, MinecraftModelFaceName, ArrayVector3, ArrayVector4, TextureRotationAngle } from './model'

type FaceVertexMap = [ArrayVector3, ArrayVector3, ArrayVector3, ArrayVector3]

const vertexMaps: {
  [name in MinecraftModelFaceName]: FaceVertexMap
} = {
  west: [[0, 0, 0], [0, 1, 0], [0, 1, 1], [0, 0, 1]],
  east: [[1, 0, 1], [1, 1, 1], [1, 1, 0], [1, 0, 0]],
  down: [[0, 0, 0], [0, 0, 1], [1, 0, 1], [1, 0, 0]],
  up: [[0, 1, 1], [0, 1, 0], [1, 1, 0], [1, 1, 1]],
  north: [[1, 0, 0], [1, 1, 0], [0, 1, 0], [0, 0, 0]],
  south: [[0, 0, 1], [0, 1, 1], [1, 1, 1], [1, 0, 1]]
}

function getRotatedVertexMap (rotation: TextureRotationAngle, [a, b, c, d]: FaceVertexMap) {
  return (
    rotation === 0 ? [a, b, c, d] :
    rotation === 90 ? [b, c, d, a] :
    rotation === 180 ? [c, d, a, b] :
    [d, a, b, c]
  ) as FaceVertexMap
}

function getGeneratedUvs (faceName: MinecraftModelFaceName, [x1, y1, z1]: ArrayVector3, [x2, y2, z2]: ArrayVector3) {
  return (
    faceName === 'west' ? [z1, 16 - y2, z2, 16 - y1] :
    faceName === 'east' ? [16 - z2, 16 - y2, 16 - z1, 16 - y1] :
    faceName === 'down' ? [x1, 16 - z2, x2, 16 - z1] :
    faceName === 'up' ? [x1, z1, x2, z2] :
    faceName === 'north' ? [16 - x2, 16 - y2, 16 - x1, 16 - y1] :
    [x1, 16 - y2, x2, 16 - y1]
   ) as ArrayVector4
}

function computeNormalizedUvs (uvs: ArrayVector4) {
  return uvs.map((coordinate, i) =>
    (i % 2 ? 16 - coordinate : coordinate) / 16
  ) as ArrayVector4
}

export class MinecraftModelGeometry extends BufferGeometry {
  constructor (model: MinecraftModel) {
    super()
    const { vertices, uvs, indices } = MinecraftModelGeometry.computeAttributes(model)

    this.addAttribute('position', new Float32BufferAttribute(vertices, 3))
    this.addAttribute('uv', new Float32BufferAttribute(uvs, 2))
    this.setIndex(new Uint16BufferAttribute(indices, 1))
  }

  public static computeAttributes (model: MinecraftModel) {
    const vertices = []
    const uvs = []
    const indices = []

    for (const element of model.elements) {
      const { from, to } = element
      const centeredCoordinates = from.concat(to).map(coordinate => coordinate - 8)

      for (const name in element.faces) {
        const faceName = name as MinecraftModelFaceName
        const face = element.faces[faceName]

        const i = vertices.length / 3
        indices.push(i, i + 2, i + 1)
        indices.push(i, i + 3, i + 2)

        for (const vertexMap of getRotatedVertexMap(face.rotation || 0, vertexMaps[faceName])) {
          vertices.push(...vertexMap.map((v, i) => centeredCoordinates[v * 3 + i]))
        }

        const faceUvs = face.uv || getGeneratedUvs(faceName, from, to)
        const [u1, v1, u2, v2] = computeNormalizedUvs(faceUvs)

        uvs.push(u1, v2)
        uvs.push(u1, v1)
        uvs.push(u2, v1)
        uvs.push(u2, v2)
      }
    }

    return { vertices, uvs, indices }
  }
}
