const { mat4 } = require("gl-matrix");
const webglContext = require("./webgl-context");

class ShaderProgram
{
    init()
    {
        const vertShaderSrc = [
            "attribute vec3 aPosition;",
            "uniform mat4 uMpMatrix;",
            "void main()",
            "{",
            "    gl_Position = uMpMatrix * vec4(aPosition, 1.0);",
            "}"
        ].join("\n");

        const fragShaderSrc = [
            "void main()",
            "{",
            "    gl_FragColor = vec4(0.0, 0.0, 1.0, 1.0);",
            "}"
        ].join("\n");

        const gl = webglContext.gl;
        const vShader = gl.createShader(gl.VERTEX_SHADER);
        gl.shaderSource(vShader, vertShaderSrc);
        gl.compileShader(vShader);
        const fShader = gl.createShader(gl.FRAGMENT_SHADER);
        gl.shaderSource(fShader, fragShaderSrc);
        gl.compileShader(fShader);
        this.coloredProgram = gl.createProgram();
        gl.attachShader(this.coloredProgram, vShader);
        gl.attachShader(this.coloredProgram, fShader);
        gl.linkProgram(this.coloredProgram);
        gl.useProgram(this.coloredProgram);

        this.projMatrix = mat4.create();
        mat4.ortho(this.projMatrix, -5, 5, -5, 5, 50, -50);
        this.modelMatrix = mat4.create();
        this.mpMatrix = mat4.create();
        this.uMpMatrixLocation = gl.getUniformLocation(this.coloredProgram, "uMpMatrix");
        this.updateMatrix();
    }

    updateMatrix()
    {
        const gl = webglContext.gl;
        mat4.mul(this.mpMatrix, this.projMatrix, this.modelMatrix);
        gl.uniformMatrix4fv(this.uMpMatrixLocation, false, this.mpMatrix);
    }

    getColoredProgram()
    {
        return this.coloredProgram;
    }
}

module.exports = new ShaderProgram();
