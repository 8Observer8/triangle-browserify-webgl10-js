const { mat4, vec3 } = require("gl-matrix");
const shaderProgram = require("./shader-program");
const vertexBuffers = require("./vertex-buffers");
const webGLContext = require("./webgl-context");

window.onload = () =>
{
    if (!webGLContext.init("renderCanvas")) return;
    const gl = webGLContext.gl;
    gl.clearColor(0.1, 0.1, 0.1, 1.0);

    const n = vertexBuffers.init();
    shaderProgram.init();
    const program = shaderProgram.getColoredProgram();
    gl.useProgram(program);
    gl.bindAttribLocation(program, 0, "aPosition");
    gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(0);

    mat4.translate(shaderProgram.modelMatrix, shaderProgram.modelMatrix, vec3.fromValues(3, 0, 0));
    shaderProgram.updateMatrix();
    
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawElements(gl.TRIANGLES, n, gl.UNSIGNED_BYTE, 0);
};
