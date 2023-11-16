#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

/* This function is somewhat an inversion of the previous. 
 * The raising the sine to the power of n produces a wave form as expected.
 * Subtracting this wave from 1.0 inverts it so that we start at a "peak" with
 * a sudden drop followed by a linear descent into a gradual parabolic valley.
 * The gradual quality of the tails stay consistent with increasing values of
 * n, similar to how the "peak" in the previous function retained its parabolic
 * qualities.
 *
 * Multiplying by PI boosts the signal of x, I believe in this case to make
 * sure that the curve starts at 1.0 and descends, as opposed to increasing
 * from 0.0.
 *
 * I'm not sure what the abs() function gets us in this case. Removing it
 * doesn't seem to change anything that I can see, so perhaps it's used in
 * other signal shaping applications.
 *
 * What is interesting about this implementation is that dividing by 2.0
 * actually shifts the curve to start at 0.0 and increase to 1.0.
 * Removing it produces a curve like the one seen in the exercise sheet. 
 * I think this is really just a incidental difference and is not crucial to 
 * the function itself.
 */
float negPowAbsSine(float x, float n){
    float y = 0.0;
    y = 1.0 - pow(abs(cos(PI * x/ 2.0)), n);
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
    float y = negPowAbsSine(st.x, 1.0);

    vec3 color = vec3(y);

    float pct = plot(st,y);
    color = (1.0-pct)*color+pct*vec3(0.0,1.0,0.0);

    gl_FragColor = vec4(color,1.0);
}

