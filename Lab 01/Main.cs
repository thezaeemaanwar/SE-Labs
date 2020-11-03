//------------------------------------------
//        Software Engineering Lab 1
//               2018-CS-44
//              ZAEEMA ANWAR
//------------------------------------------

using System;
using System.Runtime.CompilerServices;

namespace Lab2
{
    class Program
    {
        public static void Main(){
            Student newStudent = new Student();
            Console.WriteLine("============================================================");
            Console.WriteLine("                   ENTER YOUR INFROMATION");
            Console.WriteLine("============================================================");
            newStudent.Input();
            Console.WriteLine("==============================================================================================");
            Console.WriteLine("                                 YOUR DETAILS ENTERED");
            Console.WriteLine("==============================================================================================");
            Console.WriteLine(newStudent.toString());
            Student newStudent2 = new Student(newStudent._studentName, newStudent._studentRegNo);
        }
       
    }
}
