import React, { memo } from 'react';
import './index.css';

const Submit = memo(() => {
  return (
    <div className="submit">
      <button
        type="submit"
        className="submit-button"
      >
        搜索
      </button>
    </div>
  );
});

export default Submit;
