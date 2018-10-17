import { BufferGeometry, Float32BufferAttribute, Uint16BufferAttribute } from 'three'

import { MinecraftModel, MinecraftModelFaceName } from './model'

const faceVertices = {
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

      for (const faceName in element.faces) {
        const i = vertices.length / 3
        indices.push(i, i + 2, i + 1)
        indices.push(i, i + 3, i + 2)

        for (const vertex of faceVertices[faceName as MinecraftModelFaceName]) {
          vertices.push(...vertex.map((v, i) => v === 0 ? from[i] : to[i]))
        }

        uvs.push(0, 0)
        uvs.push(0, 1)
        uvs.push(1, 1)
        uvs.push(1, 0)
      }
    }

    return [vertices, uvs, indices]
  }
}
