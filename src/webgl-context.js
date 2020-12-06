class WebGLContext
{
    init(canvasName)
    {
        if (!this.gl) {
            const canvas = document.getElementById(canvasName);
            if (!canvas) {
                console.log(`Failed to get the canvas element: "${canvasName}"`);
                return false;
            }
            this.gl = canvas.getContext("webgl");
            return true;
        }
    }
}

module.exports = new WebGLContext();
