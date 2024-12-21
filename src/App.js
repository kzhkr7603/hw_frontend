import './App.css';
import Container from './Container.js';
import React, { useState,useEffect } from 'react'

const App = () => {
  const [training, setTraining] = useState([]);
  const [competition, setCompetition] = useState([]);

  const fetchTrainingData = async () => {
    try {
      const trainingApiUrl = process.env.REACT_APP_TRAINING_API_URL || 'http://localhost:8080/api/Training';
      const response = await fetch(trainingApiUrl);

      if (!response.ok) {
        throw new Error('Training API response was not ok');
      } 

      const data = await response.json();
      setTraining(data);
    } catch (error) {
      console.error('Error fetching training data: ', error);
    }
  };

  const fetchCompetitionData = async () => {
    try {
      const competitionApiUrl = process.env.REACT_APP_COMPETITION_API_URL || 'http://localhost:8080/api/Competition';
      const response = await fetch(competitionApiUrl);

      if (!response.ok) {
        throw new Error('Competition API response was not ok');
      }

      const data = await response.json();
      setCompetition(data);
    } catch (error) {
      console.error('Error fetching competition data: ', error);
    }
  };

  const fetchData = async () => {
    await Promise.all([fetchTrainingData(), fetchCompetitionData()]);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="header-container">
        <Header />
      </div>
      <div className="app-container">
        <TrainingList listTraining={training}/>
        <CompetitionList listCompetition={competition} />
      </div>
    </>
  );
};

const Header = () => {
  return (
    <>
      <h1 className="logo">
        <a href="/">
          <img src="https://res.cloudinary.com/dod3qcnxx/image/upload/v1734798162/logo_tlwv1g.png" alt="LOGO" />
        </a>
        <span className="logo-text">GURYONGPO FS</span>
        <a href="https://www.instagram.com/9ryongpo_official/" target="_blank" rel="noreferrer">
          <img src="https://res.cloudinary.com/dod3qcnxx/image/upload/v1734798160/instagram_logo_rzbpl3.png" alt="insta_LOGO" style={{ width: '48px', height: '48px', marginLeft: '50px' }} />
        </a>
      </h1>
    </>
  );
};

const TrainingList = (props) => {
  const [isExpanded,setIsExpanded] = useState(false);

  const toggleTitle = () => {
    setIsExpanded(prevState => !prevState);
  };

  return (
    <div className='training'>
      <h2 className="training-title" onClick={toggleTitle} style={{ cursor: 'pointer' }}>훈련</h2>
      {isExpanded&&(
        props.listTraining.map(training => (
          <Container key={training.id} aurl={training.aurl} date={training.date} name={training.name} additionalContent={training.additionalContent} />
        ))
      )}
    </div>
  );
};

const CompetitionList = (props) => {
  const [isExpanded,setIsExpanded] = useState(false);

  const toggleTitle = () => {
    setIsExpanded(prevState => !prevState);
  };

  return (
    <div className='competition'>
      <h2 className="competition-title" onClick={toggleTitle} style={{ cursor: 'pointer' }}>대회</h2>
      {isExpanded&&(
        props.listCompetition.map(competition => (
          <Container key={competition.id} aurl={competition.aurl} date={competition.date} name={competition.name} additionalContent={competition.additionalContent} />
        ))
      )}
    </div>
  );
};

export default App;