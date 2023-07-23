import { useEffect, useState } from 'react';
import styles from './VotingForm.module.css';
import { fetchDataFromCID } from '../../actions/fetchProposals';
import { convertTimestampToReadableDate } from '../helpers';
import { generateKeypair } from '../../actions/cryptProposal';

export function VotingForm() {
  const CID = 'Qma2FrLJRTU3zXpc5LQvhHXLhC2gofQ2qSnxuGJWeLt2tZ'; // example CID of proposal
  const proposalID =
    'dbd506d6ef76e5f386f41c651dcb808c5bcbd75471cc4eafa3f4df7ad4e4c493';

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [loading, setLoading] = useState(true);
  const [expired, setExpired] = useState(false);
  const [account, setAccount] = useState('');

  const [pub, setPub] = useState(null);
  const [priv, setPriv] = useState(null);

  useEffect(() => {
    fetchDataFromCID(CID).then(async (res) => {
      setTitle(res?.title);
      setDescription(res?.description);
      setDeadline(convertTimestampToReadableDate(res?.deadline));
      const unixTimestamp = Math.floor(new Date().getTime() / 1000);
      if (unixTimestamp >= parseInt(res?.deadline)) {
        console.log('EXPIRED!');
        setExpired(true);
      }

      (async () => {
        const zkappWorkerClient = new ZkappWorkerClient();
        console.log('Loading SnarkyJS...');
        await zkappWorkerClient.loadSnarkyJS();
        console.log('done');
        await zkappWorkerClient.setActiveInstanceToBerkeley();
        // TODO
      })();

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
      const acc = (await window.mina.getAccounts())[0];

      setAccount(acc);
      const signResult = await window.mina.signMessage({
        message: proposalID,
      });

      const msgYes = pub.encrypt(signResult);
    } catch (error) {
      console.log(error.message, error.code);
    }
  };

  const handleNo = async () => {
    try {
      // singed id
      // yes
      // no
      // user pub key

      const acc = (await window.mina.getAccounts())[0];

      setAccount(acc);
      const signResult = await window.mina.signMessage({
        message: proposalID,
      });

      // const s = new Signature(
      //   signResult.signature.field,
      //   signResult.signature.scalar
      // );

      console.log('signature', s);

      const msgNo = pub.encrypt(signResult);
      console.log('msgNo', msgNo);
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
          {expired && (
            <>
              <label className={styles.label}>
                <button onClick={handleYes}>Vote YES</button>
              </label>
              <label className={styles.label}>
                <button onClick={handleNo}>Vote NO</button>
              </label>
            </>
          )}
          {!expired && (
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
