#include &lt;stdlib.h&gt;

typedef struct {
    int width;
    int height;
} Rectangle;

Rectangle *create_rectangle(int width, int height) {
    Rectangle *rect = malloc(sizeof(Rectangle));
    rect->width = width;
    rect->height = height;
    return rect;
}