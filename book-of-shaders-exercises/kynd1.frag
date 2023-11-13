#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;
// This function takes a value x, raises it by a value n, and subtracts
// the result from 1.0. The resulting range of values results in an exponential
// curve decreasing from 1.0. The value n controls the convexity of this curve.
// Values of n less than 1.0 will produce an increasingly concave slope as n 
// approaches 0.0. Negative values don't seem to produce anything interesting.

// In short, you get a transition that can be controlled with n, where values
// closer to 1.0 produce a gentler transitions and more distal values produce 
// more extreme transitions.

float negativeExponential(float x, float n){
    float y = 0.0;
    y = 1.0 - pow(abs(x), n);
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
    float y = negativeExponential(st.x,2.0);

    vec3 color = vec3(y);

    float pct = plot(st,y);
    color = (1.0-pct)*color+pct*vec3(0.0,1.0,0.0);

    gl_FragColor = vec4(color,1.0);
}

