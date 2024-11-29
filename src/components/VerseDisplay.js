const VerseDisplay = ({ verse }) => {
  return (
    <div style={{ textAlign: 'center', margin: '20px', color: '#ff4500' }}>
      <h2>{verse.reference}</h2>
      <p style={{ fontStyle: 'italic' }}>{verse.text}</p>
    </div>
  );
};

export default VerseDisplay;
