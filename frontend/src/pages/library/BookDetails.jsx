import { useState, useEffect } from 'react';

export default function BookDetails({ bookId, onClose, bookApi }) {
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!bookId) return;
    loadDetails();
  }, [bookId]);

  const loadDetails = async () => {
    setLoading(true);
    setError('');

    if (!bookApi) {
      setError('API not available');
      setLoading(false);
      return;
    }

    const result = await bookApi.getBook(bookId);
    if (result.success) {
      setBook(result.book);
    } else {
      setError('Failed to load book details');
    }
    setLoading(false);
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!book) {
    return (
      <div>
        <div className="error-message">{error}</div>
        <button
          onClick={onClose}
          style={{
            padding: '8px 16px',
            background: '#667eea',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            marginTop: '10px'
          }}
        >
          Close
        </button>
      </div>
    );
  }

  return (
    <div style={{
      background: 'white',
      borderRadius: '8px',
      padding: '30px',
      maxWidth: '600px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '20px' }}>
        <h2 style={{ margin: 0 }}>{book.title}</h2>
        <button
          onClick={onClose}
          style={{
            background: '#ccc',
            border: 'none',
            width: '30px',
            height: '30px',
            borderRadius: '50%',
            cursor: 'pointer',
            fontSize: '18px',
            fontWeight: 'bold'
          }}
        >
          ×
        </button>
      </div>

      <div style={{ lineHeight: '1.8', marginBottom: '20px' }}>
        <p><strong>Author:</strong> {book.author}</p>
        <p><strong>ISBN:</strong> {book.isbn}</p>
        <p>
          <strong>Availability:</strong>
          <span style={{
            marginLeft: '10px',
            padding: '5px 10px',
            borderRadius: '5px',
            background: book.available > 0 ? '#d4edda' : '#f8d7da',
            color: book.available > 0 ? '#155724' : '#721c24',
            fontWeight: 'bold'
          }}>
            {book.available} of {book.totalCopies} available
          </span>
        </p>
      </div>

      <div style={{
        marginTop: '30px',
        paddingTop: '20px',
        borderTop: '1px solid #ddd'
      }}>
        <h3>Borrowing Status</h3>
        <p style={{ color: '#666', fontSize: '14px' }}>
          Books currently borrowed from this title: {book.totalCopies - book.available}
        </p>
      </div>

      <button
        onClick={onClose}
        style={{
          marginTop: '20px',
          padding: '10px 20px',
          background: '#667eea',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          width: '100%',
          fontWeight: '600'
        }}
      >
        Close
      </button>
    </div>
  );
}