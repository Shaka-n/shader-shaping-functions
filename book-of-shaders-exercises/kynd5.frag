#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;
/* This is very interesting function. I call it flat peak because that's what 
 * the curve looks like, but really it's a function that clamps the y value
 * with max() until the result of x * 2.0 exceeds our chosen input threshold. 
 * My implementation allows you to tweak the size of this clamped area as well 
 * as the slope of the curve after it is exceeded.
 *
 * Past the clamping threshold, n will control the slope of the curve. Values
 * of 0.0 <= n <= 1.0 result in a exponential dropoff which in the black and
 * white example creates an interesting "glowing" effect. Values over 1.0
 * create a gradual descent through the curve body into a fairly linear tail.
 *
 * Subtracting the result of the "clamping" function from 1.0 just inverts the
 * result, producing a transition from white to black instead of black to
 * white. 
 *
 * A very fun and interesting shaping function overall.
 */
float flatPeak(float x, float pw, float n){
    float y = 0.0;
    y =  1.0 - pow(max(0.0, abs(x) * 2.0 - pw), n);
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
    float y = flatPeak(st.x, 1.0, 0.25);

    vec3 color = vec3(y);

    float pct = plot(st,y);
    color = (1.0-pct)*color+pct*vec3(0.0,1.0,0.0);

    gl_FragColor = vec4(color,1.0);
}

