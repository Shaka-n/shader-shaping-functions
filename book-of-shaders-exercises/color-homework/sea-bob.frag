#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

/* This animation is supposed to invoke the feeling of closing one's eyes and
 * bobbing up and down in the surf. Honestly I just tried inputing sin(u_time)
 * into a few different shapers until I decided this one looked sort of cool.
 * Baby's first shader.
 * I ported this helper function from the flong archive. 
 */
float doubleCubicSeatWithLinearBlend (float x, float a, float b){

  float epsilon = 0.00001;
  float min_param_a = 0.0 + epsilon;
  float max_param_a = 1.0 - epsilon;
  float min_param_b = 0.0;
  float max_param_b = 1.0;
  a = min(max_param_a, max(min_param_a, a));  
  b = min(max_param_b, max(min_param_b, b)); 
  b = 1.0 - b; //reverse for intelligibility.
  
  float y = 0.0;
  if (x <= a){
    y = b*x + (1.0-b)*a*(1.0-pow(1.0-x/a, 3.0));
  } else {
    y = b*x + (1.0-b)*(a + (1.0-a)*pow((x-a)/(1.0-a), 3.0));
  }
  return y;
}


vec3 colorA = vec3(0.053,0.670,0.316);
vec3 colorB = vec3(0.079,0.985,0.976);

void main() {
    vec3 color = vec3(0.0);
    
    float dbc = doubleCubicSeatWithLinearBlend(sin(u_time), 0.324, 0.5);
	float pct = sin(dbc);
    // float pct = 1.0 - pow(max(0.0, abs(sin(dbc))), 0.208);

    // Mix uses pct (a value from 0-1) to
    // mix the two colors
    color = mix(colorA, colorB, pct);

    gl_FragColor = vec4(color,1.0);
}
