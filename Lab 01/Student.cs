using System;
using System.Globalization;
using System.Transactions;

namespace Lab2
{
    public class Student
    {
        private string studentName;
        public string _studentName { 
            get {
                return this.studentName;    
            } 
            set {
                // The setter function checks for letter in the Student name and
                // checks if it is only alphabet and nothing else. If it is something
                // other than an alphabet, it sets isValidName to false. If isValidName
                // is true at the end, it sets original variable to the value. Else, it
                // throws exception.
                string temp = value;
                bool isValidName = true;
                foreach (char letter in temp)
                {
                    if (!(Char.IsLetter(letter) || Char.IsWhiteSpace(letter)))
                    { 
                        isValidName = false;
                    }
                }
                if (isValidName)
                    this.studentName = value;
                else
                {
                    Console.WriteLine("Name is not valid. Enter Name again : ");
                    this._studentName = Console.ReadLine();
                }
                    
            } 
        }
        private string studentRegNo;
        public string _studentRegNo
        {
            get
            {
                return this.studentRegNo;
            }
            set
            {
                // This setter function checks first of all, it checks the length of
                // registration number. If the length is not between 8 and 12, it simply returns.
                // If the length is valid, it check that first 4 are numbers, 5th and 8th letters
                // are '-' and last are digits only. If so, it sets isValidNo to true, else it
                // is false.
                bool isValidNo = true;
                string temp = value;
                if (temp.Length > 8 && temp.Length < 12)
                {
                    for (int i = 0; i < 4; i++)
                    {
                        if (!Char.IsDigit(temp[i]))
                            isValidNo = false;
                    }
                    if (!(temp[4] == '-' || temp[7] == '-'))
                        isValidNo = false;
                    if (!(Char.IsUpper(temp[5]) && Char.IsUpper(temp[6])))
                        isValidNo = false;
                    for (int j = 8; j < temp.Length; j++)
                        if (!Char.IsDigit(temp[j]))
                            isValidNo = false;
                }
                else
                    isValidNo = false;

                // If registration number valid according to standards, it saves the value into original
                // variable.
                if (isValidNo)
                    this.studentRegNo = value;
                else
                {  
                    Console.WriteLine("Invalid registration number. Enter again : ");
                    this._studentRegNo = Console.ReadLine();
                }
            }
        }
        private DateTime dateOfBirth;
        public DateTime _dateOfBirth { get {
                return this.dateOfBirth;
            }
            set 
            {
                // First of all, this setter stores 1 jan 2003 as Jan variable and
                // 31 Dec 1990 in Dec variable
                DateTime Jan = Convert.ToDateTime("01/01/2003");
                DateTime Dec = Convert.ToDateTime("31/12/1990");

                // If the date entered satisfies the condition of date being larger than Jan 
                // and smaller than Dec, it stores value in original variable.
                if (DateTime.Compare(value, Jan) < 0 && DateTime.Compare(value, Dec) > 0)
                {
                    dateOfBirth = value;
                }
                else
                { 
                    Console.WriteLine("Invalid birth date ! Enter DOB again : ");
                    this._dateOfBirth = Convert.ToDateTime(Console.ReadLine());
                }

            }
        }
        private double CGPA;
        public double _CGPA { 
            get 
            {
                return this.CGPA;
            } 
            set
            {
                // Checks if the CGPA is between 0 and 4
                if (value > 0 && value <= 4)
                    this.CGPA = value;
                else
                {
                    Console.WriteLine("Invalid CGPA. CGPA shoule be >=0 and <=4");
                    this._CGPA = Convert.ToDouble(Console.ReadLine());
                }
            }
        }
        private string CNIC;
        public string _CNIC { 
            get {
                return this.CNIC;
            }
            set
            {
                if (value.Length == 13)
                    this.CNIC = value;
                else
                {
                    Console.WriteLine("Invalid CNIC ! Enter again to continue : ");
                    this._CNIC = Console.ReadLine();

                }
            }
        }
        public string[] hobbies { get; set; }

