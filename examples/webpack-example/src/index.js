import { Scene, PerspectiveCamera, WebGLRenderer } from 'three'
import OrbitControls from 'three-orbitcontrols'
import { MinecraftModelMesh } from 'three-mcmodel'

import minecraftModel from './minecraftModel.json'

// Create the scene and the camera
const scene = new Scene()
const camera = new PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000)
camera.position.set(16, 16, 64)

// Create a mesh from the json model and add it to the scene
const mesh = new MinecraftModelMesh(minecraftModel)
scene.add(mesh)

// Create the renderer and append it to the document body
const renderer = new WebGLRenderer({ antialias: true, alpha: true })
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

// Create the controls
const controls = new OrbitControls(camera, renderer.domElement)
controls.enableKeys = false

// Update the dimensions of the viewport when the window gets resized
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
})

// Start animation
function animate () {
  requestAnimationFrame(animate)
  controls.update()
  renderer.render(scene, camera)
}
animate()
