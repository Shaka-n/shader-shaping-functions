This is my collection of signal shaping functions, yoinked from [here](https://www.flong.com/archive/texts/code/shapers_poly/) and ported from C to GLSL.

If you're not familiar with fragment shaders, the idea here is that the helper functions within each of these files (i.e. the function other than `main`), provide different methods of shaping a curve where the value of y is some product of x. This will result in a different gradient from black to white and a plot line when rendered. 

In the base case, y=x, the gradient and plot will be linear. In each of the examples listed, the shape of the curve as manipulated by the shaping function will result in a kind of gradient with varying rates of transition. Some of these functions come with their own special knobs to turn which can help with tweaking an effect. For example, doubleOddPolynomialSeat has the parameter n, which is effectively a magic number, but helps to adjust the plateau of the curve, which translates to a larger or smaller area taken up by mid-range values (i.e. gray).


<img width="1536" alt="Screenshot 2023-11-13 at 11 29 33 AM" src="https://github.com/Shaka-n/shader-shaping-functions/assets/29644753/b655039f-d4e4-4023-b17f-e07c79d46d5b">

I'll keep adding new functions as I find them, but really you should check out [The Book of Shaders](https://thebookofshaders.com/05/) or [Inigo Quiles'](https://iquilezles.org/) work if you really want to learn this stuff.
