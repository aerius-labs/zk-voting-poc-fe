import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import { ProposalForm } from './components/ProposalForm/ProposalForm';
import Navbar from './components/Navbar/Navbar';
import { VotingForm } from './components/VotingForm/VotingForm';
import {
  isReady,
} from 'snarkyjs';
import { useEffect } from 'react';

const App = () => {
  useEffect(() => {
    (async () => {
      await isReady;
      const { UserProof, AggregatorProof } = await import('../zk-voting-poc/build/src');
      if (UserProof === undefined || AggregatorProof === undefined) {
        throw new Error('Could not load zk-voting-poc');
      };
      
    })();
  }, []);
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
