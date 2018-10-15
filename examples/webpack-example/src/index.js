import { Scene, PerspectiveCamera, WebGLRenderer } from 'three'

// Create the scene and the camera
const scene = new Scene()
const camera = new PerspectiveCamera()

// Create the renderer and append it to the document body
const renderer = new WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

// Render the scene
renderer.render(scene, camera)

// Update the dimensions of the viewport when the window gets resized
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()

  renderer.setSize(window.innerWidth, window.innerHeight)

  renderer.render(scene, camera)
})
