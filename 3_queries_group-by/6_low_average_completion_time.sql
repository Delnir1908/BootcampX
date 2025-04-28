SELECT students.name as name, 
  AVG(assignment_submissions.duration) as average_assignment_duration, 
  AVG(assignments.duration) as average_estimated_duration
FROM students
JOIN assignment_submissions ON assignment_submissions.student_id = students.id
JOIN assignments ON assignments.id = assignment_id
WHERE students.end_date IS NULL
GROUP BY students.name
HAVING AVG(assignment_submissions.duration) < AVG(assignments.duration)
ORDER BY AVG(assignment_submissions.duration);