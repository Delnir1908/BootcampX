SELECT cohorts.name AS cohort, SUM(completed_at - started_at) as total_duration
FROM assistance_requests
JOIN students ON students.id = assistance_requests.student_id
JOIN cohorts ON students.cohort_id = cohorts.id
GROUP BY cohort
ORDER BY total_duration;
