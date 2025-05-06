const { Pool } = require("pg");

const pool = new Pool({
  user: "development",
  password: "development",
  host: "localhost",
  database: "bootcampx",
});


/*
pool
  .query(
    `
SELECT DISTINCT teachers.name AS teacher, cohorts.name AS cohort
FROM assistance_requests
JOIN teachers ON teachers.id = assistance_requests.teacher_id
JOIN students ON students.id = assistance_requests.student_id
JOIN cohorts ON cohorts.id = students.cohort_id
WHERE cohorts.name = '${process.argv[2] || 'JUL02'}'
ORDER BY teacher;
`
  )
  .then((res) => {
    res.rows.forEach(row => {
      console.log(
        `${row.cohort}: ${row.teacher}`
      );
    });
  })
  .catch((err) => console.error("query error", err.stack));
  */

  const queryString = `
    SELECT DISTINCT teachers.name as teacher, cohorts.name as cohort
    FROM teachers
    JOIN assistance_requests ON teacher_id = teachers.id
    JOIN students ON student_id = students.id
    JOIN cohorts ON cohort_id = cohorts.id
    WHERE cohorts.name = $1
    ORDER BY teacher;
    `;


const cohortName = process.argv[2] || 'JUL02';
// Store all potentially malicious values in an array.
const values = [cohortName];

  pool.query(queryString, values)
    .then(res => {
      res.rows.forEach(row => {
        console.log(`${row.cohort}: ${row.teacher}`);
      })
    });