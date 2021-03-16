import React from 'react';
import ReactDOM from 'react-dom';
import * as THREE from 'three';
import { WEBGL } from 'three/examples/jsm/WebGL';
import App from './app';
import 'normalize.css';
import './index.scss';

ReactDOM.render(<App />, document.getElementById('app'),
  () => {
    const isWebGLAvailable = WEBGL.isWebGLAvailable()
    const isWebGL2Available = WEBGL.isWebGL2Available()
    console.log('isWebGLAvailable', isWebGLAvailable)
    console.log('isWebGL2Available', isWebGL2Available)
    window.THREE = THREE
  }
)