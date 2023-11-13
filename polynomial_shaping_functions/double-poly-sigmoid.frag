#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

// Produces a curve similar to Raised Inverted Cosine
// n controls the angle of slope where the two tails meet in the center
// Suggested range for n is 1.0 to 10.0
// Interestingly, line 31 was bugged in the original, being 1.0 + pow(...)
float doublePolynomialSigmoid (float x, float a, float b, float n){
  
  float y = 0.0;
  if (n - (2.0 * floor(n/2.0)) == 0.0){ 
    // even polynomial
    if (x<=0.5){
      y = pow(2.0*x, n)/2.0;
    } else {
      y = 1.0 - pow(2.0*(x-1.0), n)/2.0;
    }
  } 
  else { 
    // odd polynomial
    if (x<=0.5){
      y = pow(2.0*x, n)/2.0;
    } else {
      y = 1.0 - pow(2.0*(x-1.0), n)/2.0;
    }
  }

  return y;
}

float plot(vec2 st, float pct){
  return  smoothstep( pct-0.02, pct, st.y) -
          smoothstep( pct, pct+0.02, st.y);
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution;
    
    float a = 0.975;
    float b = 0.435;
    float y = doublePolynomialSigmoid(st.x, a, b, 3.024);

    vec3 color = vec3(y);

    float pct = plot(st,y);
    color = (1.0-pct)*color+pct*vec3(0.0,1.0,0.0);

    gl_FragColor = vec4(color,1.0);
}
