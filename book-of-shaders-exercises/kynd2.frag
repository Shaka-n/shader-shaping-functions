
#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;
// This function returns a cosine curve translated above the x axis where the
// concavity/convexity of the tails is determined by the given value n.

// In short, we take get a normal slice of a cosine wave raised to the power
// of n. The n value determines how the shape of the curve as x approaches 1.0.
// The term "x/2.0" just translates the plot up above the x axis.

// Values of n less than 1.0 dramatically increase the convexity of the curve
// resulting in a large white space then suddenly crashing to black. The same
// is true of higher values of n, though you can get as high as 100.0 and still
// see a usable effect. Notably, the slope at the start of the curve will
// remain consistent: a gradual, decreasing curve. The shape afterwards is
// still determined by n, but this initial consistency seems to be a defining
// feature of this function.

float powCosine(float x, float n){
    float y = 0.0;
    y = pow(cos(PI * x/2.0), n);
    return y;
}

float plot(vec2 st, float pct){
  return  smoothstep( pct-0.02, pct, st.y) -
          smoothstep( pct, pct+0.02, st.y);
}

void main() {
//  optionally shift the canvas to see values as they approach -1 and 1.
//  vec2 st = (gl_FragCoord.xy/u_resolution) - vec2(0.5, -0.25);

    vec2 st = gl_FragCoord.xy/u_resolution;
    float y = powCosine(st.x, 5.5);

    vec3 color = vec3(y);

    float pct = plot(st,y);
    color = (1.0-pct)*color+pct*vec3(0.0,1.0,0.0);

    gl_FragColor = vec4(color,1.0);
}

