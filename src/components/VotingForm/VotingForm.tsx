import { useEffect, useState } from 'react';
import styles from './VotingForm.module.css';
import { fetchDataFromCID } from '../../actions/fetchProposals';
import { convertTimestampToReadableDate } from '../helpers';
import { generateKeypair } from '../../actions/cryptProposal';
import { PrivateKey, PublicKey } from 'paillier-bigint';

export function VotingForm() {
  const CID = 'Qma2FrLJRTU3zXpc5LQvhHXLhC2gofQ2qSnxuGJWeLt2tZ'; // example CID of proposal
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [loading, setLoading] = useState(true);
  const [expired, setExpired] = useState(false);

  const [pub, setPub] = useState(null);
  const [priv, setPriv] = useState(null);

  useEffect(() => {
    fetchDataFromCID(CID).then((res) => {
      setTitle(res?.title);
      setDescription(res?.description);
      setDeadline(convertTimestampToReadableDate(res?.deadline));
      const unixTimestamp = Math.floor(new Date().getTime() / 1000);
      if (unixTimestamp >= parseInt(deadline)) {
        setExpired(true);
      }
      setLoading(false);
    });
    generateKeypair().then((res) => {
      setPub(res.publicKey);
      setPriv(res.privateKey);
    });
  }, []);

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
  };

  const handleYes = async () => {
    try {
      const signResult = await window.mina.signMessage({
        message: '10',
      });
      console.log(signResult);

      const msgYes = pub.encrypt(signResult);
    } catch (error) {
      console.log(error.message, error.code);
    }
  };

  const handleNo = async () => {
    try {
      const signResult = await window.mina.signMessage({
        message: '01',
      });
      console.log(signResult);

      const msgNo = pub.encrypt(signResult);
    } catch (error) {
      console.log(error.message, error.code);
    }
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
          {!expired && (
            <>
              <label className={styles.label}>
                <button onClick={handleYes}>Vote YES</button>
              </label>
              <label className={styles.label}>
                <button onClick={handleNo}>Vote NO</button>
              </label>
            </>
          )}
          {expired && (
            <label className={styles.label}>
              <p>Voting for this proposal is over.</p>
            </label>
          )}
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
