const WebGLContext = require("./webgl-context");

class VertexBuffers
{
    init()
    {
        const gl = WebGLContext.gl;

        const vertPositions = new Float32Array([
            -0.5, -0.5, 0.0,
            0.5, -0.5, 0.0,
            0.0, 0.5, 0.0
        ]);
        const vertPosBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, vertPosBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, vertPositions, gl.STATIC_DRAW);

        const indices = new Uint8Array([
            0, 1, 2
        ]);
        const indexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);

        return indices.length;
    }
}

module.exports = new VertexBuffers();
