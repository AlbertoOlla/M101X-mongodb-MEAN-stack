# Homework 2 and Quiz results

Suppose you're building an application that has 2 collections: students and courses. A course can have many students, and a student can take up to 6 courses. Each course has a unique course number, like CS-101, and each student can take each course at most once.

## Homework 2.1
Given the principle "store what you query for," which of the following would be the best choice for the _id field of the courses collection?

* A MongoDB object id
* The course number, for instance CS-101 `correct`
* An automatically-incremented integer

## Homework 2.2
Students and courses have a many-to-many relationship. Given the principle of least cardinality, which of the following would be the best way to store this many-to-many relationship?

* Courses should contain an array of IDs referring to the students taking the course.
* Courses should embed an array of student documents representing all students taking the course.
* Students should contain an array of course numbers referring to the courses a student is taking. `correct`

## Homework 2.3

There are two files that you will need to work with, `course.js` and
`student.js`. After you've run `npm install`, run `npm run watch` to start
Gulp and automatically re-run tests every time the `course.js` and `student.js`
files change.

First, for `student.js`, you will need to implement two virtuals. The student
schema stores the student's full name. The `firstName` virtual will return the
student's first name as computed from their full name. The `lastName` virtual
will do the same for the student's last name.

For `course.js`, you will have to fill out the entire course schema. The course
schema must have the following fields:

* `_id`: a string representing the course number, such as "CS-101". Required.
* `title`: the course's title as a string, such as "Introduction to Computer
Science". Required, [maximum of 140 characters](http://mongoosejs.com/docs/api.html#schema_string_SchemaString-maxlength).
* `description`:  a description of the course as a string. Required.
*  `requirements`: an of course numbers (as strings) representing the courses
a student should take before taking this course.

Once you have met all of these requirements, `npm run watch` will exit and
provide you a secret phrase. Please enter this code in your browser window
so we can verify that you completed this exercise.
