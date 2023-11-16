#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;
/* The shape of the curve produced by this function is best described as a
 * linear peak that transitions to a linear body which ends in an asymptotic 
 * decrease towards the tails. When n is 1.0 the curve is linear from apex to
 * tail, while values of 0.0 <= n <= 1.0 push the tails of the curve from
 * asymptotic to exponential, meaning a sudden drop as opposed to gradual.
 *
 * This function is a variation of kynd2, where the peak and tails were both
 * parabolic. The min() function finds the minimum value between (1.0 - x) and
 * cos(PI * x/2.0). This effectively clamps the resulting value of y for low
 * values of x to be higher than it would be otherwise, producing a linear
 * slope at the start of the curve. As x increases, the cos() starts to surpass
 * the clamping effect and the slope begins inceasing.
 *
 * As in the previous exercise, dividing x/2.0 is done to shift the drawspace
 * so the resulting gradient is spread evenly across the canvas.
 */
float linearPeakCos(float x, float n){
    float y = 0.0;
    y =  pow(min(cos(PI * x/2.0), 1.0 - abs(x)), n);
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
    float y = linearPeakCos(st.x, 0.25);

    vec3 color = vec3(y);

    float pct = plot(st,y);
    color = (1.0-pct)*color+pct*vec3(0.0,1.0,0.0);

    gl_FragColor = vec4(color,1.0);
}

