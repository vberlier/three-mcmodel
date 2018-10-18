import { BufferGeometry, Float32BufferAttribute, Uint16BufferAttribute } from 'three'

import { MinecraftModel, MinecraftModelFaceName, ArrayVector3, ArrayVector4} from './model'

const vertexMap = {
  west: [[0, 0, 0], [0, 1, 0], [0, 1, 1], [0, 0, 1]],
  east: [[1, 0, 1], [1, 1, 1], [1, 1, 0], [1, 0, 0]],
  down: [[0, 0, 0], [0, 0, 1], [1, 0, 1], [1, 0, 0]],
  up: [[0, 1, 1], [0, 1, 0], [1, 1, 0], [1, 1, 1]],
  north: [[1, 0, 0], [1, 1, 0], [0, 1, 0], [0, 0, 0]],
  south: [[0, 0, 1], [0, 1, 1], [1, 1, 1], [1, 0, 1]]
}

export class MinecraftModelGeometry extends BufferGeometry {
  constructor (model: MinecraftModel) {
    super()
    const [vertices, uvs, indices] = this.computeAttributes(model)

    this.addAttribute('position', new Float32BufferAttribute(vertices, 3))
    this.addAttribute('uv', new Float32BufferAttribute(uvs, 2))
    this.setIndex(new Uint16BufferAttribute(indices, 1))
  }

  private computeAttributes (model: MinecraftModel) {
    const vertices = []
    const uvs = []
    const indices = []

    for (const element of model.elements) {
      const { from, to } = element

      for (const name in element.faces) {
        const faceName = name as MinecraftModelFaceName
        const face = element.faces[faceName]

        const i = vertices.length / 3
        indices.push(i, i + 2, i + 1)
        indices.push(i, i + 3, i + 2)

        for (const vertex of vertexMap[faceName]) {
          vertices.push(...vertex.map((v, i) => v === 0 ? from[i] : to[i]))
        }

        const [u1, v1, u2, v2] = (face.uv || this.defaultUvs(faceName, from, to)).map(coordinate => coordinate / 16)

        const bias = 1 - Math.max(v1, v2)
        const [fixedV1, fixedV2] = [v1, v2].map(coordinate => bias + coordinate)

        uvs.push(u1, fixedV1)
        uvs.push(u1, fixedV2)
        uvs.push(u2, fixedV2)
        uvs.push(u2, fixedV1)
      }
    }

    return [vertices, uvs, indices]
  }

  defaultUvs (faceName: MinecraftModelFaceName, from: ArrayVector3, to: ArrayVector3): ArrayVector4 {
    return [0, 0, 16, 16]
  }
}
