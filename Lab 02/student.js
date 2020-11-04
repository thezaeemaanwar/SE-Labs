const prompt = require("prompt-sync")({ sigint: true });

// ____________________________________________________
// ====================================================
//
//               COURSE RESULT CLASS
// ____________________________________________________
// ====================================================

class courseResult {
  constructor() {
    this.semester = 1;
    this.courseID = "";
    this.courseTitle = "";
    this.creditHrs = 0;
    this.marks = 0;
  }
  // -----------------------------------------------
  //              COPY CONSTRUCTOR
  // -----------------------------------------------

  courseResult = (result) => {
    if (result instanceof courseResult) {
      this.semester = result.semester;
      this.courseID = result.courseID;
      this.courseTitle = result.courseTitle;
      this.creditHrs = result.creditHrs;
      this.marks = result.marks;
    }
  };

  // -----------------------------------------------
  //           PARAMETRIZED CONSTRUCTOR
  // -----------------------------------------------
  courseResult = (sem, id, title, hrs, mar) => {
    if (
      isValidId(id) &&
      isValidMarks(mar) &&
      isValidTitle(title) &&
      isValidcdhr(hrs) &&
      isValidSem(sem)
    ) {
      this.courseID = id;
      this.semester = sem;
      this.courseTitle = title;
      this.creditHrs = hrs;
      this.marks = mar;
    }
  };

  // -----------------------------------------------
  //               SETTER FUNCTIONS
  // -----------------------------------------------

  setCrsId = () => {
    var id = prompt("Enter course ID : ");
    if (isValidId(id)) {
      this.courseID = id;
    } else {
      console.log("Invalid Course Id. \n Valid ID must be of length 2-8");
      this.setCrsId();
    }
  };
  setCrsTitle = () => {
    var title = prompt("Enter course title : ");
    if (isValidTitle(title)) {
      this.courseTitle = title;
    } else {
      console.log(
        "Invalid Title. Title must be 10-35 letters long and alphabetic."
      );
      this.setCrsTitle();
    }
  };
  setCrdHrs = () => {
    var hrs = prompt("Enter Credit Hours : ");
    if (isValidcdhr(hrs)) this.creditHrs = hrs;
    else {
      console.log("Invalid Credit Hours !");
      this.setCrdHrs();
    }
  };
  setMarks = () => {
    var marks = prompt("Enter Marks : ");
    if (isValidMarks(marks)) this.marks = marks;
    else {
      console.log("Invalid Marks ! Enter Again.");
      this.setMarks();
    }
  };
  setSemester = () => {
    var sem = prompt("Enter semester : ");
    if (isValidSem(sem)) this.semester = sem;
    else {
      console.log("Invalid Semester ! ");
      this.setSemester();
    }
  };

  // -----------------------------------------------
  //               GETTER FUNCTIONS
  // -----------------------------------------------
  getGrade = () => {
    if (this.marks < 40) return "F";
    if (this.marks >= 40 && this.marks < 50) return "D";
    if (this.marks >= 50 && this.marks < 55) return "C";
    if (this.marks >= 55 && this.marks < 60) return "C+";
    if (this.marks >= 60 && this.marks < 65) return "B-";
    if (this.marks >= 65 && this.marks < 70) return "B+";
    if (this.marks >= 70 && this.marks < 80) return "A-";
    if (this.marks >= 80) return "A";
  };
  getGradepoint = () => {
    let grade = this.getGrade();
    if (grade == "A") return 4.0;
    if (grade == "A-") return 3.7;
    if (grade == "B+") return 3.3;
    if (grade == "B-") return 3.0;
    if (grade == "C+") return 2.7;
    if (grade == "C") return 2.3;
    if (grade == "D") return 1.0;
    if (grade == "F") return 0;
  };
}

// ____________________________________________________
// ====================================================
//
//                STUDENT CLASS
// ____________________________________________________
// ====================================================

class Student {
  // -----------------------------------------------
  //            DEFAULT CONSTRUCTOR
  // -----------------------------------------------

  constructor() {
    this.name = "";
    this.registrationNumber = "XXX";
    this.degree = "";
    this.courses = [];
    this.crsResult = new courseResult();
  }

  // -----------------------------------------------
  //              SETTER FUNCTIONS
  // -----------------------------------------------

  setName = () => {
    const name = prompt("What is your name? : ");
    if (isValidName(name)) {
      Student.studentName = name;
    } else {
      console.log("Invalid Name");
      this.setName();
    }
  };
  setRegNo = () => {
    const regisNo = prompt("What is your Reg No : ");
    if (isValidRegNo(regisNo)) {
      Student.regNo = regisNo;
    } else {
      console.log("Invalid Registration Number");
      this.setRegNo();
    }
  };
  setDegree = () => {
    var deg = prompt("Enter your degree : ");
    if (isvalidDegree(deg)) {
      this.degree = deg;
    } else {
      console.log("Invalid degree. Degree must be MS, BS or BE.");
      this.setDegree();
    }
  };

  // -----------------------------------------------
  //              GETTER FUNCTIONS
  // -----------------------------------------------
  getSemesters = () => {
    let count = 0;
  };
}

// -----------------------------------------------
//            HELPER FUNCTIONS
// -----------------------------------------------

const isDigit = (c) => {
  return c >= "0" && c <= "9";
};
const isCapLetter = (c) => {
  return c >= "A" && c <= "Z";
};
const isWord = (word) => {
  return !/[^a-zA-Z]/.test(word);
};
const isValidName = (word) => {
  for (let i = 0; i < word.length; i++) {
    if (
      !(
        (word[i] >= "a" && word[i] <= "z") ||
        (word[i] >= "A" && word[i] <= "Z") ||
        word[i] == " "
      )
    )
      return false;
  }
  return true;
};
const isValidId = (id) => {
  if (
    id.length >= 2 &&
    id.length <= 8 &&
    isCapLetter(id[0]) &&
    isCapLetter(id[1])
  )
    return true;
  else return false;
};
const isValidTitle = (title) => {
  if (title.length >= 10 && title.length <= 35 && isWord(title)) return true;
  else return false;
};
const isValidcdhr = (hr) => {
  if (hr >= 1 && hr <= 3) return true;
  else return false;
};
const isValidMarks = (mark) => {
  if (mark >= 0 && mark <= 100) return true;
  else return false;
};
const isValidSem = (sem) => {
  if (sem >= 1 && sem <= 8) return true;
  else return false;
};
const isValidRegNo = (regisNo) => {
  let k = 0;
  for (let i = 0; i < 4; i++) {
    if (!isDigit(regisNo[i])) return false;
  }
  if (regisNo[4] != "-" || regisNo[7] != "-") return false;
  for (let i = 5; i < 7; i++) {
    if (!isCapLetter(regisNo[i])) return false;
  }
  for (let i = 8; i < regisNo.length; i++) {
    if (!isDigit(regisNo[i])) return false;
  }
  return true;
};
const isvalidDegree = (deg) => {
  if (deg == "MS" || deg == "BS" || deg == "BE") return true;
  else return false;
};
// ____________________________________________________
// ====================================================
//
//                  MAIN PROGRAM
// ____________________________________________________
// ====================================================

var student1 = new Student();
student1.setName();
student1.setRegNo();
