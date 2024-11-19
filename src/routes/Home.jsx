import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import CreatePost from './CreatePost';
import { Link } from 'react-router-dom';
const Home = () => {
  const [courses, setCourses] = useState([]);
  const [professors, setProfessors] = useState([]);

  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedProfessor, setSelectedProfessor] = useState('');

  const [profIdNameMap, setProfIdNameMap] = useState({});

  useEffect(() => {
    const fetchCourses = async () => {
      const response = await fetch('https://api.peterportal.org/rest/v0/courses/all');
      const data = await response.json();
      const filteredData = data.filter((course) => course.department === "COMPSCI" || course.department === "I&C SCI" || course.department === "IN4MATX");
      setCourses(filteredData);
    }

    const fetchProfessors = async () => {
      const response = await fetch('https://api.peterportal.org/rest/v0/instructors/all');
      const data = await response.json();
      const profMap = {};
      for (let i = 0; i < data.length; i++) {
        profMap[data[i].ucinetid] = data[i].name;
      }
      setProfIdNameMap(profMap);
      setProfessors(data);
    }
    fetchCourses();
    fetchProfessors();

  }, [])
  useEffect(() => {
    const filterProf = () => {
      const profs = [];
      for (let i = 0; i < courses.length; i++) {
        if (courses[i].id === selectedCourse) {
          for (let j = 0; j < courses[i].professor_history.length; j++) {
            // each child in a list should have a unique "key" prop
            profs.push({name: courses[i].professor_history[j]});
          }
          break;
        }
      }
      return profs;
    }
    const profs = filterProf();
    for (let i = 0; i < profs.length; i++) {
      profs[i].name = profIdNameMap[profs[i].name];
    }
    setProfessors(profs);
  }, [selectedCourse])

  const handleChange = (e) => {
    setSelectedCourse(e.target.value);
  }

  const handleChange2 = (e) => {
    setSelectedProfessor(e.target.value);
  }

  const handleSubmit = () => {
    console.log("selectedCourse: ", selectedCourse);
    console.log("selectedProfessor: ", selectedProfessor);
  }

  return (
    <div>
      <h1>UCIReview</h1>
      <div className="course-instructor-selector">
      {courses.length > 0 && (
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label" sx={{ color: 'lightblue' }}>Courses</InputLabel>
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
            <InputLabel id="demo-simple-select-label" sx={{ color: 'lightblue' }}>Instructors</InputLabel>
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
      </div>

      {/* <button type="submit" onClick={handleSubmit}>Search!</button> */}
      {/* <Link to={`/search?course=${selectedCourse}&professor=${selectedProfessor}`}><button>Search!</button></Link> */}
      <Link to={`/search?professor=${selectedProfessor}&course=${selectedCourse.replace(/&/g, '')}`}><button>Search!</button></Link>
      <Link to={`/create?professor=${selectedProfessor}&course=${selectedCourse.replace(/&/g, '')}`}><button type="submit">Create Review</button></Link>
    </div>
  );
}

export default Home;