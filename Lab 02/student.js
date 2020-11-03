const prompt = require("prompt-sync")({ sigint: true });

class courseResult {
  constructor() {
    this.courseID = "";
    this.courseTitle = "";
    this.creditHrs = 0;
    this.marks = 0;
    this.semester = 45;
  }
  setCrsId = () => {
    var id = prompt("Enter course ID : ");
    if (
      id.length >= 2 &&
      id.length <= 8 &&
      isCapLetter(id[0]) &&
      isCapLetter(id[1])
    ) {
      this.courseID = id;
    } else {
      console.log("Invalid Course Id. \n Valid ID must be of length 2-8");
      this.setCrsId();
    }
  };
  setCrsTitle = () => {
    var title = prompt("Enter course title : ");
    if (title.length >= 10 && title.length <= 35 && isWord(title)) {
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
  };
}

class Student {
  constructor() {
    this.name = "";
    this.registrationNumber = "XXX";
    this.degree = "";
    this.courses = [];
    this.crsResult = new courseResult();
  }

  setName = () => {
    const name = prompt("What is your name? : ");
    if (isWord(name)) {
      Student.studentName = name;
    } else {
      console.log("Invalid Name");
      this.setName();
    }
  };

  setRegNo = () => {
    const regisNo = prompt("What is your Reg No : ");
    let k = 0;
    for (let i = 0; i < 4; i++) {
      if (!isDigit(regisNo[i])) k++;
    }
    if (regisNo[4] != "-" || regisNo[7] != "-") k++;
    for (let i = 5; i < 7; i++) {
      if (!isCapLetter(regisNo[i])) k++;
    }
    for (let i = 8; i < regisNo.length; i++) {
      if (!isDigit(regisNo[i])) k++;
    }
    if (k == 0) {
      Student.regNo = regisNo;
    } else {
      console.log("Invalid Registration Number");
      this.setRegNo();
    }
  };

  setDegree = () => {
    var deg = prompt("Enter your degree : ");
    if (deg == "MS" || deg == "BS" || deg == "BE") {
      this.degree = deg;
    } else {
      console.log("Invalid degree. Degree must be MS, BS or BE.");
      this.setDegree();
    }
  };
}

const isDigit = (c) => {
  return c >= "0" && c <= "9";
};
const isCapLetter = (c) => {
  return c >= "A" && c <= "Z";
};
const isWord = (word) => {
  return !/[^a-zA-Z]/.test(word);
};
var student1 = new Student();
student1.setName();
student1.setRegNo();
