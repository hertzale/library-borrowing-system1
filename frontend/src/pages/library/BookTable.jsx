export default function BookTable({ books, onSelectBook, loading }) {
  if (loading) {
    return <div className="loading">Loading books...</div>;
  }

  if (books.length === 0) {
    return <div className="no-results">No books found.</div>;
  }

  return (
    <div style={{
      overflowX: 'auto',
      marginTop: '20px'
    }}>
      <table style={{
        width: '100%',
        borderCollapse: 'collapse',
        background: 'white',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        borderRadius: '8px',
        overflow: 'hidden'
      }}>
        <thead style={{ background: '#667eea', color: 'white' }}>
          <tr>
            <th style={{ padding: '15px', textAlign: 'left' }}>Title</th>
            <th style={{ padding: '15px', textAlign: 'left' }}>Author</th>
            <th style={{ padding: '15px', textAlign: 'left' }}>ISBN</th>
            <th style={{ padding: '15px', textAlign: 'center' }}>Available</th>
            <th style={{ padding: '15px', textAlign: 'center' }}>Total</th>
            <th style={{ padding: '15px', textAlign: 'center' }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr
              key={book._id}
              style={{
                borderBottom: '1px solid #ddd',
                cursor: 'pointer',
                transition: 'background 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = '#f8f9fa'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'white'}
            >
              <td style={{ padding: '15px' }}>{book.title}</td>
              <td style={{ padding: '15px' }}>{book.author}</td>
              <td style={{ padding: '15px' }}>{book.isbn}</td>
              <td style={{ padding: '15px', textAlign: 'center' }}>
                <span style={{
                  background: book.available > 0 ? '#d4edda' : '#f8d7da',
                  color: book.available > 0 ? '#155724' : '#721c24',
                  padding: '5px 10px',
                  borderRadius: '5px',
                  fontWeight: 'bold'
                }}>
                  {book.available}
                </span>
              </td>
              <td style={{ padding: '15px', textAlign: 'center' }}>{book.totalCopies}</td>
              <td style={{ padding: '15px', textAlign: 'center' }}>
                <button
                  onClick={() => onSelectBook(book._id)}
                  style={{
                    padding: '6px 12px',
                    background: '#667eea',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    fontSize: '12px'
                  }}
                >
                  Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}