import { useContext } from 'react';
import { AppContext } from '../../providers/AppProvider';

function LimitElement() {
  const { setPage, setLimit } = useContext(AppContext);
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setLimit(+event.target.value);
    setPage(1);
  };
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      <span>Select item limit on page</span>
      <select
        style={{
          outline: 'none',
          border: '2px solid #000',
          borderRadius: '10px',
          cursor: 'pointer',
        }}
        defaultValue="10"
        onChange={handleChange}
      >
        <option>3</option>
        <option>5</option>
        <option>10</option>
        <option>15</option>
        <option>20</option>
        <option>25</option>
      </select>
    </div>
  );
}

export default LimitElement;
