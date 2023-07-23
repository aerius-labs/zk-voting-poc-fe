/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logocropped.png';

const Navbar = () => {
  const [account, setAccount] = useState(null);

  const handleConnect = async () => {
    // @ts-ignore
    if (!window.mina) {
      alert('No provider was found 请先安装 Auro Wallet');
    } else {
      // @ts-ignore
      const data = await window.mina.requestAccounts().catch((err) => err);
      setAccount(data);
    }
  };

  return (
    <nav style={navbarStyle}>
      <Link style={linkStyle} to="/">
        Make a proposal
      </Link>
      <Link style={linkStyle} to="/vote">
        Voting
      </Link>

      {!account && (
        <Link onClick={handleConnect} style={linkStyle} to="">
          Connect wallet
        </Link>
      )}
      {account && (
        <Link onClick={handleConnect} style={linkStyle} to="">
          Disconnect wallet
        </Link>
      )}
    </nav>
  );
};

const logoStyle = {
  height: '50px', // adjust as needed
  position: 'absolute', // position the logo absolutely
  left: '50px', // adjust as needed
  top: '50%', // to vertically center
  transform: 'translateY(-50%)', // to vertically center
};

const navbarStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  background: '#242424',
  color: '#fff',
  padding: '10px',
  position: 'fixed',
  top: '0',
  width: '820px',
  height: '80px',
};

const linkStyle = {
  color: '#fff',
  textDecoration: 'none',
  backgroundColor: '#000',
  padding: '10px 20px',
  margin: '0 10px',
  borderRadius: '5px',
};

export default Navbar;
