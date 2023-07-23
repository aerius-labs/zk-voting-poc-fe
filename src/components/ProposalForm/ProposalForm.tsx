import { useState } from 'react';
import styles from './ProposalForm.module.css';
import { getUnixTime } from 'date-fns';

export function ProposalForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dateTime, setDateTime] = useState(
    new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 16)
  );

 
  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDateTime(event.target.value);
    console.log('Unix timestamp: ', getUnixTime(new Date(event.target.value)));
  };

  const handlePublishProposal = async () => {
    try {
      const signResult = await window.mina.signMessage({
        message: 'yiZwL1oTzqJCmjEVosjWhvohmEwYJyKG',
      });
      console.log(signResult);
    } catch (error) {
      console.log(error.message, error.code);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h1>Create a Proposal!</h1>
      <label className={styles.label}>
        <div>Proposal title:</div>
        <input
          type="text"
          value={title}
          placeholder="Title..."
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
      </label>
      <label className={styles.label}>
        <div>Proposal description:</div>
        <textarea
          value={description}
          placeholder="Description..."
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
      </label>
      <label className={styles.label}>
        <div>Proposal deadline:</div>
        <input type="datetime-local" value={dateTime} onChange={handleChange} />
      </label>

      <label className={styles.label}>
        <button onClick={handlePublishProposal}>Publish proposal</button>
      </label>
    </form>
  );
}
