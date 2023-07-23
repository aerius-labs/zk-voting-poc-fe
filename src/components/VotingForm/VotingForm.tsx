import { useEffect, useState } from 'react';
import styles from './VotingForm.module.css';
import { fetchDataFromCID } from '../../actions/fetchProposals';
import { convertTimestampToReadableDate } from '../helpers';
import { generateKeypair } from '../../actions/cryptProposal';

export function VotingForm() {
  const CID = 'QmWn7GERTok9h56WH5jBm1RrsfQJwpoq9YwfUgTpi5wkUS';
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDataFromCID(CID).then((res) => {
      setTitle(res?.title);
      setDescription(res?.description);
      setDeadline(convertTimestampToReadableDate(res?.deadline));
      setLoading(false);
    });
    generateKeypair();
  }, []);

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      {!loading && (
        <>
          <label className={styles.label}>
            <h3>{title}</h3>
          </label>
          <label className={styles.label}>
            <div>Proposal description:</div>
            <p>{description}</p>
          </label>

          <label className={styles.label}>
            <div>Voting deadline:</div>
            <p>{deadline}</p>
          </label>

          <label className={styles.label}>
            <button>Vote YES</button>
          </label>
          <label className={styles.label}>
            <button>Vote NO</button>
          </label>
        </>
      )}
      {loading && (
        <>
          <label className={styles.label}>
            <h3>Fetching proposal from IPFS...</h3>
          </label>
        </>
      )}
    </form>
  );
}
