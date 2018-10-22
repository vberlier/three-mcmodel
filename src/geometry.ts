import {
  BufferGeometry, Matrix3, Vector3,
  Float32BufferAttribute, Uint16BufferAttribute
} from 'three'

import {
  MinecraftModel, ArrayVector3, ArrayVector4,
  MinecraftModelFaceName, TextureRotationAngle, MinecraftModelElementRotation
} from './model'

const vertexMaps: {
  [name in MinecraftModelFaceName]: ArrayVector4
} = {
  west: [0, 1, 2, 3],
  east: [4, 5, 6, 7],
  down: [0, 3, 4, 7],
  up: [2, 1, 6, 5],
  north: [7, 6, 1, 0],
  south: [3, 2, 5, 4]
}

function applyVertexMapRotation (rotation: TextureRotationAngle, [a, b, c, d]: ArrayVector4) {
  return (
    rotation === 0 ? [a, b, c, d] :
    rotation === 90 ? [b, c, d, a] :
    rotation === 180 ? [c, d, a, b] :
    [d, a, b, c]
  ) as ArrayVector4
}

function getCornerVertices (from: ArrayVector3, to: ArrayVector3, rotation?: MinecraftModelElementRotation) {
  const [x1, y1, z1, x2, y2, z2] = from.concat(to).map(coordinate => coordinate - 8)

  const corners = [
    [x1, y1, z1],
    [x1, y2, z1],
    [x1, y2, z2],
    [x1, y1, z2],
    [x2, y1, z2],
    [x2, y2, z2],
    [x2, y2, z1],
    [x2, y1, z1]
  ] as ArrayVector3[]

  if (rotation) {
    const origin = new Vector3()
      .fromArray(rotation.origin)
      .subScalar(8)

    const angle = rotation.angle / 180 * Math.PI
    const scale = rotation.rescale ? Math.SQRT2 / Math.sqrt(Math.cos(angle || Math.PI / 4)**2 * 2) : 1
    const cos = Math.cos(angle) * scale
    const sin = Math.sin(angle) * scale
    const matrix = new Matrix3()

    if (rotation.axis == 'x') {
      matrix.set(
        1, 0, 0,
        0, cos, -sin,
        0, sin, cos
      )
    } else if (rotation.axis == 'y') {
      matrix.set(
        cos, 0, sin,
        0, 1, 0,
        -sin, 0, cos
      )
    } else {
      matrix.set(
        cos, -sin, 0,
        sin, cos, 0,
        0, 0, 1
      )
    }

    for (let i = 0; i < corners.length; i++) {
      corners[i] = new Vector3()
        .fromArray(corners[i])
        .sub(origin)
        .applyMatrix3(matrix)
        .add(origin)
        .toArray() as ArrayVector3
    }
  }

  return corners
}

function generateDefaultUvs (faceName: MinecraftModelFaceName, [x1, y1, z1]: ArrayVector3, [x2, y2, z2]: ArrayVector3) {
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
      const { from, to, rotation } = element
      const cornerVertices = getCornerVertices(from, to, rotation)

      for (const name in element.faces) {
        const faceName = name as MinecraftModelFaceName
        const face = element.faces[faceName]

        const i = vertices.length / 3
        indices.push(i, i + 2, i + 1)
        indices.push(i, i + 3, i + 2)

        for (const index of applyVertexMapRotation(face.rotation || 0, vertexMaps[faceName])) {
          vertices.push(...cornerVertices[index])
        }

        const faceUvs = face.uv || generateDefaultUvs(faceName, from, to)
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
