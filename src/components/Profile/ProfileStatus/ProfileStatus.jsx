import { useState } from 'react';
import { useEffect } from 'react';

export const ProfileStatus = (props) => {
  const [editMode, setEditMode] = useState(false);
  const [status, setStatus] = useState(props.status);

  useEffect(() => {
    setStatus(props.status);
  }, [props.status]);

  const activateEditMode = () => {
    setEditMode(true);
  };

  const deactivateEditMode = () => {
    setEditMode(false);
    if (status !== props.status && props.updateStatus) {
      props.updateStatus(status.trim());
    }
  };

  const onStatusChange = (e) => {
    setStatus(e.target.value);
  };

  return (
    <>
      {!editMode && (
        <div>
          <span onDoubleClick={activateEditMode}>{status || 'No status'}</span>
        </div>
      )}

      {editMode && (
        <div>
          <input
            autoFocus
            onBlur={deactivateEditMode}
            value={status}
            onChange={onStatusChange}
          />
        </div>
      )}
    </>
  );
};
