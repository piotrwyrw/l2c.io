#include <stdlib.h>

int main() {
    void *memory = malloc(100); // Allocate 100 bytes
    free(memory); // Free the memory block

    return 0;
}