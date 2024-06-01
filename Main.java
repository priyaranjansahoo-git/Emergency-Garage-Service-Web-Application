import java.util.Scanner;

class ArrayAssignment {
    private int[] array;

    public ArrayAssignment(int size) {
        array = new int[size];
    }

    public void setElement(int index, int value) {
        array[index] = value;
    }

    public int getElement(int index) {
        return array[index];
    }

    public int getSize() {
        return array.length;
    }

    public void printArray() {
        for (int i = 0; i < array.length; i++) {
            System.out.println(array[i]);
        }
    }
}

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.println("Enter the size of an array:");
        int size = scanner.nextInt();

        if (size < 4 || size > 10) {
            System.out.println("Size is an invalid size");
            return;
        }

        ArrayAssignment arrayAssignment = new ArrayAssignment(size);

        System.out.println("Enter the array elements:");
        for (int i = 0; i < size; i++) {
            arrayAssignment.setElement(i, scanner.nextInt());
        }

        System.out.println("Simple output:");
        for (int i = 0; i < size; i++) {
            System.out.println(arrayAssignment.getElement(i) + 1);
 }
}
}
