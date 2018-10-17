import { BufferGeometry, Float32BufferAttribute } from 'three'

import { MinecraftModel, MinecraftModelFaceName } from './model'

export class MinecraftModelGeometry extends BufferGeometry {
  constructor (model: MinecraftModel) {
    super()

    const vertices = []

    for (const element of model.elements) {
      const { from: [x1, y1, z1], to: [x2, y2, z2] } = element

      const faces = {
        west: [x1, y2, z1, x1, y1, z2],
        east: [x2, y1, z1, x2, y2, z2],
        down: [x2, y1, z1, x1, y1, z2],
        up: [x1, y2, z1, x2, y2, z2],
        north: [x2, y1, z1, x1, y2, z1],
        south: [x1, y1, z2, x2, y2, z2]
      }

      for (const faceName in element.faces) {
        const [ax, ay, az, bx, by, bz] = faces[faceName as MinecraftModelFaceName]

        vertices.push(bx, ay, az)
        vertices.push(ax, by, az)
        vertices.push(ax, ay, bz)

        vertices.push(ax, by, bz)
        vertices.push(bx, ay, bz)
        vertices.push(bx, by, az)
      }
    }

    this.addAttribute('position', new Float32BufferAttribute(vertices, 3))
  }
}
