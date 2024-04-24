#include <stdio.h>
int main()
{

    int number_4, number_2, sum;

    printf("Enter two integers: ");
    scanf("%d%d", &number_4, &number_2);

    // calculate the sum
    sum = number_4 + number_2;

    printf("%d+%d=%d", number_4, number_2, sum);
    
}