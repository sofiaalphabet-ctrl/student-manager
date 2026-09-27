let students = [
    {
        name: "John Smith",
        group: "SE-231",
        grade: 85
    },
    {
        name: "Anna Brown",
        group: "SE-232",
        grade: 92
    }
];


function getResult(grade) {

    if (grade >= 90 && grade <= 100) {
        return "Excellent";

    } else if (grade >= 75 && grade <= 89) {
        return "Good";

    } else if (grade >= 60 && grade <= 74) {
        return "Satisfactory";

    } else {
        return "Failed";
    }
}


function addStudent() {

    const name =
        document.getElementById("studentName").value.trim();

    const group =
        document.getElementById("studentGroup").value.trim();

    const gradeValue =
        document.getElementById("studentGrade").value;


    if (name === "" || group === "" || gradeValue === "") {

        document.getElementById("addStatus").innerHTML =
            "HTTP Status: 400 - Bad Request";

        return;
    }


    const grade = Number(gradeValue);


    if (grade < 0 || grade > 100 || Number.isNaN(grade)) {

        document.getElementById("addStatus").innerHTML =
            "HTTP Status: 400 - Bad Request";

        return;
    }


    const student = {
        name: name,
        group: group,
        grade: grade
    };


    students.push(student);


    displayStudents();


    document.getElementById("addStatus").innerHTML =
        "HTTP Status: 201 - Student created successfully";


    document.getElementById("studentName").value = "";
    document.getElementById("studentGroup").value = "";
    document.getElementById("studentGrade").value = "";
}


function displayStudents() {

    const studentList =
        document.getElementById("studentList");

    studentList.innerHTML = "";


    for (let i = 0; i < students.length; i++) {

        const student = students[i];


        const studentElement =
            document.createElement("div");

        studentElement.className = "student";


        studentElement.innerHTML = `
            <div>
                <strong>${student.name}</strong><br>
                Group: ${student.group}<br>
                Grade: ${student.grade}<br>
                Result: ${getResult(student.grade)}
            </div>

            <button
                class="delete-button"
                onclick="deleteStudent(${i})">
                Delete
            </button>
        `;


        studentList.appendChild(studentElement);
    }
}


function searchStudent() {

    const searchName =
        document.getElementById("searchName").value.trim();

    const searchResult =
        document.getElementById("searchResult");


    let foundStudent = null;


    for (let i = 0; i < students.length; i++) {

        if (
            students[i].name.toLowerCase()
            === searchName.toLowerCase()
        ) {

            foundStudent = students[i];

            break;
        }
    }


    if (foundStudent !== null) {

        searchResult.innerHTML = `
            <strong>HTTP Status: 200</strong><br>
            Student found<br>
            Name: ${foundStudent.name}<br>
            Group: ${foundStudent.group}<br>
            Grade: ${foundStudent.grade}<br>
            Result: ${getResult(foundStudent.grade)}
        `;

    } else {

        searchResult.innerHTML = `
            <strong>HTTP Status: 404</strong><br>
            Student not found
        `;
    }
}


function deleteStudent(index) {

    if (index >= 0 && index < students.length) {

        students.splice(index, 1);

        displayStudents();

        document.getElementById("searchResult").innerHTML =
            "HTTP Status: 200<br>" +
            "Student deleted successfully";

    } else {

        document.getElementById("searchResult").innerHTML =
            "HTTP Status: 404<br>" +
            "Student not found";
    }
}


displayStudents();