import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import CreatePost from './CreatePost';
import { Link } from 'react-router-dom';
const Home = () => {
  // search posts by professor name or course name, create professor review button -> takes user to a form, 
  // call the zot API to get 
  // full URL for peterportalAPI: https://api.peterportal.org/rest/v0/courses/all
  // we must get a list of courses, and a list of professors. each 'post' will be tagged with a course and a professor (maybe multiple course ids and a single professor id)
  // we must get a list of reviews, each review will have a course id, a professor id, and a review body

  const [reviews, setReviews] = useState([]);
  const [courses, setCourses] = useState([]);
  const [professors, setProfessors] = useState([]);

  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedProfessor, setSelectedProfessor] = useState('');

  // populate the courses and professors using the peterportalAPI
  useEffect(() => {
    const fetchCourses = async () => {
      const response = await fetch('https://api.peterportal.org/rest/v0/courses/all');
      const data = await response.json();
      setCourses(data);
    }

    const fetchProfessors = async () => {
      const response = await fetch('https://api.peterportal.org/rest/v0/instructors/all');
      const data = await response.json();
      setProfessors(data);
    }
    fetchCourses();
    fetchProfessors();
  }, [])
  useEffect(() => {
    // whenever selected course changes, we fetch the relevant professors for professors useState variable list

  }, [selectedCourse])

  const handleChange = (e) => {
    console.log("e.target.value: ", e.target.value);
    // setCourses(e.target.value);
    setSelectedCourse(e.target.value);
  }

  const handleChange2 = (e) => {
    console.log("e.target.value: ", e.target.value);
    // setProfessors(e.target.value);
    setSelectedProfessor(e.target.value);
  }

  const handleSubmit = () => {
    console.log("selectedCourse: ", selectedCourse);
    console.log("selectedProfessor: ", selectedProfessor);
    // TODO: when we click submit, we should look for reviews that match the selected course and professor! 
  }

  return (
    <div>
      <h1>UCIReview</h1>
      {courses.length > 0 && (
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Courses</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectedCourse}
              label="Courses"
              onChange={handleChange}
            >
              {courses.map((course) => (
                <MenuItem key={course.id} value={course.id}>{course.id}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      )}

      {professors.length > 0 && (
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Instructors</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectedProfessor}
              label="Professors"
              onChange={handleChange2}
            >
              {professors.map((professor) => (
                <MenuItem key={professor.ucinetid} value={professor.name}>{professor.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      )}

      <button type="submit" onClick={handleSubmit}>Search!</button>
      {/* this button 'create review' will prompt us to a new page where we can create a new professor review based on the selected professor and class */}
      {/* <button type="submit" >Create Review</button>  */}
      {/* <Link to="/create"><button type="submit">Create Review</button></Link> */}
      <Link to={`/create?professor=${selectedProfessor}&course=${selectedCourse}`}><button type="submit">Create Review</button></Link>
    </div>
  );
}

export default Home;