        //Non-parameterized constructor
        public Student()
        {
            studentName = "";
            studentRegNo = "";
            CGPA = 0.00;
            CNIC = "";
        }
        // Double parameterized constructor
        public Student(string studentName, string studentRegNo)
        {
            this.studentName = studentName;
            this.studentRegNo = studentRegNo;
        }

        public void Input ()
        {
            Console.WriteLine("Name : ");
            this._studentName = Console.ReadLine();
            Console.WriteLine("Registraion number : ");
            this._studentRegNo = Console.ReadLine();
            Console.WriteLine("Date of birth (DD/MM/YYYY): ");
            this._dateOfBirth = Convert.ToDateTime(Console.ReadLine());
            Console.WriteLine("CGPA : ");
            this._CGPA = Convert.ToDouble(Console.ReadLine()); 
            Console.WriteLine("CNIC : ");
            this._CNIC = Console.ReadLine();
            Console.WriteLine("How many things you do in pleasure time ? : ");
            int n = Convert.ToInt32(Console.ReadLine());
            // Initialize the size of hobbies array to the number entered.
            hobbies = new string[n];
            Console.WriteLine("\tEnter your hobbies one by one : ");
            // Enters hobbies one by one.
            for (int i=1; i<=n; i++)
            {
                Console.WriteLine("Hobby # " + i + " : ");
                this.hobbies[i-1] = Console.ReadLine();
            }
        }

        public string getAge ()
        {
            // Gets current date time
            DateTime Now = DateTime.Now;
            // Finds the year of current date.
            int Years = new DateTime(DateTime.Now.Subtract(this.dateOfBirth).Ticks).Year - 1;
            // Finds the year of Birth Year.
            DateTime PrevYear = this.dateOfBirth.AddYears(Years);
            int Months = 0;
            for (int i = 1; i <= 12; i++)
            {
                if (PrevYear.AddMonths(i) == Now)
                {
                    Months = i;
                    break;
                }
                else if (PrevYear.AddMonths(i) >= Now)
                {
                    Months = i - 1;
                    break;
                }
            }
            // Subtracts the date of birth from current date.
            int Days = Now.Subtract(PrevYear.AddMonths(Months)).Days;
            // Formats time span into year month and day
            return String.Format("{0} Years {1} Month(s) {2} Day(s)", Years, Months, Days);
        }
        public string getStatus()
        {
            string Status;
            if (CGPA <= 2.0)
                Status = "Suspended";
            else if (CGPA <= 2.5)
                Status = "Below Average";
            else if (CGPA <= 3.3)
                Status = "Average";
            else if (CGPA <= 3.5)
                Status = "Below Good";
            else
                Status = "Excellent";
            return Status;
        }
        public int noOfWordsInName()
        {
            // for single word
            int len = 1;
            foreach (char letter in _studentName)
            {
                // If the white space occurs, count 1 in len
                if (letter == ' ')
                    len++;
            }
            return len;
            
        }
        public string getGender()
        {
            string gender;
            // First of all last digit on cnic is separated, and tested if the last digit is even or odd
            char lastDig = _CNIC[12];
            if (Convert.ToInt32(lastDig) % 2 == 0)
                gender = "FEMALE";
            else
                gender = "MALE";
            return gender;
        }
        public string toString()
        {
            string data = "\tName: " + _studentName +" (Contains " + this.noOfWordsInName() +" words)" +
                "\n\tRegistration Number: " + _studentRegNo +
                "\n\tCGPA = " + this._CGPA + " " + this.getStatus() +
                "\n\tDate of Birth: " + dateOfBirth.ToString("MMMM dd,yyyy") + " (Age is " + this.getAge() + " )" +
                "\n\tCNIC: " + _CNIC + 
                "\n\tGender: "+ this.getGender() + 
                "\n\tHobbies: " + string.Join(',',this.hobbies);

            return data;
        }

        ~Student()
        {
            this._studentName = null;
            this._studentRegNo = null;
            this._dateOfBirth = Convert.ToDateTime("01/01/0001");
            this._CNIC = null;
            this._CGPA = 0.0;
            this.hobbies = null;
            Console.WriteLine("Destructor Called !");
        }
    }
}
