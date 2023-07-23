import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import { ProposalForm } from './components/ProposalForm/ProposalForm';
import Navbar from './components/Navbar/Navbar';
import { VotingForm } from './components/VotingForm/VotingForm';
import { isReady } from 'snarkyjs';

const App = async () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" Component={ProposalForm} />
        <Route path="/vote" Component={VotingForm} />
      </Routes>
    </Router>
  );
};

export default App;
